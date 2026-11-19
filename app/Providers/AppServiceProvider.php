<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Post;
use App\Models\Member;
use App\Models\Gallery;
use App\Models\Agenda;
use App\Models\AgendaRegistration;
use App\Models\Quote;
use App\Models\SiteSetting;
use App\Models\Article;
use App\Models\Statistic;
use App\Models\PageSetting;
use App\Observers\ContentObserver;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

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

        // Only resolve Blade view data when rendering the root HTML shell (not Inertia XHR requests)
        View::composer('app', function ($view) {
            try {
                $siteSetting = Cache::remember('site_setting_shared', 3600, fn () => SiteSetting::first());
            } catch (\Throwable $e) {
                $siteSetting = null;
            }

            $siteSetting ??= new SiteSetting([
                'site_name' => config('app.name', 'PKPT IPNU IPPNU'),
            ]);

            $view->with('siteSetting', $siteSetting);
            $view->with('storageUrl', fn (?string $path) => \App\Services\FileStorageService::url($path));
        });

        // Register Content Observers for Live Updates & Cache Invalidation
        Post::observe(ContentObserver::class);
        Member::observe(ContentObserver::class);
        Gallery::observe(ContentObserver::class);
        Agenda::observe(ContentObserver::class);
        AgendaRegistration::observe(ContentObserver::class);
        Quote::observe(ContentObserver::class);
        SiteSetting::observe(ContentObserver::class);
        Article::observe(ContentObserver::class);
        Statistic::observe(ContentObserver::class);
        PageSetting::observe(ContentObserver::class);
    }
}
