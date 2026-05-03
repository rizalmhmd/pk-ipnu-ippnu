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
        'feature_subtitle',
        'feature_title',
        'feature_description',
        'feature_image',
        'feature_button_text',
        'feature_button_url',
    ];

    protected $appends = ['hero_image_url', 'header_bg_image_url', 'feature_image_url'];

    public function getFeatureImageUrlAttribute()
    {
        if (!$this->feature_image) return null;
        if (filter_var($this->feature_image, FILTER_VALIDATE_URL)) return $this->feature_image;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->feature_image);
        } catch (\Throwable $e) {
            return null;
        }
    }

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
