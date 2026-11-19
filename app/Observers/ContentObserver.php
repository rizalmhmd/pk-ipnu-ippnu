<?php

namespace App\Observers;

use App\Events\ContentUpdated;
use Illuminate\Support\Facades\Cache;

class ContentObserver
{
    public function created($model): void
    {
        $this->clearSharedCaches($model);
        $this->broadcast($model, 'created');
    }

    public function updated($model): void
    {
        $this->clearSharedCaches($model);
        $this->broadcast($model, 'updated');
    }

    public function deleted($model): void
    {
        $this->clearSharedCaches($model);
        $this->broadcast($model, 'deleted');
    }

    protected function clearSharedCaches($model = null): void
    {
        Cache::forget('site_setting_shared');
        Cache::forget('active_quotes_shared');
        Cache::forget('admin_sidebar_counts');

        Cache::forget('welcome_posts_4');
        Cache::forget('welcome_articles_4');
        Cache::forget('welcome_agendas_5');
        Cache::forget('public_statistics');
        Cache::forget('public_members');
        Cache::forget('public_agendas_list');
        Cache::forget('public_today_agendas');
        Cache::forget('public_kegiatans_list');

        foreach (['home', 'home_greeting', 'profile', 'news', 'articles', 'gallery', 'agenda'] as $pageName) {
            Cache::forget("page_setting_{$pageName}");
        }

        for ($p = 1; $p <= 5; $p++) {
            Cache::forget("public_news_page_{$p}");
            Cache::forget("public_articles_page_{$p}");
            Cache::forget("public_galleries_page_{$p}");
        }

        if ($model && !empty($model->slug)) {
            Cache::forget("public_news_detail_{$model->slug}");
            Cache::forget("public_article_detail_{$model->slug}");
        }
    }

    protected function broadcast($model, $action): void
    {
        try {
            $type = strtolower(class_basename($model));
            \Illuminate\Support\Facades\Log::info("Broadcasting content update: {$type} {$action}");
            broadcast(new ContentUpdated($type, $action));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning("Broadcasting failed: " . $e->getMessage());
        }
    }
}
