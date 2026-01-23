@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Tambah Foto Galeri</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.galleries.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.galleries.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="mb-4">
                <label for="title" class="form-label fw-bold small text-uppercase text-muted">Keterangan Foto</label>
                <input type="text" class="form-control form-control-lg @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title') }}" placeholder="Berikan judul atau keterangan singkat..." required>
                @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="image" class="form-label fw-bold small text-uppercase text-muted">Pilih Foto</label>
                <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" required>
                <div class="form-text text-muted">Format yang disarankan: JPG, JPEG, PNG. Maksimal 2MB.</div>
                @error('image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-2">
                <button type="reset" class="btn btn-light border">Reset</button>
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Upload Foto</button>
            </div>
        </form>
    </div>
</div>
@endsection
