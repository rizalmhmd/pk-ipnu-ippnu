<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name',
        'site_logo',
        'favicon',
        'meta_description',
        'footer_description',
        'address',
        'email',
        'phone',
        'instagram',
        'facebook',
        'twitter',
        'youtube',
        'copyright_text',
        'home_news_title',
        'home_agenda_title',
        'default_hero_title',
        'default_hero_subtitle',
        'default_hero_image',
    ];

    protected $appends = ['site_logo_url', 'favicon_url', 'default_hero_image_url'];

    public function getSiteLogoUrlAttribute()
    {
        if (!$this->site_logo) return null;
        if (filter_var($this->site_logo, FILTER_VALIDATE_URL)) return $this->site_logo;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->site_logo);
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function getFaviconUrlAttribute()
    {
        if (!$this->favicon) return null;
        if (filter_var($this->favicon, FILTER_VALIDATE_URL)) return $this->favicon;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->favicon);
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function getDefaultHeroImageUrlAttribute()
    {
        if (!$this->default_hero_image) return null;
        if (filter_var($this->default_hero_image, FILTER_VALIDATE_URL)) return $this->default_hero_image;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->default_hero_image);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
