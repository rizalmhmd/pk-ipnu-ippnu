<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin - Full access
        User::updateOrCreate(
            ['email' => 'admin@pkpt.org'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // Ketua - Agenda, Gallery, Members, Stats
        User::updateOrCreate(
            ['email' => 'ketua@pkpt.org'],
            [
                'name' => 'Ketua PKPT',
                'password' => Hash::make('ketua123'),
                'role' => 'ketua',
            ]
        );

        // Departemen - Quotes, Articles, News
        User::updateOrCreate(
            ['email' => 'departemen@pkpt.org'],
            [
                'name' => 'Ketua Departemen',
                'password' => Hash::make('dept123'),
                'role' => 'departemen',
            ]
        );
    }
}
