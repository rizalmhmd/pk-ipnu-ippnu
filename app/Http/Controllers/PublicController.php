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
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;

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
        $kegiatans = Agenda::orderBy('event_date', 'desc')->get();
        
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        
        return Inertia::render('Kegiatan/Index', compact('kegiatans', 'pageSetting'));
    }

    public function kegiatanDaftar(Agenda $agenda)
    {
        if (!$agenda->is_registration_open) {
            abort(404, 'Pendaftaran untuk kegiatan ini tidak tersedia atau sudah ditutup.');
        }

        $existingRegistration = null;
        if (auth()->check()) {
            $existingRegistration = $agenda->registrations()
                ->where('user_id', auth()->id())
                ->whereIn('status', ['approved', 'pending'])
                ->latest()
                ->first();
        }

        $pageSetting = PageSetting::where('page_name', 'agenda')->first();
        return Inertia::render('Kegiatan/RegistrationForm', compact('agenda', 'pageSetting', 'existingRegistration'));
    }

    public function kegiatanStoreDaftar(Request $request, Agenda $agenda)
    {
        if (!$agenda->is_registration_open) {
            return back()->withErrors(['message' => 'Pendaftaran ditutup.']);
        }

        // Validate the dynamic fields based on schema (fallback to default if empty)
        $schema = (!empty($agenda->form_schema) && is_array($agenda->form_schema)) ? $agenda->form_schema : [
            ['id' => 'field_name', 'label' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
            ['id' => 'field_phone', 'label' => 'Nomor WhatsApp / HP', 'type' => 'text', 'required' => true],
            ['id' => 'field_email', 'label' => 'Alamat Email', 'type' => 'email', 'required' => true],
            ['id' => 'field_nik', 'label' => 'NIK (KTP / KK)', 'type' => 'nik', 'required' => false],
        ];

        $rules = [];
        $customMessages = [
            'responses.*.required' => 'Kolom ini wajib diisi.',
            'responses.*.email' => 'Format email tidak valid.',
            'responses.*.numeric' => 'Harus berupa angka.',
            'responses.*.regex' => 'Format nomor/angka tidak valid.',
            'payment_method.required' => 'Metode pembayaran wajib dipilih.',
            'payment_proof.required' => 'Bukti pembayaran wajib diunggah untuk metode transfer.',
            'payment_proof.image' => 'File bukti pembayaran harus berupa gambar.',
            'payment_proof.max' => 'Ukuran maksimal file bukti pembayaran adalah 5MB.',
        ];

        foreach ($schema as $field) {
            $fieldRules = [];
            if (!empty($field['required'])) $fieldRules[] = 'required';
            else $fieldRules[] = 'nullable';

            $fieldType = $field['type'] ?? '';
            $fieldId = $field['id'] ?? '';
            $fieldLabel = strtolower($field['label'] ?? '');

            if ($fieldType === 'email' || str_contains($fieldId, 'email') || str_contains($fieldLabel, 'email')) {
                $fieldRules[] = 'email';
            }

            if ($fieldType === 'nik' || str_contains($fieldId, 'nik') || str_contains($fieldLabel, 'nik')) {
                // If NIK provided, must be exactly 16 numeric digits
                $fieldRules[] = 'regex:/^[0-9]{16}$/';
                $customMessages['responses.' . $fieldId . '.regex'] = 'NIK harus berupa 16 digit angka (sesuai KTP atau Kartu Keluarga).';
            } elseif ($fieldType === 'number' || str_contains($fieldId, 'phone') || str_contains($fieldId, 'whatsapp') || str_contains($fieldLabel, 'telepon') || str_contains($fieldLabel, 'whatsapp') || str_contains($fieldLabel, 'hp')) {
                // Phone / WhatsApp validation
                $fieldRules[] = 'regex:/^[0-9+\-\s()]+$/';
                $fieldRules[] = 'min:9';
                $customMessages['responses.' . $fieldId . '.min'] = 'Nomor WhatsApp minimal 9 digit.';
            }

            $rules['responses.' . $field['id']] = $fieldRules;
        }

        // Add payment_proof rule if agenda has registration_fee
        $isFree = empty($agenda->registration_fee) || in_array(strtolower(trim($agenda->registration_fee)), ['0', 'gratis', 'free', '-', 'rp 0', 'rp. 0']);
        if (!$isFree) {
            $rules['payment_method'] = ['required', 'in:cash,transfer,midtrans'];
            if ($request->input('payment_method') === 'transfer') {
                $rules['payment_proof'] = ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'];
            }
        }

        $validated = $request->validate($rules, $customMessages);

        // ─── Multi-Layer Duplicate Registration Prevention ─────────────────
        $inputResponses = $validated['responses'] ?? [];
        $rawPhone = null;
        $rawEmail = null;
        $rawNik = null;

        foreach ($inputResponses as $key => $val) {
            $k = strtolower($key);
            if (!$rawPhone && (str_contains($k, 'phone') || str_contains($k, 'whatsapp') || str_contains($k, 'hp'))) {
                $rawPhone = $val;
            }
            if (!$rawEmail && (str_contains($k, 'email') || (is_string($val) && filter_var($val, FILTER_VALIDATE_EMAIL)))) {
                $rawEmail = $val;
            }
            if (!$rawNik && str_contains($k, 'nik')) {
                $rawNik = $val;
            }
        }

        $normPhone = \App\Models\AgendaRegistration::normalizePhone($rawPhone);
        $normEmail = $rawEmail ? strtolower(trim($rawEmail)) : null;
        $normNik = $rawNik ? preg_replace('/[^0-9]/', '', $rawNik) : null;
        $currentUserId = auth()->id();

        // Check against existing non-rejected registrations in this agenda
        $existingRegistrations = $agenda->registrations()
            ->whereIn('status', ['approved', 'pending'])
            ->get();

        $existingRegistration = null;
        $duplicateReason = null;

        foreach ($existingRegistrations as $reg) {
            // Layer 1: Check WhatsApp / Phone (Primary Key)
            if ($normPhone && $reg->getRegistrantPhone()) {
                $regNormPhone = \App\Models\AgendaRegistration::normalizePhone($reg->getRegistrantPhone());
                if ($regNormPhone && $regNormPhone === $normPhone) {
                    $existingRegistration = $reg;
                    $duplicateReason = "Nomor WhatsApp ({$rawPhone})";
                    break;
                }
            }

            // Layer 2: Check Email
            if ($normEmail && $reg->getRegistrantEmail()) {
                if (strtolower(trim($reg->getRegistrantEmail())) === $normEmail) {
                    $existingRegistration = $reg;
                    $duplicateReason = "Alamat Email ({$rawEmail})";
                    break;
                }
            }

            // Layer 3: Check NIK (if provided)
            if ($normNik && strlen($normNik) === 16 && $reg->getRegistrantNik()) {
                $regNik = preg_replace('/[^0-9]/', '', $reg->getRegistrantNik());
                if ($regNik === $normNik) {
                    $existingRegistration = $reg;
                    $duplicateReason = "NIK ({$normNik})";
                    break;
                }
            }

            // Layer 4: Check User Account (if logged in)
            if ($currentUserId && $reg->user_id === $currentUserId) {
                $existingRegistration = $reg;
                $duplicateReason = "Akun Anda";
                break;
            }
        }

        if ($existingRegistration) {
            if ($existingRegistration->status === 'approved') {
                return back()->withErrors([
                    'message' => "{$duplicateReason} sudah terdaftar dan berstatus disetujui (Approved) untuk kegiatan ini. Pendaftaran ganda tidak diperbolehkan."
                ])->withInput();
            }

            // If pending with midtrans and snap token is available, smart redirect to existing payment
            if ($existingRegistration->payment_method === 'midtrans' && $existingRegistration->snap_token) {
                return redirect()->route('kegiatan.payment', $existingRegistration->id)
                    ->with('info', "{$duplicateReason} sudah memiliki pendaftaran yang menunggu pembayaran. Silakan selesaikan pembayaran berikut.");
            }

            return back()->withErrors([
                'message' => "{$duplicateReason} sudah terdaftar dan saat ini sedang menunggu verifikasi panitia. Hubungi panitia jika membutuhkan perubahan data."
            ])->withInput();
        }

        $paymentProofPath = null;
        $paymentMethod = $validated['payment_method'] ?? 'cash';
        
        if ($paymentMethod === 'transfer' && $request->hasFile('payment_proof')) {
            $paymentProofPath = $request->file('payment_proof')->store('payment_proofs');
        }

        $registration = $agenda->registrations()->create([
            'user_id' => auth()->id(), // null if not logged in
            'responses' => $validated['responses'] ?? [],
            'status' => 'pending',
            'payment_proof' => $paymentProofPath,
            'payment_method' => $paymentMethod,
        ]);

        if ($paymentMethod === 'midtrans' && !$isFree) {
            try {
                $midtransService = new \App\Services\MidtransService();
                $snapToken = $midtransService->createSnapToken($registration, $agenda);
                
                return redirect()->route('kegiatan.payment', $registration->id);
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Midtrans Snap Error: ' . $e->getMessage());
                return back()->withErrors(['message' => 'Gagal menginisiasi pembayaran Midtrans: ' . $e->getMessage()]);
            }
        }

        return redirect()->route('kegiatan.index')
            ->with('success', 'Pendaftaran berhasil dikirim. Terima kasih!');
    }

    public function kegiatanPayment(\App\Models\AgendaRegistration $registration)
    {
        if ($registration->status === 'approved') {
            return redirect()->route('kegiatan.index')
                ->with('success', 'Pendaftaran Anda sudah berhasil disetujui dan pembayaran telah terkonfirmasi.');
        }

        if ($registration->payment_method !== 'midtrans' || !$registration->snap_token) {
            return redirect()->route('kegiatan.index')->withErrors(['message' => 'Pembayaran ini tidak menggunakan Midtrans.']);
        }

        // Proactively check status with Midtrans in case webhook was missed (e.g. local environment or network latency)
        $midtransService = new \App\Services\MidtransService();
        $syncResult = $midtransService->syncRegistration($registration);
        if ($syncResult['success'] && $syncResult['status'] === 'approved') {
            return redirect()->route('kegiatan.index')
                ->with('success', 'Pembayaran berhasil terkonfirmasi! Status pendaftaran Anda telah disetujui.');
        }
        
        $agenda = $registration->agenda;
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();

        return Inertia::render('Kegiatan/Payment', [
            'registration' => $registration->load('agenda'),
            'snapToken' => $registration->snap_token,
            'pageSetting' => $pageSetting,
            'clientKey' => config('midtrans.client_key'),
            'isProduction' => (bool) config('midtrans.is_production', false),
        ]);
    }

    public function kegiatanVerifyPayment(\App\Models\AgendaRegistration $registration, Request $request)
    {
        $orderId = $request->input('order_id');
        $midtransService = new \App\Services\MidtransService();
        $syncResult = $midtransService->syncRegistration($registration, $orderId);

        return response()->json([
            'success' => $syncResult['success'],
            'message' => $syncResult['message'],
            'status' => $syncResult['status'] ?? $registration->status,
            'transaction_status' => $syncResult['transaction_status'] ?? null,
            'redirect_url' => route('kegiatan.index') . '?status=success',
        ]);
    }

    public function midtransCallback(Request $request)
    {
        $midtransService = new \App\Services\MidtransService();
        $result = $midtransService->handleWebhook();

        if ($result['success']) {
            return response()->json(['message' => 'Success']);
        }

        return response()->json(['message' => $result['message']], 400);
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
