<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\Member;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $stats = [];
        $recentActivities = collect();

        // ─── Stats logic based on roles ──────────────────────────────────────
        
        // News & Articles (Admin & Departemen)
        if ($user->isAdmin() || $user->isDepartemen()) {
            $stats['posts'] = Post::count();
            $stats['articles'] = \App\Models\Article::count();
            $stats['quotes'] = \App\Models\Quote::count();

            // Recent News
            $recentPosts = Post::latest()->take(3)->get()->map(function($post) {
                return [
                    'type' => 'Berita',
                    'title' => $post->title,
                    'user' => 'Administrator',
                    'time' => $post->created_at->diffForHumans(),
                    'timestamp' => $post->created_at->timestamp,
                    'icon' => 'Newspaper',
                    'color' => 'emerald'
                ];
            });
            $recentActivities = $recentActivities->merge($recentPosts);

            // Recent Articles
            $recentArticles = \App\Models\Article::latest()->take(3)->get()->map(function($article) {
                return [
                    'type' => 'Artikel',
                    'title' => $article->title,
                    'user' => 'Administrator',
                    'time' => $article->created_at->diffForHumans(),
                    'timestamp' => $article->created_at->timestamp,
                    'icon' => 'FileText',
                    'color' => 'blue'
                ];
            });
            $recentActivities = $recentActivities->merge($recentArticles);
        }

        // Agenda, Gallery, Members (Admin & Ketua)
        if ($user->isAdmin() || $user->isKetua()) {
            $stats['galleries'] = Gallery::count();
            $stats['members'] = Member::count();
            $stats['agendas'] = \App\Models\Agenda::count();
            $stats['statistics'] = \App\Models\Statistic::count();

            // Recent Agendas
            $recentAgendas = \App\Models\Agenda::latest()->take(3)->get()->map(function($agenda) {
                return [
                    'type' => 'Agenda',
                    'title' => $agenda->title,
                    'user' => 'Administrator',
                    'time' => $agenda->created_at->diffForHumans(),
                    'timestamp' => $agenda->created_at->timestamp,
                    'icon' => 'Calendar',
                    'color' => 'amber'
                ];
            });
            $recentActivities = $recentActivities->merge($recentAgendas);
        }

        $activities = $recentActivities
            ->sortByDesc('timestamp')
            ->values()
            ->take(6);

        return \Inertia\Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivities' => $activities,
        ]);
    }
}
