<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['title', 'image_path'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) {
            return null;
        }

        if (filter_var($this->image_path, FILTER_VALIDATE_URL)) return $this->image_path;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->image_path);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
