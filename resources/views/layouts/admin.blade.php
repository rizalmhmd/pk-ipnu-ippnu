<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - PKPT IPNU IPPNU</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    @stack('styles')
    
    <style>
        :root {
            --primary-color: #008000;
            --primary-blue: #0000FF;
            --secondary-color: #64748b;
            --success-color: #10b981;
            --info-color: #3b82f6;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --light-color: #f8fafc;
            --dark-color: #0f172a;
            --sidebar-width: 260px;
            --font-family: 'Inter', sans-serif;
            --glass-bg: rgba(255, 255, 255, 0.95);
            --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
            --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: var(--font-family);
            font-size: 0.9375rem;
            background-color: #f1f5f9;
            color: var(--dark-color);
            overflow-x: hidden;
        }
        
        /* Navbar Refinement */
        .navbar-custom {
            background-color: var(--glass-bg);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
            height: 64px;
            z-index: 1040;
        }
        
        .navbar-brand {
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-blue) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.4rem;
            letter-spacing: -0.025em;
        }

        /* Sidebar Refinement */
        .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;
            width: var(--sidebar-width);
            padding: 1.5rem 0.75rem;
            background-color: #fff;
            border-right: 1px solid #e2e8f0;
            overflow-y: auto;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (min-width: 992px) {
            .sidebar {
                top: 64px;
            }
        }

        .sidebar-header {
            display: none;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1rem 1.5rem;
            border-bottom: 1px solid #f1f5f9;
            margin-bottom: 1rem;
        }

        .btn-close:focus {
            box-shadow: none;
            outline: 2px solid var(--primary-color);
        }

        @media (max-width: 991.98px) {
            .sidebar {
                left: 0;
                transform: translateX(-100%);
                padding-top: 0.5rem;
                box-shadow: none;
                visibility: hidden;
                border-right: none;
            }
            .sidebar.show {
                transform: translateX(0);
                box-shadow: 10px 0 25px -5px rgba(0, 0, 0, 0.2);
                visibility: visible;
            }
            .sidebar-header {
                display: flex;
            }
            #sidebarClose {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 1px solid #e2e8f0;
                background: #f8fafc;
                color: #64748b;
                cursor: pointer;
                transition: all 0.2s;
            }
            #sidebarClose:hover {
                background: #f1f5f9;
                color: var(--danger-color);
            }
        }
        
        .sidebar-heading {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: var(--secondary-color);
            margin: 1.5rem 1rem 0.5rem;
        }

        .nav-link {
            font-weight: 500;
            color: #475569;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            margin-bottom: 0.125rem;
            display: flex;
            align-items: center;
            transition: all 0.2s;
        }

        .nav-link:hover {
            color: var(--primary-color);
            background-color: #f8fafc;
            transform: translateX(4px);
        }

        .nav-link.active {
            color: white;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-blue) 100%);
            box-shadow: 0 4px 12px rgba(0, 128, 0, 0.2);
        }
        
        .nav-link i {
            margin-right: 0.75rem;
            font-size: 1.25rem;
            opacity: 0.8;
        }

        .nav-link.active i {
            opacity: 1;
        }

        /* Main Content Refinement */
        main {
            padding: 2rem;
            min-height: calc(100vh - 64px);
            transition: all 0.3s ease;
            margin-top: 64px;
        }

        @media (min-width: 992px) {
            main {
                margin-left: var(--sidebar-width);
            }
        }
        
        .card {
            border: none;
            border-radius: 1rem;
            box-shadow: var(--card-shadow);
            transition: all 0.3s ease;
            background: #fff;
        }
        
        .card:hover {
            box-shadow: var(--card-shadow-hover);
        }
        
        .btn {
            padding: 0.6rem 1.2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .btn-sm {
            padding: 0.4rem 0.8rem;
            font-size: 0.8125rem;
        }
        
        .bg-gradient {
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-blue) 100%) !important;
        }

        /* Mobile Refinement */
        @media (max-width: 991.98px) {
            .sidebar-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(4px);
                z-index: 1045;
                display: none;
            }
            .sidebar-backdrop.show {
                display: block;
            }
            main {
                padding: 1.5rem 1rem;
            }
        }

        /* Table Design */
        .table thead th {
            background-color: #f8fafc;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            color: #64748b;
            padding: 1rem;
            border-bottom: 2px solid #e2e8f0;
        }

        .table tbody td {
            padding: 1rem;
            vertical-align: middle;
            color: #334155;
            border-bottom: 1px solid #f1f5f9;
        }

        .alert {
            border: none;
            border-radius: 0.75rem;
            box-shadow: var(--card-shadow);
        }
    </style>
