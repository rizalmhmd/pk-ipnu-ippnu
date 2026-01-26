@extends('layouts.public')

@section('content')
<section class="hero-section rounded-4 overflow-hidden shadow-lg mt-4 mb-5" style="{{ $pageSetting && $pageSetting->hero_image ? 'background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(' . $storageUrl($pageSetting->hero_image) . ');' : '' }}">
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

    <div class="text-center mb-5 mt-5">
        <h2 class="section-title text-center d-inline-block">Struktur Organisasi</h2>
        <p class="text-muted">Kader terbaik yang berdedikasi tinggi untuk kemajuan organisasi.</p>
    </div>

    @php
        $ipnu = $members->where('type', 'ipnu')->sortBy('order');
        $ippnu = $members->where('type', 'ippnu')->sortBy('order');
    @endphp

    <!-- IPNU Section -->
    <div class="mb-5 animate-fade-in-up">
        <div class="d-flex align-items-center mb-4 pb-2 border-bottom">
            <div class="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                <i class="fas fa-menorah text-primary fs-4"></i>
            </div>
            <h3 class="fw-bold mb-0">Pimpinan Rekan <span class="text-primary">IPNU</span></h3>
        </div>
        
        <div class="row g-4 justify-content-center">
            @forelse($ipnu as $index => $member)
            <div class="col-6 col-md-4 col-lg-3">
                <div class="member-card animate-fade-in-up" style="animation-delay: {{ $index * 0.1 }}s">
                    <div class="member-image-wrapper img-placeholder" onclick="previewMember('{{ $member->photo ? $storageUrl($member->photo) : 'https://ui-avatars.com/api/?name='.urlencode($member->name).'&background=059669&color=fff&size=512' }}', '{{ $member->name }}', '{{ $member->position }}')">
                        @if($member->photo)
                            <img src="{{ $storageUrl($member->photo) }}" alt="{{ $member->name }}" class="member-img">
                        @else
                            <div class="member-placeholder">
                                <i class="fas fa-user-tie fa-3x text-white text-opacity-25"></i>
                            </div>
                        @endif
                        <div class="member-overlay">
                            <i class="fas fa-search-plus text-white fs-3"></i>
                        </div>
                    </div>
                    <div class="member-info">
                        <h5 class="member-name">{{ $member->name }}</h5>
                        <p class="member-role">{{ $member->position }}</p>
                        @if($member->instagram)
                        <div class="member-social">
                            <a href="https://instagram.com/{{ ltrim($member->instagram, '@') }}" target="_blank" class="instagram-link">
                                <i class="fab fa-instagram me-1"></i> {{ $member->instagram }}
                            </a>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <div class="alert alert-light text-center border-dashed py-4">Data IPNU belum tersedia.</div>
            </div>
            @endforelse
        </div>
    </div>

    <!-- IPPNU Section -->
    <div class="mb-5 animate-fade-in-up" style="animation-delay: 0.3s">
        <div class="d-flex align-items-center mb-4 pb-2 border-bottom">
            <div class="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                <i class="fas fa-seedling text-primary fs-4"></i>
            </div>
            <h3 class="fw-bold mb-0">Pimpinan Rekanita <span class="text-primary">IPPNU</span></h3>
        </div>
        
        <div class="row g-4 justify-content-center">
            @forelse($ippnu as $index => $member)
            <div class="col-6 col-md-4 col-lg-3">
                <div class="member-card animate-fade-in-up" style="animation-delay: {{ ($index + count($ipnu)) * 0.1 }}s">
                    <div class="member-image-wrapper img-placeholder" onclick="previewMember('{{ $member->photo ? $storageUrl($member->photo) : 'https://ui-avatars.com/api/?name='.urlencode($member->name).'&background=059669&color=fff&size=512' }}', '{{ $member->name }}', '{{ $member->position }}')">
                        @if($member->photo)
                            <img src="{{ $storageUrl($member->photo) }}" alt="{{ $member->name }}" class="member-img">
                        @else
                            <div class="member-placeholder">
                                <i class="fas fa-user-nurse fa-3x text-white text-opacity-25"></i>
                            </div>
                        @endif
                        <div class="member-overlay">
                            <i class="fas fa-search-plus text-white fs-3"></i>
                        </div>
                    </div>
                    <div class="member-info">
                        <h5 class="member-name">{{ $member->name }}</h5>
                        <p class="member-role">{{ $member->position }}</p>
                        @if($member->instagram)
                        <div class="member-social">
                            <a href="https://instagram.com/{{ ltrim($member->instagram, '@') }}" target="_blank" class="instagram-link">
                                <i class="fab fa-instagram me-1"></i> {{ $member->instagram }}
                            </a>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
            @empty
            <div class="col-12">
                <div class="alert alert-light text-center border-dashed py-4">Data IPPNU belum tersedia.</div>
            </div>
            @endforelse
        </div>
    </div>
