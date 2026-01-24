@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Tambah Foto Galeri</h1>
        <p class="text-secondary mb-0">Abadikan momen berharga kegiatan organisasi dalam galeri foto.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.galleries.index') }}" class="btn btn-link text-secondary text-decoration-none px-3">
            <i class="bi bi-arrow-left me-2"></i> Kembali ke Galeri
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8 mx-auto">
        <div class="card-premium p-4">
            <form action="{{ route('admin.galleries.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                
                <div class="mb-4">
                    <label for="title" class="form-label-premium">Keterangan Foto</label>
                    <input type="text" class="form-control-premium w-100 @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title') }}" placeholder="Contoh: Suasana Pelantikan Pengurus PKPT 2026" required>
                    @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-5">
                    <label for="image" class="form-label-premium">Upload File Foto</label>
                    <div class="card bg-secondary bg-opacity-10 border-dashed p-5 text-center mb-2 rounded-3">
                        <i class="bi bi-images fs-1 text-secondary mb-3"></i>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" required>
                        <div class="small text-secondary mt-3">Rekomendasi ukuran: Rasio 4:3 atau 16:9 (Maksimal 2MB)</div>
                    </div>
                    <div class="form-text text-secondary small">Format yang didukung: JPG, JPEG, PNG, WEBP.</div>
                    @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top">
                    <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold">Reset Form</button>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-cloud-arrow-up me-2"></i> Upload & Simpan Ke Galeri
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .border-dashed { border-style: dashed !important; border-width: 2px !important; border-color: var(--border-color) !important; }
</style>
@endsection
