<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgendaRegistration extends Model
{
    protected $fillable = [
        'agenda_id',
        'user_id',
        'responses',
        'status',
        'payment_proof',
        'payment_method',
        'snap_token',
        'midtrans_order_id',
        'midtrans_payment_type',
        'midtrans_transaction_status',
        'midtrans_settlement_time',
    ];

    protected $casts = [
        'responses' => 'array',
        'midtrans_settlement_time' => 'datetime',
    ];

    protected $appends = ['payment_proof_url'];

    public function getPaymentProofUrlAttribute(): ?string
    {
        return \App\Services\FileStorageService::url($this->payment_proof);
    }

    /**
     * Get effective schema (custom or default fields) for parsing responses.
     */
    public function getEffectiveSchema(): array
    {
        $schema = $this->agenda?->form_schema;
        if (is_array($schema) && count($schema) > 0) {
            return $schema;
        }

        return [
            ['id' => 'field_name', 'label' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
            ['id' => 'field_phone', 'label' => 'Nomor WhatsApp / HP', 'type' => 'tel', 'required' => true],
            ['id' => 'field_email', 'label' => 'Alamat Email', 'type' => 'email', 'required' => true],
            ['id' => 'field_nik', 'label' => 'NIK (KTP / KK)', 'type' => 'nik', 'required' => false],
        ];
    }

    public function agenda()
    {
        return $this->belongsTo(Agenda::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generate a deterministic HMAC token for accessing payment status/checkout.
     */
    public function getPaymentAccessToken(): string
    {
        return hash_hmac('sha256', "kegiatan-payment:{$this->id}", (string) config('app.key'));
    }

    /**
     * Validate a payment access token.
     */
    public function hasValidPaymentToken(?string $token): bool
    {
        if (!$token) {
            return false;
        }

        return hash_equals($this->getPaymentAccessToken(), $token);
    }

    /**
     * Get email address of the registrant.
     */
    public function getRegistrantEmail(): ?string
    {
        $schema = $this->getEffectiveSchema();
        if (is_array($this->responses)) {
            // First check by schema field with type 'email' or label containing 'email'
            foreach ($schema as $field) {
                $id = strtolower($field['id'] ?? '');
                $type = strtolower($field['type'] ?? '');
                $label = strtolower($field['label'] ?? '');
                if ($type === 'email' || str_contains($id, 'email') || str_contains($label, 'email')) {
                    $emailVal = $this->responses[$field['id']] ?? null;
                    if ($emailVal && is_string($emailVal) && filter_var(trim($emailVal), FILTER_VALIDATE_EMAIL)) {
                        return trim($emailVal);
                    }
                }
            }

            // Secondary check across response values for a valid email string
            foreach ($this->responses as $val) {
                if (is_string($val) && filter_var(trim($val), FILTER_VALIDATE_EMAIL)) {
                    return trim($val);
                }
            }
        }

        // Fallback to linked user account if logged in
        if ($this->user && $this->user->email) {
            return $this->user->email;
        }

        return null;
    }

    /**
     * Get name of the registrant.
     */
    public function getRegistrantName(): string
    {
        $schema = $this->getEffectiveSchema();
        if (is_array($this->responses)) {
            foreach ($schema as $field) {
                $id = strtolower($field['id'] ?? '');
                $label = strtolower($field['label'] ?? '');
                if (str_contains($id, 'name') || str_contains($id, 'nama') || str_contains($label, 'nama')) {
                    $val = $this->responses[$field['id']] ?? null;
                    if ($val && is_string($val)) {
                        return trim($val);
                    }
                }
            }

            $firstVal = reset($this->responses);
            if ($firstVal && is_string($firstVal)) {
                return trim($firstVal);
            }
        }

        if ($this->user && $this->user->name) {
            return $this->user->name;
        }

        return 'Peserta';
    }

    /**
     * Normalize Indonesian phone number into 628... format.
     */
    public static function normalizePhone(?string $phone): string
    {
        if (!$phone) return '';
        $cleaned = preg_replace('/[^0-9]/', '', $phone);
        if (str_starts_with($cleaned, '08')) {
            $cleaned = '628' . substr($cleaned, 2);
        } elseif (str_starts_with($cleaned, '8')) {
            $cleaned = '628' . substr($cleaned, 1);
        }
        return $cleaned;
    }

    /**
     * Get phone / whatsapp number of the registrant.
     */
    public function getRegistrantPhone(): ?string
    {
        $schema = $this->getEffectiveSchema();
        if (is_array($this->responses)) {
            foreach ($schema as $field) {
                $id = strtolower($field['id'] ?? '');
                $type = strtolower($field['type'] ?? '');
                $label = strtolower($field['label'] ?? '');
                if (
                    $type === 'tel'
                    || str_contains($id, 'phone')
                    || str_contains($id, 'whatsapp')
                    || str_contains($id, 'hp')
                    || str_contains($label, 'telepon')
                    || str_contains($label, 'whatsapp')
                    || str_contains($label, 'hp')
                    || str_contains($label, 'no. wa')
                ) {
                    $val = $this->responses[$field['id']] ?? null;
                    if ($val) return trim((string) $val);
                }
            }

            foreach ($this->responses as $key => $val) {
                $k = strtolower((string) $key);
                if ($val && (str_contains($k, 'phone') || str_contains($k, 'whatsapp') || str_contains($k, 'hp'))) {
                    return trim((string) $val);
                }
            }
        }

        return null;
    }

    /**
     * Get NIK of the registrant.
     */
    public function getRegistrantNik(): ?string
    {
        $schema = $this->getEffectiveSchema();
        if (is_array($this->responses)) {
            foreach ($schema as $field) {
                $id = strtolower($field['id'] ?? '');
                $type = strtolower($field['type'] ?? '');
                $label = strtolower($field['label'] ?? '');
                if ($type === 'nik' || str_contains($id, 'nik') || str_contains($label, 'nik')) {
                    $val = $this->responses[$field['id']] ?? null;
                    if ($val) return trim((string) $val);
                }
            }

            foreach ($this->responses as $key => $val) {
                if ($val && str_contains(strtolower((string) $key), 'nik')) {
                    return trim((string) $val);
                }
            }
        }

        return null;
    }
}
