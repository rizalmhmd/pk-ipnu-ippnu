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
        $member = $user->member;
        $hasMemberInputs = $request->filled('position')
            || $request->filled('instagram')
            || $request->hasFile('photo');

        if ($member || $hasMemberInputs) {
            $memberData = [
                'name' => $user->name,
                'position' => $request->input('position') ?: ($member?->position ?: ($user->role_label ?? 'Pengurus')),
                'instagram' => $request->input('instagram'),
                'type' => $request->input('type') ?: ($member?->type ?: 'ipnu'),
            ];

            if ($request->hasFile('photo')) {
                \App\Services\FileStorageService::delete($member?->photo);
                $memberData['photo'] = \App\Services\FileStorageService::upload($request->file('photo'), 'members');
            }

            if ($member) {
                $member->update($memberData);
            } else {
                \App\Models\Member::create(array_merge(['user_id' => $user->id], $memberData));
            }
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
