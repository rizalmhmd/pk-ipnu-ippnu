@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
    <h1 class="h2 fw-bold text-dark">Pengaturan Situs</h1>
</div>

<div class="card-premium">
    <div class="card-body p-4 p-lg-5">
        <form action="{{ route('admin.site-settings.update') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="row g-4">
                <!-- General Info -->
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary bg-opacity-10 rounded-pill p-2 me-3">
                            <i class="bi bi-info-circle text-primary"></i>
                        </div>
                        <h5 class="mb-0 fw-bold">Informasi Umum</h5>
                    </div>
                    
                    <div class="mb-3">
                        <label for="site_name" class="form-label fw-bold small text-uppercase opacity-75">Nama Situs</label>
                        <input type="text" class="form-control form-control-premium @error('site_name') is-invalid @enderror" id="site_name" name="site_name" value="{{ old('site_name', $setting->site_name) }}" required>
                        @error('site_name')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="meta_description" class="form-label fw-bold small text-uppercase opacity-75">Meta Deskripsi (SEO)</label>
                        <textarea class="form-control form-control-premium @error('meta_description') is-invalid @enderror" id="meta_description" name="meta_description" rows="3">{{ old('meta_description', $setting->meta_description) }}</textarea>
                        @error('meta_description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="copyright_text" class="form-label fw-bold small text-uppercase opacity-75">Teks Hak Cipta</label>
                        <input type="text" class="form-control form-control-premium @error('copyright_text') is-invalid @enderror" id="copyright_text" name="copyright_text" value="{{ old('copyright_text', $setting->copyright_text) }}">
                        @error('copyright_text')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="home_news_title" class="form-label fw-bold small text-uppercase opacity-75">Judul Seksi Berita (Home)</label>
                        <input type="text" class="form-control form-control-premium @error('home_news_title') is-invalid @enderror" id="home_news_title" name="home_news_title" value="{{ old('home_news_title', $setting->home_news_title) }}">
                    </div>

                    <div class="mb-3">
                        <label for="home_agenda_title" class="form-label fw-bold small text-uppercase opacity-75">Judul Seksi Agenda (Home)</label>
                        <input type="text" class="form-control form-control-premium @error('home_agenda_title') is-invalid @enderror" id="home_agenda_title" name="home_agenda_title" value="{{ old('home_agenda_title', $setting->home_agenda_title) }}">
                    </div>
                </div>

                <!-- Media -->
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary bg-opacity-10 rounded-pill p-2 me-3">
                            <i class="bi bi-image text-primary"></i>
                        </div>
                        <h5 class="mb-0 fw-bold">Media (Logo & Favicon)</h5>
                    </div>
                    
                    <div class="mb-3">
                        <label for="site_logo" class="form-label fw-bold small text-uppercase opacity-75">Logo Situs</label>
                        <div id="logo-preview-container" class="mb-3 {{ $setting->site_logo ? '' : 'd-none' }}">
                            <img id="logo-preview" src="{{ $setting->site_logo ? $storageUrl($setting->site_logo) : '#' }}" alt="Logo Preview" class="img-thumbnail bg-transparent border-color" style="max-height: 80px">
                        </div>
                        <input type="file" class="form-control form-control-premium @error('site_logo') is-invalid @enderror" id="site_logo" name="site_logo" onchange="previewLogo(this)">
                        <div class="small text-secondary mt-2">Maksimal 5MB.</div>
                        @error('site_logo')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="favicon" class="form-label fw-bold small text-uppercase opacity-75">Favicon</label>
                        <input type="file" class="form-control form-control-premium @error('favicon') is-invalid @enderror" id="favicon" name="favicon">
                        @if($setting->favicon)
                            <div class="mt-3">
                                <img src="{{ $storageUrl($setting->favicon) }}" alt="Favicon" class="img-thumbnail bg-transparent border-color" style="max-height: 48px">
                            </div>
                        @endif
                        @error('favicon')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary bg-opacity-10 rounded-pill p-2 me-3">
                            <i class="bi bi-envelope text-primary"></i>
                        </div>
                        <h5 class="mb-0 fw-bold">Kontak & Alamat</h5>
                    </div>
                    
                    <div class="mb-3">
                        <label for="email" class="form-label fw-bold small text-uppercase opacity-75">Email</label>
                        <input type="email" class="form-control form-control-premium @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email', $setting->email) }}">
                        @error('email')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label fw-bold small text-uppercase opacity-75">Telepon / WhatsApp</label>
                        <input type="text" class="form-control form-control-premium @error('phone') is-invalid @enderror" id="phone" name="phone" value="{{ old('phone', $setting->phone) }}">
                        @error('phone')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label fw-bold small text-uppercase opacity-75">Alamat</label>
                        <textarea class="form-control form-control-premium @error('address') is-invalid @enderror" id="address" name="address" rows="3">{{ old('address', $setting->address) }}</textarea>
                        @error('address')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <!-- Social Media -->
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary bg-opacity-10 rounded-pill p-2 me-3">
                            <i class="bi bi-share text-primary"></i>
                        </div>
                        <h5 class="mb-0 fw-bold">Media Sosial (URL)</h5>
                    </div>
                    
                    <div class="mb-3">
                        <label for="facebook" class="form-label fw-bold small text-uppercase opacity-75">Facebook</label>
                        <input type="url" class="form-control form-control-premium @error('facebook') is-invalid @enderror" id="facebook" name="facebook" value="{{ old('facebook', $setting->facebook) }}">
                    </div>

                    <div class="mb-3">
                        <label for="instagram" class="form-label fw-bold small text-uppercase opacity-75">Instagram</label>
                        <input type="url" class="form-control form-control-premium @error('instagram') is-invalid @enderror" id="instagram" name="instagram" value="{{ old('instagram', $setting->instagram) }}">
                    </div>

                    <div class="mb-3">
                        <label for="twitter" class="form-label fw-bold small text-uppercase opacity-75">Twitter (X)</label>
                        <input type="url" class="form-control form-control-premium @error('twitter') is-invalid @enderror" id="twitter" name="twitter" value="{{ old('twitter', $setting->twitter) }}">
                    </div>

                    <div class="mb-3">
                        <label for="youtube" class="form-label fw-bold small text-uppercase opacity-75">YouTube</label>
                        <input type="url" class="form-control form-control-premium @error('youtube') is-invalid @enderror" id="youtube" name="youtube" value="{{ old('youtube', $setting->youtube) }}">
                    </div>
                </div>
            </div>

            <hr class="my-5 border-color opacity-10">

            <div class="row">
                <!-- Default Hero Settings -->
                <div class="col-12 mb-4">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-primary bg-opacity-10 rounded-pill p-2 me-3">
                            <i class="bi bi-display text-primary"></i>
                        </div>
                        <h5 class="mb-0 fw-bold">Default Hero Section (Global)</h5>
                    </div>
                    <p class="text-secondary small mb-4">Bagian ini akan muncul di halaman yang tidak memiliki hero section khusus.</p>
                    
                    <div class="row g-4">
                        <div class="col-md-6">
                            <label for="default_hero_title" class="form-label fw-bold small text-uppercase opacity-75">Judul Hero Default</label>
                            <input type="text" class="form-control form-control-premium @error('default_hero_title') is-invalid @enderror" id="default_hero_title" name="default_hero_title" value="{{ old('default_hero_title', $setting->default_hero_title) }}">
                        </div>

                        <div class="col-md-6">
                            <label for="default_hero_image" class="form-label fw-bold small text-uppercase opacity-75">Gambar Hero Default</label>
                            <div id="hero-preview-container" class="mb-3 {{ $setting->default_hero_image ? '' : 'd-none' }}">
                                <img id="hero-preview" src="{{ $setting->default_hero_image ? $storageUrl($setting->default_hero_image) : '#' }}" alt="Hero Preview" class="img-thumbnail bg-transparent border-color" style="max-height: 120px">
                            </div>
                            <input type="file" class="form-control form-control-premium @error('default_hero_image') is-invalid @enderror" id="default_hero_image" name="default_hero_image" onchange="previewDefaultHero(this)">
                            <div class="small text-secondary mt-2">Maksimal 5MB.</div>
                        </div>

                        <div class="col-12">
                            <label for="default_hero_subtitle" class="form-label fw-bold small text-uppercase opacity-75">Sub-judul Hero Default</label>
                            <textarea class="form-control form-control-premium @error('default_hero_subtitle') is-invalid @enderror" id="default_hero_subtitle" name="default_hero_subtitle" rows="3">{{ old('default_hero_subtitle', $setting->default_hero_subtitle) }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn-premium px-5">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@push('scripts')
<script>
    function previewLogo(input) {
        const file = input.files[0];
        const preview = document.getElementById('logo-preview');
        const container = document.getElementById('logo-preview-container');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                container.classList.remove('d-none');
            }
            reader.readAsDataURL(file);
        }
    }

    function previewDefaultHero(input) {
        const file = input.files[0];
        const preview = document.getElementById('hero-preview');
        const container = document.getElementById('hero-preview-container');

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                container.classList.remove('d-none');
            }
            reader.readAsDataURL(file);
        }
    }
</script>
@endpush
@endsection
