<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Post;
use App\Models\Member;
use App\Models\Gallery;
use App\Models\Agenda;
use App\Models\Quote;
use App\Models\SiteSetting;
use App\Models\Article;
use App\Models\Statistic;
use App\Observers\ContentObserver;

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
        if (config('app.env') === 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        try {
            // Fetch Site Settings
            $siteSetting = \App\Models\SiteSetting::first() ?? new \App\Models\SiteSetting([
                'site_name' => config('app.name', 'PKPT IPNU IPPNU')
            ]);
            \Illuminate\Support\Facades\View::share('siteSetting', $siteSetting);

            // Fetch Quotes
            $quotes = \App\Models\Quote::where('is_active', true)->orderBy('order')->get();
            \Illuminate\Support\Facades\View::share('quotes', $quotes);

            // Share counts for Admin Sidebar
            if (request()->is('admin*')) {
                $counts = [
                    'posts' => \App\Models\Post::count(),
                    'galleries' => \App\Models\Gallery::count(),
                    'members' => \App\Models\Member::count(),
                    'agendas' => \App\Models\Agenda::count(),
                ];
                \Illuminate\Support\Facades\View::share('adminCounts', (object)$counts);
            }

            // Share dynamic storage path helper for shared hosting compatibility
            \Illuminate\Support\Facades\View::share('storageUrl', function($path) {
                if (!$path) return null;
                // If it's already a full URL, return it
                if (filter_var($path, FILTER_VALIDATE_URL)) return $path;
                
                // If using Cloudinary or other cloud disks
                if (config('filesystems.default') !== 'local' && config('filesystems.default') !== 'public') {
                    try {
                        return \Illuminate\Support\Facades\Storage::url($path);
                    } catch (\Exception $e) {
                        // Fallback to local storage if not found on cloud
                        $root = request()->getSchemeAndHttpHost();
                        if (file_exists(base_path('../index.php'))) {
                             return $root . '/web-pkpt/storage/app/public/' . $path;
                        }
                        return $root . '/storage/' . $path;
                    }
                }

                $root = request()->getSchemeAndHttpHost();
                
                // Detection for the specific ProFreeHost structure (project inside htdocs/web-pkpt)
                // If index.php is one level above base_path root, we are nested
                if (file_exists(base_path('../index.php'))) {
                     return $root . '/web-pkpt/storage/app/public/' . $path;
                }

                return $root . '/storage/' . $path;
            });
            // Register Content Observers for Live Updates
            Post::observe(ContentObserver::class);
            Member::observe(ContentObserver::class);
            Gallery::observe(ContentObserver::class);
            Agenda::observe(ContentObserver::class);
            Quote::observe(ContentObserver::class);
            SiteSetting::observe(ContentObserver::class);
            Article::observe(ContentObserver::class);
            Statistic::observe(ContentObserver::class);

        } catch (\Exception $e) {
            // Silently fail if table not migrated yet
        }
    }
}
