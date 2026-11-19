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

        $query = AgendaRegistration::with(['agenda', 'user', 'checkedInBy'])->latest();

        if ($request->filled('agenda_id')) {
            $query->where('agenda_id', $request->agenda_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->input('attendance') === 'present') {
            $query->whereNotNull('attended_at');
        } elseif ($request->input('attendance') === 'absent') {
            $query->whereNull('attended_at');
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
            'filters' => $request->only(['agenda_id', 'status', 'attendance', 'search']),
        ]);
    }

    public function exportData(Request $request)
    {
        $query = AgendaRegistration::with(['agenda', 'user', 'checkedInBy'])->latest();

        if ($request->filled('agenda_id')) {
            $query->where('agenda_id', $request->agenda_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->input('attendance') === 'present') {
            $query->whereNotNull('attended_at');
        } elseif ($request->input('attendance') === 'absent') {
            $query->whereNull('attended_at');
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
                'attendance_status' => $reg->attended_at ? 'HADIR' : 'BELUM HADIR',
                'attended_at' => $reg->attended_at ? $reg->attended_at->format('d/m/Y H:i') : '-',
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

    public function attendance(Request $request)
    {
        $agendas = Agenda::whereHas('registrations')
            ->orderByDesc('event_date')
            ->select('id', 'title', 'event_date', 'location', 'is_attendance_open')
            ->get();

        $agendaId = $request->input('agenda_id');
        if (!$agendaId && $agendas->isNotEmpty()) {
            $agendaId = $agendas->first()->id;
        }

        $selectedAgenda = ($agendaId && $agendaId !== 'all')
            ? $agendas->firstWhere('id', (int) $agendaId)
            : null;

        $baseQuery = AgendaRegistration::with(['agenda', 'user', 'checkedInBy'])
            ->where('status', 'approved');

        if ($agendaId && $agendaId !== 'all') {
            $baseQuery->where('agenda_id', $agendaId);
        }

        $totalApproved = (clone $baseQuery)->count();
        $totalPresent = (clone $baseQuery)->whereNotNull('attended_at')->count();
        $totalAbsent = max(0, $totalApproved - $totalPresent);

        $listQuery = clone $baseQuery;

        if ($request->input('attendance') === 'present') {
            $listQuery->whereNotNull('attended_at');
        } elseif ($request->input('attendance') === 'absent') {
            $listQuery->whereNull('attended_at');
        }

        if ($request->filled('search')) {
            $search = trim($request->search);
            $numericId = preg_replace('/^REG-0*/i', '', $search);
            $castExpr = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite'
                ? 'CAST(responses AS TEXT) LIKE ?'
                : 'CAST(responses AS CHAR) LIKE ?';
            $listQuery->where(function ($q) use ($search, $numericId, $castExpr) {
                $q->where('id', 'like', "%{$numericId}%")
                  ->orWhere('midtrans_order_id', 'like', "%{$search}%")
                  ->orWhereRaw($castExpr, ["%{$search}%"])
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        $registrations = $listQuery
            ->orderByRaw('CASE WHEN attended_at IS NULL THEN 1 ELSE 0 END')
            ->orderByDesc('attended_at')
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Attendance/Index', [
            'registrations' => $registrations,
            'agendas' => $agendas,
            'selectedAgenda' => $selectedAgenda,
            'stats' => [
                'total_approved' => $totalApproved,
                'total_present' => $totalPresent,
                'total_absent' => $totalAbsent,
                'percentage' => $totalApproved > 0 ? round(($totalPresent / $totalApproved) * 100) : 0,
            ],
            'filters' => [
                'agenda_id' => $agendaId ? (string) $agendaId : '',
                'attendance' => $request->input('attendance', ''),
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function checkIn(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255',
            'agenda_id' => 'nullable|integer',
        ]);

        $raw = trim($validated['code']);
        $ticketId = null;
        $providedSig = null;

        // Parse QR payload format: TICKET:REG-00001|SIG:abcdef123456
        if (preg_match('/TICKET:REG-0*(\d+)\|SIG:([a-f0-9]+)/i', $raw, $m)) {
            $ticketId = (int) $m[1];
            $providedSig = strtolower($m[2]);
        } elseif (preg_match('/REG-0*(\d+)/i', $raw, $m)) {
            $ticketId = (int) $m[1];
        } elseif (ctype_digit($raw)) {
            $ticketId = (int) $raw;
        }

        if (!$ticketId) {
            return response()->json([
                'success' => false,
                'status' => 'invalid_format',
                'message' => 'Format kode tiket tidak valid. Gunakan format REG-00001 atau scan QR E-Ticket.',
            ], 422);
        }

        $registration = AgendaRegistration::with(['agenda', 'user', 'checkedInBy'])->find($ticketId);

        if (!$registration) {
            return response()->json([
                'success' => false,
                'status' => 'not_found',
                'message' => "Tiket dengan kode {$raw} tidak ditemukan di sistem.",
            ], 404);
        }

        if ($providedSig && !hash_equals(strtolower($registration->getTicketSignature()), $providedSig)) {
            return response()->json([
                'success' => false,
                'status' => 'invalid_signature',
                'message' => 'Tanda tangan QR E-Ticket tidak valid atau telah dimodifikasi.',
            ], 403);
        }

        if (!empty($validated['agenda_id']) && (int) $registration->agenda_id !== (int) $validated['agenda_id']) {
            return response()->json([
                'success' => false,
                'status' => 'wrong_agenda',
                'message' => "Tiket {$registration->ticket_code} terdaftar untuk agenda \"{$registration->agenda?->title}\", bukan agenda yang sedang dipilih.",
            ], 422);
        }

        if ($registration->status !== 'approved') {
            return response()->json([
                'success' => false,
                'status' => 'not_approved',
                'message' => "Pendaftaran {$registration->ticket_code} ({$registration->getRegistrantName()}) berstatus " . strtoupper($registration->status) . " dan belum disetujui.",
            ], 422);
        }

        if ($registration->attended_at) {
            return response()->json([
                'success' => false,
                'status' => 'already_checked_in',
                'message' => "{$registration->getRegistrantName()} ({$registration->ticket_code}) sudah melakukan presensi pada " . $registration->attended_at->format('d/m/Y H:i') . '.',
                'registration' => [
                    'id' => $registration->id,
                    'ticket_code' => $registration->ticket_code,
                    'name' => $registration->getRegistrantName(),
                    'agenda' => $registration->agenda?->title,
                    'attended_at' => $registration->attended_at->format('d/m/Y H:i:s'),
                ],
            ], 200);
        }

        $registration->update([
            'attended_at' => now(),
            'checked_in_by' => $request->user()?->id,
        ]);

        return response()->json([
            'success' => true,
            'status' => 'checked_in',
            'message' => "Presensi berhasil dicatat untuk {$registration->getRegistrantName()} ({$registration->ticket_code}).",
            'registration' => [
                'id' => $registration->id,
                'ticket_code' => $registration->ticket_code,
                'name' => $registration->getRegistrantName(),
                'phone' => $registration->getRegistrantPhone(),
                'agenda' => $registration->agenda?->title,
                'attended_at' => $registration->attended_at->format('d/m/Y H:i:s'),
            ],
        ]);
    }

    public function toggleAgendaAttendance(Agenda $agenda)
    {
        $newState = !$agenda->is_attendance_open;
        $agenda->update(['is_attendance_open' => $newState]);

        $statusLabel = $newState ? 'DIBUKA' : 'DITUTUP';
        return back()->with('success', "Sesi presensi mandiri untuk \"{$agenda->title}\" berhasil {$statusLabel}.");
    }

    public function toggleAttendance(Request $request, $id)
    {
        $registration = AgendaRegistration::with('agenda')->findOrFail($id);

        if ($registration->status !== 'approved' && !$registration->attended_at) {
            return back()->with('error', 'Hanya pendaftar berstatus Approved yang dapat ditandai hadir.');
        }

        if ($registration->attended_at) {
            $registration->update([
                'attended_at' => null,
                'checked_in_by' => null,
            ]);

            return back()->with('success', "Status presensi {$registration->getRegistrantName()} ({$registration->ticket_code}) dibatalkan.");
        }

        $registration->update([
            'attended_at' => now(),
            'checked_in_by' => $request->user()?->id,
        ]);

        return back()->with('success', "{$registration->getRegistrantName()} ({$registration->ticket_code}) berhasil ditandai HADIR.");
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
