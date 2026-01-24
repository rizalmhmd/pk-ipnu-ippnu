@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Edit Anggota</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.index') }}" class="btn btn-outline-secondary shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-4 p-lg-5">
        <form action="{{ route('admin.members.update', $member->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="name" class="form-label-premium">Nama Lengkap</label>
                <input type="text" class="form-control-premium w-100 @error('name') is-invalid @enderror" id="name" name="name" value="{{ old('name', $member->name) }}" placeholder="Masukkan nama lengkap..." required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="position" class="form-label-premium">Jabatan / Peran</label>
                <input type="text" class="form-control-premium w-100 @error('position') is-invalid @enderror" id="position" name="position" value="{{ old('position', $member->position) }}" placeholder="Contoh: Ketua Umum" required>
                @error('position')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-5">
                <label for="photo" class="form-label-premium">Foto Profil</label>
                @if($member->photo)
                    <div class="mb-3 d-flex align-items-center gap-3">
                        <img src="{{ $storageUrl($member->photo) }}" alt="Current Photo" class="rounded-3 shadow-sm border border-color p-1" width="80" height="80" style="object-fit: cover;">
                        <div>
                            <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">Foto Saat Ini</span>
                        </div>
                    </div>
                @endif
                <div class="card-premium bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                    <i class="bi bi-image fs-1 text-secondary mb-2"></i>
                    <input type="file" class="form-control form-control-premium @error('photo') is-invalid @enderror" id="photo" name="photo">
                    <div class="small text-secondary mt-2">Pilih file baru jika ingin mengganti foto</div>
                </div>
                <div class="form-text text-secondary small">Biarkan kosong jika tidak ingin mengganti. Ukuran rekomendasi: 1:1.</div>
                @error('photo')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-3 pt-4 border-top border-color">
                <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold">Batalkan</button>
                <button type="submit" class="btn-premium px-5">
                    <i class="bi bi-person-check me-2"></i> Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
