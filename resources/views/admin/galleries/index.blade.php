@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Manajemen Galeri</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.galleries.create') }}" class="btn btn-primary bg-gradient border-0 shadow-sm">
            <i class="bi bi-plus-lg me-2"></i> Tambah Foto
        </a>
    </div>
</div>

<div class="row g-4">
    @forelse($galleries as $gallery)
    <div class="col-md-3">
        <div class="card shadow-sm h-100 border-0 gallery-card">
            <div class="position-relative overflow-hidden group">
                <img src="{{ $storageUrl($gallery->image_path) }}" class="card-img-top" alt="{{ $gallery->title }}" style="height: 200px; object-fit: cover;">
                <div class="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 transition-all">
                                            <form action="{{ route('admin.galleries.destroy', $gallery->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm rounded-circle shadow-lg" onclick="return confirm('Yakin ingin menghapus foto ini?')" title="Hapus">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </form>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text fw-semibold text-truncate mb-0" title="{{ $gallery->title }}">{{ $gallery->title }}</p>
            </div>
        </div>
    </div>
    @empty
    <div class="col-12">
        <div class="card border-0 shadow-sm">
             <div class="card-body py-5 text-center text-muted">
                 <i class="bi bi-images fs-1 d-block mb-3"></i>
                 <p class="mb-0">Belum ada foto yang ditambahkan ke galeri.</p>
             </div>
        </div>
    </div>
    @endforelse
</div>

@if($galleries->hasPages())
<div class="mt-4">
    {{ $galleries->links() }}
</div>
@endif

<style>
    .gallery-card .group:hover .overlay { opacity: 1 !important; }
    .transition-all { transition: all 0.3s ease; }
</style>
@endsection
