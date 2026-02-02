@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Tambah Berita Baru</h1>
        <p class="text-secondary mb-0">Publikasikan informasi dan update terbaru untuk audiens Anda.</p>
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
            <form action="{{ route('admin.posts.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                
                <div class="mb-4">
                    <label for="title" class="form-label-premium">Judul Berita</label>
                    <input type="text" class="form-control-premium w-100 @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title') }}" placeholder="Contoh: PKPT IPNU IPPNU Sukses Gelar Makesta 2026" required>
                    @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="row mb-4">
                    <div class="col-md-12">
                        <label for="image" class="form-label-premium">Gambar Utama</label>
                        <div class="card bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                            <div id="post-preview-container" class="mb-3 d-none">
                                <img id="post-preview" src="#" alt="Preview" class="img-fluid rounded-3 shadow-sm" style="max-height: 250px;">
                            </div>
                            <div id="upload-placeholder">
                                <i class="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                            </div>
                            <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" onchange="previewPostImage(this)">
                            <div class="small text-secondary mt-2">Seret file ke sini atau klik untuk browse (Max: 5MB)</div>
                        </div>
                        <div class="form-text text-secondary small">Format: JPG, PNG, atau WEBP. Dimensi yang disarankan: 1200x800px.</div>
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

@push('scripts')
<script>
    function previewPostImage(input) {
        const file = input.files[0];
        const preview = document.getElementById('post-preview');
        const container = document.getElementById('post-preview-container');
        const placeholder = document.getElementById('upload-placeholder');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                container.classList.remove('d-none');
                placeholder.classList.add('d-none');
            }
            reader.readAsDataURL(file);
        }
    }
</script>
@endpush

                <div class="mb-5">
                    <label for="content" class="form-label-premium">Isi Berita Lengkap</label>
                    <textarea class="form-control-premium w-100 @error('content') is-invalid @enderror" id="content" name="content" rows="15" placeholder="Mulailah menulis narasi berita Anda di sini..." required>{{ old('content') }}</textarea>
                    @error('content')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top">
                    <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold">Reset Form</button>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-send me-2"></i> Publikasikan Sekarang
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card-premium p-4 bg-primary bg-opacity-10 border-0 mb-4 text-primary">
            <h6 class="fw-bold mb-3"><i class="bi bi-lightbulb me-2"></i> Tips Menulis</h6>
            <ul class="small ps-3 mb-0">
                <li class="mb-2">Gunakan judul yang singkat dan menggambarkan isi berita secara tepat.</li>
                <li class="mb-2">Pastikan gambar utama berkualitas tinggi untuk daya tarik visual.</li>
                <li>Gunakan paragraf yang tidak terlalu panjang untuk kenyamanan pembaca di perangkat mobile.</li>
            </ul>
        </div>
    </div>
</div>

<style>
    .border-dashed { border-style: dashed !important; border-width: 2px !important; border-color: var(--border-color) !important; }
</style>
@endsection
