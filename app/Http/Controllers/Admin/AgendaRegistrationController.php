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
    public function index(Request $request)
    {
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

    public function destroy($id)
    {
        $registration = AgendaRegistration::findOrFail($id);
        
        // Delete payment proof if exists
        if ($registration->payment_proof && file_exists(public_path($registration->payment_proof))) {
            unlink(public_path($registration->payment_proof));
        }

        $registration->delete();

        return back()->with('success', 'Pendaftar berhasil dihapus.');
    }
}
