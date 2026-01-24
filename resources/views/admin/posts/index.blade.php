@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Manajemen Berita</h1>
        <p class="text-secondary mb-0">Kelola artikel dan berita terbaru untuk website.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.posts.create') }}" class="btn-premium">
            <i class="bi bi-plus-lg me-2"></i> Tambah Berita
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover table-premium align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col" class="ps-4">#</th>
                        <th scope="col">Judul Berita</th>
                        <th scope="col">Status & Tanggal</th>
                        <th scope="col" class="pe-4 text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($posts as $post)
                    <tr>
                        <td class="ps-4 fw-bold text-secondary">{{ ($posts->currentPage() - 1) * $posts->perPage() + $loop->iteration }}</td>
                        <td>
                            <div class="fw-bold text-dark">{{ $post->title }}</div>
                            <small class="text-secondary d-block mt-1">
                                <i class="bi bi-person me-1"></i> Administrator
                            </small>
                        </td>
                        <td>
                            <div class="d-flex flex-column gap-1">
                                <span class="badge bg-success bg-opacity-10 text-success align-self-start border border-success border-opacity-25 py-1 px-2">Published</span>
                                <small class="text-secondary"><i class="bi bi-clock me-1"></i>{{ \Carbon\Carbon::parse($post->published_at)->diffForHumans() }}</small>
                            </div>
                        </td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.posts.edit', $post->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3" title="Edit">
                                    <i class="bi bi-pencil-square me-1"></i> Edit
                                </a>
                                <form action="{{ route('admin.posts.destroy', $post->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Yakin ingin menghapus berita ini?')" title="Hapus">
                                        <i class="bi bi-trash3 me-1"></i> Hapus
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5">
                            <div class="brand-logo mx-auto mb-3 bg-secondary bg-opacity-10 text-secondary" style="width: 64px; height: 64px;">
                                <i class="bi bi-file-earmark-text fs-2"></i>
                            </div>
                            <h5 class="fw-bold">Belum Ada Berita</h5>
                            <p class="text-secondary small">Klik tombol "Tambah Berita" untuk memulai artikel pertama Anda.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($posts->hasPages())
    <div class="card-footer bg-transparent border-top border-color py-4">
        {{ $posts->links() }}
    </div>
    @endif
</div>
@endsection
