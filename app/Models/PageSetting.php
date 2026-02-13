<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSetting extends Model
{
    protected $fillable = [
        'page_name',
        'hero_title',
        'hero_description',
        'hero_image',
        'header_bg_color',
        'header_text_color',
        'header_bg_image',
        'content_sejarah',
        'content_visi_misi',
    ];

    protected $appends = ['hero_image_url', 'header_bg_image_url'];

    public function getHeroImageUrlAttribute()
    {
        if (!$this->hero_image) return null;
        if (filter_var($this->hero_image, FILTER_VALIDATE_URL)) return $this->hero_image;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->hero_image);
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function getHeaderBgImageUrlAttribute()
    {
        if (!$this->header_bg_image) return null;
        if (filter_var($this->header_bg_image, FILTER_VALIDATE_URL)) return $this->header_bg_image;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->header_bg_image);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
