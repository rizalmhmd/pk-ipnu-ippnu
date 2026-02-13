<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->paginate(12);
        return \Inertia\Inertia::render('Admin/Galleries/Index', compact('galleries'));
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Galleries/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
            $path = Storage::disk('cloudinary')->putFile('galleries', $request->file('image'));
            $imagePath = Storage::disk('cloudinary')->url($path);
        } else {
            $imagePath = $request->file('image')->store('galleries', 'public');
        }

        Gallery::create([
            'title' => $request->title,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil ditambahkan ke galeri');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image_path) {
            try {
                \Illuminate\Support\Facades\Storage::delete($gallery->image_path);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
            }
        }
        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil dihapus dari galeri');
    }
}
