@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Edit Berita</h1>
        <p class="text-secondary mb-0">Perbarui konten artikel atau ubah gambar utama berita.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.posts.index') }}" class="btn btn-link text-secondary text-decoration-none px-3">
            <i class="bi bi-arrow-left me-2"></i> Kembali ke Daftar
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card-premium p-4">
            <form action="{{ route('admin.posts.update', $post->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                
                <div class="mb-4">
                    <label for="title" class="form-label-premium">Judul Berita</label>
                    <input type="text" class="form-control-premium w-100 @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title', $post->title) }}" placeholder="Masukkan judul berita..." required>
                    @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="row mb-4">
                    <div class="col-md-12">
                        <label for="image" class="form-label-premium">Ganti Gambar Utama</label>
                        @if($post->image)
                            <div class="mb-3">
                                <div class="position-relative d-inline-block">
                                    <img src="{{ $storageUrl($post->image) }}" alt="Current Image" class="img-thumbnail rounded-3 shadow-sm" style="max-height: 200px">
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary border border-light">Gambar Saat Ini</span>
                                </div>
                            </div>
                        @endif
                        <div class="card-premium bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                            <i class="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                            <input type="file" class="form-control form-control-premium @error('image') is-invalid @enderror" id="image" name="image">
                            <div class="small text-secondary mt-2">Pilih file baru jika ingin mengganti gambar sebelumnya</div>
                        </div>
                        <div class="form-text text-secondary small">Biarkan kosong jika tidak ingin mengganti gambar. JPG, PNG, atau WEBP.</div>
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="mb-5">
                    <label for="content" class="form-label-premium">Konten Berita</label>
                    <textarea class="form-control-premium w-100 @error('content') is-invalid @enderror" id="content" name="content" rows="15" placeholder="Tuliskan isi berita di sini..." required>{{ old('content', $post->content) }}</textarea>
                    @error('content')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top border-color">
                    <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold">Batalkan Perubahan</button>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-check2-circle me-2"></i> Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card-premium p-4 border-0 mb-4 bg-secondary bg-opacity-10">
            <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2 text-primary"></i> Info Berita</h6>
            <div class="d-flex flex-column gap-3 small text-secondary">
                <div class="d-flex justify-content-between">
                    <span>Terakhir Diubah:</span>
                    <span class="fw-bold text-dark">{{ $post->updated_at->format('d M Y, H:i') }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Dibuat Oleh:</span>
                    <span class="fw-bold text-dark">Administrator</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .border-dashed { border-style: dashed !important; border-width: 2px !important; border-color: var(--border-color) !important; }
</style>
@endsection
