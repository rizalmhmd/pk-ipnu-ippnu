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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'instagram' => 'nullable|string|max:255',
            'type' => 'required|in:ipnu,ippnu',
            'order' => 'nullable|integer',
            'level' => 'required|integer|min:1|max:3',
            'department' => 'nullable|string|max:255',
        ]);

        $validated['order'] = (int) ($request->order ?? 0);

        if ($request->hasFile('photo')) {
            $validated['photo'] = \App\Services\FileStorageService::upload($request->file('photo'), 'members');
        }

        Member::create($validated);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil ditambahkan');
    }

    public function edit(Member $member)
    {
        return \Inertia\Inertia::render('Admin/Members/Edit', compact('member'));
    }

    public function update(Request $request, Member $member)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'instagram' => 'nullable|string|max:255',
            'type' => 'required|in:ipnu,ippnu',
            'order' => 'nullable|integer',
            'level' => 'required|integer|min:1|max:3',
            'department' => 'nullable|string|max:255',
        ]);

        $data = $request->only(['name', 'position', 'instagram', 'type', 'level', 'department']);
        $data['order'] = (int) ($request->order ?? 0);

        if ($request->hasFile('photo')) {
            \App\Services\FileStorageService::delete($member->photo);
            $data['photo'] = \App\Services\FileStorageService::upload($request->file('photo'), 'members');
        } elseif ($request->boolean('remove_photo') || $request->remove_photo == 'true') {
            \App\Services\FileStorageService::delete($member->photo);
            $data['photo'] = null;
        }

        $member->update($data);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil diperbarui');
    }

    public function destroy(Member $member)
    {
        \App\Services\FileStorageService::delete($member->photo);
        $member->delete();

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil dihapus');
    }
}
