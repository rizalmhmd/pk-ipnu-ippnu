<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'event_date',
        'event_time',
        'location',
        'is_registration_open',
        'registration_fee',
        'payment_account',
        'form_schema',
        'image'
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

        // Cek apakah berkas ada di folder public lokal
        if (file_exists(public_path($this->image))) {
            return asset($this->image);
        }

        try {
            return \Illuminate\Support\Facades\Storage::url($this->image);
        } catch (\Throwable $e) {
            return '/' . ltrim($this->image, '/');
        }
    }

    protected $casts = [
        'event_date' => 'date:Y-m-d',
        'is_registration_open' => 'boolean',
        'form_schema' => 'array',
    ];

    public function registrations()
    {
        return $this->hasMany(AgendaRegistration::class);
    }
}
