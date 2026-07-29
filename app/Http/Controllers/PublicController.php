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
        return redirect()->route('profile.vision-mission');
    }

    public function visionMission()
    {
        $pageSetting = PageSetting::where('page_name', 'profile')->first();
        return Inertia::render('Profile/VisionMission', [
            'pageSetting' => $pageSetting,
        ]);
    }

    public function history()
    {
        $pageSetting = PageSetting::where('page_name', 'profile')->first();
        return Inertia::render('Profile/History', [
            'pageSetting' => $pageSetting,
        ]);
    }

    public function structure()
    {
        $organizations = Member::orderBy('order', 'asc')->get();
        $pageSetting = PageSetting::where('page_name', 'profile')->first();
        return Inertia::render('Profile/Structure', [
            'organizations' => $organizations,
            'pageSetting' => $pageSetting,
        ]);
    }

    public function news()
    {
        $posts = Post::latest()->paginate(12);
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
        $articles = Article::latest()->paginate(12);
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

    public function kegiatan()
    {
        $kegiatans = Agenda::whereIn('category', ['organisasi', 'khusus'])
                         ->orderBy('event_date', 'desc')
                         ->get();
        
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        
        return Inertia::render('Kegiatan/Index', compact('kegiatans', 'pageSetting'));
    }

    public function kegiatanDaftar(Agenda $agenda)
    {
        if (!$agenda->is_registration_open) {
            abort(404, 'Pendaftaran untuk kegiatan ini tidak tersedia atau sudah ditutup.');
        }

        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        return Inertia::render('Kegiatan/RegistrationForm', compact('agenda', 'pageSetting'));
    }

    public function kegiatanStoreDaftar(Request $request, Agenda $agenda)
    {
        if (!$agenda->is_registration_open) {
            return back()->withErrors(['message' => 'Pendaftaran ditutup.']);
        }

        // Validate the dynamic fields based on schema
        $schema = $agenda->form_schema ?? [];
        $rules = [];
        foreach ($schema as $field) {
            $fieldRules = [];
            if ($field['required']) $fieldRules[] = 'required';
            else $fieldRules[] = 'nullable';

            if ($field['type'] === 'email') $fieldRules[] = 'email';
            if ($field['type'] === 'number') $fieldRules[] = 'numeric';

            $rules['responses.' . $field['id']] = $fieldRules;
        }

        // Add payment_proof rule if agenda has registration_fee
        if (!empty($agenda->registration_fee)) {
            $rules['payment_method'] = ['required', 'in:cash,transfer'];
            $rules['payment_proof'] = ['required_if:payment_method,transfer', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'];
        }

        $validated = $request->validate($rules, [
            'responses.*.required' => 'Kolom ini wajib diisi.',
            'responses.*.email' => 'Format email tidak valid.',
            'responses.*.numeric' => 'Harus berupa angka.',
            'payment_method.required' => 'Metode pembayaran wajib dipilih.',
            'payment_proof.required_if' => 'Bukti pembayaran wajib diunggah untuk metode transfer.',
            'payment_proof.image' => 'File bukti pembayaran harus berupa gambar.',
            'payment_proof.max' => 'Ukuran maksimal file bukti pembayaran adalah 5MB.',
        ]);

        $paymentProofPath = null;
        $paymentMethod = $validated['payment_method'] ?? 'cash';
        
        if ($paymentMethod === 'transfer' && $request->hasFile('payment_proof')) {
            $file = $request->file('payment_proof');
            $filename = \Illuminate\Support\Str::random(40) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('payment_proofs');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);
            $paymentProofPath = 'payment_proofs/' . $filename;
        }

        $agenda->registrations()->create([
            'user_id' => auth()->id(), // null if not logged in
            'responses' => $validated['responses'] ?? [],
            'status' => 'pending',
            'payment_proof' => $paymentProofPath,
            'payment_method' => $paymentMethod,
        ]);

        return redirect()->route('kegiatan.index')
            ->with('success', 'Pendaftaran berhasil dikirim. Terima kasih!');
    }

    private function getNationalHolidaysData()
    {
        $currentYear = now()->year;
        $nextYear = $currentYear + 1;

        return collect([$currentYear, $nextYear])
            ->flatMap(fn ($year) => $this->getNationalHolidaysByYear((int) $year))
            ->unique(fn ($holiday) => ($holiday['official_name'] ?? $holiday['title']) . '|' . $holiday['date'])
            ->sortBy('date')
            ->values()
            ->all();
    }

    private function getNationalHolidaysByYear(int $year): array
    {
        $cacheKey = "national_holidays_id_{$year}_v3";

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($year) {
            try {
                $response = Http::timeout(20)->get('https://libur.deno.dev/api');

                if ($response->successful() && is_array($response->json())) {
                    $normalized = collect($response->json())
                        ->filter(function ($item) use ($year) {
                            $date = $item['date'] ?? null;
                            if (!$date) {
                                return false;
                            }

                            return (int) substr($date, 0, 4) === $year;
                        })
                        ->map(fn ($item) => $this->normalizeNationalHoliday($item))
                        ->filter()
                        ->sortBy('date')
                        ->values()
                        ->all();

                    return $this->harmonizeCutiBersamaNames($normalized);
                }
            } catch (\Throwable $e) {
                \Log::warning("Failed to fetch national holidays for {$year}: " . $e->getMessage());
            }

            return $this->getNationalHolidayFallback($year);
        });
    }

    private function normalizeNationalHoliday(array $holiday): ?array
    {
        $name = trim((string) ($holiday['name'] ?? ''));
        $date = (string) ($holiday['date'] ?? '');
        $isNationalHoliday = (bool) ($holiday['is_national_holiday'] ?? false);

        if ($name === '' || $date === '') {
            return null;
        }

        $lowerName = mb_strtolower($name);
        $isCutiBersama = str_contains($lowerName, 'cuti bersama');

        $religiousKeywords = [
            'idul fitri', 'idul adha', 'natal', 'nyepi', 'waisak',
            'isra mikraj', 'maulid', 'yesus kristus', 'imlek',
            'hijriah', 'saka', 'kongzili', 'paskah', 'kenaikan',
        ];

        $isReligious = false;
        foreach ($religiousKeywords as $keyword) {
            if (str_contains($lowerName, $keyword)) {
                $isReligious = true;
                break;
            }
        }

        // Prioritas klasifikasi:
        // 1) Jika nama mengandung "cuti bersama" => cuti_bersama
        // 2) Jika hari libur resmi nasional dari API => keagamaan / nasional
        // 3) Selain itu => tidak ditampilkan (null)
        $cat = null;
        $type = null;
        if ($isCutiBersama) {
            $cat = 'cuti_bersama';
            $type = 'cuti_bersama';
        } elseif ($isNationalHoliday) {
            $cat = $isReligious ? 'keagamaan' : 'nasional';
            $type = 'libur_nasional';
        } else {
            return null;
        }

        $desc = 'Kalender Nasional Indonesia';
        if ($type === 'cuti_bersama') {
            $desc = 'Cuti Bersama (Kalender Nasional Indonesia)';
        } elseif ($type === 'libur_nasional') {
            $desc = 'Libur Nasional Indonesia';
        }

        return [
            'title' => $name,
            'official_name' => $name,
            'date' => $date,
            'event_date' => $date,
            'cat' => $cat,
            'type' => $type,
            'desc' => $desc,
            'source' => 'libur.deno.dev',
            'is_national_holiday' => $isNationalHoliday,
        ];
    }

    private function harmonizeCutiBersamaNames(array $events): array
    {
        $religiousMap = [
            'idul fitri' => 'idul fitri',
            'idul adha' => 'idul adha',
            'natal' => 'natal',
            'nyepi' => 'nyepi',
            'waisak' => 'waisak',
            'imlek' => 'imlek',
            'isra mi\'raj' => 'isra mi\'raj',
            'maulid' => 'maulid',
            'paskah' => 'paskah',
            'kenaikan yesus kristus' => 'kenaikan yesus kristus',
            'tahun baru islam' => 'tahun baru islam',
        ];

        $detectFamily = function (string $text) use ($religiousMap): ?string {
            $lower = mb_strtolower($text);
            foreach ($religiousMap as $needle => $family) {
                if (str_contains($lower, $needle)) {
                    return $family;
                }
            }
            return null;
        };

        $result = $events;
        foreach ($result as $idx => $event) {
            if (($event['type'] ?? null) !== 'cuti_bersama') {
                continue;
            }

            $cutiFamily = $detectFamily((string) ($event['title'] ?? ''));
            $cutiDate = $event['date'] ?? null;
            if (!$cutiDate) {
                continue;
            }

            $nearestHoliday = null;
            $nearestDistance = PHP_INT_MAX;

            foreach ($result as $candidate) {
                if (($candidate['type'] ?? null) !== 'libur_nasional') {
                    continue;
                }

                $candidateDate = $candidate['date'] ?? null;
                if (!$candidateDate) {
                    continue;
                }

                $distance = abs(strtotime($candidateDate) - strtotime($cutiDate));
                if ($distance < $nearestDistance) {
                    $nearestDistance = $distance;
                    $nearestHoliday = $candidate;
                }
            }

            if (!$nearestHoliday || $nearestDistance > (5 * 86400)) {
                continue;
            }

            $holidayTitle = (string) ($nearestHoliday['official_name'] ?? $nearestHoliday['title'] ?? '');
            $holidayFamily = $detectFamily($holidayTitle);

            // Standarisasi nama cuti bersama agar SELALU mengikuti hari raya/libur nasional terdekat.
            // Ini menghindari kasus salah label seperti "Cuti Bersama ... Idul Fitri" di sekitar Idul Adha.
            if ($holidayTitle !== '') {
                $fixedTitle = 'Cuti Bersama ' . $holidayTitle;
                $result[$idx]['title'] = $fixedTitle;
                $result[$idx]['official_name'] = $fixedTitle;
            } elseif ($holidayFamily && $cutiFamily && $holidayFamily !== $cutiFamily) {
                // Fallback safety jika title kosong tapi family mismatch terdeteksi.
                $result[$idx]['title'] = 'Cuti Bersama';
                $result[$idx]['official_name'] = 'Cuti Bersama';
            }
        }

        return $result;
    }

    private function getNationalHolidayFallback(int $year): array
    {
        // Fallback minimum to keep UI stable when external API is unavailable.
        return [
            [
                'title' => "Tahun Baru Masehi {$year}",
                'official_name' => "Tahun Baru Masehi {$year}",
                'date' => "{$year}-01-01",
                'event_date' => "{$year}-01-01",
                'cat' => 'nasional',
                'type' => 'libur_nasional',
                'desc' => 'Fallback kalender nasional (API tidak tersedia)',
                'source' => 'local-fallback',
            ],
        ];
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
                'start' => \Carbon\Carbon::parse($agenda->event_date)->toDateString(),
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
             $colors = [
                 'nasional' => '#e11d48',
                 'keagamaan' => '#2563eb',
                 'cuti_bersama' => '#f59e0b',
             ];

             $status = 'Nasional';
             if (($h['type'] ?? null) === 'cuti_bersama') {
                 $status = 'Cuti Bersama';
             } elseif (($h['cat'] ?? null) === 'keagamaan') {
                 $status = 'Keagamaan';
             }

             return [
                'id' => 'auto-' . md5($h['title'] . $h['date']),
                'title' => $h['title'],
                'category' => $h['cat'],
                'start' => $h['date'],
                'description' => $h['desc'] ?? '',
                'isAgenda' => false, // Flag for special days (not agenda events)
                'status' => $status,
                'allDay' => true,
                'color' => $colors[$h['cat']] ?? '#e11d48',
             ];
        });

        return response()->json($dbEvents->merge($autoEvents));
    }
}
