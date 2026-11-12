<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AgendaRegistration;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Mail\RegistrationRejectedMail;
use App\Mail\RegistrationApprovedMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class AgendaRegistrationController extends Controller
{
    public function index(Request $request, \App\Services\MidtransService $midtransService)
    {
        // Auto-sync any recent pending Midtrans transactions so the admin table is always up to date
        $pendingMidtrans = AgendaRegistration::where('payment_method', 'midtrans')
            ->where('status', 'pending')
            ->where('created_at', '>=', now()->subDays(3))
            ->take(5)
            ->get();

        foreach ($pendingMidtrans as $pendingReg) {
            $midtransService->syncRegistration($pendingReg);
        }

        $query = AgendaRegistration::with(['agenda', 'user'])->latest();

        if ($request->filled('agenda_id')) {
            $query->where('agenda_id', $request->agenda_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = trim($request->search);
            $castExpr = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite'
                ? 'CAST(responses AS TEXT) LIKE ?'
                : 'CAST(responses AS CHAR) LIKE ?';
            $query->where(function ($q) use ($search, $castExpr) {
                $q->where('midtrans_order_id', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%")
                  ->orWhereRaw($castExpr, ["%{$search}%"])
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $registrations = $query->paginate(15)->withQueryString();
        
        // For filter dropdown
        $agendas = Agenda::whereHas('registrations')->select('id', 'title')->get();

        return Inertia::render('Admin/Registrations/Index', [
            'registrations' => $registrations,
            'agendas' => $agendas,
            'filters' => $request->only(['agenda_id', 'status', 'search']),
        ]);
    }

    public function exportData(Request $request)
    {
        $query = AgendaRegistration::with(['agenda', 'user'])->latest();

        if ($request->filled('agenda_id')) {
            $query->where('agenda_id', $request->agenda_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = trim($request->search);
            $castExpr = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite'
                ? 'CAST(responses AS TEXT) LIKE ?'
                : 'CAST(responses AS CHAR) LIKE ?';
            $query->where(function ($q) use ($search, $castExpr) {
                $q->where('midtrans_order_id', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%")
                  ->orWhereRaw($castExpr, ["%{$search}%"])
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $registrations = $query->get()->map(function ($reg) {
            return [
                'id' => $reg->id,
                'ticket_code' => 'REG-' . str_pad((string) $reg->id, 5, '0', STR_PAD_LEFT),
                'agenda_title' => $reg->agenda?->title ?? '-',
                'agenda_date' => $reg->agenda?->event_date ? $reg->agenda->event_date->format('d/m/Y') : '-',
                'form_schema' => $reg->agenda?->form_schema ?? [],
                'registrant_name' => $reg->getRegistrantName(),
                'registrant_phone' => $reg->getRegistrantPhone() ?? '-',
                'registrant_email' => $reg->getRegistrantEmail() ?? '-',
                'registrant_nik' => $reg->getRegistrantNik() ?? '-',
                'status' => strtoupper($reg->status),
                'payment_method' => strtoupper($reg->payment_method ?? 'CASH'),
                'midtrans_order_id' => $reg->midtrans_order_id ?? '-',
                'midtrans_payment_type' => $reg->midtrans_payment_type ?? '-',
                'registered_at' => $reg->created_at ? $reg->created_at->format('d/m/Y H:i') : '-',
                'responses' => $reg->responses ?? [],
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $registrations,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'reason' => 'nullable|string|max:500',
        ]);

        $registration = AgendaRegistration::with(['agenda', 'user'])->findOrFail($id);
        $oldStatus = $registration->status;
        $registration->update(['status' => $validated['status']]);

        $emailNotice = '';

        // If status changed to approved, send e-ticket approval email
        if ($validated['status'] === 'approved' && $oldStatus !== 'approved') {
            $email = $registration->getRegistrantEmail();
            if ($email) {
                try {
                    Mail::to($email)->send(new RegistrationApprovedMail($registration));
                    $emailNotice = " dan E-Ticket resmi telah dikirimkan ke {$email}.";
                } catch (\Throwable $e) {
                    Log::error("Gagal mengirim email E-Ticket pendaftaran (ID: {$registration->id}): " . $e->getMessage());
                    $emailNotice = ", namun email E-Ticket gagal dikirim. (Cek konfigurasi SMTP)";
                }
            } else {
                $emailNotice = ", namun tidak ditemukan alamat email pendaftar.";
            }
        }

        // If status changed to rejected, send rejection email
        if ($validated['status'] === 'rejected' && $oldStatus !== 'rejected') {
            $email = $registration->getRegistrantEmail();
            if ($email) {
                try {
                    Mail::to($email)->send(new RegistrationRejectedMail($registration, $validated['reason'] ?? null));
                    $emailNotice = " dan email pemberitahuan penolakan telah dikirim ke {$email}.";
                } catch (\Throwable $e) {
                    Log::error("Gagal mengirim email penolakan pendaftaran (ID: {$registration->id}): " . $e->getMessage());
                    $emailNotice = ", namun email pemberitahuan gagal dikirim. (Cek konfigurasi SMTP)";
                }
            } else {
                $emailNotice = ", namun tidak ditemukan alamat email pendaftar.";
            }
        }

        return back()->with('success', 'Status pendaftar berhasil diperbarui' . $emailNotice);
    }

    public function syncMidtrans($id, \App\Services\MidtransService $midtransService)
    {
        $registration = AgendaRegistration::findOrFail($id);

        if ($registration->payment_method !== 'midtrans') {
            return back()->withErrors(['message' => 'Pendaftaran ini tidak menggunakan metode pembayaran Midtrans.']);
        }

        $result = $midtransService->syncRegistration($registration);

        if ($result['success']) {
            return back()->with('success', $result['message']);
        }

        return back()->withErrors(['message' => $result['message']]);
    }

    public function syncAllMidtrans(\App\Services\MidtransService $midtransService)
    {
        $pendingRegistrations = AgendaRegistration::where('payment_method', 'midtrans')
            ->where('status', 'pending')
            ->get();

        if ($pendingRegistrations->isEmpty()) {
            return back()->with('info', 'Tidak ada transaksi Midtrans yang berstatus pending.');
        }

        $synced = 0;
        $approved = 0;

        foreach ($pendingRegistrations as $registration) {
            $result = $midtransService->syncRegistration($registration);
            if ($result['success']) {
                $synced++;
                if (($result['status'] ?? '') === 'approved') {
                    $approved++;
                }
            }
        }

        return back()->with('success', "Sinkronisasi selesai: {$synced} transaksi dicek, {$approved} transaksi disetujui (Settlement).");
    }

    public function destroy($id)
    {
        $registration = AgendaRegistration::findOrFail($id);
        
        // Delete payment proof if exists
        \App\Services\FileStorageService::delete($registration->payment_proof);

        $registration->delete();

        return back()->with('success', 'Pendaftar berhasil dihapus.');
    }
}
