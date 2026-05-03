<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'image', 'content', 'published_at'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        try {
            return \Illuminate\Support\Facades\Storage::url($this->image);
        } catch (\Throwable $e) {
            return null;
        }
    }

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
