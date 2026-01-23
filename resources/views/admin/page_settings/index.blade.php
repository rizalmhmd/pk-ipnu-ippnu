@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
    <h1 class="h2 fw-bold text-dark">Pengaturan Halaman</h1>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th scope="col" class="ps-4 py-3 border-0 text-muted small fw-bold text-uppercase">Halaman</th>
                        <th scope="col" class="py-3 border-0 text-muted small fw-bold text-uppercase">Judul Hero</th>
                        <th scope="col" class="pe-4 py-3 border-0 text-end text-muted small fw-bold text-uppercase">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($settings as $setting)
                    <tr>
                        <td class="ps-4">
                            <span class="fw-bold text-dark">
                                @switch($setting->page_name)
                                    @case('home') Beranda (Main Hero) @break
                                    @case('home_greeting') Beranda - Sambutan Ketua @break
                                    @case('home_agenda') Beranda - Agenda Terdekat @break
                                    @case('profile') Profil @break
                                    @case('news') Berita @break
                                    @case('gallery') Galeri @break
                                    @default {{ ucwords(str_replace('_', ' ', $setting->page_name)) }}
                                @endswitch
                            </span>
                        </td>
                        <td>{{ $setting->hero_title }}</td>
                        <td class="pe-4 text-end">
                            <a href="{{ route('admin.page-settings.edit', $setting->id) }}" class="btn btn-sm btn-outline-primary shadow-sm">
                                <i class="bi bi-gear-fill me-1"></i> Atur
                            </a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
