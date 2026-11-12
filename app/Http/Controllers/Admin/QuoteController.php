<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::orderBy('order')->get();
        return \Inertia\Inertia::render('Admin/Quotes/Index', compact('quotes'));
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Quotes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:200',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['order'] = (int) ($request->order ?? 0);
        $validated['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'quotes');
        }

        Quote::create($validated);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil ditambahkan');
    }

    public function edit(Quote $quote)
    {
        return \Inertia\Inertia::render('Admin/Quotes/Edit', compact('quote'));
    }

    public function update(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:200',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['order'] = (int) ($request->order ?? 0);
        $validated['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('image')) {
            \App\Services\FileStorageService::delete($quote->image);
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'quotes');
        } elseif ($request->boolean('remove_image') || $request->remove_image == 'true') {
            \App\Services\FileStorageService::delete($quote->image);
            $validated['image'] = null;
        } else {
            unset($validated['image']);
        }

        $quote->update($validated);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil diperbarui');
    }

    public function destroy(Quote $quote)
    {
        \App\Services\FileStorageService::delete($quote->image);
        $quote->delete();

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil dihapus');
    }
}
