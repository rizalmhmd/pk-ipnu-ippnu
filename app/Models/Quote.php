<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'content',
        'author',
        'image',
        'order',
        'is_active',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->image);
    }
}
