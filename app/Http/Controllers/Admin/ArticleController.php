<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->paginate(10);
        return Inertia::render('Admin/Articles/Index', compact('articles'));
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create');
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
                $path = Storage::disk('cloudinary')->putFile('articles', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('articles', 'public');
            }
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil ditambahkan');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $data = $request->all();
        
        if ($request->title !== $article->title) {
            $data['slug'] = Str::slug($request->title) . '-' . time();
        } else {
            unset($data['slug']);
        }

        if ($request->hasFile('image')) {
            if ($article->image) {
                try {
                    Storage::delete($article->image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Storage delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('articles', $request->file('image'));
                $data['image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['image'] = $request->file('image')->store('articles', 'public');
            }
        } elseif ($request->remove_image == 'true' || $request->remove_image === true) {
            if ($article->image) {
                try {
                    Storage::delete($article->image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Storage delete failed: " . $e->getMessage());
                }
            }
            $data['image'] = null;
        } else {
            unset($data['image']);
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui');
    }

    public function destroy(Article $article)
    {
        if ($article->image) {
            try {
                Storage::delete($article->image);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning("Storage delete failed: " . $e->getMessage());
            }
        }
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus');
    }
}
