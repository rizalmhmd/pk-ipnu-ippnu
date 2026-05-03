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
    ];

    protected $casts = [
        'event_date' => 'date',
    ];
}
