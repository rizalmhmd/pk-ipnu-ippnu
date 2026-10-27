<?php

namespace App\Services;

use App\Models\Agenda;
use App\Models\AgendaRegistration;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Notification;
use Midtrans\Snap;
use Midtrans\Transaction;

class MidtransService
{
    /**
     * Initialize Midtrans configuration.
     */
    public static function init(): void
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = (bool) config('midtrans.is_production', false);
        Config::$isSanitized = (bool) config('midtrans.is_sanitized', true);
        Config::$is3ds = (bool) config('midtrans.is_3ds', true);
    }

    /**
     * Generate Snap Token for Agenda Registration and store order_id.
     */
    public function createSnapToken(AgendaRegistration $registration, Agenda $agenda): string
    {
        self::init();

        $grossAmount = (int) preg_replace('/[^0-9]/', '', (string) $agenda->registration_fee);
        if ($grossAmount <= 0) {
            $grossAmount = 10000;
        }

        $orderId = 'REG-' . $registration->id . '-' . time();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => $registration->getRegistrantName(),
                'email' => $registration->getRegistrantEmail() ?? 'peserta@example.com',
                'phone' => $registration->responses['field_phone'] ?? null,
            ],
            'item_details' => [
                [
                    'id' => 'AGENDA-' . $agenda->id,
                    'price' => $grossAmount,
                    'quantity' => 1,
                    'name' => mb_substr($agenda->title, 0, 50),
                ],
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        $registration->update([
            'snap_token' => $snapToken,
            'midtrans_order_id' => $orderId,
            'payment_method' => 'midtrans',
        ]);

        return $snapToken;
    }

    /**
     * Check transaction status directly from Midtrans API.
     */
    public function getTransactionStatus(string $orderId): ?object
    {
        self::init();

        try {
            return Transaction::status($orderId);
        } catch (Exception $e) {
            Log::warning("Midtrans check status failed for order {$orderId}: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Synchronize registration status with Midtrans.
     *
     * @return array [success => bool, message => string, status => string|null, transaction_status => string|null]
     */
    public function syncRegistration(AgendaRegistration $registration, ?string $orderId = null): array
    {
        self::init();

        $orderId = $orderId ?: $registration->midtrans_order_id;

        // If orderId is missing, attempt to discover order_id around registration created_at
        if (!$orderId && $registration->created_at) {
            $orderId = $this->discoverOrderId($registration);
        }

        if (!$orderId) {
            return [
                'success' => false,
                'message' => 'Order ID Midtrans tidak ditemukan untuk pendaftaran ini.',
                'status' => $registration->status,
                'transaction_status' => null,
            ];
        }

        $statusData = $this->getTransactionStatus($orderId);

        if (!$statusData) {
            return [
                'success' => false,
                'message' => "Tidak dapat mengambil status transaksi dari Midtrans untuk order {$orderId}.",
                'status' => $registration->status,
                'transaction_status' => null,
            ];
        }

        $transactionStatus = $statusData->transaction_status ?? null;
        $fraudStatus = $statusData->fraud_status ?? null;
        $paymentType = $statusData->payment_type ?? null;
        $settlementTime = $statusData->settlement_time ?? null;

        // Determine mapped status
        $newStatus = $registration->status;

        if ($transactionStatus === 'capture') {
            $newStatus = ($fraudStatus === 'challenge') ? 'pending' : 'approved';
        } elseif ($transactionStatus === 'settlement') {
            $newStatus = 'approved';
        } elseif ($transactionStatus === 'pending') {
            $newStatus = 'pending';
        } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'], true)) {
            $newStatus = 'rejected';
        }

        $registration->update([
            'midtrans_order_id' => $orderId,
            'midtrans_transaction_status' => $transactionStatus,
            'midtrans_payment_type' => $paymentType,
            'midtrans_settlement_time' => $settlementTime ? Carbon::parse($settlementTime) : null,
            'status' => $newStatus,
        ]);

        return [
            'success' => true,
            'message' => "Status berhasil disinkronkan: {$transactionStatus} (" . strtoupper($newStatus) . ")",
            'status' => $newStatus,
            'transaction_status' => $transactionStatus,
            'payment_type' => $paymentType,
            'settlement_time' => $settlementTime,
        ];
    }

    /**
     * Fallback method to discover order_id if it was not stored previously.
     */
    protected function discoverOrderId(AgendaRegistration $registration): ?string
    {
        $regCreatedAt = $registration->created_at ? $registration->created_at->timestamp : time();

        // Search in a window of -10s to +120s around created_at
        for ($offset = -5; $offset <= 60; $offset++) {
            $testOrderId = "REG-{$registration->id}-" . ($regCreatedAt + $offset);
            try {
                $status = Transaction::status($testOrderId);
                if ($status && !empty($status->transaction_status)) {
                    return $testOrderId;
                }
            } catch (Exception) {
                // Keep searching
            }
        }

        return null;
    }

    /**
     * Handle incoming Midtrans Webhook Notification.
     */
    public function handleWebhook(): array
    {
        self::init();

        try {
            $notification = new Notification();
        } catch (Exception $e) {
            Log::error('Midtrans Callback Notification Error: ' . $e->getMessage());
            return ['success' => false, 'message' => 'Failed to process notification: ' . $e->getMessage()];
        }

        $orderId = $notification->order_id;
        $transactionStatus = $notification->transaction_status;
        $paymentType = $notification->payment_type;
        $fraudStatus = $notification->fraud_status;
        $settlementTime = $notification->settlement_time ?? null;

        $parts = explode('-', (string) $orderId);
        if (count($parts) >= 2 && $parts[0] === 'REG') {
            $registrationId = $parts[1];
            $registration = AgendaRegistration::find($registrationId);

            if ($registration) {
                $newStatus = $registration->status;

                if ($transactionStatus === 'capture') {
                    $newStatus = ($fraudStatus === 'challenge') ? 'pending' : 'approved';
                } elseif ($transactionStatus === 'settlement') {
                    $newStatus = 'approved';
                } elseif ($transactionStatus === 'pending') {
                    $newStatus = 'pending';
                } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'], true)) {
                    $newStatus = 'rejected';
                }

                $registration->update([
                    'midtrans_order_id' => $orderId,
                    'midtrans_transaction_status' => $transactionStatus,
                    'midtrans_payment_type' => $paymentType,
                    'midtrans_settlement_time' => $settlementTime ? Carbon::parse($settlementTime) : null,
                    'status' => $newStatus,
                ]);

                return ['success' => true, 'message' => 'Registration updated successfully'];
            }
        }

        return ['success' => false, 'message' => 'Registration not found for order ' . $orderId];
    }
}