</div>

<!-- Member Preview Modal (Lightbox) -->
<div class="modal fade px-3" id="memberPreviewModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 bg-transparent">
            <div class="modal-header border-0 p-0 mb-2 justify-content-end">
                <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 text-center position-relative">
                <img src="" id="memberViewImg" class="img-fluid rounded-4 shadow-lg animate-zoom-in" style="max-height: 80vh; width: 100%; object-fit: contain;">
                <div class="member-preview-details mt-3 p-3 bg-white shadow-lg rounded-4 d-inline-block text-center border border-light">
                    <h5 id="memberViewName" class="fw-bold mb-1 text-dark"></h5>
                    <p id="memberViewRole" class="text-primary small fw-semibold text-uppercase mb-0"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Luxurious Member Card Styles */
    .member-card {
        background: #ffffff;
        border-radius: 1.5rem;
        padding: 1.25rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.03);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .member-card:hover {
        transform: translateY(-12px);
        box-shadow: 0 20px 40px rgba(5, 150, 105, 0.12);
        border-color: rgba(5, 150, 105, 0.2);
    }

    .member-image-wrapper {
        width: 140px;
        height: 140px;
        border-radius: 1.25rem;
        margin-bottom: 1.25rem;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .member-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .member-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--gradient-primary);
    }

    .member-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(2px);
    }

    .member-image-wrapper:hover .member-overlay {
        opacity: 1;
    }

    .member-image-wrapper:hover .member-img {
        transform: scale(1.2);
    }

    .member-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.25rem;
        font-family: 'Poppins', sans-serif;
    }

    .member-role {
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.75rem;
    }

    .member-social {
        margin-top: auto;
        padding-top: 0.5rem;
    }

    .instagram-link {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 0.85rem;
        background: rgba(225, 48, 108, 0.05);
        color: #e1306c !important;
        text-decoration: none;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 2rem;
        transition: all 0.3s ease;
    }

    .instagram-link:hover {
        background: #e1306c;
        color: white !important;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(225, 48, 108, 0.3);
    }

    .border-dashed {
        border: 2px dashed #e2e8f0;
        background: #f8fafc;
    }

    @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .animate-zoom-in {
        animation: zoomIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @media (max-width: 768px) {
        .member-image-wrapper {
            width: 100%;
            height: 180px;
        }
        .member-card {
            padding: 0.75rem;
        }
    }
</style>

@push('scripts')
<script>
    function previewMember(url, name, role) {
        const modal = new bootstrap.Modal(document.getElementById('memberPreviewModal'));
        const img = document.getElementById('memberViewImg');
        const nameEl = document.getElementById('memberViewName');
        const roleEl = document.getElementById('memberViewRole');
        
        img.src = url;
        nameEl.innerText = name;
        roleEl.innerText = role;
        modal.show();
    }
</script>
@endpush
@endsection

