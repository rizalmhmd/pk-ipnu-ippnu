@extends('layouts.public')

@section('content')
<section class="hero-section rounded-4 overflow-hidden shadow-lg mb-5" 
    style="{{ $pageSetting && $pageSetting->hero_image ? 'background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(' . $storageUrl($pageSetting->hero_image) . ');' : '' }}">
    <div class="container text-center text-white py-4 py-md-5 px-4">
        <h1 class="display-4 fw-bold mb-3 animate__animated animate__fadeInUp">
            {{ optional($pageSetting)->hero_title ?? 'Selamat Datang di PKPT IPNU IPPNU' }}
        </h1>
        <p class="lead mb-0 animate__animated animate__fadeInUp" style="animation-delay: 0.1s">
            {{ optional($pageSetting)->hero_description ?? 'Belajar, Berjuang, Bertaqwa' }}
        </p>
    </div>
</section>

<div class="container my-5">
    <div class="row">
        <div class="col-md-8">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="section-title mb-0">{{ $siteSetting->home_news_title ?? 'Berita Terkini' }}</h2>
                <a href="{{ route('news.index') }}" class="btn btn-link text-primary p-0">Lihat Semua <i class="fas fa-chevron-right ms-1 small"></i></a>
            </div>
            <div class="row">
                @forelse($posts as $post)
                <div class="col-md-6 mb-4">
                    <div class="card card-custom h-100 border-0 shadow-sm animate-fade-in-up">
                        <div class="position-relative overflow-hidden img-placeholder" style="height: 200px;">
                            @if($post->image)
                            <img src="{{ $storageUrl($post->image) }}" class="card-img-top" alt="{{ $post->title }}" style="height: 200px; object-fit: cover;" loading="lazy" decoding="async">
                            @else
                            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;" loading="lazy" decoding="async">
                            @endif
                            <div class="position-absolute top-0 end-0 m-2">
                                <span class="badge bg-primary rounded-pill shadow-sm">News</span>
                            </div>
                        </div>
                        <div class="card-body p-4">
                            <div class="text-muted small mb-2"><i class="far fa-calendar-alt me-1"></i> {{ $post->created_at->format('d M Y') }}</div>
                            <h5 class="card-title fw-bold mb-3">{{ $post->title }}</h5>
                            <p class="card-text text-muted mb-4">{{ Str::limit(strip_tags($post->content), 100) }}</p>
                            <a href="{{ route('news.show', $post->slug) }}" class="btn btn-outline-primary rounded-pill btn-sm px-4">Baca Selengkapnya</a>
                        </div>
                    </div>
                </div>
                @empty
                <div class="col-12 text-center py-5">
                    <img src="https://illustrations.popsy.co/gray/empty-states.svg" alt="Empty" style="max-height: 150px;" class="mb-3" loading="lazy">
                    <p class="text-muted">Belum ada berita terbaru saat ini.</p>
                </div>
                @endforelse
            </div>
        </div>
        <div class="col-md-4">
            <div class="card border-0 shadow-sm mb-4 animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h5 class="fw-bold mb-0">{{ optional($greeting)->hero_title ?? 'Sambutan Ketua' }}</h5>
                </div>
                <div class="card-body p-4 text-center">
                    <div class="mb-3 d-inline-block img-placeholder rounded-circle" style="width: 100px; height: 100px;">
                        @if(optional($greeting)->hero_image)
                        <img src="{{ $storageUrl($greeting->hero_image) }}" class="rounded-circle shadow-sm" style="width: 100px; height: 100px; object-fit: cover; border: 3px solid var(--primary-green);" loading="lazy">
                        @else
                        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 100px; height: 100px; border: 3px solid var(--primary-green);">
                            <i class="fas fa-user-tie fa-3x text-muted"></i>
                        </div>
                        @endif
                    </div>
                    <p class="card-text text-muted fst-italic text-center">
                        <i class="fas fa-quote-left me-2 text-primary opacity-50"></i>
                        {{ optional($greeting)->hero_description ?? 'Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua.' }}
                        <i class="fas fa-quote-right ms-2 text-primary opacity-50"></i>
                    </p>
                </div>
            </div>

            <div class="card border-0 shadow-sm animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="fw-bold mb-0">{{ $siteSetting->home_agenda_title ?? 'Agenda Terdekat' }}</h5>
                        <i class="fas fa-calendar-alt text-primary"></i>
                    </div>
                </div>
                <div class="card-body p-4">
                    <ul class="list-group list-group-flush">
                        @forelse($agendas as $agenda)
                        <li class="list-group-item px-0 py-3 border-light">
                            <div class="d-flex align-items-start gap-3">
                                <div class="bg-light rounded p-2 text-center" style="min-width: 50px;">
                                    <div class="small fw-bold text-uppercase text-primary">{{ $agenda->event_date->format('M') }}</div>
                                    <div class="h4 mb-0 fw-bold">{{ $agenda->event_date->format('d') }}</div>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-1">{{ $agenda->title }}</h6>
                                    <div class="small text-muted mb-1">
                                        <i class="far fa-clock me-1"></i> {{ $agenda->event_time ? \Carbon\Carbon::parse($agenda->event_time)->format('H:i') : '00:00' }} WIB
                                    </div>
                                    @if($agenda->location)
                                    <div class="small text-muted">
                                        <i class="fas fa-map-marker-alt me-1"></i> {{ $agenda->location }}
                                    </div>
                                    @endif
                                </div>
                            </div>
                        </li>
                        @empty
                        <li class="list-group-item px-0 py-4 text-center border-0">
                            <div class="text-muted mb-2">
                                <i class="far fa-calendar-check fa-3x opacity-25"></i>
                            </div>
                            <p class="text-muted small">Belum ada agenda terdekat.</p>
                        </li>
                        @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
