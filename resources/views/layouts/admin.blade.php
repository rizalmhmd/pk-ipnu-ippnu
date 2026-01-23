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
    
    <style>
        :root {
            --primary-color: #0d6efd;
            --secondary-color: #6c757d;
            --success-color: #198754;
            --info-color: #0dcaf0;
            --warning-color: #ffc107;
            --danger-color: #dc3545;
            --light-color: #f8f9fa;
            --dark-color: #212529;
            --sidebar-width: 280px;
            --font-family-sans-serif: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        body {
            font-family: var(--font-family-sans-serif);
            font-size: 0.9rem;
            background-color: #f4f6f9;
            color: #333;
        }
        
        /* Navbar */
        .navbar-custom {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
            height: 60px;
            z-index: 1000;
        }
        
        .navbar-brand {
            font-weight: 700;
            color: var(--primary-color) !important;
            font-size: 1.25rem;
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            top: 60px;
            bottom: 0;
            left: 0;
            z-index: 100;
            width: var(--sidebar-width);
            padding: 20px 0;
            box-shadow: inset -1px 0 0 rgba(0, 0, 0, .05);
            background-color: #fff;
            overflow-y: auto;
        }
        
        .sidebar-sticky {
            position: relative;
            height: calc(100vh - 60px);
            overflow-x: hidden;
            overflow-y: auto;
        }

        .nav-link {
            font-weight: 500;
            color: #555;
            padding: 10px 25px;
            border-radius: 0 25px 25px 0;
            margin-right: 15px;
            transition: all 0.2s;
        }

        .nav-link:hover {
            color: var(--primary-color);
            background-color: rgba(13, 110, 253, 0.05);
        }

        .nav-link.active {
            color: var(--primary-color);
            background-color: rgba(13, 110, 253, 0.1);
            position: relative;
        }
        
        .nav-link.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: var(--primary-color);
            border-radius: 0 4px 4px 0;
        }

        .nav-link i {
            margin-right: 10px;
            font-size: 1.1rem;
            vertical-align: text-bottom;
        }

        /* Main Content */
        main {
            margin-top: 60px;
            margin-left: var(--sidebar-width);
            padding: 30px;
            min-height: calc(100vh - 60px);
        }
        
        .card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
            transition: transform 0.2s;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            box-shadow: 0 4px 6px rgba(13, 110, 253, 0.2);
        }
        
        .btn-primary:hover {
            background-color: #0b5ed7;
            border-color: #0a58ca;
            transform: translateY(-1px);
        }

        @media (max-width: 767.98px) {
            .sidebar {
                top: 56px; /* Bootstrap default navbar height for mobile */
                width: 100%;
                height: auto;
                position: relative;
            }
            main {
                margin-left: 0;
                margin-top: 20px;
            }
        }
    </style>
</head>
<body>
    
    <header class="navbar navbar-custom fixed-top flex-md-nowrap p-0">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 bg-white" href="{{ route('home') }}">
           Admin Panel
        </a>
        
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="w-100"></div>
        
        <div class="navbar-nav px-3">
            <div class="nav-item text-nowrap">
                <form method="POST" action="{{ route('logout') }}" class="d-inline">
                    @csrf
                    <button type="submit" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-box-arrow-right"></i> Keluar
                    </button>
                </form>
            </div>
        </div>
    </header>

    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
                <div class="position-sticky pt-3">
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

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <i class="bi bi-check-circle-fill me-2"></i> {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif
                
                <div class="py-4">
                    @yield('content')
                </div>
            </main>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
