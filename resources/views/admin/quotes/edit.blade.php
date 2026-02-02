@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Edit Quote</h1>
        <p class="text-secondary mb-0">Perbarui isi kutipan atau informasi tokoh yang sudah ada.</p>
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
            <form action="{{ route('admin.quotes.update', $quote->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                
                <div class="mb-4">
                    <label for="content" class="form-label-premium d-block">Isi Kutipan <span class="text-danger">*</span></label>
                    <textarea name="content" id="content" rows="4" class="form-control-premium w-100 @error('content') is-invalid @enderror" required placeholder="Tuliskan isi kutipan di sini...">{{ old('content', $quote->content) }}</textarea>
                    @error('content')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-4">
                    <label for="author" class="form-label-premium d-block">Penulis / Tokoh</label>
                    <input type="text" name="author" id="author" class="form-control-premium w-100 @error('author') is-invalid @enderror" value="{{ old('author', $quote->author) }}" placeholder="Contoh: KH. Hasyim Asy'ari">
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
                            <input type="number" name="order" id="order" class="form-control-premium border-start-0 @error('order') is-invalid @enderror" value="{{ old('order', $quote->order) }}" style="border-radius: 0 10px 10px 0; height: 50px;">
                        </div>
                        @error('order')
                            <div class="invalid-feedback d-block">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label-premium d-block opacity-0 d-none d-md-block">Status</label>
                        <div class="form-check form-switch border rounded-3 d-flex align-items-center" style="border-color: var(--border-color) !important; background-color: var(--bg-secondary); padding: 0 1rem; height: 50px;">
                            <input class="form-check-input ms-0" type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $quote->is_active) ? 'checked' : '' }}>
                            <label class="form-check-label fw-bold ms-2 mb-0" for="is_active">Aktifkan Quote</label>
                        </div>
                    </div>
                </div>

                <div class="mb-5">
                    <label for="image" class="form-label-premium">Gambar Pendukung (Opsional)</label>
                    <div class="card bg-secondary bg-opacity-10 border-dashed p-4 text-center mb-2 rounded-3">
                        <div id="image-preview-container" class="mb-3 {{ $quote->image ? '' : 'd-none' }}">
                            <img id="image-preview" src="{{ $quote->image ? $storageUrl($quote->image) : '#' }}" alt="Preview" class="img-fluid rounded-3 shadow-sm" style="max-height: 200px;">
                        </div>
                        <div id="upload-placeholder" class="{{ $quote->image ? 'd-none' : '' }}">
                            <i class="bi bi-image fs-1 text-secondary mb-2"></i>
                        </div>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image" name="image" onchange="previewQuoteImage(this)">
                        <div class="small text-secondary mt-2">Pilih foto baru untuk mengganti gambar lama (Max: 2MB)</div>
                    </div>
                    <div class="form-text text-secondary small px-1"><i class="bi bi-info-circle me-1"></i> Biarkan kosong jika tidak ingin mengubah gambar.</div>
                    @error('image')
                        <div class="invalid-feedback d-block">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-flex justify-content-end gap-3 pt-4 border-top">
                    <a href="{{ route('admin.quotes.index') }}" class="btn btn-link text-secondary text-decoration-none fw-bold">Batal</a>
                    <button type="submit" class="btn-premium px-5">
                        <i class="bi bi-check-lg me-2"></i> Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card-premium p-4 bg-primary bg-opacity-10 border-0 mb-4 text-primary">
            <h6 class="fw-bold mb-3"><i class="bi bi-info-circle me-2"></i> Info Perkembangan</h6>
            <p class="small mb-2">Quote ini terakhir diperbarui pada:</p>
            <p class="fw-bold small mb-3">{{ $quote->updated_at->format('d M Y H:i') }}</p>
            <hr style="border-color: rgba(var(--primary-color-rgb), 0.2)">
            <h6 class="fw-bold mb-2">Panduan Cepat</h6>
            <ul class="small ps-3 mb-0">
                <li class="mb-2">Pastikan isi kutipan sudah benar dan tidak ada typo.</li>
                <li>Jika hanya ingin menyembunyikan tanpa menghapus, cukup non-aktifkan melalui switch di samping.</li>
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
</script>
@endpush

<style>
    .border-dashed { border-style: dashed !important; border-width: 2px !important; border-color: var(--border-color) !important; }
</style>
@endsection
