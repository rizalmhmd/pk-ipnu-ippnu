@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Pengaturan Situs</h1>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body p-4">
        <form action="{{ route('admin.site-settings.update') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="row">
                <!-- General Info -->
                <div class="col-md-6 mb-4">
                    <h5 class="mb-3">Informasi Umum</h5>
                    
                    <div class="mb-3">
                        <label for="site_name" class="form-label fw-bold small text-uppercase text-muted">Nama Situs</label>
                        <input type="text" class="form-control @error('site_name') is-invalid @enderror" id="site_name" name="site_name" value="{{ old('site_name', $setting->site_name) }}" required>
                        @error('site_name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="meta_description" class="form-label fw-bold small text-uppercase text-muted">Meta Deskripsi (SEO)</label>
                        <textarea class="form-control @error('meta_description') is-invalid @enderror" id="meta_description" name="meta_description" rows="3">{{ old('meta_description', $setting->meta_description) }}</textarea>
                        @error('meta_description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                        <div class="mb-3">
                            <label for="copyright_text" class="form-label fw-bold small text-uppercase text-muted">Teks Hak Cipta</label>
                            <input type="text" class="form-control @error('copyright_text') is-invalid @enderror" id="copyright_text" name="copyright_text" value="{{ old('copyright_text', $setting->copyright_text) }}">
                            @error('copyright_text')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="home_news_title" class="form-label fw-bold small text-uppercase text-muted">Judul Seksi Berita (Home)</label>
                            <input type="text" class="form-control @error('home_news_title') is-invalid @enderror" id="home_news_title" name="home_news_title" value="{{ old('home_news_title', $setting->home_news_title) }}">
                        </div>

                        <div class="mb-3">
                            <label for="home_agenda_title" class="form-label fw-bold small text-uppercase text-muted">Judul Seksi Agenda (Home)</label>
                            <input type="text" class="form-control @error('home_agenda_title') is-invalid @enderror" id="home_agenda_title" name="home_agenda_title" value="{{ old('home_agenda_title', $setting->home_agenda_title) }}">
                        </div>
                </div>

                <!-- Media -->
                <div class="col-md-6 mb-4">
                    <h5 class="mb-3">Media (Logo & Favicon)</h5>
                    
                    <div class="mb-3">
                        <label for="site_logo" class="form-label fw-bold small text-uppercase text-muted">Logo Situs</label>
                        <input type="file" class="form-control @error('site_logo') is-invalid @enderror" id="site_logo" name="site_logo">
                        @if($setting->site_logo)
                            <div class="mt-2">
                                <img src="{{ $storageUrl($setting->site_logo) }}" alt="Logo" class="img-thumbnail" style="max-height: 50px">
                            </div>
                        @endif
                        @error('site_logo')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="favicon" class="form-label fw-bold small text-uppercase text-muted">Favicon</label>
                        <input type="file" class="form-control @error('favicon') is-invalid @enderror" id="favicon" name="favicon">
                        @if($setting->favicon)
                            <div class="mt-2">
                                <img src="{{ $storageUrl($setting->favicon) }}" alt="Favicon" class="img-thumbnail" style="max-height: 32px">
                            </div>
                        @endif
                        @error('favicon')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="col-md-6 mb-4">
                    <h5 class="mb-3">Kontak & Alamat</h5>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label fw-bold small text-uppercase text-muted">Email</label>
                        <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', $setting->email) }}">
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label fw-bold small text-uppercase text-muted">Telepon / WhatsApp</label>
                        <input type="text" class="form-control @error('phone') is-invalid @enderror" id="phone" name="phone" value="{{ old('phone', $setting->phone) }}">
                        @error('phone')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label fw-bold small text-uppercase text-muted">Alamat</label>
                        <textarea class="form-control @error('address') is-invalid @enderror" id="address" name="address" rows="2">{{ old('address', $setting->address) }}</textarea>
                        @error('address')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Social Media -->
                <div class="col-md-6 mb-4">
                    <h5 class="mb-3">Media Sosial (URL)</h5>
                    
                    <div class="mb-3">
                        <label for="facebook" class="form-label fw-bold small text-uppercase text-muted">Facebook</label>
                        <input type="url" class="form-control @error('facebook') is-invalid @enderror" id="facebook" name="facebook" value="{{ old('facebook', $setting->facebook) }}">
                    </div>

                    <div class="mb-3">
                        <label for="instagram" class="form-label fw-bold small text-uppercase text-muted">Instagram</label>
                        <input type="url" class="form-control @error('instagram') is-invalid @enderror" id="instagram" name="instagram" value="{{ old('instagram', $setting->instagram) }}">
                    </div>

                    <div class="mb-3">
                        <label for="twitter" class="form-label fw-bold small text-uppercase text-muted">Twitter (X)</label>
                        <input type="url" class="form-control @error('twitter') is-invalid @enderror" id="twitter" name="twitter" value="{{ old('twitter', $setting->twitter) }}">
                    </div>

                    <div class="mb-3">
                        <label for="youtube" class="form-label fw-bold small text-uppercase text-muted">YouTube</label>
                        <input type="url" class="form-control @error('youtube') is-invalid @enderror" id="youtube" name="youtube" value="{{ old('youtube', $setting->youtube) }}">
                    </div>
                </div>
            </div>

            <hr class="my-4">

            <div class="row">
                <!-- Default Hero Settings -->
                <div class="col-12 mb-4">
                    <h5 class="mb-3">Default Hero Section (Global)</h5>
                    <p class="text-muted small">Bagian ini akan muncul di halaman yang tidak memiliki hero section khusus.</p>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="default_hero_title" class="form-label fw-bold small text-uppercase text-muted">Judul Hero Default</label>
                            <input type="text" class="form-control @error('default_hero_title') is-invalid @enderror" id="default_hero_title" name="default_hero_title" value="{{ old('default_hero_title', $setting->default_hero_title) }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="default_hero_image" class="form-label fw-bold small text-uppercase text-muted">Gambar Hero Default</label>
                            <input type="file" class="form-control @error('default_hero_image') is-invalid @enderror" id="default_hero_image" name="default_hero_image">
                            @if($setting->default_hero_image)
                                <div class="mt-2">
                                    <img src="{{ $storageUrl($setting->default_hero_image) }}" alt="Hero Default" class="img-thumbnail" style="max-height: 100px">
                                </div>
                            @endif
                        </div>

                        <div class="col-12 mb-3">
                            <label for="default_hero_subtitle" class="form-label fw-bold small text-uppercase text-muted">Sub-judul Hero Default</label>
                            <textarea class="form-control @error('default_hero_subtitle') is-invalid @enderror" id="default_hero_subtitle" name="default_hero_subtitle" rows="3">{{ old('default_hero_subtitle', $setting->default_hero_subtitle) }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="btn btn-primary px-4 bg-gradient border-0 shadow-sm">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@endsection
