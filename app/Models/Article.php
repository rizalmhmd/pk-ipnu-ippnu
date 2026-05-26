<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    protected $fillable = ['user_id', 'title', 'slug', 'image', 'content', 'published_at', 'author'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
            return Storage::url($this->image);
        } catch (\Throwable $e) {
            return null;
        }
    }

    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (!$article->slug) {
                $article->slug = Str::slug($article->title) . '-' . time();
            }
            if (!$article->published_at) {
                $article->published_at = now();
            }
        });
    }
}
