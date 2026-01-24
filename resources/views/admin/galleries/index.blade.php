@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Manajemen Galeri</h1>
        <p class="text-secondary mb-0">Kelola dokumentasi foto dan galeri kegiatan organisasi.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.galleries.create') }}" class="btn-premium">
            <i class="bi bi-plus-lg me-2"></i> Tambah Foto
        </a>
    </div>
</div>

<div class="row g-4">
    @forelse($galleries as $gallery)
    <div class="col-6 col-md-4 col-lg-3">
        <div class="card-premium h-100 overflow-hidden gallery-card group">
            <div class="position-relative" style="height: 200px;">
                <img src="{{ $storageUrl($gallery->image_path) }}" class="w-100 h-100 object-fit-cover" alt="{{ $gallery->title }}">
                <div class="gallery-overlay">
                    <div class="d-flex gap-2">
                        <form action="{{ route('admin.galleries.destroy', $gallery->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm rounded-pill shadow" onclick="return confirm('Yakin ingin menghapus foto ini?')">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <p class="small fw-bold text-dark text-truncate mb-0" title="{{ $gallery->title }}">
                    {{ $gallery->title }}
                </p>
                <small class="text-secondary opacity-75">{{ $gallery->created_at->format('d M Y') }}</small>
            </div>
        </div>
    </div>
    @empty
    <div class="col-12">
        <div class="card-premium py-5 text-center">
            <div class="brand-logo mx-auto mb-3 bg-secondary bg-opacity-10 text-secondary" style="width: 64px; height: 64px;">
                <i class="bi bi-images fs-2"></i>
            </div>
            <h5 class="fw-bold">Galeri Masih Kosong</h5>
            <p class="text-secondary small">Unggah momen-momen kegiatan Anda untuk mulai mengisi galeri.</p>
        </div>
    </div>
    @endforelse
</div>

@if($galleries->hasPages())
<div class="card-premium mt-4 p-3 bg-transparent border-0">
    {{ $galleries->links() }}
</div>
@endif

<style>
    .gallery-card .gallery-overlay {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: all 0.3s;
    }
    .gallery-card:hover .gallery-overlay { opacity: 1; }
    .gallery-card img { transition: transform 0.5s; }
    .gallery-card:hover img { transform: scale(1.1); }
</style>
@endsection
