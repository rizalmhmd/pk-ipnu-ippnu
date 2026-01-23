<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{ $siteSetting->meta_description ?? 'Portal Resmi PKPT IPNU IPPNU - Wadah Pengembangan Kader Pelajar Terpadu' }}">
    <title>@yield('title', $siteSetting->site_name ?? 'PKPT IPNU IPPNU') - Portal Resmi</title>
    
    @if($siteSetting->favicon)
    <link rel="icon" type="image/x-icon" href="{{ asset('storage/' . $siteSetting->favicon) }}">
    @endif
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --primary-green: #008000;
            --primary-blue: #0000FF;
            --green-light: #e8f5e9;
            --blue-light: #e3f2fd;
            --green-dark: #006400;
            --blue-dark: #0000cc;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-800: #1f2937;
            --gradient-primary: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            --radius-sm: 0.375rem;
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--gray-800);
            background-color: #ffffff;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            line-height: 1.3;
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-in {
            animation: slideIn 0.5s ease-out forwards;
        }

        /* Custom Navbar */
        .navbar-custom {
            background: var(--gradient-primary);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-lg);
            padding: 0.75rem 0;
            transition: all 0.3s ease;
        }

        .navbar-custom.scrolled {
            background: rgba(0, 128, 0, 0.95);
            backdrop-filter: blur(10px);
        }

        .navbar-brand-custom {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: 1.75rem;
            color: white !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .navbar-brand-custom .badge {
            font-size: 0.6rem;
            padding: 0.25rem 0.5rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }

        .nav-link-custom {
            color: rgba(255, 255, 255, 0.9) !important;
            font-weight: 500;
            padding: 0.5rem 1rem !important;
            border-radius: var(--radius-sm);
            transition: all 0.2s ease;
            margin: 0 0.25rem;
            position: relative;
        }

        .nav-link-custom:hover {
            color: white !important;
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .nav-link-custom.active {
            color: white !important;
            background: rgba(255, 255, 255, 0.15);
        }

        .nav-link-custom.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 1rem;
            right: 1rem;
            height: 2px;
            background: white;
            border-radius: 2px;
        }

        .btn-admin {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white !important;
            padding: 0.5rem 1.5rem !important;
            border-radius: var(--radius-md);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .btn-admin:hover {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-admin i {
            margin-right: 0.5rem;
        }

        /* Hero Section */
        .hero-section {
            background: linear-gradient(rgba(0, 64, 0, 0.85), rgba(0, 0, 128, 0.85)), 
                        url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            padding: 8rem 0;
            position: relative;
            overflow: hidden;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(0, 128, 0, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(0, 0, 255, 0.2) 0%, transparent 50%);
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin: 0 auto;
        }

        .hero-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
            font-size: 1.25rem;
            opacity: 0.95;
            margin-bottom: 2rem;
            line-height: 1.8;
        }

        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            .hero-subtitle {
                font-size: 1.1rem;
            }
        }

        /* Footer */
        .footer-custom {
            background: linear-gradient(135deg, var(--gray-800) 0%, #111827 100%);
            color: white;
            padding: 4rem 0 2rem;
            margin-top: auto;
        }

        .footer-brand {
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: inline-block;
        }

        .footer-description {
            color: #9ca3af;
            margin-bottom: 2rem;
            max-width: 300px;
        }

        .footer-links h5 {
            color: white;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .footer-links ul {
            list-style: none;
            padding: 0;
        }

        .footer-links li {
            margin-bottom: 0.75rem;
        }

        .footer-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .footer-links a:hover {
            color: white;
            transform: translateX(5px);
        }

        .footer-links a i {
            font-size: 0.875rem;
            width: 20px;
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .social-links a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background: var(--gradient-primary);
            transform: translateY(-3px);
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 2rem;
            margin-top: 3rem;
            text-align: center;
            color: #9ca3af;
            font-size: 0.875rem;
        }

        /* Main Content */
        .main-content {
            min-height: calc(100vh - 400px);
            padding: 3rem 0;
        }

        /* Custom Card */
        .card-custom {
            border: none;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .card-custom:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }

        .card-custom .card-header {
            background: var(--gradient-primary);
            color: white;
            border: none;
            padding: 1rem 1.5rem;
            font-weight: 600;
        }

        /* Utility Classes */
        .gradient-text {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .btn-gradient {
            background: var(--gradient-primary);
            border: none;
            color: white;
            padding: 0.75rem 2rem;
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 128, 0, 0.2);
        }

        .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 128, 0, 0.3);
            color: white;
        }

        .section-title {
            position: relative;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--gradient-primary);
            border-radius: 2px;
        }

        .section-title.text-center::after {
            left: 50%;
            transform: translateX(-50%);
        }

        /* Responsive */
        @media (max-width: 992px) {
            .navbar-custom {
                padding: 0.5rem 0;
            }
            
            .nav-link-custom {
                margin: 0.25rem 0;
                padding: 0.75rem 1rem !important;
            }
            
            .btn-admin {
                margin-top: 1rem;
                width: 100%;
                text-align: center;
            }
        }

        /* Custom Toggler */
        .navbar-toggler-custom {
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0.25rem 0.5rem;
        }

        .navbar-toggler-custom:focus {
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);
        }

        .navbar-toggler-icon-custom {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.9%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-custom fixed-top" id="mainNav">
        <div class="container">
            <!-- Brand -->
            <a class="navbar-brand-custom" href="{{ route('home') }}">
                @if($siteSetting->site_logo)
                    <img src="{{ asset('storage/' . $siteSetting->site_logo) }}" alt="Logo" height="40" class="me-2">
                @else
                    <i class="fas fa-users"></i>
                @endif
                {{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}
                <span class="badge">Portal</span>
            </a>

            <!-- Mobile Toggler -->
            <button class="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#navPublic">
                <span class="navbar-toggler-icon navbar-toggler-icon-custom"></span>
            </button>

            <!-- Navigation Links -->
            <div class="collapse navbar-collapse" id="navPublic">
                <ul class="navbar-nav ms-auto align-items-lg-center">
                    <li class="nav-item">
                        <a class="nav-link-custom {{ request()->routeIs('home') ? 'active' : '' }}" 
                           href="{{ route('home') }}">
                            <i class="fas fa-home me-1"></i> Beranda
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link-custom {{ request()->routeIs('profile') ? 'active' : '' }}" 
                           href="{{ route('profile') }}">
                            <i class="fas fa-landmark me-1"></i> Profil
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link-custom {{ request()->routeIs('news.*') ? 'active' : '' }}" 
                           href="{{ route('news.index') }}">
                            <i class="fas fa-newspaper me-1"></i> Berita
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link-custom {{ request()->routeIs('gallery.*') ? 'active' : '' }}" 
                           href="{{ route('gallery.index') }}">
                            <i class="fas fa-images me-1"></i> Galeri
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link-custom btn-admin" href="{{ route('login') }}">
                            <i class="fas fa-lock"></i> Admin Area
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section (Optional - can be overridden in child views) -->
    @hasSection('hero')
        @yield('hero')
    @else
        <section class="hero-section" style="{{ $siteSetting->default_hero_image ? 'background-image: linear-gradient(rgba(0, 64, 0, 0.75), rgba(0, 0, 128, 0.75)), url(' . asset('storage/' . $siteSetting->default_hero_image) . ');' : '' }}">
            <div class="container">
                <div class="hero-content animate-fade-in-up text-center">
                    <h1 class="hero-title">{{ $siteSetting->default_hero_title ?? 'Portal Resmi PKPT IPNU IPPNU' }}</h1>
                    <p class="hero-subtitle">
                        {{ $siteSetting->default_hero_subtitle ?? 'Wadah Pengembangan Kader Pelajar Terpadu untuk membentuk generasi muda yang berakhlak mulia, berwawasan luas, dan berkontribusi positif bagi masyarakat dan bangsa.' }}
                    </p>
                    <div class="d-flex gap-3 justify-content-center flex-wrap">
                        <a href="{{ route('profile') }}" class="btn btn-gradient">
                            <i class="fas fa-info-circle me-2"></i> Pelajari Lebih Lanjut
                        </a>
                        <a href="{{ route('news.index') }}" class="btn btn-outline-light">
                            <i class="fas fa-newspaper me-2"></i> Lihat Berita Terbaru
                        </a>
                    </div>
                </div>
            </div>
        </section>
    @endif

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            @yield('content')
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer-custom">
        <div class="container">
            <div class="row">
                <!-- Brand & Description -->
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <h3 class="footer-brand">{{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}</h3>
                    <p class="footer-description">
                        {{ $siteSetting->footer_description ?? 'Wadah pengembangan kader pelajar terpadu yang berkomitmen membentuk generasi muda yang berkualitas dan berakhlak mulia.' }}
                    </p>
                    <div class="social-links">
                        @if($siteSetting->facebook) <a href="{{ $siteSetting->facebook }}" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a> @endif
                        @if($siteSetting->instagram) <a href="{{ $siteSetting->instagram }}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a> @endif
                        @if($siteSetting->twitter) <a href="{{ $siteSetting->twitter }}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a> @endif
                        @if($siteSetting->youtube) <a href="{{ $siteSetting->youtube }}" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a> @endif
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
                    <div class="footer-links">
                        <h5>Tautan Cepat</h5>
                        <ul>
                            <li><a href="{{ route('home') }}"><i class="fas fa-chevron-right"></i> Beranda</a></li>
                            <li><a href="{{ route('profile') }}"><i class="fas fa-chevron-right"></i> Profil</a></li>
                            <li><a href="{{ route('news.index') }}"><i class="fas fa-chevron-right"></i> Berita</a></li>
                            <li><a href="{{ route('gallery.index') }}"><i class="fas fa-chevron-right"></i> Galeri</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Legal -->
                <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div class="footer-links">
                        <h5>Legal</h5>
                        <ul>
                            <li><a href="#"><i class="fas fa-chevron-right"></i> Kebijakan Privasi</a></li>
                            <li><a href="#"><i class="fas fa-chevron-right"></i> Syarat & Ketentuan</a></li>
                            <li><a href="#"><i class="fas fa-chevron-right"></i> FAQ</a></li>
                            <li><a href="{{ route('login') }}"><i class="fas fa-chevron-right"></i> Admin Area</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Contact -->
                <div class="col-lg-3 col-md-6">
                    <div class="footer-links">
                        <h5>Kontak</h5>
                        <ul>
                            @if($siteSetting->address)
                            <li>
                                <a href="#">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>{{ $siteSetting->address }}</span>
                                </a>
                            </li>
                            @endif
                            @if($siteSetting->email)
                            <li>
                                <a href="mailto:{{ $siteSetting->email }}">
                                    <i class="fas fa-envelope"></i>
                                    <span>{{ $siteSetting->email }}</span>
                                </a>
                            </li>
                            @endif
                            @if($siteSetting->phone)
                            <li>
                                <a href="tel:{{ $siteSetting->phone }}">
                                    <i class="fas fa-phone"></i>
                                    <span>{{ $siteSetting->phone }}</span>
                                </a>
                            </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} {{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}. {{ $siteSetting->copyright_text ?? 'Hak Cipta Dilindungi.' }}</p>
                <p class="mb-0">Dibangun dengan <i class="fas fa-heart text-danger"></i> untuk kemajuan generasi muda</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Navbar scroll effect
            const navbar = document.getElementById('mainNav');
            if (navbar) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });
            }

            // Active nav link highlighting
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link-custom');
            
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                if (currentPath === linkPath || 
                   (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                    link.classList.add('active');
                }
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Animation on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.animate-fade-in-up, .animate-slide-in').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                observer.observe(el);
            });
        });

        // Page load animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            
            // Remove loading animation after page load
            setTimeout(() => {
                const loadingElements = document.querySelectorAll('.hero-content');
                loadingElements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }, 300);
        });
    </script>
</body>
</html>