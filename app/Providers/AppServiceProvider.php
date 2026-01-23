<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('site_settings')) {
                $siteSetting = \App\Models\SiteSetting::first() ?? new \App\Models\SiteSetting([
                    'site_name' => config('app.name', 'PKPT IPNU IPPNU')
                ]);
                \Illuminate\Support\Facades\View::share('siteSetting', $siteSetting);
            }
        } catch (\Exception $e) {
            // Silently fail if table not migrated yet
        }
    }
}
