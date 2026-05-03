<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\AgendaController;
use App\Http\Controllers\Admin\PageSettingController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\QuoteController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [PublicController::class, 'index'])->name('home');

Route::get('/profil', [PublicController::class, 'profile'])->name('profile');
Route::get('/profil/visi-misi', [PublicController::class, 'visionMission'])->name('profile.vision-mission');
Route::get('/profil/sejarah', [PublicController::class, 'history'])->name('profile.history');
Route::get('/profil/struktur-organisasi', [PublicController::class, 'structure'])->name('profile.structure');
Route::get('/berita', [PublicController::class, 'news'])->name('news.index');
Route::get('/berita/{slug}', [PublicController::class, 'newsDetail'])->name('news.show');
Route::get('/artikel', [PublicController::class, 'articles'])->name('articles.index');
Route::get('/artikel/{slug}', [PublicController::class, 'articlesDetail'])->name('articles.show');
Route::get('/galeri', [PublicController::class, 'gallery'])->name('gallery.index');
Route::get('/agenda', [PublicController::class, 'agenda'])->name('agenda.index');
Route::get('/api/agendas', [PublicController::class, 'getAgendasJson'])->name('api.agendas');

// Admin Routes (Protected) - All authenticated users can access dashboard & profile
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // ── Dashboard: accessible by ALL roles ──────────────────────────────────
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ── Profile: accessible by ALL roles ────────────────────────────────────
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ── Admin only: user management, settings ───────────────────────────────
    Route::middleware('role:admin')->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('page-settings', PageSettingController::class)->only(['index', 'edit', 'update']);
        Route::get('site-settings', [SiteSettingController::class, 'edit'])->name('site-settings.edit');
        Route::put('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');


    });

    // ── Ketua IPNU/IPPNU: agenda, galeri, anggota, statistik ────────────────
    Route::middleware('role:admin,ketua')->group(function () {
        Route::resource('agendas', AgendaController::class);
        Route::resource('galleries', GalleryController::class);
        Route::resource('members', MemberController::class);
        Route::resource('statistics', StatisticController::class);
    });

    // ── Ketua Departemen: quotes, artikel, berita ───────────────────────────
    Route::middleware('role:admin,departemen')->group(function () {
        Route::resource('posts', PostController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('quotes', QuoteController::class);
    });
});

require __DIR__.'/auth.php';
