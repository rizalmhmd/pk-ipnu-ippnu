<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Posts/Index', compact('posts'));
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title) . '-' . time();
        $data['published_at'] = now();

        if ($request->hasFile('image')) {
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('posts', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('posts', 'public');
            }
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil ditambahkan');
    }

    public function edit(Post $post)
    {
        return \Inertia\Inertia::render('Admin/Posts/Edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $data = $request->all();
        
        if ($request->title !== $post->title) {
            $data['slug'] = Str::slug($request->title) . '-' . time();
        } else {
            unset($data['slug']);
        }

        if ($request->hasFile('image')) {
            if ($post->image) {
                try {
                    Storage::delete($post->image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('posts', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('posts', 'public');
            }
        }

        $post->update($data);

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil diperbarui');
    }

    public function destroy(Post $post)
    {
        if ($post->image) {
            try {
                Storage::delete($post->image);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
            }
        }
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil dihapus');
    }
}
