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
        
        $events = $agendas->map(function($agenda) {
            return [
                'id' => $agenda->id,
                'title' => $agenda->title,
                'start' => $agenda->event_date->toDateString(),
                'time' => $agenda->event_time ? \Carbon\Carbon::parse($agenda->event_time)->format('H:i') : null,
                'description' => $agenda->description,
                'location' => $agenda->location,
                'allDay' => true,
                'color' => '#008000', // PKPT Color
            ];
        });

        return response()->json($events);
    }
}
