<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): \Inertia\Response
    {
        return \Inertia\Inertia::render('Admin/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'member' => $request->user()->member,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Handle Member Data
        $memberData = $request->only(['position', 'instagram', 'type']);
        
        $member = $user->member;
        if (!$member) {
            $member = new \App\Models\Member(['user_id' => $user->id]);
        }

        if ($request->hasFile('photo')) {
            if ($member->photo) {
                try {
                    \Illuminate\Support\Facades\Storage::delete($member->photo);
                } catch (\Throwable $e) {
                }
            }
            
            if (config('filesystems.default') == 'cloudinary' || env('FILESYSTEM_DISK') == 'cloudinary') {
                $path = \Illuminate\Support\Facades\Storage::disk('cloudinary')->putFile('members', $request->file('photo'));
                $memberData['photo'] = \Illuminate\Support\Facades\Storage::disk('cloudinary')->url($path);
            } else {
                $memberData['photo'] = $request->file('photo')->store('members', 'public');
            }
        }

        // Ensure name is synced if changed in user but not in member (or just always sync)
        $memberData['name'] = $user->name;

        if ($member->exists) {
            $member->update($memberData);
        } else {
            $member->fill($memberData);
            $member->save();
        }

        return Redirect::route('admin.profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
