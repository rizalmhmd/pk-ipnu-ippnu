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
        return \App\Services\FileStorageService::url($this->image);
    }

    public function scopeWithActiveRegistrationCount($query)
    {
        return $query->withCount([
            'registrations as active_registrations_count' => fn ($q) => $q->whereIn('status', ['approved', 'pending']),
        ]);
    }

    public function getTotalRegisteredAttribute(): int
    {
        if (array_key_exists('active_registrations_count', $this->attributes)) {
            return (int) $this->attributes['active_registrations_count'];
        }

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
