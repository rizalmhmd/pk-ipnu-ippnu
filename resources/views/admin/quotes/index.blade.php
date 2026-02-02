@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-4">
    <div>
        <h1 class="h2 fw-bold mb-1">Manajemen Quotes</h1>
        <p class="text-secondary mb-0">Kelola kutipan (quotes) yang akan ditampilkan di halaman utama.</p>
    </div>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.quotes.create') }}" class="btn-premium">
            <i class="bi bi-plus-lg me-2"></i> Tambah Quote
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover table-premium align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col" class="ps-4">Urutan</th>
                        <th scope="col">Visual</th>
                        <th scope="col">Kutipan</th>
                        <th scope="col">Status</th>
                        <th scope="col" class="pe-4 text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($quotes as $quote)
                    <tr>
                        <td class="ps-4 fw-bold text-secondary">{{ $quote->order }}</td>
                        <td>
                            @if($quote->image)
                                <img src="{{ $storageUrl($quote->image) }}" alt="Quote Visual" class="img-thumbnail bg-transparent border-color" style="max-height: 60px">
                            @else
                                <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25">Tanpa Gambar</span>
                            @endif
                        </td>
                        <td>
                            <div class="fw-bold text-dark">{{ Str::limit($quote->content, 100) }}</div>
                            <small class="text-secondary d-block mt-1">
                                Author: {{ $quote->author ?? 'Anonim' }}
                            </small>
                        </td>
                        <td>
                            @if($quote->is_active)
                                <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 py-1 px-2">Aktif</span>
                            @else
                                <span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 py-1 px-2">Non-aktif</span>
                            @endif
                        </td>
                        <td class="pe-4 text-end">
                            <div class="d-flex justify-content-end gap-2">
                                <a href="{{ route('admin.quotes.edit', $quote->id) }}" class="btn btn-sm btn-outline-primary rounded-pill px-3" title="Edit">
                                    <i class="bi bi-pencil-square me-1"></i> Edit
                                </a>
                                <form action="{{ route('admin.quotes.destroy', $quote->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="return confirm('Yakin ingin menghapus kutipan ini?')" title="Hapus">
                                        <i class="bi bi-trash3 me-1"></i> Hapus
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="text-center py-5">
                            <div class="brand-logo mx-auto mb-3 bg-secondary bg-opacity-10 text-secondary" style="width: 64px; height: 64px;">
                                <i class="bi bi-chat-quote fs-2"></i>
                            </div>
                            <h5 class="fw-bold">Belum Ada Quote</h5>
                            <p class="text-secondary small">Klik tombol "Tambah Quote" untuk memulai kutipan pertama Anda.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
