@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Tambah Anggota</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.members.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="mb-4">
                <label for="name" class="form-label fw-bold small text-uppercase text-muted">Nama Lengkap</label>
                <input type="text" class="form-control form-control-lg @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name') }}" placeholder="Contoh: Ahmad Fauzi" required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="position" class="form-label fw-bold small text-uppercase text-muted">Jabatan</label>
                <input type="text" class="form-control form-control-lg @error('position') is-invalid @enderror" id="position" name="position" value="{{ old('position') }}" placeholder="Contoh: Ketua Umum" required>
                @error('position')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="photo" class="form-label fw-bold small text-uppercase text-muted">Foto Profil</label>
                <input type="file" class="form-control @error('photo') is-invalid @enderror" id="photo" name="photo">
                <div class="form-text text-muted">Format yang disarankan: JPG, PNG. Maksimal 2MB.</div>
                @error('photo')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-2">
                <button type="reset" class="btn btn-light border">Reset</button>
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Simpan Anggota</button>
            </div>
        </form>
    </div>
</div>
@endsection
