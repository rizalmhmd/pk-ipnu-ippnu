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
        return \App\Services\FileStorageService::url($this->feature_image);
    }

    public function getHeroImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->hero_image);
    }

    public function getHeaderBgImageUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->header_bg_image);
    }
}
