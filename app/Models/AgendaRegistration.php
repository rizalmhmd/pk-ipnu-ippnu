<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgendaRegistration extends Model
{
    protected $fillable = [
        'agenda_id',
        'user_id',
        'responses',
        'status',
        'payment_proof',
        'payment_method',
    ];

    protected $casts = [
        'responses' => 'array',
    ];

    public function agenda()
    {
        return $this->belongsTo(Agenda::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
