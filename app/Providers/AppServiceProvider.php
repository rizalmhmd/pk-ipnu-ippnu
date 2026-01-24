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

            // Share counts for Admin Sidebar
            if (request()->is('admin*')) {
                $counts = [
                    'posts' => \Illuminate\Support\Facades\Schema::hasTable('posts') ? \App\Models\Post::count() : 0,
                    'galleries' => \Illuminate\Support\Facades\Schema::hasTable('galleries') ? \App\Models\Gallery::count() : 0,
                    'members' => \Illuminate\Support\Facades\Schema::hasTable('members') ? \App\Models\Member::count() : 0,
                    'agendas' => \Illuminate\Support\Facades\Schema::hasTable('agendas') ? \App\Models\Agenda::count() : 0,
                ];
                \Illuminate\Support\Facades\View::share('adminCounts', (object)$counts);
            }

            // Share dynamic storage path helper for shared hosting compatibility
            \Illuminate\Support\Facades\View::share('storageUrl', function($path) {
                if (!$path) return null;
                // If it's already a full URL, return it
                if (filter_var($path, FILTER_VALIDATE_URL)) return $path;
                
                $root = request()->getSchemeAndHttpHost();
                
                // Detection for the specific ProFreeHost structure (project inside htdocs/web-pkpt)
                // If index.php is one level above base_path root, we are nested
                if (file_exists(base_path('../index.php'))) {
                     return $root . '/web-pkpt/storage/app/public/' . $path;
                }

                return $root . '/storage/' . $path;
            });
        } catch (\Exception $e) {
            // Silently fail if table not migrated yet
        }
    }
}
