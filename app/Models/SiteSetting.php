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
}
