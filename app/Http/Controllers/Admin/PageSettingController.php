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
        return view('admin.page_settings.index', compact('settings'));
    }

    public function edit(PageSetting $pageSetting)
    {
        return view('admin.page_settings.edit', compact('pageSetting'));
    }

    public function update(Request $request, PageSetting $pageSetting)
    {
        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content_sejarah' => 'nullable|string',
            'content_visi_misi' => 'nullable|string',
        ]);

        if ($request->hasFile('hero_image')) {
            if ($pageSetting->hero_image) {
                Storage::disk('public')->delete($pageSetting->hero_image);
            }
            $validated['hero_image'] = $request->file('hero_image')->store('hero-images', 'public');
        }

        $pageSetting->update($validated);

        return redirect()->route('admin.page-settings.index')
            ->with('success', 'Pengaturan halaman berhasil diperbarui.');
    }
}
