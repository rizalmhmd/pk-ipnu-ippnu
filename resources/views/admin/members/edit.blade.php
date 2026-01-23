@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Edit Anggota</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.members.update', $member->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="name" class="form-label fw-bold small text-uppercase text-muted">Nama Lengkap</label>
                <input type="text" class="form-control form-control-lg @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $member->name) }}" placeholder="Nama Lengkap" required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="position" class="form-label fw-bold small text-uppercase text-muted">Jabatan</label>
                <input type="text" class="form-control form-control-lg @error('position') is-invalid @enderror" id="position" name="position" value="{{ old('position', $member->position) }}" placeholder="Jabatan" required>
                @error('position')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="photo" class="form-label fw-bold small text-uppercase text-muted">Foto Profil</label>
                <input type="file" class="form-control @error('photo') is-invalid @enderror" id="photo" name="photo">
                <div class="form-text text-muted">Biarkan kosong jika tidak ingin mengganti gambar.</div>
                @if($member->photo)
                    <div class="mt-3">
                        <img src="{{ asset('storage/' . $member->photo) }}" alt="Current Photo" class="rounded shadow-sm" width="100" height="100" style="object-fit: cover;">
                        <div class="small text-muted mt-1">Foto saat ini</div>
                    </div>
                @endif
                @error('photo')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-2">
                <button type="reset" class="btn btn-light border">Reset</button>
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@endsection
