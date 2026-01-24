@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Agenda Kegiatan</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.agendas.create') }}" class="btn btn-primary bg-gradient border-0 shadow-sm">
            <i class="bi bi-plus-lg me-2"></i> Tambah Agenda
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th scope="col" class="ps-4 py-3 border-0 text-muted small fw-bold text-uppercase">Nama Agenda</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Tanggal</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Lokasi</th>
                        <th scope="col" class="pe-4 py-3 border-0 text-end text-muted small fw-bold text-uppercase">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($agendas as $agenda)
                    <tr>
                        <td class="ps-4">
                            <span class="fw-bold text-dark">{{ $agenda->title }}</span>
                        </td>
                        <td>
                            <div class="d-flex flex-column">
                                <span><i class="bi bi-calendar me-1 text-muted"></i> {{ $agenda->event_date->format('d M Y') }}</span>
                                @if($agenda->event_time)
                                <small class="text-muted"><i class="bi bi-clock me-1"></i> {{ \Carbon\Carbon::parse($agenda->event_time)->format('H:i') }} WIB</small>
                                @endif
                            </div>
                        </td>
                        <td>
                            {{ $agenda->location ?? '-' }}
                        </td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.agendas.edit', $agenda->id) }}" class="btn btn-sm btn-outline-primary" title="Edit">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                <form action="{{ route('admin.agendas.destroy', $agenda->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Yakin ingin menghapus agenda ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger" title="Hapus">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="text-center py-5 text-muted">
                            <i class="bi bi-calendar-x display-4 mb-3 d-block text-secondary"></i>
                            Belum ada agenda kegiatan.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-footer bg-white border-0 py-3">
        {{ $agendas->links() }}
    </div>
</div>
@endsection
