<?php

namespace App\Observers;

use App\Events\ContentUpdated;
use Illuminate\Support\Facades\Cache;

class ContentObserver
{
    public function created($model): void
    {
        $this->clearSharedCaches();
        $this->broadcast($model, 'created');
    }

    public function updated($model): void
    {
        $this->clearSharedCaches();
        $this->broadcast($model, 'updated');
    }

    public function deleted($model): void
    {
        $this->clearSharedCaches();
        $this->broadcast($model, 'deleted');
    }

    protected function clearSharedCaches(): void
    {
        Cache::forget('site_setting_shared');
        Cache::forget('active_quotes_shared');
        Cache::forget('admin_sidebar_counts');
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
