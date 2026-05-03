<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'page_name' => 'home',
                'hero_title' => 'Selamat Datang di PKPT IPNU IPPNU',
                'hero_description' => 'Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa',
            ],
            [
                'page_name' => 'profile',
                'hero_title' => 'Profil Organisasi',
                'hero_description' => 'Sejarah, Visi, Misi, dan Struktur Organisasi',
            ],
            [
                'page_name' => 'news',
                'hero_title' => 'Berita & Artikel',
                'hero_description' => 'Informasi terkini kegiatan dan opini kader',
            ],
            [
                'page_name' => 'gallery',
                'hero_title' => 'Galeri Kegiatan',
                'hero_description' => 'Dokumentasi visual perjalanan organisasi kami',
            ],
        ];

        foreach ($pages as $page) {
            \App\Models\PageSetting::updateOrCreate(
                ['page_name' => $page['page_name']],
                $page
            );
        }
    }
}
