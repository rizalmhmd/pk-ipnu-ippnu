<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            [
                'title' => 'PENDAPATAN (2024)',
                'subtitle' => 'Miliar',
                'value' => 'USD 75,33',
                'unit' => null,
                'description' => 'Jumlah pendapatan yang dicapai Pertamina pada tahun 2024.',
                'icon' => 'fa-chart-line',
                'color' => 'emerald',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'TOTAL LABA (2024)',
                'subtitle' => 'Miliar',
                'value' => 'USD 3,13',
                'unit' => null,
                'description' => 'Jumlah Perolehan Laba Tahun 2024.',
                'icon' => 'fa-money-bill-trend-up',
                'color' => 'blue',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'ESG PERTAMINA',
                'subtitle' => '(Medium Risk)',
                'value' => '23,1',
                'unit' => null,
                'description' => 'ESG Risk Rating.',
                'icon' => 'fa-leaf',
                'color' => 'amber',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($statistics as $stat) {
            Statistic::create($stat);
        }
    }
}
