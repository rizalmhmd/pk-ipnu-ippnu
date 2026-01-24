@extends('layouts.public')

@section('content')
<section class="hero-section rounded-4 overflow-hidden shadow-lg mt-4 mb-5" style="{{ $pageSetting && $pageSetting->hero_image ? 'background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(' . $storageUrl($pageSetting->hero_image) . ');' : '' }}">
    <div class="container text-center text-white py-5 px-4">
        <h1 class="display-3 fw-bold mb-3 animate-fade-in-up">{{ optional($pageSetting)->hero_title ?? 'Galeri Foto' }}</h1>
        <p class="lead mb-0 animate-fade-in-up" style="animation-delay: 0.1s">{{ optional($pageSetting)->hero_description ?? 'Dokumentasi kegiatan kami' }}</p>
    </div>
</section>

<div class="container mb-5">
    <div class="row g-4">
        @forelse($galleries as $index => $gallery)
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm overflow-hidden animate-fade-in-up" 
                 style="animation-delay: {{ $index * 0.05 }}s; border-radius: 1.25rem; cursor: pointer;"
                 onclick="previewImage('{{ $storageUrl($gallery->image_path) }}', '{{ $gallery->title }}')">
                <div class="group-hover-container overflow-hidden position-relative img-placeholder" style="height: 220px;">
                    <img src="{{ $storageUrl($gallery->image_path) }}" class="card-img-top" alt="{{ $gallery->title }}" style="height: 220px; object-fit: cover; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);" loading="lazy" decoding="async">
                    <div class="image-overlay d-flex align-items-center justify-content-center">
                        <i class="fas fa-search-plus text-white fs-3"></i>
                    </div>
                </div>
                <div class="card-body p-3 text-center bg-white">
                    <h6 class="fw-bold mb-0 text-dark" style="font-size: 0.95rem;">{{ $gallery->title }}</h6>
                </div>
            </div>
        </div>
        @empty
        <div class="col-12 text-center py-5">
            <img src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="Empty" style="max-height: 150px;" class="mb-3">
            <p class="text-muted">Galeri foto belum memiliki koleksi saat ini.</p>
        </div>
        @endforelse
    </div>

    <div class="d-flex justify-content-center mt-5">
        {{ $galleries->links() }}
    </div>
</div>

<!-- Image Preview Modal -->
<div class="modal fade px-3" id="imagePreviewModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 bg-transparent">
            <div class="modal-header border-0 p-0 mb-2 justify-content-end">
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 text-center position-relative">
                <img src="" id="previewImg" class="img-fluid rounded-4 shadow-lg animate-zoom-in" style="max-height: 85vh; object-fit: contain;">
                <div class="preview-caption mt-3 p-3 bg-white bg-opacity-10 backdrop-blur rounded-pill d-inline-block text-white px-4 fw-medium border border-white border-opacity-10">
                    <span id="previewTitle"></span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .group-hover-container:hover img {
        transform: scale(1.15);
        filter: brightness(0.7);
    }
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .group-hover-container:hover .image-overlay {
        opacity: 1;
    }
    .backdrop-blur {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .animate-zoom-in {
        animation: zoomIn 0.3s ease-out forwards;
    }
</style>

@push('scripts')
<script>
    function previewImage(url, title) {
        const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
        const img = document.getElementById('previewImg');
        const caption = document.getElementById('previewTitle');
        
        img.src = url;
        caption.innerText = title;
        modal.show();
    }
</script>
@endpush
@endsection
