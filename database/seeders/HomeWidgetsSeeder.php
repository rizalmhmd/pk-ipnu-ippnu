<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PageSetting;

class HomeWidgetsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $widgets = [
            [
                'page_name' => 'home_greeting',
                'hero_title' => 'Sambutan Ketua',
                'hero_description' => '"Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua."',
            ],
            [
                'page_name' => 'home_agenda',
                'hero_title' => 'Agenda Terdekat',
                'hero_description' => "Rapat Koordinasi - 25 Jan 2026\nPelatihan Kader - 02 Feb 2026",
            ],
        ];

        foreach ($widgets as $widget) {
            PageSetting::updateOrCreate(
                ['page_name' => $widget['page_name']],
                $widget
            );
        }
    }
}
