<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PageSetting;
use Illuminate\Support\Facades\Storage;

class PageSettingController extends Controller
{
    public function index()
    {
        $settings = PageSetting::all();
        return \Inertia\Inertia::render('Admin/Settings/Pages/Index', compact('settings'));
    }

    public function edit(PageSetting $pageSetting)
    {
        return \Inertia\Inertia::render('Admin/Settings/Pages/Edit', compact('pageSetting'));
    }

    public function update(Request $request, PageSetting $pageSetting)
    {
        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'header_bg_color' => 'nullable|string',
            'header_text_color' => 'nullable|string',
            'header_bg_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'content_sejarah' => 'nullable|string',
            'content_visi_misi' => 'nullable|string',
        ]);

        if ($request->hasFile('hero_image')) {
            if ($pageSetting->hero_image) {
                try {
                    Storage::delete($pageSetting->hero_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('hero-images', $request->file('hero_image'));
                $validated['hero_image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $validated['hero_image'] = $request->file('hero_image')->store('hero-images', 'public');
            }
        }

        if ($request->hasFile('header_bg_image')) {
            if ($pageSetting->header_bg_image) {
                try {
                    Storage::delete($pageSetting->header_bg_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary') {
                $path = Storage::disk('cloudinary')->putFile('header-images', $request->file('header_bg_image'));
                $validated['header_bg_image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $validated['header_bg_image'] = $request->file('header_bg_image')->store('header-images', 'public');
            }
        }

        $pageSetting->update($validated);

        return redirect()->route('admin.page-settings.index')
            ->with('success', 'Pengaturan halaman berhasil diperbarui.');
    }
}
