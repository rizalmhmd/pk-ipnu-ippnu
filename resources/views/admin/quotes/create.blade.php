@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Tambah Quote Baru</h1>
        <p class="text-secondary mb-0">Bagikan kutipan inspiratif untuk pengunjung website.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.quotes.index') }}" class="btn btn-link text-secondary text-decoration-none px-3">
            <i class="bi bi-arrow-left me-2"></i> Kembali ke Daftar
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card-premium p-4">
            <form action="{{ route('admin.quotes.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                
                <div class="mb-4">
                    <label for="content" class="form-label-premium d-block">Isi Kutipan <span class="text-danger">*</span></label>
                    <textarea name="content" id="content" rows="4" class="form-control-premium w-100 @error('content') is-invalid @enderror" required placeholder="Tuliskan isi kutipan di sini...">{{ old('content') }}</textarea>
                    @error('content')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="author" class="form-label-premium d-block">Penulis / Tokoh</label>
                    <input type="text" name="author" id="author" class="form-control-premium w-100 @error('author') is-invalid @enderror" value="{{ old('author') }}" placeholder="Contoh: KH. Hasyim Asy'ari">
                    @error('author')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="row align-items-center mb-4">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <label for="order" class="form-label-premium d-block">Urutan Tampilan</label>
                        <div class="input-group">
                            <span class="input-group-text bg-transparent border-end-0" style="border-radius: 10px 0 0 10px; border-color: var(--border-color); height: 50px;">
                                <i class="bi bi-sort-numeric-down text-secondary"></i>
                            </span>
                            <input type="number" name="order" id="order" class="form-control-premium border-start-0 @error('order') is-invalid @enderror" value="{{ old('order', 0) }}" style="border-radius: 0 10px 10px 0; height: 50px;">
                        </div>
                        @error('order')
                            <div class="invalid-feedback d-block">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-premium d-block opacity-0 d-none d-md-block">Status</label>
                        <div class="form-check form-switch border rounded-3 d-flex align-items-center" style="border-color: var(--border-color) !important; background-color: var(--bg-secondary); padding: 0 1rem; height: 50px;">
                            <input class="form-check-input ms-0" type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}>
                            <label class="form-check-label fw-bold ms-2 mb-0" for="is_active">Aktifkan Quote</label>
                        </div>
                    </div>
                </div>

                <div class="mb-5">
                    <label for="image" class="form-label-premium">Gambar Pendukung (Opsional)</label>
                    <div class="card bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                        <div id="image-preview-container" class="mb-3 d-none">
                            <img id="image-preview" src="#" alt="Preview" class="img-fluid rounded-3 shadow-sm" style="max-height: 200px;">
                        </div>
                        <div id="upload-placeholder">
                            <i class="bi bi-image fs-1 text-secondary mb-2"></i>
                        </div>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" onchange="previewQuoteImage(this)">
                        <div class="small text-secondary mt-2">Pilih foto atau gambar latar belakang (Max: 2MB)</div>
                    </div>
                    <div class="form-text text-secondary small px-1"><i class="bi bi-info-circle me-1"></i> Akan digunakan sebagai latar belakang atau foto tokoh.</div>
                    @error('image')
                        <div class="invalid-feedback d-block">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top">
                    <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold" onclick="resetQuotePreview()">Reset Form</button>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-check-lg me-2"></i> Simpan Quote
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card-premium p-4 bg-primary bg-opacity-10 border-0 mb-4 text-primary">
            <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i> Panduan</h6>
            <ul class="small ps-3 mb-0">
                <li class="mb-2">Kutipan akan ditampilkan secara bergantian di slider halaman utama.</li>
                <li class="mb-2">Gunakan kalimat yang inspiratif dan relevan dengan nilai-nilai organisasi.</li>
                <li class="mb-2">Urutan tampilan menentukan posisi quote (semakin kecil angkanya, semakin awal muncul).</li>
                <li>Gunakan gambar berkualitas dengan rasio 16:9 untuk hasil terbaik sebagai latar belakang.</li>
            </ul>
        </div>
    </div>
</div>

@push('scripts')
<script>
    function previewQuoteImage(input) {
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

    function resetQuotePreview() {
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
