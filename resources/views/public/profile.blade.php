@extends('layouts.public')

@section('content')
<section class="hero-section rounded-4 overflow-hidden shadow-lg mt-4 mb-5" style="{{ $pageSetting && $pageSetting->hero_image ? 'background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(' . asset('storage/' . $pageSetting->hero_image) . ');' : '' }}">
    <div class="container text-center text-white py-5 px-4">
        <h1 class="display-3 fw-bold mb-3 animate-fade-in-up">{{ optional($pageSetting)->hero_title ?? 'Profil Organisasi' }}</h1>
        <p class="lead mb-0 animate-fade-in-up" style="animation-delay: 0.1s">{{ optional($pageSetting)->hero_description ?? 'Mengenal lebih dekat PKPT IPNU IPPNU' }}</p>
    </div>
</section>

<div class="container mb-5">
    <div class="row g-4 mb-5">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 animate-slide-in">
                <div class="card-body p-4 p-lg-5">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary-light rounded-pill p-3 me-3">
                            <i class="fas fa-history text-primary"></i>
                        </div>
                        <h3 class="fw-bold mb-0">Sejarah</h3>
                    </div>
                    <div class="content-text text-muted lh-lg">
                        {!! $pageSetting->content_sejarah ?? '<p>PKPT IPNU IPPNU adalah wadah perjuangan bagi pelajar Nahdliyin di tingkat perguruan tinggi yang berkomitmen dalam dakwah dan pemberdayaan pelajar.</p>' !!}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 animate-slide-in" style="animation-delay: 0.2s">
                <div class="card-body p-4 p-lg-5">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary-light rounded-pill p-3 me-3">
                            <i class="fas fa-bullseye text-primary"></i>
                        </div>
                        <h3 class="fw-bold mb-0">Visi & Misi</h3>
                    </div>
                    <div class="content-text text-muted lh-lg">
                        @if($pageSetting->content_visi_misi)
                            {!! $pageSetting->content_visi_misi !!}
                        @else
                            <ul class="list-unstyled">
                                <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Terbentuknya pelajar bangsa yang bertaqwa kepada Allah SWT.</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Mengembangkan potensi minat dan bakat mahasiswa.</li>
                                <li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i> Membangun sinergi antar kader Nahdliyin.</li>
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="text-center mb-5">
        <h2 class="section-title text-center d-inline-block">Struktur Organisasi</h2>
        <p class="text-muted">Kader terbaik yang berdedikasi tinggi untuk kemajuan organisasi.</p>
    </div>

    <div class="row g-4">
        @forelse($members as $index => $member)
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card card-custom h-100 border-0 shadow-sm text-center animate-fade-in-up" style="animation-delay: {{ $index * 0.1 }}s">
                <div class="card-body p-4">
                    <div class="mb-3">
                        @if($member->photo)
                        <img src="{{ asset('storage/' . $member->photo) }}" class="rounded-circle shadow-sm border border-4 border-white" style="width: 120px; height: 120px; object-fit: cover;" alt="{{ $member->name }}">
                        @else
                        <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center border border-4 border-white" style="width: 120px; height: 120px;">
                            <i class="fas fa-user fa-3x text-muted"></i>
                        </div>
                        @endif
                    </div>
                    <h5 class="fw-bold mb-1">{{ $member->name }}</h5>
                    <p class="text-primary small fw-semibold text-uppercase mb-0">{{ $member->position }}</p>
                </div>
            </div>
        </div>
        @empty
        <div class="col-12 text-center py-5">
            <p class="text-muted">Data struktur organisasi belum tersedia.</p>
        </div>
        @endforelse
    </div>
</div>
@endsection
