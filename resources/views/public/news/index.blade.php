@extends('layouts.public')

@section('content')
<section class="hero-section rounded-4 overflow-hidden shadow-lg mt-4 mb-5" style="{{ $pageSetting && $pageSetting->hero_image ? 'background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(' . $storageUrl($pageSetting->hero_image) . ');' : '' }}">
    <div class="container text-center text-white py-5 px-4">
        <h1 class="display-3 fw-bold mb-3 animate-fade-in-up">{{ optional($pageSetting)->hero_title ?? 'Berita Terbaru' }}</h1>
        <p class="lead mb-0 animate-fade-in-up" style="animation-delay: 0.1s">{{ optional($pageSetting)->hero_description ?? 'Informasi dan kegiatan terkini' }}</p>
    </div>
</section>

<div class="container mb-5">
    <div class="row g-4">
        @forelse($posts as $index => $post)
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card card-custom h-100 border-0 shadow-sm animate-fade-in-up" style="animation-delay: {{ $index * 0.05 }}s">
                <div class="position-relative">
                    @if($post->image)
                    <img src="{{ $storageUrl($post->image) }}" class="card-img-top" alt="{{ $post->title }}" style="height: 220px; object-fit: cover;">
                    @else
                    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="News Image" style="height: 220px; object-fit: cover;">
                    @endif
                    <div class="position-absolute bottom-0 start-0 m-3">
                        <span class="badge bg-white text-primary rounded-pill shadow-sm px-3">Berita</span>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-2 text-muted small">
                        <i class="far fa-calendar-alt me-2"></i>
                        {{ \Carbon\Carbon::parse($post->published_at)->format('d M Y') }}
                    </div>
                    <h5 class="fw-bold mb-3">{{ $post->title }}</h5>
                    <p class="text-muted small mb-4">{{ Str::limit(strip_tags($post->content), 150) }}</p>
                    <a href="{{ route('news.show', $post->slug) }}" class="btn btn-outline-primary rounded-pill btn-sm px-4">Baca Selengkapnya</a>
                </div>
            </div>
        </div>
        @empty
        <div class="col-12 text-center py-5">
            <img src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="Empty" style="max-height: 150px;" class="mb-3">
            <p class="text-muted">Belum ada berita yang diterbitkan saat ini.</p>
        </div>
        @endforelse
    </div>

    <div class="d-flex justify-content-center mt-5">
        {{ $posts->links() }}
    </div>
</div>
@endsection
