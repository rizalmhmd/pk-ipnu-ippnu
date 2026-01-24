@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Tambah Anggota</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.index') }}" class="btn btn-outline-secondary shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-4 p-lg-5">
        <form action="{{ route('admin.members.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="mb-4">
                <label for="name" class="form-label-premium">Nama Lengkap</label>
                <input type="text" class="form-control-premium w-100 @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" placeholder="Masukkan nama lengkap..." required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="position" class="form-label-premium">Jabatan / Peran</label>
                <input type="text" class="form-control-premium w-100 @error('position') is-invalid @enderror" id="position" name="position" value="{{ old('position') }}" placeholder="Contoh: Ketua Umum" required>
                @error('position')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-5">
                <label for="photo" class="form-label-premium">Foto Profil</label>
                <div class="card-premium bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                    <i class="bi bi-image fs-1 text-secondary mb-2"></i>
                    <input type="file" class="form-control form-control-premium @error('photo') is-invalid @enderror" id="photo" name="photo">
                    <div class="small text-secondary mt-2">Format yang disarankan: JPG, PNG. Maksimal 2MB.</div>
                </div>
                @error('photo')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-3 pt-4 border-top border-color">
                <a href="{{ route('admin.members.index') }}" class="btn btn-link text-secondary text-decoration-none fw-bold">Batalkan</a>
                <button type="submit" class="btn-premium px-5">
                    <i class="bi bi-person-plus me-2"></i> Simpan Anggota
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
