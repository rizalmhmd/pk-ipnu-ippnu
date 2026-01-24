@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Profil Saya</h1>
</div>

@if (session('status') === 'profile-updated')
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        Profil berhasil diperbarui.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

<div class="row">
    <!-- Update Profile Information -->
    <div class="col-md-6 mb-4">
        <div class="card shadow-sm h-100">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0">Informasi Profil</h5>
                <small class="text-muted">Perbarui informasi profil dan alamat email akun Anda.</small>
            </div>
            <div class="card-body">
                <form method="post" action="{{ route('admin.profile.update') }}">
                    @csrf
                    @method('patch')

                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Lengkap</label>
                        <input type="text" class="form-control @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $user->name) }}" required autofocus autocomplete="name">
                        @error('name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', $user->email) }}" required autocomplete="username">
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror

                        @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && ! $user->hasVerifiedEmail())
                            <div class="mt-2">
                                <p class="text-sm text-gray-800">
                                    Alamat email Anda belum diverifikasi.
                                    <button form="send-verification" class="btn btn-link p-0 m-0 align-baseline">Klik di sini untuk mengirim ulang email verifikasi.</button>
                                </p>
                                @if (session('status') === 'verification-link-sent')
                                    <p class="mt-2 font-medium text-sm text-green-600">
                                        Link verifikasi baru telah dikirim ke alamat email Anda.
                                    </p>
                                @endif
                            </div>
                        @endif
                    </div>

                    <button type="submit" class="btn btn-primary bg-gradient border-0 shadow-sm px-4">Simpan Perubahan</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Update Password -->
    <div class="col-md-6 mb-4">
        <div class="card shadow-sm h-100">
            <div class="card-header bg-white py-3">
                <h5 class="mb-0">Perbarui Password</h5>
                <small class="text-muted">Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.</small>
            </div>
            <div class="card-body">
                <form method="post" action="{{ route('password.update') }}">
                    @csrf
                    @method('put')

                    <div class="mb-3">
                        <label for="current_password" class="form-label">Password Saat Ini</label>
                        <input type="password" class="form-control @error('current_password', 'updatePassword') is-invalid @enderror" id="current_password" name="current_password" autocomplete="current-password">
                        @error('current_password', 'updatePassword')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password Baru</label>
                        <input type="password" class="form-control @error('password', 'updatePassword') is-invalid @enderror" id="password" name="password" autocomplete="new-password">
                        @error('password', 'updatePassword')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
                        <input type="password" class="form-control @error('password_confirmation', 'updatePassword') is-invalid @enderror" id="password_confirmation" name="password_confirmation" autocomplete="new-password">
                        @error('password_confirmation', 'updatePassword')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <button type="submit" class="btn btn-primary bg-gradient border-0 shadow-sm px-4">Simpan Password</button>

                    @if (session('status') === 'password-updated')
                        <p class="small text-success mt-2 mb-0">Password berhasil disimpan.</p>
                    @endif
                </form>
            </div>
        </div>
    </div>
    
    <!-- Delete Account -->
    <div class="col-12 mb-4">
        <div class="card shadow-sm border-danger">
            <div class="card-header bg-danger text-white py-3">
                <h5 class="mb-0">Hapus Akun</h5>
                <small>Setelah akun Anda dihapus, semua data dan sumber dayanya akan dihapus secara permanen.</small>
            </div>
            <div class="card-body">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmUserDeletionModal">
                    Hapus Akun
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Delete Account Modal -->
<div class="modal fade" id="confirmUserDeletionModal" tabindex="-1" aria-labelledby="confirmUserDeletionModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" action="{{ route('admin.profile.destroy') }}">
                @csrf
                @method('delete')
                
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmUserDeletionModalLabel">Apakah Anda yakin ingin menghapus akun?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted">Setelah akun Anda dihapus, semua data dan sumber dayanya akan dihapus secara permanen. Silakan masukkan password Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.</p>
                    
                    <div class="mb-3">
                        <label for="password_deletion" class="form-label visually-hidden">Password</label>
                        <input type="password" class="form-control @error('password', 'userDeletion') is-invalid @enderror" id="password_deletion" name="password" placeholder="Password" required>
                        @error('password', 'userDeletion')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-danger">Hapus Akun</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
