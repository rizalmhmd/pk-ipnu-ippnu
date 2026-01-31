@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div class="mb-2 mb-md-0">
        <h1 class="h2 fw-bold mb-1">Dashboard</h1>
        <p class="text-secondary mb-0">Selamat datang kembali, <span class="fw-semibold text-primary">{{ auth()->user()->name }}</span>!</p>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card-premium h-100 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-uppercase text-secondary fw-bold small ls-1 mb-0">Total Berita</h6>
                <div class="brand-logo bg-primary bg-opacity-10 text-primary rounded-3" style="width: 42px; height: 42px;">
                    <i class="bi bi-file-earmark-text fs-5"></i>
                </div>
            </div>
            <h2 class="mb-0 fw-bold display-6">{{ $postsCount }}</h2>
            <div class="mt-3">
                <a href="{{ route('admin.posts.index') }}" class="text-decoration-none small text-primary fw-bold">
                    Lihat Berita <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card-premium h-100 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-uppercase text-secondary fw-bold small ls-1 mb-0">Galeri Foto</h6>
                <div class="brand-logo bg-success bg-opacity-10 text-success rounded-3" style="width: 42px; height: 42px;">
                    <i class="bi bi-images fs-5"></i>
                </div>
            </div>
            <h2 class="mb-0 fw-bold display-6">{{ $galleriesCount }}</h2>
            <div class="mt-3">
                <a href="{{ route('admin.galleries.index') }}" class="text-decoration-none small text-success fw-bold">
                    Kelola Galeri <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card-premium h-100 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-uppercase text-secondary fw-bold small ls-1 mb-0">Anggota</h6>
                <div class="brand-logo bg-info bg-opacity-10 text-info rounded-3" style="width: 42px; height: 42px;">
                    <i class="bi bi-people fs-5"></i>
                </div>
            </div>
            <h2 class="mb-0 fw-bold display-6">{{ $membersCount }}</h2>
            <div class="mt-3">
                <a href="{{ route('admin.members.index') }}" class="text-decoration-none small text-info fw-bold">
                    Data Anggota <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card-premium h-100 p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-uppercase text-secondary fw-bold small ls-1 mb-0">Total Agenda</h6>
                <div class="brand-logo bg-warning bg-opacity-10 text-warning rounded-3" style="width: 42px; height: 42px;">
                    <i class="bi bi-calendar-event fs-5"></i>
                </div>
            </div>
            <h2 class="mb-0 fw-bold display-6">{{ $agendasCount }}</h2>
            <div class="mt-3">
                <a href="{{ route('admin.agendas.index') }}" class="text-decoration-none small text-warning fw-bold">
                    Lihat Agenda <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card-premium h-100">
            <div class="card-header bg-transparent border-bottom border-color p-4">
                <h5 class="mb-0 fw-bold">Aktivitas Terbaru Seluruh Website</h5>
            </div>
            <div class="card-body p-4">
                @if($activities->count() > 0)
                <div class="activity-feed">
                    @foreach($activities as $activity)
                    <div class="activity-item d-flex gap-3 mb-4 last-mb-0">
                        <div class="activity-icon-wrap">
                            <div class="icon-circle bg-{{ $activity['color'] }} bg-opacity-10 text-{{ $activity['color'] }}">
                                <i class="bi {{ $activity['icon'] }}"></i>
                            </div>
                        </div>
                        <div class="activity-content flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h6 class="fw-bold mb-0">{{ $activity['title'] }}</h6>
                                <small class="text-secondary">{{ $activity['time'] }}</small>
                            </div>
                            <p class="text-secondary small mb-0">Baru saja ditambahkan oleh <span class="fw-semibold text-primary">{{ $activity['user'] }}</span> dalam kategori <strong>{{ $activity['type'] }}</strong>.</p>
                        </div>
                    </div>
                    @endforeach
                </div>
                @else
                <div class="text-center py-5 text-secondary">
                    <div class="brand-logo mx-auto mb-4 bg-secondary bg-opacity-10 text-secondary" style="width: 64px; height: 64px;">
                        <i class="bi bi-inbox fs-2"></i>
                    </div>
                    <h5>Belum Ada Aktivitas</h5>
                    <p class="small">Lakukan perubahan pada konten website untuk melihat riwayat aktivitas di sini.</p>
                </div>
                @endif
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card-premium p-4 text-white h-100 border-0 status-sistem-card" style="background: linear-gradient(135deg, var(--primary-color), var(--primary-blue));">
            <div class="d-flex align-items-center gap-2 mb-4">
                <i class="bi bi-cpu fs-4"></i>
                <h5 class="fw-bold mb-0">Status Sistem</h5>
            </div>
            <div class="d-flex flex-column gap-3">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="opacity-75 small fw-medium">Versi Framework</span>
                    <span class="badge status-badge px-2 py-1">{{ app()->version() }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="opacity-75 small fw-medium">Versi PHP</span>
                    <span class="badge status-badge px-2 py-1">{{ PHP_VERSION }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="opacity-75 small fw-medium">Environment</span>
                    <span class="badge status-badge px-2 py-1">{{ app()->environment() }}</span>
                </div>
                <hr class="border-white opacity-25 my-2">
                <div class="text-center mt-2">
                    <p class="small opacity-75 mb-3">Seluruh sistem berjalan dengan normal dan optimal.</p>
                    <div class="d-inline-flex align-items-center gap-2 px-3 py-1 status-indicator rounded-pill">
                        <span class="spinner-grow spinner-grow-sm text-white" role="status"></span>
                        <span class="small fw-bold">Sistem Stabil</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .ls-1 { letter-spacing: 0.5px; }
    .activity-feed .activity-item:last-child { margin-bottom: 0 !important; }
    .icon-circle {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
    }
    .activity-icon-wrap {
        position: relative;
    }
    .activity-icon-wrap::after {
        content: '';
        position: absolute;
        top: 42px;
        left: 50%;
        bottom: -24px;
        width: 1px;
        background: var(--border-color);
        transform: translateX(-50%);
    }
    .activity-item:last-child .activity-icon-wrap::after { display: none; }
    
    /* Status Sistem Styling */
    .status-badge {
        background-color: rgba(15, 23, 42, 0.6) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        font-weight: 600;
    }
    
    .status-indicator {
        background-color: rgba(15, 23, 42, 0.6) !important;
    }
    
    html.dark-mode .status-badge {
        background-color: rgba(255, 255, 255, 0.25) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
    
    html.dark-mode .status-indicator {
        background-color: rgba(255, 255, 255, 0.25) !important;
    }
</style>
@endsection
