@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Edit Agenda</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.agendas.index') }}" class="btn btn-outline-secondary shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.agendas.update', $agenda->id) }}" method="POST">
            @csrf
            @method('PUT')
            
            <div class="mb-4">
                <label for="title" class="form-label fw-bold small text-uppercase text-muted">Nama Agenda</label>
                <input type="text" class="form-control form-control-lg @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title', $agenda->title) }}" placeholder="Contoh: Rapat Kerja Cabang" required>
                @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="row mb-4">
                <div class="col-md-4">
                    <label for="event_date" class="form-label fw-bold small text-uppercase text-muted">Tanggal Pelaksanaan</label>
                    <input type="date" class="form-control @error('event_date') is-invalid @enderror" id="event_date" name="event_date" value="{{ old('event_date', $agenda->event_date->format('Y-m-d')) }}" required>
                    @error('event_date')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4">
                    <label for="event_time" class="form-label fw-bold small text-uppercase text-muted">Waktu / Jam (Opsional)</label>
                    <input type="time" class="form-control @error('event_time') is-invalid @enderror" id="event_time" name="event_time" value="{{ old('event_time', $agenda->event_time ? \Carbon\Carbon::parse($agenda->event_time)->format('H:i') : '') }}">
                    @error('event_time')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4">
                    <label for="location" class="form-label fw-bold small text-uppercase text-muted">Lokasi (Opsional)</label>
                    <input type="text" class="form-control @error('location') is-invalid @enderror" id="location" name="location" value="{{ old('location', $agenda->location) }}" placeholder="Contoh: Gedung PCNU">
                    @error('location')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label fw-bold small text-uppercase text-muted">Deskripsi / Catatan (Opsional)</label>
                <textarea class="form-control @error('description') is-invalid @enderror" id="description" name="description" rows="4" placeholder="Tambahkan detail kegiatan...">{{ old('description', $agenda->description) }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Perbarui Agenda</button>
            </div>
        </form>
    </div>
</div>
@endsection
