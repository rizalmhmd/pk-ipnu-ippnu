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

<div class="card-premium">
    <div class="card-body p-4 p-lg-5">
        <form action="{{ route('admin.page-settings.update', $pageSetting->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="hero_title" class="form-label-premium">Judul Hero</label>
                <input type="text" class="form-control-premium w-100 @error('hero_title') is-invalid @enderror" id="hero_title" name="hero_title" value="{{ old('hero_title', $pageSetting->hero_title) }}" placeholder="Judul besar yang muncul di atas..." required>
                @error('hero_title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="hero_description" class="form-label-premium">Deskripsi Hero</label>
                <textarea class="form-control-premium w-100 @error('hero_description') is-invalid @enderror" id="hero_description" name="hero_description" rows="3" placeholder="Deskripsi singkat di bawah judul...">{{ old('hero_description', $pageSetting->hero_description) }}</textarea>
                @error('hero_description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-5">
                <label for="hero_image" class="form-label-premium">Gambar Latar (Background)</label>
                @if($pageSetting->hero_image)
                    <div class="mb-3 d-flex align-items-center gap-3">
                        <img src="{{ $storageUrl($pageSetting->hero_image) }}" alt="Current Background" class="rounded-3 shadow-sm border border-color p-1" style="max-height: 120px; width: 200px; object-fit: cover;">
                        <div>
                            <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">Background Saat Ini</span>
                        </div>
                    </div>
                @endif
                <div class="card-premium bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                    <i class="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                    <input type="file" class="form-control form-control-premium @error('hero_image') is-invalid @enderror" id="hero_image" name="hero_image">
                    <div class="small text-secondary mt-2">Format yang disarankan: JPG, WEBP. Ukuran besar (misal 1920x1080). Maksimal 2MB.</div>
                </div>
                @error('hero_image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            @if($pageSetting->page_name == 'profile')
            <div class="mb-4">
                <label for="content_sejarah" class="form-label-premium">Konten Sejarah</label>
                <textarea class="form-control-premium w-100 @error('content_sejarah') is-invalid @enderror" id="content_sejarah" name="content_sejarah" rows="5" placeholder="Tuliskan sejarah organisasi di sini...">{{ old('content_sejarah', $pageSetting->content_sejarah) }}</textarea>
                @error('content_sejarah')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="content_visi_misi" class="form-label-premium">Konten Visi & Misi</label>
                <textarea class="form-control-premium w-100 @error('content_visi_misi') is-invalid @enderror" id="content_visi_misi" name="content_visi_misi" rows="5" placeholder="Tuliskan visi & misi organisasi di sini (gunakan list HTML jika perlu)...">{{ old('content_visi_misi', $pageSetting->content_visi_misi) }}</textarea>
                @error('content_visi_misi')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                <div class="form-text text-secondary small">Tips: Anda bisa menggunakan tag HTML seperti &lt;ul&gt;&lt;li&gt; untuk membuat daftar visi & misi.</div>
            </div>
            @endif

            <div class="d-flex justify-content-end gap-3 pt-4 border-top border-color">
                <a href="{{ route('admin.page-settings.index') }}" class="btn btn-link text-secondary text-decoration-none fw-bold">Batalkan</a>
                <button type="submit" class="btn-premium px-5">
                    <i class="bi bi-check2-circle me-2"></i> Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
