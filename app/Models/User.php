<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    public function member()
    {
        return $this->hasOne(Member::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    // ─── Role helpers ─────────────────────────────────────────────────────────

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isKetua(): bool
    {
        return $this->role === 'ketua';
    }

    public function isDepartemen(): bool
    {
        return $this->role === 'departemen';
    }

    /**
     * Check if user has any of the given roles.
     */
    public function hasRole(string|array $roles): bool
    {
        return in_array($this->role, (array) $roles);
    }

    /**
     * Role label for display purposes.
     */
    public function getRoleLabelAttribute(): string
    {
        return match ($this->role) {
            'admin'      => 'Administrator',
            'ketua'      => 'Ketua IPNU/IPPNU',
            'departemen' => 'Ketua Departemen',
            default      => 'Unknown',
        };
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }
}
