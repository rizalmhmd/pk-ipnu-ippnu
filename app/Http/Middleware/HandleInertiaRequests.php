<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        $siteSetting = null;
        $activeQuotes = [];

        try {
            $siteSetting = Cache::remember('site_setting_shared', 3600, fn () => \App\Models\SiteSetting::first());
            $activeQuotes = Cache::remember('active_quotes_shared', 3600, fn () => \App\Models\Quote::where('is_active', true)->orderBy('order', 'asc')->get());
        } catch (\Throwable $e) {
            // Silently fallback if tables are not migrated yet
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id'         => $request->user()->id,
                    'name'       => $request->user()->name,
                    'email'      => $request->user()->email,
                    'role'       => $request->user()->role,
                    'role_label' => $request->user()->role_label,
                ] : null,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new \Tighten\Ziggy\Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'siteSetting' => $siteSetting,
            'activeQuotes' => $activeQuotes,
            'adminCounts' => function () use ($request) {
                if (!$request->user()) {
                    return null;
                }
                try {
                    return Cache::remember('admin_sidebar_counts', 300, fn () => [
                        'posts' => \App\Models\Post::count(),
                        'galleries' => \App\Models\Gallery::count(),
                        'members' => \App\Models\Member::count(),
                        'agendas' => \App\Models\Agenda::count(),
                    ]);
                } catch (\Throwable $e) {
                    return null;
                }
            },
            'adminNotifications' => function () use ($request) {
                if (!$request->user()) {
                    return [];
                }
                try {
                    return app(\App\Services\NotificationService::class)->getAdminNotifications($request->user());
                } catch (\Throwable $e) {
                    return [];
                }
            },
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
