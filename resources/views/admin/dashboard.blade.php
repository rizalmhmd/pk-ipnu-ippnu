@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <div>
        <h1 class="h2 fw-bold text-dark">Dashboard</h1>
        <p class="text-muted mb-0">Selamat datang kembali, {{ auth()->user()->name }}!</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
        </button>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h6 class="text-uppercase text-muted fw-semibold ls-1 mb-0">Total Berita</h6>
                    <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                        <i class="bi bi-file-earmark-text fs-4"></i>
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
    </div>
    <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h6 class="text-uppercase text-muted fw-semibold ls-1 mb-0">Galeri Foto</h6>
                    <div class="icon-shape bg-success bg-opacity-10 text-success rounded-3 p-2">
                        <i class="bi bi-images fs-4"></i>
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
    </div>
    <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h6 class="text-uppercase text-muted fw-semibold ls-1 mb-0">Anggota</h6>
                    <div class="icon-shape bg-info bg-opacity-10 text-info rounded-3 p-2">
                        <i class="bi bi-people fs-4"></i>
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
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
                <h5 class="card-title mb-0 fw-bold">Aktivitas Terbaru Belum Tersedia</h5>
            </div>
            <div class="card-body">
                <div class="text-center py-5 text-muted">
                    <i class="bi bi-inbox fs-1 d-block mb-3"></i>
                    <p>Belum ada data aktivitas terbaru untuk ditampilkan saat ini.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .ls-1 { letter-spacing: 1px; }
    .icon-shape { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
</style>
@endsection
