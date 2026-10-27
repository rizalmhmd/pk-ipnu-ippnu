<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AgendaRegistration;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Mail\RegistrationRejectedMail;
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

        $registrations = $query->paginate(15)->withQueryString();
        
        // For filter dropdown
        $agendas = Agenda::whereHas('registrations')->select('id', 'title')->get();

        return Inertia::render('Admin/Registrations/Index', [
            'registrations' => $registrations,
            'agendas' => $agendas,
            'filters' => $request->only(['agenda_id', 'status']),
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
        if ($registration->payment_proof) {
            \Illuminate\Support\Facades\Storage::delete($registration->payment_proof);
        }

        $registration->delete();

        return back()->with('success', 'Pendaftar berhasil dihapus.');
    }
}
