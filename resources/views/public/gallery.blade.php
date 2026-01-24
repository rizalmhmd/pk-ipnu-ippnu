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
            <div class="card card-custom h-100 border-0 shadow-sm overflow-hidden animate-fade-in-up" style="animation-delay: {{ $index * 0.05 }}s">
                <div class="position-relative group-hover-container">
                    <img src="{{ $storageUrl($gallery->image_path) }}" class="card-img-top" alt="{{ $gallery->title }}" style="height: 250px; object-fit: cover; transition: transform 0.5s ease;">
                    <div class="card-img-overlay d-flex align-items-end justify-content-center p-0 opacity-0 transition-all bg-gradient-to-t-dark">
                        <div class="p-3 w-100 text-center text-white">
                            <h6 class="fw-bold mb-0">{{ $gallery->title }}</h6>
                        </div>
                    </div>
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

<style>
    .bg-gradient-to-t-dark {
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
    }
    .group-hover-container:hover img {
        transform: scale(1.1);
    }
    .group-hover-container:hover .card-img-overlay {
        opacity: 1;
    }
</style>
@endsection
