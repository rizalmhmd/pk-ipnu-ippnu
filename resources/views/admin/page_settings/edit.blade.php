@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Atur Halaman: <span class="text-capitalize">{{ $pageSetting->page_name }}</span></h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.page-settings.index') }}" class="btn btn-outline-secondary shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.page-settings.update', $pageSetting->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="hero_title" class="form-label fw-bold small text-uppercase text-muted">Judul Hero</label>
                <input type="text" class="form-control form-control-lg @error('hero_title') is-invalid @enderror" id="hero_title" name="hero_title" value="{{ old('hero_title', $pageSetting->hero_title) }}" placeholder="Judul besar yang muncul di atas..." required>
                @error('hero_title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="hero_description" class="form-label fw-bold small text-uppercase text-muted">Deskripsi Hero</label>
                <textarea class="form-control @error('hero_description') is-invalid @enderror" id="hero_description" name="hero_description" rows="3" placeholder="Deskripsi singkat di bawah judul...">{{ old('hero_description', $pageSetting->hero_description) }}</textarea>
                @error('hero_description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="hero_image" class="form-label fw-bold small text-uppercase text-muted">Gambar Latar (Background)</label>
                <input type="file" class="form-control @error('hero_image') is-invalid @enderror" id="hero_image" name="hero_image">
                <div class="form-text text-muted">Format yang disarankan: JPG, WEBP. Ukuran besar (misal 1920x1080). Maksimal 2MB.</div>
                @if($pageSetting->hero_image)
                    <div class="mt-3">
                        <img src="{{ $storageUrl($pageSetting->hero_image) }}" alt="Current Background" class="img-thumbnail rounded shadow-sm" style="max-height: 200px">
                        <div class="small text-muted mt-1">Background saat ini</div>
                    </div>
                @endif
                @error('hero_image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            @if($pageSetting->page_name == 'profile')
            <div class="mb-4">
                <label for="content_sejarah" class="form-label fw-bold small text-uppercase text-muted">Konten Sejarah</label>
                <textarea class="form-control @error('content_sejarah') is-invalid @enderror" id="content_sejarah" name="content_sejarah" rows="5" placeholder="Tuliskan sejarah organisasi di sini...">{{ old('content_sejarah', $pageSetting->content_sejarah) }}</textarea>
                @error('content_sejarah')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="content_visi_misi" class="form-label fw-bold small text-uppercase text-muted">Konten Visi & Misi</label>
                <textarea class="form-control @error('content_visi_misi') is-invalid @enderror" id="content_visi_misi" name="content_visi_misi" rows="5" placeholder="Tuliskan visi & misi organisasi di sini (gunakan list HTML jika perlu)...">{{ old('content_visi_misi', $pageSetting->content_visi_misi) }}</textarea>
                @error('content_visi_misi')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                <div class="form-text text-muted">Tips: Anda bisa menggunakan tag HTML seperti &lt;ul&gt;&lt;li&gt; untuk membuat daftar visi & misi.</div>
            </div>
            @endif

            <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@endsection
