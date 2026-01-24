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
        $postsCount = Post::count();
        $galleriesCount = Gallery::count();
        $membersCount = Member::count();
        $agendasCount = \App\Models\Agenda::count();
        
        $recentActivities = collect();
        
        // Add recent posts
        $recentPosts = Post::latest()->take(5)->get()->map(function($post) {
            return [
                'type' => 'Berita',
                'title' => $post->title,
                'user' => 'Administrator',
                'time' => $post->created_at->diffForHumans(),
                'icon' => 'bi-newspaper',
                'color' => 'primary'
            ];
        });
        
        // Add recent agendas
        $recentAgendas = \App\Models\Agenda::latest()->take(5)->get()->map(function($agenda) {
            return [
                'type' => 'Agenda',
                'title' => $agenda->title,
                'user' => 'Administrator',
                'time' => $agenda->created_at->diffForHumans(),
                'icon' => 'bi-calendar-event',
                'color' => 'success'
            ];
        });
        
        $activities = $recentActivities->merge($recentPosts)->merge($recentAgendas)
            ->sortByDesc('time')
            ->take(5);

        return view('admin.dashboard', compact(
            'postsCount', 
            'galleriesCount', 
            'membersCount', 
            'agendasCount',
            'activities'
        ));
    }
}
