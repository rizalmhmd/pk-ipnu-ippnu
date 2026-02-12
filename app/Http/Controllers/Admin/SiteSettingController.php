<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function edit()
    {
        $setting = SiteSetting::firstOrCreate(['id' => 1]);
        return \Inertia\Inertia::render('Admin/Settings/Site', compact('setting'));
    }

    public function update(Request $request)
    {
        $setting = SiteSetting::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'favicon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,ico|max:1024',
            'meta_description' => 'nullable|string',
            'footer_description' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'instagram' => 'nullable|string',
            'facebook' => 'nullable|string',
            'twitter' => 'nullable|string',
            'youtube' => 'nullable|string',
            'copyright_text' => 'nullable|string',
            'home_news_title' => 'required|string|max:255',
            'home_agenda_title' => 'required|string|max:255',
            'default_hero_title' => 'nullable|string|max:255',
            'default_hero_subtitle' => 'nullable|string',
            'default_hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        if ($request->hasFile('site_logo')) {
            if ($setting->site_logo) {
                try {
                    Storage::delete($setting->site_logo);
                } catch (\Exception $e) {
                    // Ignore if not found on cloud
                }
            }
            $validated['site_logo'] = $request->file('site_logo')->store('site', 'public');
        }

        if ($request->hasFile('favicon')) {
            if ($setting->favicon) {
                try {
                    Storage::delete($setting->favicon);
                } catch (\Exception $e) {
                    // Ignore if not found on cloud
                }
            }
            $validated['favicon'] = $request->file('favicon')->store('site', 'public');
        }

        if ($request->hasFile('default_hero_image')) {
            if ($setting->default_hero_image) {
                try {
                    Storage::delete($setting->default_hero_image);
                } catch (\Exception $e) {
                    // Ignore if not found on cloud
                }
            }
            $validated['default_hero_image'] = $request->file('default_hero_image')->store('site', 'public');
        }

        $setting->update($validated);

        return redirect()->back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }
}
