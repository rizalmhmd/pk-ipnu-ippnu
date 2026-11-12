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
        return \App\Services\FileStorageService::url($this->site_logo);
    }

    public function getFaviconUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->favicon);
    }

    public function getDefaultHeroImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->default_hero_image);
    }
}
