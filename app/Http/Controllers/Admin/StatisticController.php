<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statistics = \App\Models\Statistic::ordered()->get();
        return inertia('Admin/Statistics/Index', [
            'statistics' => $statistics
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Statistics/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'icon' => 'required|string|max:50',
            'color' => 'required|string|in:emerald,blue,amber,red,purple,pink,indigo,cyan,teal,orange',
            'order' => 'integer',
            'is_active' => 'boolean'
        ]);

        \App\Models\Statistic::create($validated);

        return redirect()->route('admin.statistics.index')->with('success', 'Statistik berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $statistic = \App\Models\Statistic::findOrFail($id);
        return inertia('Admin/Statistics/Edit', [
            'statistic' => $statistic
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $statistic = \App\Models\Statistic::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'icon' => 'required|string|max:50',
            'color' => 'required|string|in:emerald,blue,amber,red,purple,pink,indigo,cyan,teal,orange',
            'order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $statistic->update($validated);

        return redirect()->route('admin.statistics.index')->with('success', 'Statistik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $statistic = \App\Models\Statistic::findOrFail($id);
        $statistic->delete();

        return redirect()->route('admin.statistics.index')->with('success', 'Statistik berhasil dihapus.');
    }
}
