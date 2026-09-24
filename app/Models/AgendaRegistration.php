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
        'snap_token',
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

    /**
     * Get email address of the registrant.
     */
    public function getRegistrantEmail(): ?string
    {
        $schema = $this->agenda?->form_schema;
        if (is_array($schema) && is_array($this->responses)) {
            // First check by schema field with type 'email' or label containing 'email'
            foreach ($schema as $field) {
                $type = strtolower($field['type'] ?? '');
                $label = strtolower($field['label'] ?? '');
                if ($type === 'email' || str_contains($label, 'email')) {
                    $emailVal = $this->responses[$field['id']] ?? null;
                    if ($emailVal && filter_var($emailVal, FILTER_VALIDATE_EMAIL)) {
                        return trim($emailVal);
                    }
                }
            }

            // Secondary check across response values for a valid email string
            foreach ($this->responses as $val) {
                if (is_string($val) && filter_var(trim($val), FILTER_VALIDATE_EMAIL)) {
                    return trim($val);
                }
            }
        }

        // Fallback to linked user account if logged in
        if ($this->user && $this->user->email) {
            return $this->user->email;
        }

        return null;
    }

    /**
     * Get name of the registrant.
     */
    public function getRegistrantName(): string
    {
        $schema = $this->agenda?->form_schema;
        if (is_array($schema) && is_array($this->responses)) {
            foreach ($schema as $field) {
                $label = strtolower($field['label'] ?? '');
                if (str_contains($label, 'nama')) {
                    $val = $this->responses[$field['id']] ?? null;
                    if ($val && is_string($val)) {
                        return trim($val);
                    }
                }
            }

            $firstVal = reset($this->responses);
            if ($firstVal && is_string($firstVal)) {
                return trim($firstVal);
            }
        }

        if ($this->user && $this->user->name) {
            return $this->user->name;
        }

        return 'Peserta';
    }
}
