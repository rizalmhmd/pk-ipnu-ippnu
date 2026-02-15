<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\Member;
use Illuminate\Http\Request;

use App\Models\PageSetting;
use App\Models\Agenda;
use App\Models\Quote;
use App\Models\Statistic;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PublicController extends Controller
{

    public function index()
    {
        $posts = Post::latest()->take(4)->get();
        $articles = Article::latest()->take(4)->get();
        $pageSetting = PageSetting::where('page_name', 'home')->first();
        $greeting = PageSetting::where('page_name', 'home_greeting')->first();
        
        // Fetch upcoming agendas (including those from the last 3 days)
        $agendas = Agenda::where('event_date', '>=', now()->subDays(3)->toDateString())
                        ->orderBy('event_date', 'asc')
                        ->take(5)
                        ->get();

        // Fetch active quotes
        $activeQuotes = Quote::where('is_active', true)
                       ->orderBy('order', 'asc')
                       ->get();

        // Fetch active statistics
        $statistics = Statistic::active()->ordered()->get();
        
        return Inertia::render('Welcome', compact('posts', 'articles', 'pageSetting', 'greeting', 'agendas', 'activeQuotes', 'statistics'));
    }

    public function profile()
    {
        $members = Member::all();
        $pageSetting = PageSetting::where('page_name', 'profile')->first();
        return Inertia::render('Profile', compact('members', 'pageSetting'));
    }

    public function news()
    {
        $posts = Post::latest()->paginate(10);
        $pageSetting = PageSetting::where('page_name', 'news')->first();
        return Inertia::render('News/Index', compact('posts', 'pageSetting'));
    }

    public function newsDetail($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return Inertia::render('News/Show', compact('post'));
    }

    public function articles()
    {
        $articles = Article::latest()->paginate(10);
        $pageSetting = PageSetting::where('page_name', 'articles')->first();
        return Inertia::render('Articles/Index', compact('articles', 'pageSetting'));
    }

    public function articlesDetail($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        return Inertia::render('Articles/Show', compact('article'));
    }

    public function gallery()
    {
        $galleries = Gallery::latest()->paginate(12);
        $pageSetting = PageSetting::where('page_name', 'gallery')->first();
        return Inertia::render('Gallery', compact('galleries', 'pageSetting'));
    }

    public function agenda()
    {
        $agendas = Agenda::where('event_date', '>=', now()->subMonths(1)->toDateString())
                         ->orderBy('event_date', 'asc')
                         ->get();
        
        $todayAgendas = Agenda::whereDate('event_date', now()->toDateString())->get();
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        
        // Include national holidays for the calendar view
        $nationalHolidays = $this->getNationalHolidaysData();
        
        return Inertia::render('Agenda/Index', compact('agendas', 'todayAgendas', 'pageSetting', 'nationalHolidays'));
    }

    private function getNationalHolidaysData()
    {
        return Cache::remember('national_holidays_full_v7', now()->addDays(30), function () {
            try {
                // Fetch for current and next year to be safe
                $currentYear = now()->year;
                $nextYear = $currentYear + 1;
                
                $response = Http::get("https://libur.deno.dev/api");
                
                if ($response->successful()) {
                    $holidays = $response->json();
                    
                    // Group by name to identify "doubles"
                    $grouped = collect($holidays)->groupBy('name');
                    
                    $processed = [];
                    foreach ($grouped as $name => $dates) {
                        $dates = $dates->sortBy('date')->values();
                        $count = $dates->count();
                        
                        foreach ($dates as $index => $h) {
                            $cat = 'nasional';
                            
                            // Intelligent Categorization
                            $religiousKeywords = [
                                'Idul Fitri', 'Idul Adha', 'Natal', 'Nyepi', 'Waisak', 
                                'Isra Mikraj', 'Maulid', 'Yesus Kristus', 'Imlek', 
                                'Hijriah', 'Saka', 'Kongzili', 'Paskah', 'Kenaikan'
                            ];
                            
                            foreach ($religiousKeywords as $keyword) {
                                if (stripos($name, $keyword) !== false) {
                                    $cat = 'keagamaan';
                                    break;
                                }
                            }
                            
                            $displayTitle = $name;
                            $description = 'Libur Nasional';
                            
                            // Highly Concise Labeling for Calendar Units
                            if ($count > 1 && !str_contains(strtolower($name), 'cuti bersama')) {
                                $shortName = $name;
                                if (str_contains($name, 'Idul Fitri')) $shortName = 'Idul Fitri';
                                if (str_contains($name, 'Idul Adha')) $shortName = 'Idul Adha';
                                if (str_contains($name, 'Imlek')) $shortName = 'Imlek';
                                if (str_contains($name, 'Nyepi')) $shortName = 'Nyepi';
                                if (str_contains($name, 'Waisak')) $shortName = 'Waisak';
                                if (str_contains($name, 'Natal')) $shortName = 'Natal';

                                if (str_contains($name, 'Idul Fitri') || str_contains($name, 'Idul Adha')) {
                                    if ($index >= 2) { 
                                        $displayTitle = 'Cuti ' . $shortName;
                                        $description = 'Cuti Bersama';
                                    } else {
                                        $displayTitle = 'Hari ' . ($index + 1) . ' ' . $shortName;
                                    }
                                } elseif (str_contains($name, 'Imlek')) {
                                    if ($index === 0) { 
                                        $displayTitle = 'Cuti ' . $shortName;
                                        $description = 'Cuti Bersama';
                                    } else {
                                        $displayTitle = $shortName;
                                    }
                                } elseif (str_contains($name, 'Nyepi') || str_contains($name, 'Natal') || str_contains($name, 'Waisak')) {
                                    if ($index > 0) { 
                                        $displayTitle = 'Cuti ' . $shortName;
                                        $description = 'Cuti Bersama';
                                    } else {
                                        $displayTitle = $shortName;
                                    }
                                }
                            }

                            if (str_contains(strtolower($name), 'cuti bersama')) {
                                $description = 'Cuti Bersama';
                                $displayTitle = 'Cuti ' . ($shortName ?? 'Libur');
                            }
                            
                            $processed[] = [
                                'title' => $displayTitle,
                                'date' => $h['date'],
                                'cat' => $cat,
                                'desc' => $description
                            ];
                        }
                    }
                    
                    return $processed;
                }
            } catch (\Exception $e) {
                \Log::error("Failed to fetch holidays: " . $e->getMessage());
            }
            
            // Minimal Fallback if API fails
            return [
                ['title' => 'Tahun Baru 2025', 'date' => '2025-01-01', 'cat' => 'nasional', 'desc' => 'Libur Nasional'],
            ];
        });
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
        $nationalHolidays = $this->getNationalHolidaysData();

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
