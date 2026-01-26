@extends('layouts.public')

@section('content')
<div class="container my-5 pt-4">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <nav aria-label="breadcrumb" class="mb-4 animate-fade-in-up">
                <ol class="breadcrumb bg-light rounded-pill px-4 py-2 small">
                    <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-decoration-none text-muted">Beranda</a></li>
                    <li class="breadcrumb-item"><a href="{{ route('news.index') }}" class="text-decoration-none text-muted">Berita</a></li>
                    <li class="breadcrumb-item active text-primary fw-bold" aria-current="page">Detail Artikrl</li>
                </ol>
            </nav>

            <header class="mb-5 animate-fade-in-up" style="animation-delay: 0.1s">
                <h1 class="display-4 fw-bold mb-3">{{ $post->title }}</h1>
                <div class="d-flex align-items-center text-muted">
                    <div class="bg-primary-light rounded-circle p-2 me-3 d-inline-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="fas fa-user text-primary"></i>
                    </div>
                    <div class="small">
                        <div class="fw-bold text-dark">Administrator</div>
                        <div><i class="far fa-calendar-alt me-1"></i> {{ \Carbon\Carbon::parse($post->published_at)->format('d F Y') }}</div>
                    </div>
                </div>
            </header>

            @if($post->image)
            <div class="position-relative rounded-4 overflow-hidden shadow-lg mb-5 animate-fade-in-up" style="animation-delay: 0.2s">
                <img src="{{ $storageUrl($post->image) }}" class="img-fluid w-100" alt="{{ $post->title }}" style="max-height: 500px; object-fit: cover;">
            </div>
            @endif

            <div class="article-content lh-lg text-secondary animate-fade-in-up" style="animation-delay: 0.3s; font-size: 1.1rem;">
                {!! nl2br(e($post->content)) !!}
            </div>

            <div class="mt-5 pt-5 border-top d-flex justify-content-between align-items-center animate-fade-in-up" style="animation-delay: 0.4s">
                <a href="{{ route('news.index') }}" class="btn btn-outline-primary rounded-pill px-4">
                    <i class="fas fa-arrow-left me-2"></i> Kembali ke Berita
                </a>
                <div class="share-links d-flex gap-2 align-items-center">
                    <span class="small text-muted me-2 d-none d-sm-inline">Share:</span>
                    
                    {{-- WhatsApp Share Button --}}
                    <a href="https://wa.me/?text={{ urlencode($post->title . ' - ' . route('news.show', $post->slug)) }}" 
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-success btn-sm rounded-circle d-flex align-items-center justify-content-center share-btn-wa"
                       title="Share via WhatsApp"
                       style="width: 36px; height: 36px;">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    
                    {{-- Instagram Share Button --}}
                    <button onclick="shareToInstagram()" 
                            class="btn btn-sm rounded-circle d-flex align-items-center justify-content-center share-btn-ig"
                            title="Share to Instagram"
                            style="width: 36px; height: 36px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border: none; color: white;">
                        <i class="fab fa-instagram"></i>
                    </button>
                    
                    {{-- Facebook Share Button --}}
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(route('news.show', $post->slug)) }}" 
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                       title="Share on Facebook"
                       style="width: 36px; height: 36px; background-color: #1877f2;">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    
                    {{-- Twitter/X Share Button --}}
                    <a href="https://twitter.com/intent/tweet?text={{ urlencode($post->title) }}&url={{ urlencode(route('news.show', $post->slug)) }}" 
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-dark btn-sm rounded-circle d-flex align-items-center justify-content-center"
                       title="Share on Twitter/X"
                       style="width: 36px; height: 36px; background-color: #000000;">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function shareToInstagram() {
    const url = "{{ route('news.show', $post->slug) }}";
    const title = "{{ addslashes($post->title) }}";
    
    // Try to open Instagram app (works on mobile devices)
    const instagramUrl = 'instagram://';
    const fallbackTimeout = setTimeout(function() {
        // If Instagram app didn't open (desktop or app not installed)
        // Copy URL to clipboard instead
        copyToClipboard(url, title);
    }, 1000);
    
    // Try to open Instagram app
    window.location.href = instagramUrl;
    
    // If the page loses focus (app opened), clear the fallback
    window.addEventListener('blur', function() {
        clearTimeout(fallbackTimeout);
    }, { once: true });
}

function copyToClipboard(url, title) {
    // Create a temporary input element
    const tempInput = document.createElement('textarea');
    tempInput.value = url;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand('copy');
        // Show success message
        showToast('Link berhasil disalin! Silakan paste di Instagram', 'success');
    } catch (err) {
        // Fallback: show the URL in a prompt
        showToast('Silakan copy link berikut untuk Instagram: ' + url, 'info');
    }
    
    document.body.removeChild(tempInput);
}

function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}
</script>

<style>
    .bg-primary-light {
        background-color: rgba(13, 110, 253, 0.1);
    }
    .article-content p {
        margin-bottom: 1.5rem;
    }
    
    /* Social Share Button Styles */
    .share-links a,
    .share-links button {
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .share-links a:hover,
    .share-links button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .share-btn-wa:hover {
        background-color: #128C7E !important;
    }
    
    .share-btn-ig:hover {
        opacity: 0.9;
    }
    
    /* Toast Notification Styles */
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-success {
        border-left: 4px solid #28a745;
    }
    
    .toast-info {
        border-left: 4px solid #17a2b8;
    }
    
    .toast-notification i {
        color: #28a745;
        font-size: 1.2rem;
    }
    
    .toast-info i {
        color: #17a2b8;
    }
</style>
@endsection
