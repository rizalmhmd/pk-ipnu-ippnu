@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Agenda Kegiatan</h1>
        <p class="text-secondary mb-0">Kelola jadwal kegiatan dan agenda penting organisasi.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.agendas.create') }}" class="btn-premium">
            <i class="bi bi-calendar-plus me-2"></i> Tambah Agenda
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover table-premium align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col" class="ps-4">Nama Agenda</th>
                        <th scope="col">Waktu & Tanggal</th>
                        <th scope="col">Lokasi</th>
                        <th scope="col" class="pe-4 text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($agendas as $agenda)
                    <tr>
                        <td class="ps-4">
                            <div class="fw-bold text-dark">{{ $agenda->title }}</div>
                            @if($agenda->description)
                            <small class="text-secondary d-block text-truncate mt-1" style="max-width: 300px;">{{ Str::limit($agenda->description, 50) }}</small>
                            @endif
                        </td>
                        <td>
                            <div class="d-flex flex-column gap-1">
                                <span class="fw-bold text-primary"><i class="bi bi-calendar-event me-2"></i>{{ $agenda->event_date->format('d M Y') }}</span>
                                @if($agenda->event_time)
                                <small class="text-secondary"><i class="bi bi-clock me-1"></i> {{ \Carbon\Carbon::parse($agenda->event_time)->format('H:i') }} WIB</small>
                                @endif
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-items-center text-secondary">
                                <i class="bi bi-geo-alt me-2"></i>
                                <span>{{ $agenda->location ?? 'Lokasi Belum Ditentukan' }}</span>
                            </div>
                        </td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.agendas.edit', $agenda->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3" title="Edit">
                                    <i class="bi bi-pencil-square me-1"></i> Edit
                                </a>
                                <form action="{{ route('admin.agendas.destroy', $agenda->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Yakin ingin menghapus agenda ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" title="Hapus">
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
                                <i class="bi bi-calendar-x fs-2"></i>
                            </div>
                            <h5 class="fw-bold">Belum Ada Agenda</h5>
                            <p class="text-secondary small">Tambahkan agenda kegiatan mendatang untuk diinformasikan kepada anggota.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($agendas->hasPages())
    <div class="card-footer bg-transparent border-top border-color py-4">
        {{ $agendas->links() }}
    </div>
    @endif
</div>
@endsection
