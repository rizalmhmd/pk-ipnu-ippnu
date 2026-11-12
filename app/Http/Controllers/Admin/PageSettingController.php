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

        $imageFields = [
            'hero_image' => 'hero-images',
            'header_bg_image' => 'header-images',
            'feature_image' => 'feature-images',
        ];

        foreach ($imageFields as $field => $directory) {
            if ($request->hasFile($field)) {
                \App\Services\FileStorageService::delete($pageSetting->{$field});
                $validated[$field] = \App\Services\FileStorageService::upload($request->file($field), $directory);
            } elseif ($request->boolean("remove_{$field}") || $request->input("remove_{$field}") == 'true') {
                \App\Services\FileStorageService::delete($pageSetting->{$field});
                $validated[$field] = null;
            } else {
                unset($validated[$field]);
            }
        }

        $pageSetting->update($validated);

        return redirect()->route('admin.page-settings.index')
            ->with('success', 'Pengaturan halaman berhasil diperbarui.');
    }
}
