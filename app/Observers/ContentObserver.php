<?php

namespace App\Observers;

use App\Events\ContentUpdated;

class ContentObserver
{
    public function created($model): void
    {
        $this->broadcast($model, 'created');
    }

    public function updated($model): void
    {
        $this->broadcast($model, 'updated');
    }

    public function deleted($model): void
    {
        $this->broadcast($model, 'deleted');
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
