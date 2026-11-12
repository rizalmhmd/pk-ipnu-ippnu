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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($request->title) . '-' . time();
        $validated['published_at'] = now();

        if ($request->hasFile('image')) {
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'articles');
        }

        Article::create($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil ditambahkan');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->title !== $article->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . time();
        }

        if ($request->hasFile('image')) {
            \App\Services\FileStorageService::delete($article->image);
            $validated['image'] = \App\Services\FileStorageService::upload($request->file('image'), 'articles');
        } elseif ($request->boolean('remove_image') || $request->remove_image == 'true') {
            \App\Services\FileStorageService::delete($article->image);
            $validated['image'] = null;
        } else {
            unset($validated['image']);
        }

        $article->update($validated);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui');
    }

    public function destroy(Article $article)
    {
        \App\Services\FileStorageService::delete($article->image);
        $article->delete();

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus');
    }
}
