@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Manajemen Anggota</h1>
        <p class="text-secondary mb-0">Kelola database kepengurusan dan anggota organisasi.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.members.create') }}" class="btn-premium">
            <i class="bi bi-person-plus me-2"></i> Tambah Anggota
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
                        <th scope="col">Profil Anggota</th>
                        <th scope="col">Jabatan & Peran</th>
                        <th scope="col" class="pe-4 text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($members as $member)
                    <tr>
                        <td class="ps-4 fw-bold text-secondary">{{ ($members->currentPage() - 1) * $members->perPage() + $loop->iteration }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="avatar-premium me-3">
                                    @if($member->photo)
                                        <img src="{{ $storageUrl($member->photo) }}" alt="{{ $member->name }}">
                                    @else
                                        <img src="https://ui-avatars.com/api/?name={{ urlencode($member->name) }}&background=059669&color=fff" alt="{{ $member->name }}">
                                    @endif
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="fw-bold text-dark">{{ $member->name }}</span>
                                    <small class="text-secondary">ID: #{{ str_pad($member->id, 4, '0', STR_PAD_LEFT) }}</small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex flex-column gap-1">
                                <span class="badge bg-primary bg-opacity-10 text-primary align-self-start border border-primary border-opacity-25 py-1 px-2">{{ $member->position }}</span>
                                <div class="d-flex gap-2 align-items-center">
                                    <span class="badge {{ $member->type == 'ipnu' ? 'bg-success' : 'bg-info' }} bg-opacity-10 {{ $member->type == 'ipnu' ? 'text-success' : 'text-primary' }} border {{ $member->type == 'ipnu' ? 'border-success' : 'border-primary' }} border-opacity-25 py-0 px-2 small">{{ strtoupper($member->type) }}</span>
                                    <small class="text-secondary opacity-75">Order: {{ $member->order }}</small>
                                </div>
                            </div>
                        </td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.members.edit', $member->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3" title="Edit">
                                    <i class="bi bi-pencil-square me-1"></i> Edit
                                </a>
                                <form action="{{ route('admin.members.destroy', $member->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Yakin ingin menghapus anggota ini?')" title="Hapus">
                                        <i class="bi bi-trash3 me-1"></i> Hapus
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5">
                            <div class="brand-logo mx-auto mb-3 bg-secondary bg-opacity-10 text-secondary border-0" style="width: 64px; height: 64px; opacity: 0.8;">
                                <i class="bi bi-person-bounding-box fs-2"></i>
                            </div>
                            <h5 class="fw-bold opacity-75">Belum Ada Anggota</h5>
                            <p class="text-secondary small">Daftarkan pengurus atau anggota baru melalui tombol di atas.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($members->hasPages())
    <div class="card-footer bg-transparent border-top border-color py-4">
        {{ $members->links() }}
    </div>
    @endif
</div>

<style>
    .avatar-premium {
        width: 48px; height: 48px;
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid var(--border-color);
        flex-shrink: 0;
    }
    .avatar-premium img { width: 100%; height: 100%; object-fit: cover; }
</style>
@endsection
