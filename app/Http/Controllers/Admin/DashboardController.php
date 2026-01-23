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
        
        return view('admin.dashboard', compact('postsCount', 'galleriesCount', 'membersCount'));
    }
}
