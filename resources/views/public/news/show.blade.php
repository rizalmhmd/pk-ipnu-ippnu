@extends('layouts.public')

@section('content')
<div class="container my-5 pt-4">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <nav aria-label="breadcrumb" class="mb-4 animate-fade-in-up">
                <ol class="breadcrumb bg-light rounded-pill px-4 py-2 small">
                    <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-decoration-none text-muted">Beranda</a></li>
                    <li class="breadcrumb-item"><a href="{{ route('news.index') }}" class="text-decoration-none text-muted">Berita</a></li>
                    <li class="breadcrumb-item active text-primary fw-bold" aria-current="page">Detail Artikrl</li>
                </ol>
            </nav>

            <header class="mb-5 animate-fade-in-up" style="animation-delay: 0.1s">
                <h1 class="display-4 fw-bold mb-3">{{ $post->title }}</h1>
                <div class="d-flex align-items-center text-muted">
                    <div class="bg-primary-light rounded-circle p-2 me-3 d-inline-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="fas fa-user text-primary"></i>
                    </div>
                    <div class="small">
                        <div class="fw-bold text-dark">Administrator</div>
                        <div><i class="far fa-calendar-alt me-1"></i> {{ \Carbon\Carbon::parse($post->published_at)->format('d F Y') }}</div>
                    </div>
                </div>
            </header>

            @if($post->image)
            <div class="position-relative rounded-4 overflow-hidden shadow-lg mb-5 animate-fade-in-up" style="animation-delay: 0.2s">
                <img src="{{ asset('storage/' . $post->image) }}" class="img-fluid w-100" alt="{{ $post->title }}" style="max-height: 500px; object-fit: cover;">
            </div>
            @endif

            <div class="article-content lh-lg text-secondary animate-fade-in-up" style="animation-delay: 0.3s; font-size: 1.1rem;">
                {!! nl2br(e($post->content)) !!}
            </div>

            <div class="mt-5 pt-5 border-top d-flex justify-content-between align-items-center animate-fade-in-up" style="animation-delay: 0.4s">
                <a href="{{ route('news.index') }}" class="btn btn-outline-primary rounded-pill px-4">
                    <i class="fas fa-arrow-left me-2"></i> Kembali ke Berita
                </a>
                <div class="share-links d-flex gap-2">
                    <span class="small text-muted me-2 d-none d-sm-inline">Share:</span>
                    <a href="#" class="btn btn-light btn-sm rounded-circle"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="btn btn-light btn-sm rounded-circle"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="btn btn-light btn-sm rounded-circle"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .bg-primary-light {
        background-color: rgba(13, 110, 253, 0.1);
    }
    .article-content p {
        margin-bottom: 1.5rem;
    }
</style>
@endsection
