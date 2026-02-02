<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Gallery;
use App\Models\Member;
use Illuminate\Http\Request;

use App\Models\PageSetting;
use App\Models\Agenda;
use App\Models\Quote;

class PublicController extends Controller
{

    public function index()
    {
        $posts = Post::latest()->take(2)->get();
        $pageSetting = PageSetting::where('page_name', 'home')->first();
        $greeting = PageSetting::where('page_name', 'home_greeting')->first();
        
        // Fetch upcoming agendas
        $agendas = Agenda::where('event_date', '>=', now()->toDateString())
                        ->orderBy('event_date', 'asc')
                        ->take(5)
                        ->get();
        
        return view('public.home', compact('posts', 'pageSetting', 'greeting', 'agendas'));
    }

    public function profile()
    {
        $members = Member::all();
        $pageSetting = PageSetting::where('page_name', 'profile')->first();
        return view('public.profile', compact('members', 'pageSetting'));
    }

    public function news()
    {
        $posts = Post::latest()->paginate(10);
        $pageSetting = PageSetting::where('page_name', 'news')->first();
        return view('public.news.index', compact('posts', 'pageSetting'));
    }

    public function newsDetail($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        // News detail might not have a specific page setting, or could reuse 'news' setting
        return view('public.news.show', compact('post'));
    }

    public function gallery()
    {
        $galleries = Gallery::latest()->paginate(12);
        $pageSetting = PageSetting::where('page_name', 'gallery')->first();
        return view('public.gallery', compact('galleries', 'pageSetting'));
    }

    public function agenda()
    {
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        return view('public.agenda.index', compact('pageSetting'));
    }

