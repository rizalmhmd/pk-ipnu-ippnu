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
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $imagePath = \App\Services\FileStorageService::upload($request->file('image'), 'galleries');

        Gallery::create([
            'title' => $request->title,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil ditambahkan ke galeri');
    }

    public function destroy(Gallery $gallery)
    {
        \App\Services\FileStorageService::delete($gallery->image_path);
        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('success', 'Foto berhasil dihapus dari galeri');
    }
}
