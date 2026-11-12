<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = ['user_id', 'name', 'position', 'photo', 'instagram', 'type', 'order', 'level', 'department'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        return \App\Services\FileStorageService::url($this->photo);
    }
}
