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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($request->title) . '-' . time();
        $validated['published_at'] = now();

        if ($request->hasFile('image')) {
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'posts');
        }

        Post::create($validated);

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil ditambahkan');
    }

    public function edit(Post $post)
    {
        return \Inertia\Inertia::render('Admin/Posts/Edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->title !== $post->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . time();
        }

        if ($request->hasFile('image')) {
            \App\Services\FileStorageService::delete($post->image);
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'posts');
        } elseif ($request->boolean('remove_image') || $request->remove_image == 'true') {
            \App\Services\FileStorageService::delete($post->image);
            $validated['image'] = null;
        } else {
            unset($validated['image']);
        }

        $post->update($validated);

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil diperbarui');
    }

    public function destroy(Post $post)
    {
        \App\Services\FileStorageService::delete($post->image);
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Berita berhasil dihapus');
    }
}
