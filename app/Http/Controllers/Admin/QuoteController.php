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
        $request->validate([
            'content' => 'required|string|max:200',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->all();
        $data['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('quotes', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('quotes', 'public');
            }
        }

        Quote::create($data);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil ditambahkan');
    }

    public function edit(Quote $quote)
    {
        return \Inertia\Inertia::render('Admin/Quotes/Edit', compact('quote'));
    }

    public function update(Request $request, Quote $quote)
    {
        $request->validate([
            'content' => 'required|string|max:200',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $data = $request->except(['image']);
        $data['is_active'] = $request->has('is_active');

        if ($request->hasFile('image')) {
            if ($quote->image) {
                try {
                    Storage::delete($quote->image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('quotes', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('quotes', 'public');
            }
        }

        $quote->update($data);

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil diperbarui');
    }

    public function destroy(Quote $quote)
    {
        if ($quote->image) {
            try {
                Storage::delete($quote->image);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
            }
        }
        $quote->delete();

        return redirect()->route('admin.quotes.index')->with('success', 'Kutipan berhasil dihapus');
    }
}
