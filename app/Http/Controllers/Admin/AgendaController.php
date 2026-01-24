<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Agenda;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agendas = Agenda::latest('event_date')->paginate(10);
        return view('admin.agendas.index', compact('agendas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.agendas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:nasional,organisasi,keagamaan,khusus',
            'event_date' => 'required|date',
            'event_time' => 'nullable',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        Agenda::create($validated);

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agenda $agenda)
    {
        return view('admin.agendas.edit', compact('agenda'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agenda $agenda)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:nasional,organisasi,keagamaan,khusus',
            'event_date' => 'required|date',
            'event_time' => 'nullable',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $agenda->update($validated);

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agenda $agenda)
    {
        $agenda->delete();

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil dihapus.');
    }
}
