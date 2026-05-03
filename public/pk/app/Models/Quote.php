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
}