    public function getAgendasJson()
    {
        $agendas = Agenda::all();
        
        $dbEvents = $agendas->map(function($agenda) {
            $category = $agenda->category ?? 'organisasi';
            
            // Refined luxury palette
            $colors = [
                'nasional' => '#e11d48',    // Sophisticated Red
                'organisasi' => '#059669',  // PKPT Emerald Green
                'keagamaan' => '#2563eb',   // PKPT Royal Blue
                'khusus' => '#d97706',      // Golden Amber
            ];

            return [
                'id' => 'db-' . $agenda->id,
                'title' => $agenda->title,
                'category' => $category,
                'start' => $agenda->event_date->toDateString(),
                'time' => $agenda->event_time ? \Carbon\Carbon::parse($agenda->event_time)->format('H:i') : null,
                'description' => $agenda->description,
                'location' => $agenda->location,
                'isAgenda' => true, // Flag for database events
                'status' => 'Aktif',
                'allDay' => true,
                'color' => $colors[$category] ?? '#059669',
            ];
        });

        // Add Auto-generated National Holidays for 2025-2026 (Baseline)
        $nationalHolidays = [
            // ===================== 2025 =====================
            ['title' => 'Tahun Baru 2025', 'date' => '2025-01-01', 'cat' => 'nasional', 'desc' => 'Perayaan pergantian tahun baru Masehi 2025. Hari libur nasional untuk merayakan awal tahun dengan penuh harapan dan semangat baru.'],
            ['title' => 'Isra Mikraj 1446 H', 'date' => '2025-01-27', 'cat' => 'keagamaan', 'desc' => 'Peringatan perjalanan spiritual Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsa dan naik ke langit (Mi\'raj) untuk menerima perintah shalat lima waktu.'],
            ['title' => 'Tahun Baru Imlek 2576', 'date' => '2025-01-29', 'cat' => 'keagamaan', 'desc' => 'Perayaan tahun baru berdasarkan kalender lunar Tionghoa. Tahun 2576 Kongzili, saatnya berkumpul bersama keluarga dan merayakan tradisi budaya Tionghoa.'],
            ['title' => 'Hari Raya Nyepi 1947', 'date' => '2025-03-29', 'cat' => 'keagamaan', 'desc' => 'Tahun Baru Saka (Caka) umat Hindu Bali. Hari ini diisi dengan Catur Brata Penyepian: tidak menyalakan api/lampu, tidak bekerja, tidak bepergian, dan berpuasa.'],
            ['title' => 'Idul Fitri 1446 H (Hari 1)', 'date' => '2025-03-31', 'cat' => 'keagamaan', 'desc' => 'Hari Raya Idul Fitri menandai berakhirnya bulan Ramadhan. Umat Islam merayakan dengan sholat Id, silaturahmi, dan saling memaafkan.'],
            ['title' => 'Idul Fitri 1446 H (Hari 2)', 'date' => '2025-04-01', 'cat' => 'keagamaan', 'desc' => 'Hari kedua perayaan Idul Fitri. Waktu untuk melanjutkan silaturahmi dan berkunjung ke sanak saudara.'],
            ['title' => 'Wafat Yesus Kristus', 'date' => '2025-04-18', 'cat' => 'keagamaan', 'desc' => 'Jum\'at Agung, peringatan wafatnya Yesus Kristus di kayu salib. Hari suci bagi umat Kristiani untuk merenungkan pengorbanan-Nya.'],
            ['title' => 'Hari Buruh Internasional', 'date' => '2025-05-01', 'cat' => 'nasional', 'desc' => 'May Day, peringatan untuk menghormati perjuangan dan kontribusi para pekerja di seluruh dunia. Hari untuk memperjuangkan hak-hak buruh.'],
            ['title' => 'Hari Raya Waisak 2569', 'date' => '2025-05-12', 'cat' => 'keagamaan', 'desc' => 'Peringatan hari lahir, pencerahan, dan wafatnya Buddha Gautama. Umat Buddha merayakan dengan doa, meditasi, dan perbuatan baik.'],
            ['title' => 'Kenaikan Yesus Kristus', 'date' => '2025-05-29', 'cat' => 'keagamaan', 'desc' => 'Peringatan kenaikan Yesus Kristus ke surga setelah kebangkitan-Nya. Dirayakan 40 hari setelah Paskah oleh umat Kristiani.'],
            ['title' => 'Hari Lahir Pancasila', 'date' => '2025-06-01', 'cat' => 'nasional', 'desc' => 'Memperingati pidato Bung Karno pada tanggal 1 Juni 1945 yang melahirkan konsep Pancasila sebagai dasar negara Indonesia.'],
            ['title' => 'Idul Adha 1446 H', 'date' => '2025-06-06', 'cat' => 'keagamaan', 'desc' => 'Hari Raya Kurban, memperingati ketaatan Nabi Ibrahim AS. Umat Islam melakukan ibadah kurban dengan menyembelih hewan ternak untuk dibagikan.'],
            ['title' => 'Tahun Baru Islam 1447 H', 'date' => '2025-06-27', 'cat' => 'keagamaan', 'desc' => 'Tahun Baru Hijriyah, memperingati peristiwa hijrah Nabi Muhammad SAW dari Mekah ke Madinah yang menandai awal kalender Islam.'],
            ['title' => 'HUT Kemerdekaan RI ke-80', 'date' => '2025-08-17', 'cat' => 'nasional', 'desc' => 'Hari kemerdekaan Republik Indonesia yang diproklamasikan pada 17 Agustus 1945. Perayaan dengan upacara bendera dan berbagai lomba.'],
            ['title' => 'Maulid Nabi Muhammad SAW 1447 H', 'date' => '2025-09-05', 'cat' => 'keagamaan', 'desc' => 'Peringatan kelahiran Nabi Muhammad SAW, Rasul terakhir dalam Islam. Dirayakan dengan doa, ceramah, dan berbagai kegiatan keagamaan.'],
            ['title' => 'Hari Raya Natal', 'date' => '2025-12-25', 'cat' => 'keagamaan', 'desc' => 'Perayaan kelahiran Yesus Kristus. Umat Kristiani merayakan dengan ibadah, berkumpul bersama keluarga, dan berbagi kasih.'],
            
            // ===================== 2026 =====================
            ['title' => 'Tahun Baru 2026', 'date' => '2026-01-01', 'cat' => 'nasional', 'desc' => 'Perayaan pergantian tahun baru Masehi 2026. Hari libur nasional untuk merayakan awal tahun dengan penuh harapan dan semangat baru.'],
            ['title' => 'Isra Mikraj 1447 H', 'date' => '2026-01-16', 'cat' => 'keagamaan', 'desc' => 'Peringatan perjalanan spiritual Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsa dan naik ke langit (Mi\'raj) untuk menerima perintah shalat lima waktu.'],
            ['title' => 'Tahun Baru Imlek 2577', 'date' => '2026-02-17', 'cat' => 'keagamaan', 'desc' => 'Perayaan tahun baru berdasarkan kalender lunar Tionghoa. Tahun 2577 Kongzili, saatnya berkumpul bersama keluarga dan merayakan tradisi budaya Tionghoa.'],
            ['title' => 'Hari Raya Nyepi 1948', 'date' => '2026-03-19', 'cat' => 'keagamaan', 'desc' => 'Tahun Baru Saka (Caka) umat Hindu Bali. Hari ini diisi dengan Catur Brata Penyepian: tidak menyalakan api/lampu, tidak bekerja, tidak bepergian, dan berpuasa.'],
            ['title' => 'Idul Fitri 1447 H (Hari 1)', 'date' => '2026-03-20', 'cat' => 'keagamaan', 'desc' => 'Hari Raya Idul Fitri menandai berakhirnya bulan Ramadhan. Umat Islam merayakan dengan sholat Id, silaturahmi, dan saling memaafkan.'],
            ['title' => 'Idul Fitri 1447 H (Hari 2)', 'date' => '2026-03-21', 'cat' => 'keagamaan', 'desc' => 'Hari kedua perayaan Idul Fitri. Waktu untuk melanjutkan silaturahmi dan berkunjung ke sanak saudara.'],
            ['title' => 'Cuti Bersama Idul Fitri', 'date' => '2026-03-22', 'cat' => 'nasional', 'desc' => 'Cuti bersama yang ditetapkan pemerintah untuk memperpanjang masa libur Idul Fitri agar masyarakat dapat berkumpul dengan keluarga.'],
            ['title' => 'Cuti Bersama Idul Fitri', 'date' => '2026-03-23', 'cat' => 'nasional', 'desc' => 'Cuti bersama yang ditetapkan pemerintah untuk memperpanjang masa libur Idul Fitri agar masyarakat dapat berkumpul dengan keluarga.'],
            ['title' => 'Wafat Yesus Kristus', 'date' => '2026-04-03', 'cat' => 'keagamaan', 'desc' => 'Jum\'at Agung, peringatan wafatnya Yesus Kristus di kayu salib. Hari suci bagi umat Kristiani untuk merenungkan pengorbanan-Nya.'],
            ['title' => 'Hari Buruh Internasional', 'date' => '2026-05-01', 'cat' => 'nasional', 'desc' => 'May Day, peringatan untuk menghormati perjuangan dan kontribusi para pekerja di seluruh dunia. Hari untuk memperjuangkan hak-hak buruh.'],
            ['title' => 'Hari Raya Waisak 2570', 'date' => '2026-05-01', 'cat' => 'keagamaan', 'desc' => 'Peringatan hari lahir, pencerahan, dan wafatnya Buddha Gautama. Umat Buddha merayakan dengan doa, meditasi, dan perbuatan baik.'],
            ['title' => 'Kenaikan Yesus Kristus', 'date' => '2026-05-14', 'cat' => 'keagamaan', 'desc' => 'Peringatan kenaikan Yesus Kristus ke surga setelah kebangkitan-Nya. Dirayakan 40 hari setelah Paskah oleh umat Kristiani.'],
            ['title' => 'Idul Adha 1447 H', 'date' => '2026-05-27', 'cat' => 'keagamaan', 'desc' => 'Hari Raya Kurban, memperingati ketaatan Nabi Ibrahim AS. Umat Islam melakukan ibadah kurban dengan menyembelih hewan ternak untuk dibagikan.'],
            ['title' => 'Hari Lahir Pancasila', 'date' => '2026-06-01', 'cat' => 'nasional', 'desc' => 'Memperingati pidato Bung Karno pada tanggal 1 Juni 1945 yang melahirkan konsep Pancasila sebagai dasar negara Indonesia.'],
            ['title' => 'Tahun Baru Islam 1448 H', 'date' => '2026-06-17', 'cat' => 'keagamaan', 'desc' => 'Tahun Baru Hijriyah, memperingati peristiwa hijrah Nabi Muhammad SAW dari Mekah ke Madinah yang menandai awal kalender Islam.'],
            ['title' => 'HUT Kemerdekaan RI ke-81', 'date' => '2026-08-17', 'cat' => 'nasional', 'desc' => 'Hari kemerdekaan Republik Indonesia yang diproklamasikan pada 17 Agustus 1945. Perayaan dengan upacara bendera dan berbagai lomba.'],
            ['title' => 'Maulid Nabi Muhammad SAW 1448 H', 'date' => '2026-08-26', 'cat' => 'keagamaan', 'desc' => 'Peringatan kelahiran Nabi Muhammad SAW, Rasul terakhir dalam Islam. Dirayakan dengan doa, ceramah, dan berbagai kegiatan keagamaan.'],
            ['title' => 'Hari Raya Natal', 'date' => '2026-12-25', 'cat' => 'keagamaan', 'desc' => 'Perayaan kelahiran Yesus Kristus. Umat Kristiani merayakan dengan ibadah, berkumpul bersama keluarga, dan berbagi kasih.'],
            ['title' => 'Cuti Bersama Natal', 'date' => '2026-12-26', 'cat' => 'nasional', 'desc' => 'Cuti bersama yang ditetapkan pemerintah untuk memperpanjang masa libur Natal agar masyarakat dapat berkumpul dengan keluarga.'],
        ];

        $autoEvents = collect($nationalHolidays)->map(function($h) {
             $colors = ['nasional' => '#e11d48', 'keagamaan' => '#2563eb'];
             return [
                'id' => 'auto-' . md5($h['title'] . $h['date']),
                'title' => $h['title'],
                'category' => $h['cat'],
                'start' => $h['date'],
                'description' => $h['desc'] ?? '',
                'isAgenda' => false, // Flag for special days (not agenda events)
                'status' => 'Nasional',
                'allDay' => true,
                'color' => $colors[$h['cat']] ?? '#e11d48',
             ];
        });

        return response()->json($dbEvents->merge($autoEvents));
    }
}
