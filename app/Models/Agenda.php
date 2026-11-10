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
        'max_participants',
        'registration_fee',
        'payment_account',
        'form_schema',
        'image'
    ];

    protected $appends = ['image_url', 'remaining_quota', 'is_quota_full', 'total_registered'];

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

    public function getTotalRegisteredAttribute(): int
    {
        // Hitung peserta yang statusnya approved atau pending
        if ($this->relationLoaded('registrations')) {
            return $this->registrations->whereIn('status', ['approved', 'pending'])->count();
        }

        return $this->registrations()->whereIn('status', ['approved', 'pending'])->count();
    }

    public function getRemainingQuotaAttribute(): ?int
    {
        if (!$this->max_participants || $this->max_participants <= 0) {
            return null; // Kuota tidak dibatasi
        }

        $remaining = (int) $this->max_participants - $this->total_registered;
        return max(0, $remaining);
    }

    public function getIsQuotaFullAttribute(): bool
    {
        if (!$this->max_participants || $this->max_participants <= 0) {
            return false;
        }

        return $this->total_registered >= (int) $this->max_participants;
    }

    protected $casts = [
        'event_date' => 'date:Y-m-d',
        'is_registration_open' => 'boolean',
        'max_participants' => 'integer',
        'form_schema' => 'array',
    ];

    public function registrations()
    {
        return $this->hasMany(AgendaRegistration::class);
    }
}
