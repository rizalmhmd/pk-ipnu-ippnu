<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['title', 'image_path'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->image_path);
    }
}
