<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = ['user_id', 'name', 'position', 'photo', 'instagram', 'type', 'order'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        if (!$this->photo) {
            return null;
        }

        if (filter_var($this->photo, FILTER_VALIDATE_URL)) return $this->photo;
        
        try {
            return \Illuminate\Support\Facades\Storage::url($this->photo);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
