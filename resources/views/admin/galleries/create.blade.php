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
                    <div class="card bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                        <div id="image-preview-container" class="mb-3 d-none">
                            <img id="image-preview" src="#" alt="Preview" class="img-fluid rounded-3 shadow-sm" style="max-height: 250px;">
                        </div>
                        <div id="upload-placeholder">
                            <i class="bi bi-images fs-1 text-secondary mb-3"></i>
                        </div>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" required onchange="previewImage(this)">
                        <div class="small text-secondary mt-3">Rekomendasi ukuran: Rasio 4:3 atau 16:9 (Maksimal 5MB)</div>
                    </div>
                    <div class="form-text text-secondary small">Format yang didukung: JPG, JPEG, PNG, WEBP.</div>
                    @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top">
                    <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold" onclick="resetPreview()">Reset Form</button>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-cloud-arrow-up me-2"></i> Upload & Simpan Ke Galeri
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@push('scripts')
<script>
    function previewImage(input) {
        const file = input.files[0];
        const preview = document.getElementById('image-preview');
        const container = document.getElementById('image-preview-container');
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

    function resetPreview() {
        document.getElementById('image-preview').src = '#';
        document.getElementById('image-preview-container').classList.add('d-none');
        document.getElementById('upload-placeholder').classList.remove('d-none');
    }
</script>
@endpush

<style>
    .border-dashed { border-style: dashed !important; border-width: 2px !important; border-color: var(--border-color) !important; }
</style>
@endsection
