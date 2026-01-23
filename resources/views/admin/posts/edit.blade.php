@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Edit Berita</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.posts.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.posts.update', $post->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="title" class="form-label fw-bold small text-uppercase text-muted">Judul Berita</label>
                <input type="text" class="form-control form-control-lg @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title', $post->title) }}" placeholder="Masukkan judul berita..." required>
                @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="image" class="form-label fw-bold small text-uppercase text-muted">Gambar Utama</label>
                <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image">
                <div class="form-text text-muted">Biarkan kosong jika tidak ingin mengganti gambar.</div>
                @if($post->image)
                    <div class="mt-3">
                        <img src="{{ asset('storage/' . $post->image) }}" alt="Current Image" class="img-thumbnail rounded shadow-sm" style="max-height: 200px">
                        <div class="small text-muted mt-1">Gambar saat ini</div>
                    </div>
                @endif
                @error('image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="content" class="form-label fw-bold small text-uppercase text-muted">Konten Berita</label>
                <textarea class="form-control @error('content') is-invalid @enderror" id="content" name="content" rows="12" placeholder="Tuliskan isi berita di sini..." required>{{ old('content', $post->content) }}</textarea>
                @error('content')
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