</head>
<body>
    
    <header class="navbar navbar-custom fixed-top flex-md-nowrap p-0 px-3">
        <div class="d-flex align-items-center w-100">
            <button class="btn btn-link link-dark d-lg-none me-2 p-0" type="button" id="sidebarToggle" aria-label="Toggle navigation">
                <i class="bi bi-list fs-2"></i>
            </button>
            <a class="navbar-brand me-0" href="{{ route('home') }}">
               PKPT IPNU IPPNU
            </a>
            
            <div class="ms-auto d-flex align-items-center">
                <form method="POST" action="{{ route('logout') }}" class="d-inline">
                    @csrf
                    <button type="submit" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-box-arrow-right"></i> <span class="d-none d-sm-inline">Keluar</span>
                    </button>
                </form>
            </div>
        </div>
    </header>

    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

    <nav id="sidebarMenu" class="sidebar">
        <div class="sidebar-header">
            <span class="fw-bold text-primary">Menu Admin</span>
            <div id="sidebarClose">
                <i class="bi bi-x-lg fs-5"></i>
            </div>
        </div>
        <div class="pt-1">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">
                        <i class="bi bi-speedometer2"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.posts.*') ? 'active' : '' }}" href="{{ route('admin.posts.index') }}">
                        <i class="bi bi-newspaper"></i> Berita
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.galleries.*') ? 'active' : '' }}" href="{{ route('admin.galleries.index') }}">
                        <i class="bi bi-images"></i> Galeri
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.members.*') ? 'active' : '' }}" href="{{ route('admin.members.index') }}">
                        <i class="bi bi-people"></i> Anggota
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.agendas.*') ? 'active' : '' }}" href="{{ route('admin.agendas.index') }}">
                        <i class="bi bi-calendar-event"></i> Agenda
                    </a>
                </li>
            </ul>
            
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span>Pengaturan</span>
            </h6>
            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.site-settings.*') ? 'active' : '' }}" href="{{ route('admin.site-settings.edit') }}">
                        <i class="bi bi-gear"></i> Pengaturan Situs
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('admin.page-settings.*') ? 'active' : '' }}" href="{{ route('admin.page-settings.index') }}">
                        <i class="bi bi-window-sidebar"></i> Pengaturan Halaman
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.profile.edit') }}">
                        <i class="bi bi-person-circle"></i> Profil Saya
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <main id="mainContent">
        @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif
        
        <div class="py-2">
            @yield('content')
        </div>
    </main>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    (function() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarClose = document.getElementById('sidebarClose');
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');

        function openSidebar() {
            if (sidebarMenu) sidebarMenu.classList.add('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('Sidebar opened');
        }

        function closeSidebar() {
            if (sidebarMenu) sidebarMenu.classList.remove('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
            document.body.style.overflow = '';
            console.log('Sidebar closed');
        }

        if (sidebarToggle) {
            sidebarToggle.onclick = function(e) {
                e.preventDefault();
                openSidebar();
            };
        }

        if (sidebarClose) {
            sidebarClose.onclick = function(e) {
                e.preventDefault();
                closeSidebar();
            };
        }

        if (sidebarBackdrop) {
            sidebarBackdrop.onclick = function() {
                closeSidebar();
            };
        }

        // Close sidebar when clicking on a link (on mobile)
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => {
            link.onclick = function() {
                if (window.innerWidth < 992) {
                    closeSidebar();
                }
            };
        });
    })();
    </script>
    @stack('scripts')
</body>
</html>
