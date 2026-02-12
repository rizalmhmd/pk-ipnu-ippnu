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
        ]);

        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('members', 'public');
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
        ]);

        $data = $request->all();

        if ($request->hasFile('photo')) {
            if ($member->photo) {
                try {
                    Storage::delete($member->photo);
                } catch (\Exception $e) {
                    // Ignore if file not found on cloud
                }
            }
            $data['photo'] = $request->file('photo')->store('members', 'public');
        }

        $member->update($data);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil diperbarui');
    }

    public function destroy(Member $member)
    {
        if ($member->photo) {
            try {
                Storage::delete($member->photo);
            } catch (\Exception $e) {
                // Ignore if already deleted from cloud
            }
        }
        $member->delete();

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil dihapus');
    }
}
