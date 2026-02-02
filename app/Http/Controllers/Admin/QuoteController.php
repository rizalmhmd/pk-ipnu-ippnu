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
        return view('admin.quotes.index', compact('quotes'));
    }

    public function create()
    {
        return view('admin.quotes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->all();
        $data['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('quotes');
        }

        Quote::create($data);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil ditambahkan');
    }

    public function edit(Quote $quote)
    {
        return view('admin.quotes.edit', compact('quote'));
    }

    public function update(Request $request, Quote $quote)
    {
        $request->validate([
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->all();
        $data['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($quote->image) {
                try {
                    Storage::delete($quote->image);
                } catch (\Exception $e) {
                    // Ignore
                }
            }
            $data['image'] = $request->file('image')->store('quotes');
        }

        $quote->update($data);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil diperbarui');
    }

    public function destroy(Quote $quote)
    {
        if ($quote->image) {
            try {
                Storage::delete($quote->image);
            } catch (\Exception $e) {
                // Ignore
            }
        }
        $quote->delete();

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil dihapus');
    }
}
