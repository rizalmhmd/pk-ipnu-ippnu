<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'title', 'slug', 'image', 'content', 'published_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->image);
    }

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
