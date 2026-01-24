<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Gallery;
use App\Models\Member;
use Illuminate\Http\Request;

use App\Models\PageSetting;
use App\Models\Agenda;

class PublicController extends Controller
{

    public function index()
    {
        $posts = Post::latest()->take(3)->get();
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
                'status' => 'Aktif',
                'allDay' => true,
                'color' => $colors[$category] ?? '#059669',
            ];
        });

        // Add Auto-generated National Holidays for 2025-2026 (Baseline)
        $nationalHolidays = [
            // 2025
            ['title' => 'Tahun Baru 2025', 'date' => '2025-01-01', 'cat' => 'nasional'],
            ['title' => 'Tahun Baru Imlek', 'date' => '2025-01-29', 'cat' => 'nasional'],
            ['title' => 'Isra Mikraj', 'date' => '2025-01-27', 'cat' => 'keagamaan'],
            ['title' => 'Hari Raya Nyepi', 'date' => '2025-03-29', 'cat' => 'keagamaan'],
            ['title' => 'Idul Fitri 1446 H', 'date' => '2025-03-31', 'cat' => 'keagamaan'],
            ['title' => 'Idul Fitri 1446 H', 'date' => '2025-04-01', 'cat' => 'keagamaan'],
            ['title' => 'Wafat Yesus Kristus', 'date' => '2025-04-18', 'cat' => 'keagamaan'],
            ['title' => 'Hari Buruh Internasional', 'date' => '2025-05-01', 'cat' => 'nasional'],
            ['title' => 'Hari Raya Waisak', 'date' => '2025-05-12', 'cat' => 'keagamaan'],
            ['title' => 'Kenaikan Yesus Kristus', 'date' => '2025-05-29', 'cat' => 'keagamaan'],
            ['title' => 'Hari Lahir Pancasila', 'date' => '2025-06-01', 'cat' => 'nasional'],
            ['title' => 'Idul Adha 1446 H', 'date' => '2025-06-06', 'cat' => 'keagamaan'],
            ['title' => 'Tahun Baru Islam 1447 H', 'date' => '2025-06-27', 'cat' => 'keagamaan'],
            ['title' => 'HUT Kemerdekaan RI ke-80', 'date' => '2025-08-17', 'cat' => 'nasional'],
            ['title' => 'Maulid Nabi Muhammad SAW', 'date' => '2025-09-05', 'cat' => 'keagamaan'],
            ['title' => 'Hari Raya Natal', 'date' => '2025-12-25', 'cat' => 'keagamaan'],
            // 2026 (Selected major ones)
            ['title' => 'Tahun Baru 2026', 'date' => '2026-01-01', 'cat' => 'nasional'],
            ['title' => 'Idul Fitri 1447 H', 'date' => '2026-03-20', 'cat' => 'keagamaan'],
            ['title' => 'HUT Kemerdekaan RI ke-81', 'date' => '2025-08-17', 'cat' => 'nasional'],
        ];

        $autoEvents = collect($nationalHolidays)->map(function($h) {
             $colors = ['nasional' => '#e11d48', 'keagamaan' => '#2563eb'];
             return [
                'id' => 'auto-' . md5($h['title'] . $h['date']),
                'title' => $h['title'],
                'category' => $h['cat'],
                'start' => $h['date'],
                'status' => 'Nasional',
                'allDay' => true,
                'color' => $colors[$h['cat']] ?? '#e11d48',
             ];
        });

        return response()->json($dbEvents->merge($autoEvents));
    }
}
