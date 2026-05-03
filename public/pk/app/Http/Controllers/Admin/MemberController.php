<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Member;
use Illuminate\Support\Facades\Storage;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Members/Index', compact('members'));
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Members/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'instagram' => 'nullable|string',
            'type' => 'required|in:ipnu,ippnu',
            'order' => 'nullable|integer',
            'level' => 'required|integer|min:1|max:3',
            'department' => 'nullable|string|max:255',
        ]);

        $data = $request->all();

        if ($request->hasFile('photo')) {
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('members', $request->file('photo'));
                $data['photo'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['photo'] = $request->file('photo')->store('members', 'public');
            }
        }

        Member::create($data);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil ditambahkan');
    }

    public function edit(Member $member)
    {
        return \Inertia\Inertia::render('Admin/Members/Edit', compact('member'));
    }

    public function update(Request $request, Member $member)
    {
        $request->validate([
            'name' => 'required',
            'position' => 'required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'instagram' => 'nullable|string',
            'type' => 'required|in:ipnu,ippnu',
            'order' => 'nullable|integer',
            'level' => 'required|integer|min:1|max:3',
            'department' => 'nullable|string|max:255',
        ]);

        $data = $request->only(['name', 'position', 'instagram', 'type', 'level', 'department']);
        $data['order'] = (int) ($request->order ?? 0);

        if ($request->hasFile('photo')) {
            if ($member->photo) {
                try {
                    Storage::delete($member->photo);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Photo delete failed: " . $e->getMessage());
                }
            }
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary' || config('cloudinary.cloud_url')) {
                $path = Storage::disk('cloudinary')->putFile('members', $request->file('photo'));
                $data['photo'] = Storage::disk('cloudinary')->url($path);
            } else {
                $data['photo'] = $request->file('photo')->store('members', 'public');
            }
        } elseif ($request->remove_photo == 'true' || $request->remove_photo === true) {
            if ($member->photo) {
                try {
                    Storage::delete($member->photo);
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning("Photo delete failed: " . $e->getMessage());
                }
            }
            $data['photo'] = null;
        }

        $member->update($data);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil diperbarui');
    }

    public function destroy(Member $member)
    {
        if ($member->photo) {
            try {
                Storage::delete($member->photo);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning("Cloudinary delete failed: " . $e->getMessage());
            }
        }
        $member->delete();

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil dihapus');
    }
}
