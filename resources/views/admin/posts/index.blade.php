@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Manajemen Berita</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.posts.create') }}" class="btn btn-primary bg-gradient border-0 shadow-sm">
            <i class="bi bi-plus-lg me-2"></i> Tambah Berita
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th scope="col" class="ps-4 py-3 border-0 text-muted small fw-bold text-uppercase">#</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Judul</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Tanggal Publis</th>
                        <th scope="col" class="pe-4 py-3 border-0 text-end text-muted small fw-bold text-uppercase">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($posts as $post)
                    <tr>
                        <td class="ps-4 fw-bold text-muted">{{ $loop->iteration }}</td>
                        <td class="fw-medium text-dark">{{ $post->title }}</td>
                        <td class="text-secondary"><i class="bi bi-calendar3 me-2"></i>{{ \Carbon\Carbon::parse($post->published_at)->format('d M Y') }}</td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.posts.edit', $post->id) }}" class="btn btn-sm btn-outline-primary" title="Edit">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <form action="{{ route('admin.posts.destroy', $post->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin ingin menghapus berita ini?')" title="Hapus">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5 text-muted">
                            <i class="bi bi-file-text fs-1 d-block mb-3"></i>
                            Belum ada berita yang ditambahkan.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($posts->hasPages())
    <div class="card-footer bg-white border-0 py-3">
        {{ $posts->links() }}
    </div>
    @endif
</div>
@endsection
