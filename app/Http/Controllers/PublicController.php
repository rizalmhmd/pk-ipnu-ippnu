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

    private function getPageSetting(string $pageName): ?PageSetting
    {
        return Cache::remember("page_setting_{$pageName}", 600, fn () => PageSetting::where('page_name', $pageName)->first());
    }

    public function index()
    {
        $posts = Cache::remember('welcome_posts_4', 300, fn () => Post::latest()->take(4)->get());
        $articles = Cache::remember('welcome_articles_4', 300, fn () => Article::latest()->take(4)->get());
        $pageSetting = $this->getPageSetting('home');
        $greeting = $this->getPageSetting('home_greeting');

        // Fetch upcoming agendas (including those from the last 3 days)
        $agendas = Cache::remember('welcome_agendas_5', 180, fn () => Agenda::withActiveRegistrationCount()
            ->where('event_date', '>=', now()->subDays(3)->toDateString())
            ->orderBy('event_date', 'asc')
            ->take(5)
            ->get());

        // Fetch active quotes (reuse shared cache)
        $activeQuotes = Cache::remember('active_quotes_shared', 3600, fn () => Quote::where('is_active', true)->orderBy('order', 'asc')->get());

        // Fetch active statistics
        $statistics = Cache::remember('public_statistics', 600, fn () => Statistic::active()->ordered()->get());

        return Inertia::render('Welcome', compact('posts', 'articles', 'pageSetting', 'greeting', 'agendas', 'activeQuotes', 'statistics'));
    }

    public function profile()
    {
        return redirect()->route('profile.vision-mission');
    }

    public function visionMission()
    {
        $pageSetting = $this->getPageSetting('profile');
        return Inertia::render('Profile/VisionMission', [
            'pageSetting' => $pageSetting,
        ]);
    }

    public function history()
    {
        $pageSetting = $this->getPageSetting('profile');
        return Inertia::render('Profile/History', [
            'pageSetting' => $pageSetting,
        ]);
    }

    public function structure()
    {
        $organizations = Cache::remember('public_members', 600, fn () => Member::orderBy('order', 'asc')->get());
        $pageSetting = $this->getPageSetting('profile');
        return Inertia::render('Profile/Structure', [
            'organizations' => $organizations,
            'pageSetting' => $pageSetting,
        ]);
    }

    public function news()
    {
        $page = max(1, (int) request('page', 1));
        $posts = Cache::remember("public_news_page_{$page}", 300, fn () => Post::latest()->paginate(12));
        $pageSetting = $this->getPageSetting('news');
        return Inertia::render('News/Index', compact('posts', 'pageSetting'));
    }

    public function newsDetail($slug)
    {
        $post = Cache::remember("public_news_detail_{$slug}", 300, fn () => Post::where('slug', $slug)->firstOrFail());
        return Inertia::render('News/Show', compact('post'));
    }

    public function articles()
    {
        $page = max(1, (int) request('page', 1));
        $articles = Cache::remember("public_articles_page_{$page}", 300, fn () => Article::latest()->paginate(12));
        $pageSetting = $this->getPageSetting('articles');
        return Inertia::render('Articles/Index', compact('articles', 'pageSetting'));
    }

    public function articlesDetail($slug)
    {
        $article = Cache::remember("public_article_detail_{$slug}", 300, fn () => Article::where('slug', $slug)->firstOrFail());
        return Inertia::render('Articles/Show', compact('article'));
    }

    public function gallery()
    {
        $page = max(1, (int) request('page', 1));
        $galleries = Cache::remember("public_galleries_page_{$page}", 300, fn () => Gallery::latest()->paginate(12));
        $pageSetting = $this->getPageSetting('gallery');
        return Inertia::render('Gallery', compact('galleries', 'pageSetting'));
    }

    public function agenda()
    {
        $agendas = Cache::remember('public_agendas_list', 180, fn () => Agenda::withActiveRegistrationCount()
            ->where('event_date', '>=', now()->subMonths(1)->toDateString())
            ->orderBy('event_date', 'asc')
            ->get());

        $todayAgendas = Cache::remember('public_today_agendas', 180, fn () => Agenda::withActiveRegistrationCount()
            ->whereDate('event_date', now()->toDateString())
            ->get());
        $pageSetting = $this->getPageSetting('agenda');

        // Include national holidays for the calendar view
        $nationalHolidays = $this->getNationalHolidaysData();

        return Inertia::render('Agenda/Index', compact('agendas', 'todayAgendas', 'pageSetting', 'nationalHolidays'));
    }

    public function kegiatan()
    {
        $kegiatans = Cache::remember('public_kegiatans_list', 120, fn () => Agenda::withActiveRegistrationCount()->orderBy('event_date', 'desc')->get());

        $pageSetting = $this->getPageSetting('agenda');

        return Inertia::render('Kegiatan/Index', compact('kegiatans', 'pageSetting'));
    }

    public function kegiatanDaftar(Agenda $agenda)
    {
        if (!$agenda->is_registration_open) {
            abort(404, 'Pendaftaran untuk kegiatan ini tidak tersedia atau sudah ditutup.');
        }

        $agenda->loadCount([
            'registrations as active_registrations_count' => fn ($q) => $q->whereIn('status', ['approved', 'pending']),
        ]);

        $existingRegistration = null;
        if (auth()->check()) {
            $existingRegistration = $agenda->registrations()
                ->where('user_id', auth()->id())
                ->whereIn('status', ['approved', 'pending'])
                ->latest()
                ->first();

            if ($existingRegistration && $existingRegistration->payment_method === 'midtrans') {
                $existingRegistration->setAttribute(
                    'payment_url',
                    route('kegiatan.payment', [
                        'registration' => $existingRegistration->id,
                        'token' => $existingRegistration->getPaymentAccessToken(),
                    ])
                );
            }
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
            ['id' => 'field_phone', 'label' => 'Nomor WhatsApp / HP', 'type' => 'tel', 'required' => true],
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

        $phoneFieldIds = [];
        $emailFieldIds = [];
        $nikFieldIds = [];

        foreach ($schema as $field) {
            $fieldRules = [];
            if (!empty($field['required'])) $fieldRules[] = 'required';
            else $fieldRules[] = 'nullable';

            $fieldType = strtolower($field['type'] ?? '');
            $fieldId = $field['id'] ?? '';
            $fieldIdLower = strtolower($fieldId);
            $fieldLabel = strtolower($field['label'] ?? '');

            if ($fieldType === 'email' || str_contains($fieldIdLower, 'email') || str_contains($fieldLabel, 'email')) {
                $fieldRules[] = 'email';
                $emailFieldIds[] = $fieldId;
            }

            if ($fieldType === 'nik' || str_contains($fieldIdLower, 'nik') || str_contains($fieldLabel, 'nik')) {
                // If NIK provided, must be exactly 16 numeric digits
                $fieldRules[] = 'regex:/^[0-9]{16}$/';
                $customMessages['responses.' . $fieldId . '.regex'] = 'NIK harus berupa 16 digit angka (sesuai KTP atau Kartu Keluarga).';
                $nikFieldIds[] = $fieldId;
            } elseif (
                $fieldType === 'tel'
                || str_contains($fieldIdLower, 'phone')
                || str_contains($fieldIdLower, 'whatsapp')
                || str_contains($fieldIdLower, 'hp')
                || str_contains($fieldLabel, 'telepon')
                || str_contains($fieldLabel, 'whatsapp')
                || str_contains($fieldLabel, 'hp')
                || str_contains($fieldLabel, 'no. wa')
            ) {
                // Phone / WhatsApp validation
                $fieldRules[] = 'regex:/^[0-9+\-\s()]+$/';
                $fieldRules[] = 'min:9';
                $customMessages['responses.' . $fieldId . '.min'] = 'Nomor WhatsApp minimal 9 digit.';
                $phoneFieldIds[] = $fieldId;
            } elseif ($fieldType === 'number') {
                $fieldRules[] = 'numeric';
            }

            $rules['responses.' . $fieldId] = $fieldRules;
        }

        // Only enable paid flow when registration_fee has a positive numeric amount
        $isFree = \App\Services\MidtransService::parseNumericFee($agenda->registration_fee) <= 0;
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

        foreach ($phoneFieldIds as $fid) {
            if (!empty($inputResponses[$fid])) {
                $rawPhone = $inputResponses[$fid];
                break;
            }
        }
        foreach ($emailFieldIds as $fid) {
            if (!empty($inputResponses[$fid])) {
                $rawEmail = $inputResponses[$fid];
                break;
            }
        }
        foreach ($nikFieldIds as $fid) {
            if (!empty($inputResponses[$fid])) {
                $rawNik = $inputResponses[$fid];
                break;
            }
        }

        foreach ($inputResponses as $key => $val) {
            $k = strtolower((string) $key);
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
        $normNik = $rawNik ? preg_replace('/[^0-9]/', '', (string) $rawNik) : null;
        $currentUserId = auth()->id();

        $paymentMethod = $isFree ? 'cash' : ($validated['payment_method'] ?? 'cash');
        $uploadedProofPath = null;

        try {
            $txResult = \Illuminate\Support\Facades\DB::transaction(function () use (
                $agenda,
                $normPhone,
                $normEmail,
                $normNik,
                $rawPhone,
                $rawEmail,
                $currentUserId,
                $validated,
                $paymentMethod,
                $request,
                &$uploadedProofPath
            ) {
                $lockedAgenda = Agenda::where('id', $agenda->id)->lockForUpdate()->firstOrFail();

                if (!$lockedAgenda->is_registration_open) {
                    return ['error' => 'Pendaftaran ditutup.'];
                }

                // Check against existing non-rejected registrations in this agenda
                $existingRegistrations = $lockedAgenda->registrations()
                    ->with('agenda')
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
                    return [
                        'duplicate' => $existingRegistration,
                        'reason' => $duplicateReason,
                    ];
                }

                // Atomic quota check inside transaction
                if ($lockedAgenda->max_participants > 0 && $existingRegistrations->count() >= (int) $lockedAgenda->max_participants) {
                    return ['error' => 'Mohon maaf, kuota pendaftaran untuk kegiatan ini sudah penuh.'];
                }

                if ($paymentMethod === 'transfer' && $request->hasFile('payment_proof')) {
                    $uploadedProofPath = \App\Services\FileStorageService::upload($request->file('payment_proof'), 'payment_proofs');
                }

                $registration = $lockedAgenda->registrations()->create([
                    'user_id' => $currentUserId,
                    'responses' => $validated['responses'] ?? [],
                    'status' => 'pending',
                    'payment_proof' => $uploadedProofPath,
                    'payment_method' => $paymentMethod,
                ]);

                return ['registration' => $registration, 'agenda' => $lockedAgenda];
            });
        } catch (\Throwable $e) {
            \App\Services\FileStorageService::delete($uploadedProofPath);
            throw $e;
        }

        if (!empty($txResult['error'])) {
            return back()->withErrors(['message' => $txResult['error']])->withInput();
        }

        if (!empty($txResult['duplicate'])) {
            $existingRegistration = $txResult['duplicate'];
            $duplicateReason = $txResult['reason'];

            if ($existingRegistration->status === 'approved') {
                return back()->withErrors([
                    'message' => "{$duplicateReason} sudah terdaftar dan berstatus disetujui (Approved) untuk kegiatan ini. Pendaftaran ganda tidak diperbolehkan."
                ])->withInput();
            }

            if ($existingRegistration->payment_method === 'midtrans' && $existingRegistration->snap_token) {
                return redirect()->route('kegiatan.payment', [
                    'registration' => $existingRegistration->id,
                    'token' => $existingRegistration->getPaymentAccessToken(),
                ])->with('info', "{$duplicateReason} sudah memiliki pendaftaran yang menunggu pembayaran. Silakan selesaikan pembayaran berikut.");
            }

            return back()->withErrors([
                'message' => "{$duplicateReason} sudah terdaftar dan saat ini sedang menunggu verifikasi panitia. Hubungi panitia jika membutuhkan perubahan data."
            ])->withInput();
        }

        $registration = $txResult['registration'];
        $lockedAgenda = $txResult['agenda'];

        if ($paymentMethod === 'midtrans' && !$isFree) {
            try {
                $midtransService = new \App\Services\MidtransService();
                $midtransService->createSnapToken($registration, $lockedAgenda);

                return redirect()->route('kegiatan.payment', [
                    'registration' => $registration->id,
                    'token' => $registration->getPaymentAccessToken(),
                ]);
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Midtrans Snap Error: ' . $e->getMessage());
                $registration->delete();
                return back()->withErrors(['message' => 'Gagal menginisiasi pembayaran Midtrans: ' . $e->getMessage()])->withInput();
            }
        }

        $successMessage = $isFree
            ? 'Pendaftaran berhasil dikirim! Data Anda sedang menunggu verifikasi panitia, dan E-Ticket akan dikirim ke email setelah disetujui.'
            : ($paymentMethod === 'transfer'
                ? 'Pendaftaran & bukti transfer berhasil dikirim! Panitia akan memverifikasi pembayaran Anda dan mengirimkan E-Ticket ke email Anda.'
                : 'Pendaftaran berhasil dikirim! Silakan lakukan pembayaran Cash/Tunai ke panitia. E-Ticket akan dikirim ke email setelah diverifikasi.');

        return redirect()->route('kegiatan.index')
            ->with('success', $successMessage);
    }

    protected function authorizePaymentAccess(\App\Models\AgendaRegistration $registration, Request $request): void
    {
        $token = $request->query('token') ?? $request->input('token');
        $hasValidToken = $registration->hasValidPaymentToken(is_string($token) ? $token : null);
        $user = auth()->user();
        $isOwnerOrAdmin = $user && ($registration->user_id === $user->id || in_array($user->role, ['admin', 'ketua'], true));

        if (!$hasValidToken && !$isOwnerOrAdmin) {
            abort(403, 'Akses pembayaran tidak valid atau kedaluwarsa.');
        }
    }

    public function kegiatanPayment(\App\Models\AgendaRegistration $registration, Request $request)
    {
        $this->authorizePaymentAccess($registration, $request);

        if ($registration->status !== 'approved') {
            if ($registration->payment_method !== 'midtrans' || !$registration->snap_token) {
                return redirect()->route('kegiatan.index')->withErrors(['message' => 'Pembayaran ini tidak menggunakan Midtrans.']);
            }

            // Proactively check status with Midtrans in case webhook was missed (e.g. local environment or network latency)
            $midtransService = new \App\Services\MidtransService();
            $midtransService->syncRegistration($registration);
            $registration->refresh();
        }

        $registration->load('agenda');
        $pageSetting = PageSetting::where('page_name', 'agenda')->first();

        return Inertia::render('Kegiatan/Payment', [
            'registration' => $registration,
            'registrantName' => $registration->getRegistrantName(),
            'paymentToken' => $registration->getPaymentAccessToken(),
            'snapToken' => $registration->snap_token,
            'pageSetting' => $pageSetting,
            'clientKey' => config('midtrans.client_key'),
            'isProduction' => (bool) config('midtrans.is_production', false),
        ]);
    }

    public function kegiatanVerifyPayment(\App\Models\AgendaRegistration $registration, Request $request)
    {
        $this->authorizePaymentAccess($registration, $request);

        $orderId = $request->input('order_id');
        $midtransService = new \App\Services\MidtransService();
        $syncResult = $midtransService->syncRegistration($registration, is_string($orderId) ? $orderId : null);

        return response()->json([
            'success' => $syncResult['success'],
            'message' => $syncResult['message'],
            'status' => $syncResult['status'] ?? $registration->status,
            'transaction_status' => $syncResult['transaction_status'] ?? null,
            'redirect_url' => route('kegiatan.index') . '?status=success',
        ]);
    }

    public function kegiatanAttendance(\App\Models\AgendaRegistration $registration, Request $request)
    {
        $token = $request->query('token');
        if (!$registration->hasValidAttendanceToken(is_string($token) ? $token : null)) {
            abort(403, 'Tautan presensi tidak valid atau kedaluwarsa.');
        }

        $registration->load('agenda');

        return Inertia::render('Kegiatan/SelfCheckIn', [
            'registration' => [
                'id' => $registration->id,
                'ticket_code' => $registration->ticket_code,
                'status' => $registration->status,
                'qr_url' => $registration->qr_url,
                'attended_at' => $registration->attended_at?->toIso8601String(),
                'registrant_name' => $registration->getRegistrantName(),
                'agenda' => [
                    'id' => $registration->agenda?->id,
                    'title' => $registration->agenda?->title,
                    'event_date' => $registration->agenda?->event_date?->format('d F Y'),
                    'event_time' => $registration->agenda?->event_time,
                    'location' => $registration->agenda?->location,
                    'is_attendance_open' => (bool) $registration->agenda?->is_attendance_open,
                ],
            ],
            'attendanceToken' => $token,
        ]);
    }

    public function kegiatanConfirmAttendance(\App\Models\AgendaRegistration $registration, Request $request)
    {
        $token = $request->input('token');
        if (!$registration->hasValidAttendanceToken(is_string($token) ? $token : null)) {
            abort(403, 'Tautan presensi tidak valid.');
        }

        $registration->load('agenda');

        if ($registration->status !== 'approved') {
            return back()->with('error', 'Pendaftaran Anda belum berstatus Approved sehingga belum dapat melakukan presensi.');
        }

        if (!$registration->agenda?->is_attendance_open) {
            return back()->with('error', 'Sesi presensi mandiri belum dibuka oleh panitia.');
        }

        if ($registration->attended_at) {
            return back()->with('success', 'Kehadiran Anda sudah tercatat sebelumnya.');
        }

        $registration->update([
            'attended_at' => now(),
            'attendance_note' => 'Self check-in via tautan E-Ticket',
        ]);

        return back()->with('success', 'Presensi berhasil! Kehadiran Anda telah tercatat di sistem.');
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
        $cacheKey = "national_holidays_id_{$year}_v4";

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($year) {
            $rawData = Cache::get('national_holidays_raw_api_v1');

            if ($rawData === null && !Cache::has('national_holidays_api_cooldown')) {
                try {
                    $response = Http::timeout(4)->get('https://libur.deno.dev/api');
                    if ($response->successful() && is_array($response->json())) {
                        $rawData = $response->json();
                        Cache::put('national_holidays_raw_api_v1', $rawData, now()->addDays(30));
                    } else {
                        Cache::put('national_holidays_api_cooldown', true, now()->addMinutes(15));
                    }
                } catch (\Throwable $e) {
                    \Log::warning("Failed to fetch national holidays for {$year}: " . $e->getMessage());
                    Cache::put('national_holidays_api_cooldown', true, now()->addMinutes(15));
                }
            }

            if (is_array($rawData)) {
                $normalized = collect($rawData)
                    ->filter(function ($item) use ($year) {
                        $date = $item['date'] ?? null;
                        return $date && (int) substr($date, 0, 4) === $year;
                    })
                    ->map(fn ($item) => $this->normalizeNationalHoliday($item))
                    ->filter()
                    ->sortBy('date')
                    ->values()
                    ->all();

                if (!empty($normalized)) {
                    return $this->harmonizeCutiBersamaNames($normalized);
                }
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
        if ($year === 2026) {
            // Data resmi SKB 3 Menteri Tahun 2026 (17 Libur Nasional + 8 Cuti Bersama)
            $holidays2026 = [
                ['2026-01-01', 'Tahun Baru 2026 Masehi', 'nasional', 'libur_nasional'],
                ['2026-01-16', 'Isra Mikraj Nabi Muhammad SAW', 'keagamaan', 'libur_nasional'],
                ['2026-02-16', 'Cuti Bersama Tahun Baru Imlek 2577 Kongzili', 'cuti_bersama', 'cuti_bersama'],
                ['2026-02-17', 'Tahun Baru Imlek 2577 Kongzili', 'keagamaan', 'libur_nasional'],
                ['2026-03-18', 'Cuti Bersama Hari Suci Nyepi (Tahun Baru Saka 1948)', 'cuti_bersama', 'cuti_bersama'],
                ['2026-03-19', 'Hari Suci Nyepi (Tahun Baru Saka 1948)', 'keagamaan', 'libur_nasional'],
                ['2026-03-20', 'Cuti Bersama Hari Raya Idulfitri 1447 Hijriah', 'cuti_bersama', 'cuti_bersama'],
                ['2026-03-21', 'Hari Raya Idulfitri 1447 Hijriah', 'keagamaan', 'libur_nasional'],
                ['2026-03-22', 'Hari Raya Idulfitri 1447 Hijriah', 'keagamaan', 'libur_nasional'],
                ['2026-03-23', 'Cuti Bersama Hari Raya Idulfitri 1447 Hijriah', 'cuti_bersama', 'cuti_bersama'],
                ['2026-03-24', 'Cuti Bersama Hari Raya Idulfitri 1447 Hijriah', 'cuti_bersama', 'cuti_bersama'],
                ['2026-04-03', 'Wafat Yesus Kristus', 'keagamaan', 'libur_nasional'],
                ['2026-04-05', 'Kebangkitan Yesus Kristus (Paskah)', 'keagamaan', 'libur_nasional'],
                ['2026-05-01', 'Hari Buruh Internasional', 'nasional', 'libur_nasional'],
                ['2026-05-14', 'Kenaikan Yesus Kristus', 'keagamaan', 'libur_nasional'],
                ['2026-05-15', 'Cuti Bersama Kenaikan Yesus Kristus', 'cuti_bersama', 'cuti_bersama'],
                ['2026-05-27', 'Hari Raya Iduladha 1447 Hijriah', 'keagamaan', 'libur_nasional'],
                ['2026-05-28', 'Cuti Bersama Hari Raya Iduladha 1447 Hijriah', 'cuti_bersama', 'cuti_bersama'],
                ['2026-05-31', 'Hari Raya Waisak 2570 BE', 'keagamaan', 'libur_nasional'],
                ['2026-06-01', 'Hari Lahir Pancasila', 'nasional', 'libur_nasional'],
                ['2026-06-16', '1 Muharam Tahun Baru Islam 1448 Hijriah', 'keagamaan', 'libur_nasional'],
                ['2026-08-17', 'Proklamasi Kemerdekaan Republik Indonesia', 'nasional', 'libur_nasional'],
                ['2026-08-25', 'Maulid Nabi Muhammad SAW', 'keagamaan', 'libur_nasional'],
                ['2026-12-24', 'Cuti Bersama Kelahiran Yesus Kristus (Natal)', 'cuti_bersama', 'cuti_bersama'],
                ['2026-12-25', 'Kelahiran Yesus Kristus (Natal)', 'keagamaan', 'libur_nasional'],
            ];

            return array_map(function ($item) {
                [$date, $title, $cat, $type] = $item;
                return [
                    'title' => $title,
                    'official_name' => $title,
                    'date' => $date,
                    'event_date' => $date,
                    'cat' => $cat,
                    'type' => $type,
                    'desc' => $type === 'cuti_bersama'
                        ? 'Cuti Bersama (SKB 3 Menteri 2026)'
                        : 'Libur Nasional Indonesia (SKB 3 Menteri 2026)',
                    'source' => 'skb-3-menteri-2026',
                ];
            }, $holidays2026);
        }

        // Fallback hari libur tetap nasional untuk tahun lain ketika API eksternal tidak tersedia.
        return [
            [
                'title' => "Tahun Baru {$year} Masehi",
                'official_name' => "Tahun Baru {$year} Masehi",
                'date' => "{$year}-01-01",
                'event_date' => "{$year}-01-01",
                'cat' => 'nasional',
                'type' => 'libur_nasional',
                'desc' => 'Libur Nasional Indonesia',
                'source' => 'local-fallback',
            ],
            [
                'title' => 'Hari Buruh Internasional',
                'official_name' => 'Hari Buruh Internasional',
                'date' => "{$year}-05-01",
                'event_date' => "{$year}-05-01",
                'cat' => 'nasional',
                'type' => 'libur_nasional',
                'desc' => 'Libur Nasional Indonesia',
                'source' => 'local-fallback',
            ],
            [
                'title' => 'Hari Lahir Pancasila',
                'official_name' => 'Hari Lahir Pancasila',
                'date' => "{$year}-06-01",
                'event_date' => "{$year}-06-01",
                'cat' => 'nasional',
                'type' => 'libur_nasional',
                'desc' => 'Libur Nasional Indonesia',
                'source' => 'local-fallback',
            ],
            [
                'title' => 'Proklamasi Kemerdekaan Republik Indonesia',
                'official_name' => 'Proklamasi Kemerdekaan Republik Indonesia',
                'date' => "{$year}-08-17",
                'event_date' => "{$year}-08-17",
                'cat' => 'nasional',
                'type' => 'libur_nasional',
                'desc' => 'Libur Nasional Indonesia',
                'source' => 'local-fallback',
            ],
            [
                'title' => 'Kelahiran Yesus Kristus (Natal)',
                'official_name' => 'Kelahiran Yesus Kristus (Natal)',
                'date' => "{$year}-12-25",
                'event_date' => "{$year}-12-25",
                'cat' => 'keagamaan',
                'type' => 'libur_nasional',
                'desc' => 'Libur Nasional Indonesia',
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
