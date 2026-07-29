<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AgendaRegistration;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaRegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = AgendaRegistration::with('agenda')->latest();

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
        ]);

        $registration = AgendaRegistration::findOrFail($id);
        $registration->update(['status' => $validated['status']]);

        return back()->with('success', 'Status pendaftar berhasil diperbarui.');
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
