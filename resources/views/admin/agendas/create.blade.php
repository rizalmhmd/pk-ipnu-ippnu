@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Tambah Agenda Baru</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <a href="{{ route('admin.agendas.index') }}" class="btn btn-outline-secondary shadow-sm">
            <i class="bi bi-arrow-left me-2"></i> Kembali
        </a>
    </div>
</div>

<div class="card-premium">
    <div class="card-body p-4 p-lg-5">
        <form action="{{ route('admin.agendas.store') }}" method="POST">
            @csrf
            
            <div class="mb-4">
                <label for="title" class="form-label-premium">Nama Agenda</label>
                <input type="text" class="form-control-premium w-100 @error('title') is-invalid @enderror" id="title" name="title" value="{{ old('title') }}" placeholder="Contoh: Rapat Kerja Cabang" required>
                @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="category" class="form-label-premium">Kategori Agenda</label>
                <select class="form-select form-control-premium @error('category') is-invalid @enderror" id="category" name="category" required>
                    <option value="organisasi" {{ old('category') == 'organisasi' ? 'selected' : '' }}>Kegiatan Organisasi (Hijau)</option>
                    <option value="nasional" {{ old('category') == 'nasional' ? 'selected' : '' }}>Hari Libur Nasional (Merah)</option>
                    <option value="keagamaan" {{ old('category') == 'keagamaan' ? 'selected' : '' }}>Hari Besar Keagamaan (Biru)</option>
                    <option value="khusus" {{ old('category') == 'khusus' ? 'selected' : '' }}>Hari Khusus (Kuning)</option>
                </select>
                @error('category')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <label for="event_date" class="form-label-premium">Tanggal Pelaksanaan</label>
                    <input type="date" class="form-control-premium w-100 @error('event_date') is-invalid @enderror" id="event_date" name="event_date" value="{{ old('event_date') }}" required>
                    @error('event_date')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4">
                    <label for="event_time" class="form-label-premium">Waktu / Jam (Opsional)</label>
                    <input type="time" class="form-control-premium w-100 @error('event_time') is-invalid @enderror" id="event_time" name="event_time" value="{{ old('event_time') }}">
                    @error('event_time')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4">
                    <label for="location" class="form-label-premium">Lokasi (Opsional)</label>
                    <input type="text" class="form-control-premium w-100 @error('location') is-invalid @enderror" id="location" name="location" value="{{ old('location') }}" placeholder="Contoh: Gedung PCNU">
                    @error('location')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="mb-5">
                <label for="description" class="form-label-premium">Deskripsi / Catatan (Opsional)</label>
                <textarea class="form-control-premium w-100 @error('description') is-invalid @enderror" id="description" name="description" rows="5" placeholder="Tambahkan detail kegiatan...">{{ old('description') }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="d-flex justify-content-end gap-3 pt-4 border-top border-color">
                <button type="reset" class="btn btn-link text-secondary text-decoration-none fw-bold">Reset Form</button>
                <button type="submit" class="btn-premium px-5">
                    <i class="bi bi-calendar-check me-2"></i> Simpan Agenda
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
