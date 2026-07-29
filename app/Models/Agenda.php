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
