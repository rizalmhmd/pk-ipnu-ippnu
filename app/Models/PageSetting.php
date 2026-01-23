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
        'content_sejarah',
        'content_visi_misi',
    ];
}
