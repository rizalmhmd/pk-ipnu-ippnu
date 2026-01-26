<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - {{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}</title>
    
    @if($siteSetting->favicon)
    <link rel="icon" type="image/x-icon" href="{{ $storageUrl($siteSetting->favicon) }}">
    @endif
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS Dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    
    @stack('styles')
    
    <style>
        :root {
            --primary-color: #059669;
            --primary-blue: #2563eb;
            --secondary-color: #64748b;
            --success-color: #10b981;
            --info-color: #3b82f6;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --sidebar-width: 280px;
            --sidebar-collapsed: 80px;
            --font-family: 'Inter', sans-serif;
            --font-heading: 'Plus Jakarta Sans', sans-serif;
            
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-sidebar: #ffffff;
            --bg-navbar: rgba(255, 255, 255, 0.85);
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --border-color: #e2e8f0;
            --card-bg: #ffffff;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
        }

        html.dark-mode {
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --bg-sidebar: #1e293b;
            --bg-navbar: rgba(30, 41, 59, 0.85);
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --border-color: #334155;
            --card-bg: #1e293b;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: var(--font-family);
            font-size: 0.9375rem;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            transition: background-color 0.3s, color 0.3s;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
        }

        h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); font-weight: 600; }
        .text-dark { color: var(--text-primary) !important; }
        .text-muted { color: var(--text-secondary) !important; }
        .bg-white { background-color: var(--card-bg) !important; }

        .navbar-premium {
            position: fixed;
            top: 0; left: 0; right: 0; height: 70px;
            background: var(--bg-navbar);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border-color);
            z-index: 1050; padding: 0 1.5rem;
            display: flex; align-items: center;
        }

        .sidebar-premium {
            position: fixed;
            top: 0; bottom: 0; left: 0; width: var(--sidebar-width);
            background: var(--bg-sidebar);
            border-right: 1px solid var(--border-color);
            z-index: 1040; padding-top: 70px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .sidebar-premium.collapsed { width: var(--sidebar-collapsed); }
        
        .main-content {
            margin-left: var(--sidebar-width); margin-top: 70px;
            padding: 2.5rem; min-height: calc(100vh - 70px);
            transition: margin-left 0.3s;
        }
        .main-content.collapsed { margin-left: var(--sidebar-collapsed); }

        /* Typography & Nav */
        .nav-list { list-style: none; padding: 1.5rem 1rem; margin: 0; flex-grow: 1; }
        .nav-item { margin-bottom: 0.25rem; }
        .nav-link {
            display: flex; align-items: center; padding: 0.875rem 1rem;
            color: var(--text-secondary); text-decoration: none;
            border-radius: var(--radius-md); transition: all 0.2s;
        }
        .nav-link:hover { color: var(--text-primary); background: var(--bg-secondary); transform: translateX(4px); }
        .nav-link.active {
            color: white; background: linear-gradient(135deg, var(--primary-color), var(--primary-blue));
            box-shadow: 0 4px 12px rgba(0, 128, 0, 0.3); font-weight: 600;
        }
        .nav-icon { font-size: 1.25rem; margin-right: 0.75rem; width: 24px; text-align: center; }
        .nav-link.active .nav-icon { color: white; }
        .badge { margin-left: auto; font-size: 0.625rem; padding: 0.25rem 0.6rem; border-radius: 2rem; background: rgba(255, 255, 255, 0.2); color: white; }
        .nav-link.active .badge { background: white; color: var(--primary-color); }

        .sidebar-divider { position: relative; margin: 1.5rem 1rem; height: 1px; background: var(--border-color); }
        .sidebar-divider span { position: absolute; top: -10px; left: 1rem; background: var(--bg-sidebar); padding: 0 0.5rem; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }

        .sidebar-header { padding: 2rem 1.5rem; text-align: center; border-bottom: 1px solid var(--border-color); }
        .sidebar-header h3 { font-size: 1.15rem; margin-bottom: 0.25rem; }
        .sidebar-header p { font-size: 0.75rem; color: var(--text-secondary); margin: 0; }

        .user-dropdown { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; border-radius: var(--radius-md); background: var(--bg-secondary); cursor: pointer; transition: all 0.2s; border: 1px solid var(--border-color); color: var(--text-primary); }
        .user-dropdown:hover { background: var(--card-bg); box-shadow: var(--shadow-md); transform: translateY(-1px); }
        .user-avatar { width: 36px; height: 36px; background: linear-gradient(135deg, var(--primary-color), var(--primary-blue)); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }

        .sidebar-toggle {
            position: absolute; top: 1.25rem; right: -12px;
            width: 24px; height: 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-blue));
            border-radius: 50%; color: white; cursor: pointer;
            z-index: 1050; display: flex; align-items: center; justify-content: center;
            box-shadow: var(--shadow-md); transition: all 0.2s;
        }
        .sidebar-toggle:hover { transform: scale(1.1); box-shadow: var(--shadow-lg); }

        .sidebar-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); z-index: 1035; display: none; }
        .sidebar-overlay.show { display: block; }

        @media (max-width: 991.98px) {
            .sidebar-premium { transform: translateX(-100%); }
            .sidebar-premium.show { transform: translateX(0); box-shadow: 15px 0 35px rgba(0,0,0,0.1); }
            .main-content { margin-left: 0 !important; padding: 1.5rem; }
            .sidebar-toggle { display: none; }
            .mobile-menu-btn { display: block !important; }
        }
        .mobile-menu-btn { display: none; }

        .brand-logo { 
            width: 42px; height: 42px; 
            background: linear-gradient(135deg, var(--primary-color), var(--primary-blue)); 
            border-radius: 12px; 
            display: flex; align-items: center; justify-content: center; 
            color: white !important; font-size: 1.25rem; 
            box-shadow: 0 4px 10px rgba(0,128,0,0.2);
            overflow: hidden;
            flex-shrink: 0;
        }
        .brand-logo img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
        .brand-text { background: linear-gradient(135deg, var(--primary-color), var(--primary-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 800; font-size: 1.35rem; }

        /* Global CRUD Styling */
        .table-premium thead th {
            background-color: var(--bg-secondary);
            color: var(--text-secondary);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            padding: 1.25rem 1rem;
            border-bottom: 1px solid var(--border-color);
        }
        .table-premium tbody td { padding: 1.25rem 1rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); }
        .form-label-premium { font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.9rem; }
        .form-control-premium { 
            background-color: var(--bg-secondary); 
            border: 1px solid var(--border-color);
            padding: 0.75rem 1rem;
            border-radius: 10px;
            transition: all 0.2s;
            color: var(--text-primary);
        }
        .form-control-premium:focus {
            background-color: var(--card-bg);
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1);
            outline: none;
        }

        .card-premium { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); transition: all 0.3s; }
        .card-premium:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

        .btn-premium { background: linear-gradient(135deg, var(--primary-color), var(--primary-blue)); border: none; color: white; padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0, 128, 0, 0.2); }
        .btn-premium:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 128, 0, 0.3); color: white; }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner-premium { width: 40px; height: 40px; border: 3px solid var(--border-color); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; }
        .hover-lift { transition: all 0.3s; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
        .alert-premium { border: none; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); background: var(--card-bg); border-left: 4px solid; color: var(--text-primary); }
        .form-check-input:checked { background-color: var(--primary-color); border-color: var(--primary-color); }
        
        /* Dark mode transitions */
        html.dark-mode .nav-link:not(.active) { color: var(--text-secondary); }
        html.dark-mode .nav-link:not(.active):hover { background: rgba(255, 255, 255, 0.05); color: white; }

        /* Global Dark Mode Overrides for Bootstrap */
        html.dark-mode .card { background-color: var(--card-bg); border-color: var(--border-color); color: var(--text-primary); }
        html.dark-mode .card-header { background-color: rgba(255, 255, 255, 0.03); border-color: var(--border-color); color: var(--text-primary); }
        html.dark-mode .table { color: var(--text-primary); border-color: var(--border-color); --bs-table-bg: transparent; }
        html.dark-mode .table td, html.dark-mode .table th { background-color: transparent !important; color: var(--text-primary); }
        html.dark-mode .table-hover tbody tr:hover { background-color: rgba(255, 255, 255, 0.05) !important; }
        html.dark-mode .modal-content { background-color: var(--bg-sidebar); border-color: var(--border-color); color: var(--text-primary); }
        html.dark-mode .modal-header, html.dark-mode .modal-footer { border-color: var(--border-color); }
        html.dark-mode .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
        html.dark-mode .dropdown-menu { background-color: var(--bg-sidebar); border-color: var(--border-color); box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important; }
        html.dark-mode .dropdown-item { color: var(--text-primary); }
        html.dark-mode .dropdown-item:hover { background-color: rgba(255, 255, 255, 0.05); color: var(--text-primary); }
        html.dark-mode .dropdown-item.text-danger:hover { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; }
        html.dark-mode .dropdown-divider { border-color: var(--border-color); }
        html.dark-mode .form-control, html.dark-mode .form-select { 
            background-color: var(--bg-secondary); 
            border-color: var(--border-color); 
            color: var(--text-primary); 
        }
        html.dark-mode .form-control:focus, html.dark-mode .form-select:focus { 
            background-color: var(--bg-secondary); 
            color: var(--text-primary); 
        }
        html.dark-mode .input-group-text { background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-secondary); }
        html.dark-mode .bg-light { background-color: var(--bg-secondary) !important; }
        html.dark-mode .text-muted { color: var(--text-secondary) !important; }
        html.dark-mode .alert-success { background-color: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #10b981; }
        html.dark-mode .alert-danger { background-color: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #ef4444; }

        /* Custom Scrollbar for Dark Mode */
        html.dark-mode ::-webkit-scrollbar { width: 8px; }
        html.dark-mode ::-webkit-scrollbar-track { background: var(--bg-primary); }
        html.dark-mode ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
        html.dark-mode ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }
    </style>
</head>
<body>
    <script>
        (function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-mode');
            }
        })();
    </script>

    <!-- Navbar -->
    <nav class="navbar-premium">
        <div class="d-flex align-items-center justify-content-between w-100">
            <div class="d-flex align-items-center gap-3">
                <button class="btn btn-link mobile-menu-btn p-0" type="button" id="mobileMenuBtn">
                    <i class="bi bi-list fs-2 text-dark"></i>
                </button>
                <a class="navbar-brand d-flex align-items-center gap-2" href="{{ route('home') }}">
                    <div class="brand-logo">
                        @if($siteSetting->site_logo)
                            <img src="{{ $storageUrl($siteSetting->site_logo) }}" alt="Logo">
                        @else
                            <i class="bi bi-building"></i>
                        @endif
                    </div>
                    <span class="brand-text d-none d-sm-inline">{{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}</span>
                </a>
            </div>

            <div class="d-flex align-items-center gap-3">
                <div class="form-check form-switch mb-0 d-flex align-items-center gap-2">
                    <i class="bi bi-sun-fill text-warning"></i>
                    <input class="form-check-input" type="checkbox" role="switch" id="themeToggle">
                    <i class="bi bi-moon-stars-fill text-primary"></i>
                </div>

                <div class="dropdown">
                    <div class="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="user-avatar">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</div>
                        <div class="user-info d-none d-md-block">
                            <div class="fw-bold" style="font-size: 0.85rem;">{{ Auth::user()->name }}</div>
                            <div class="text-muted" style="font-size: 0.7rem;">Administrator</div>
                        </div>
                        <i class="bi bi-chevron-down ms-1" style="font-size: 0.7rem;"></i>
                    </div>
                    
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 py-2" style="min-width: 220px; border-radius: 12px;">
                        <li><div class="px-3 py-2 border-bottom border-color mb-2"><div class="fw-bold text-dark">{{ Auth::user()->name }}</div><div class="text-muted small">{{ Auth::user()->email }}</div></div></li>
                        <li><a class="dropdown-item py-2" href="{{ route('admin.profile.edit') }}"><i class="bi bi-person-circle me-2"></i> Profil Saya</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="dropdown-item py-2 text-danger"><i class="bi bi-box-arrow-right me-2"></i> Keluar</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- Sidebar -->
    <aside class="sidebar-premium" id="sidebar">
        <div class="sidebar-toggle" id="sidebarToggle"><i class="bi bi-chevron-left"></i></div>

        <div class="sidebar-header">
            <h3 class="fw-bold text-dark">Admin Panel</h3>
            <p>{{ $siteSetting->site_name ?? 'PKPT IPNU IPPNU' }}</p>
        </div>

        <div class="flex-grow-1 overflow-auto">
            <ul class="nav-list">
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}"><i class="bi bi-speedometer2 nav-icon"></i><span class="nav-link-text">Dashboard</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.posts.*') ? 'active' : '' }}" href="{{ route('admin.posts.index') }}"><i class="bi bi-newspaper nav-icon"></i><span class="nav-link-text">Berita</span><span class="badge">{{ $adminCounts->posts ?? 0 }}</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.galleries.*') ? 'active' : '' }}" href="{{ route('admin.galleries.index') }}"><i class="bi bi-images nav-icon"></i><span class="nav-link-text">Galeri</span><span class="badge">{{ $adminCounts->galleries ?? 0 }}</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.members.*') ? 'active' : '' }}" href="{{ route('admin.members.index') }}"><i class="bi bi-people nav-icon"></i><span class="nav-link-text">Anggota</span><span class="badge">{{ $adminCounts->members ?? 0 }}</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.agendas.*') ? 'active' : '' }}" href="{{ route('admin.agendas.index') }}"><i class="bi bi-calendar-event nav-icon"></i><span class="nav-link-text">Agenda</span><span class="badge">{{ $adminCounts->agendas ?? 0 }}</span></a></li>

                <div class="sidebar-divider"><span>Pengaturan</span></div>

                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.site-settings.*') ? 'active' : '' }}" href="{{ route('admin.site-settings.edit') }}"><i class="bi bi-gear nav-icon"></i><span class="nav-link-text">Pengaturan Situs</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.page-settings.*') ? 'active' : '' }}" href="{{ route('admin.page-settings.index') }}"><i class="bi bi-window-sidebar nav-icon"></i><span class="nav-link-text">Halaman</span></a></li>
                <li class="nav-item"><a class="nav-link {{ request()->routeIs('admin.profile.*') ? 'active' : '' }}" href="{{ route('admin.profile.edit') }}"><i class="bi bi-person-badge nav-icon"></i><span class="nav-link-text">Profil Saya</span></a></li>
            </ul>
        </div>

        <div class="mt-auto p-4 border-top text-center" style="border-color: var(--border-color)">
            <small class="text-muted d-block mb-2">© {{ date('Y') }} PKPT IPNU IPPNU</small>
            <div class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3">Sistem Online</div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content" id="mainContent">
        @if(session('success'))
            <div class="alert alert-success alert-premium animate__animated animate__fadeIn mb-4" role="alert">
                <div class="d-flex align-items-center"><i class="bi bi-check-circle-fill me-2 fs-5"></i><div class="flex-grow-1">{{ session('success') }}</div><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-danger alert-premium animate__animated animate__fadeIn mb-4" role="alert">
                <div class="d-flex align-items-center"><i class="bi bi-exclamation-circle-fill me-2 fs-5"></i><div class="flex-grow-1">{{ session('error') }}</div><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
            </div>
        @endif

        <div class="animate__animated animate__fadeIn">
            @yield('content')
        </div>
    </main>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const body = document.body;
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            const themeToggle = document.getElementById('themeToggle');

            // Sync theme toggle with current state
            if (document.documentElement.classList.contains('dark-mode')) {
                themeToggle.checked = true;
            }

            // Sidebar state
            let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            function updateSidebar(collapsed) {
                if (window.innerWidth >= 992) {
                    if (collapsed) {
                        sidebar.classList.add('collapsed');
                        mainContent.classList.add('collapsed');
                        sidebarToggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
                    } else {
                        sidebar.classList.remove('collapsed');
                        mainContent.classList.remove('collapsed');
                        sidebarToggle.innerHTML = '<i class="bi bi-chevron-left"></i>';
                    }
                }
            }
            updateSidebar(isCollapsed);

            sidebarToggle.addEventListener('click', () => {
                isCollapsed = !isCollapsed;
                localStorage.setItem('sidebarCollapsed', isCollapsed);
                updateSidebar(isCollapsed);
            });

            // Mobile menu
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.add('show');
                sidebarOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            });

            const closeMobile = () => {
                sidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
                document.body.style.overflow = '';
            };
            sidebarOverlay.addEventListener('click', closeMobile);

            // Theme toggle logic
            themeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                }
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth >= 992) {
                    closeMobile();
                    updateSidebar(isCollapsed);
                }
            });

            // Active nav handling
            const path = window.location.pathname;
            document.querySelectorAll('.nav-link').forEach(link => {
                const href = link.getAttribute('href');
                if (path === href || (href !== '/' && path.startsWith(href))) {
                    link.classList.add('active');
                }
            });
        });
    </script>

    @stack('scripts')
</body>
</html>