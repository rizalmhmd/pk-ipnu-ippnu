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
            'feature_subtitle' => 'nullable|string',
            'feature_title' => 'nullable|string',
            'feature_description' => 'nullable|string',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'feature_button_text' => 'nullable|string',
            'feature_button_url' => 'nullable|string',
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
        } elseif ($request->remove_hero_image == 'true' || $request->remove_hero_image === true) {
            if ($pageSetting->hero_image) {
                try {
                    Storage::delete($pageSetting->hero_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            $validated['hero_image'] = null;
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
        } elseif ($request->remove_header_bg_image == 'true' || $request->remove_header_bg_image === true) {
            if ($pageSetting->header_bg_image) {
                try {
                    Storage::delete($pageSetting->header_bg_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            $validated['header_bg_image'] = null;
        }

        if ($request->hasFile('feature_image')) {
            if ($pageSetting->feature_image) {
                try {
                    Storage::delete($pageSetting->feature_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('feature-images', $request->file('feature_image'));
                $validated['feature_image'] = Storage::disk('cloudinary')->url($path);
            } else {
                $validated['feature_image'] = $request->file('feature_image')->store('feature-images', 'public');
            }
        } elseif ($request->remove_feature_image == 'true' || $request->remove_feature_image === true) {
            if ($pageSetting->feature_image) {
                try {
                    Storage::delete($pageSetting->feature_image);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
                }
            }
            $validated['feature_image'] = null;
        }

        $pageSetting->update($validated);

        return redirect()->route('admin.page-settings.index')
            ->with('success', 'Pengaturan halaman berhasil diperbarui.');
    }
}
