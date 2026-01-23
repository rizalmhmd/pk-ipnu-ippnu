@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Manajemen Anggota</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.create') }}" class="btn btn-primary shadow-sm">
            <i class="bi bi-plus-lg me-2"></i> Tambah Anggota
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
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Anggota</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Jabatan</th>
                        <th scope="col" class="pe-4 py-3 border-0 text-end text-muted small fw-bold text-uppercase">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($members as $member)
                    <tr>
                        <td class="ps-4 fw-bold text-muted">{{ $loop->iteration }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="avatar me-3">
                                    @if($member->photo)
                                    <img src="{{ asset('storage/' . $member->photo) }}" alt="{{ $member->name }}" class="rounded-circle" width="48" height="48" style="object-fit: cover;">
                                    @else
                                    <img src="https://ui-avatars.com/api/?name={{ urlencode($member->name) }}&background=0d6efd&color=fff&size=48" alt="{{ $member->name }}" class="rounded-circle" width="48" height="48">
                                    @endif
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="fw-medium text-dark">{{ $member->name }}</span>
                                    <span class="small text-muted">ID: {{ $member->id }}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge bg-light text-dark border fw-normal">{{ $member->position }}</span>
                        </td>
                        <td class="pe-4 text-end">
                            <div class="btn-group">
                                <a href="{{ route('admin.members.edit', $member->id) }}" class="btn btn-sm btn-outline-secondary" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <form action="{{ route('admin.members.destroy', $member->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Yakin ingin menghapus anggota ini?')" title="Hapus">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5 text-muted">
                            <i class="bi bi-people fs-1 d-block mb-3"></i>
                            Belum ada anggota yang ditambahkan.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
