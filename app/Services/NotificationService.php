<?php

namespace App\Services;

use App\Models\AgendaRegistration;
use App\Models\Article;
use App\Models\User;

class NotificationService
{
    /**
     * Get only the most important, actionable notifications for admin & leaders.
     * Tidak memunculkan notifikasi pesan sistem / filler jika tidak ada hal penting.
     */
    public function getAdminNotifications(User $user): array
    {
        $notifications = collect();

        // 1. Pesan Paling Penting: Pendaftaran Kegiatan Baru yang Butuh Tindakan (Admin & Ketua)
        if ($user->isAdmin() || $user->isKetua()) {
            try {
                $registrations = AgendaRegistration::with('agenda:id,title')
                    ->latest()
                    ->take(10)
                    ->get()
                    ->map(function ($reg) {
                        $name = $reg->getRegistrantName();
                        $agendaTitle = $reg->agenda?->title ?? 'Agenda';
                        $status = strtolower($reg->status ?? 'pending');

                        $statusLabel = match ($status) {
                            'approved' => 'Disetujui',
                            'rejected' => 'Ditolak',
                            'paid'     => 'Sudah Bayar',
                            default    => 'Menunggu Konfirmasi',
                        };

                        return [
                            'id' => 'reg-' . $reg->id,
                            'type' => 'registration',
                            'title' => 'Pendaftaran Kegiatan Masuk',
                            'message' => "{$name} mendaftar pada {$agendaTitle} ({$statusLabel}).",
                            'url' => '/admin/registrations',
                            'icon' => 'UserCheck',
                            'color' => 'emerald',
                            'time' => $reg->created_at ? $reg->created_at->diffForHumans() : 'Baru saja',
                            'timestamp' => $reg->created_at ? $reg->created_at->timestamp : time(),
                        ];
                    });

                $notifications = $notifications->merge($registrations);
            } catch (\Throwable $e) {
                // Ignore if table not yet populated
            }
        }

        // 2. Artikel Baru yang Diunggah (Admin & Departemen)
        if ($user->isAdmin() || $user->isDepartemen()) {
            try {
                $articles = Article::with('user:id,name')
                    ->latest()
                    ->take(3)
                    ->get()
                    ->map(function ($article) {
                        $author = $article->user?->name ?? 'Departemen';
                        return [
                            'id' => 'article-' . $article->id,
                            'type' => 'article',
                            'title' => 'Artikel Baru Diterbitkan',
                            'message' => "\"{$article->title}\" oleh {$author}.",
                            'url' => '/admin/articles',
                            'icon' => 'FileText',
                            'color' => 'blue',
                            'time' => $article->created_at ? $article->created_at->diffForHumans() : 'Baru saja',
                            'timestamp' => $article->created_at ? $article->created_at->timestamp : time(),
                        ];
                    });

                $notifications = $notifications->merge($articles);
            } catch (\Throwable $e) {
                // Ignore
            }
        }

        // Catatan: Jika tidak ada pendaftaran baru atau hal penting,
        // kembalikan array kosong agar badge notifikasi tidak memunculkan pesan palsu/filler.
        return $notifications
            ->sortByDesc('timestamp')
            ->values()
            ->all();
    }
}
