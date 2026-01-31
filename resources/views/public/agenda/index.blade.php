@extends('layouts.public')

@section('title', 'Agenda & Kalender Kegiatan - PKPT IPNU IPPNU')

@section('content')
<!-- Hero Section -->
<section class="hero-section py-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(5, 150, 105, 0.95), rgba(37, 99, 235, 0.95)), url('https://images.unsplash.com/photo-1523435401140-a25d0a2954f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-position: center;">
    <div class="container position-relative z-1 px-4 text-white">
        <div class="row align-items-center py-4">
            <div class="col-lg-8 text-center text-lg-start">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-3 justify-content-center justify-content-lg-start">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-white opacity-75 text-decoration-none"><i class="fas fa-home me-1"></i> Beranda</a></li>
                        <li class="breadcrumb-item active text-white" aria-current="page">Agenda</li>
                    </ol>
                </nav>
                <h1 class="display-4 fw-bold mb-3">Kalender <span class="text-warning">Kegiatan</span></h1>
                <p class="lead opacity-90 mb-4">Temukan berbagai jadwal program kerja, agenda nasional, dan kegiatan produktif PKPT IPNU IPPNU dalam satu wadah terpadu.</p>
                
                <div class="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                    <span class="badge bg-white text-dark py-2 px-3 rounded-pill shadow-sm"><i class="fas fa-circle text-success me-1"></i> Organisasi</span>
                    <span class="badge bg-white text-dark py-2 px-3 rounded-pill shadow-sm"><i class="fas fa-circle text-danger me-1"></i> Nasional</span>
                    <span class="badge bg-white text-dark py-2 px-3 rounded-pill shadow-sm"><i class="fas fa-circle text-primary me-1"></i> Keagamaan</span>
                    <span class="badge bg-white text-dark py-2 px-3 rounded-pill shadow-sm"><i class="fas fa-circle text-warning me-1"></i> Khusus</span>
                </div>
            </div>
            <div class="col-lg-4 mt-5 mt-lg-0">
                <div class="card border-0 shadow-lg rounded-4 bg-white text-dark blur-card">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="bg-primary bg-opacity-10 text-primary rounded-3 p-2 me-3">
                                <i class="fas fa-clock fs-4"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0">Hari Ini</h5>
                                <p class="text-muted small mb-0" id="todayDate"></p>
                            </div>
                        </div>
                        <div id="todayEventsList" class="mt-2">
                             <div class="text-center py-3 text-muted small">
                                 <i class="fas fa-spinner fa-spin me-1"></i> Memuat agenda...
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Main Calendar Content -->
<section class="py-5 bg-light">
    <div class="container px-4">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
            <!-- Custom Calendar Header -->
            <div class="card-header bg-white border-0 p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <div class="d-flex align-items-center gap-3">
                        <button id="prevBtn" class="btn btn-icon-round"><i class="fas fa-chevron-left"></i></button>
                        <h3 id="calendarTitle" class="fw-bold mb-0 text-dark" style="min-width: 200px; text-align: center;"></h3>
                        <button id="nextBtn" class="btn btn-icon-round"><i class="fas fa-chevron-right"></i></button>
                    </div>
                    <div class="btn-group shadow-sm rounded-3 overflow-hidden" role="group">
                        <button data-view="dayGridMonth" class="btn btn-light active view-btn">Bulanan</button>
                        <button data-view="listMonth" class="btn btn-light view-btn">Daftar</button>
                    </div>
                </div>
            </div>
            
            <!-- Calendar Body -->
            <div class="card-body p-0">
                <div id="calendar" class="p-2 p-md-3"></div>
            </div>
            
            <!-- Calendar Footer / Legend -->
            <div class="card-footer bg-white border-0 p-4 border-top">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <div class="d-flex flex-wrap gap-4 align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <span class="dot bg-success"></span>
                                <span class="small fw-semibold text-muted">Kegiatan PKPT</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <span class="dot bg-danger"></span>
                                <span class="small fw-semibold text-muted">Hari Libur Nasional</span>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                                <span class="dot bg-primary"></span>
                                <span class="small fw-semibold text-muted">Keagamaan</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end mt-3 mt-md-0">
                        <button id="todayBtn" class="btn btn-primary px-4 rounded-pill">Kembali ke Hari Ini</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Detail Event Modal -->
<div class="modal fade" id="eventModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div id="modalThemeHeader" class="py-4 px-4 text-white position-relative">
                <div class="position-absolute top-0 end-0 p-3">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <div class="icon-hero">
                        <i id="modalIcon" class="fas fa-calendar-alt fs-2"></i>
                    </div>
                    <div>
                        <div class="category-badge-wrapper mb-1">
                            <span id="modalCategoryLabel" class="badge-custom"></span>
                        </div>
                        <h4 id="modalTitle" class="fw-bold mb-0"></h4>
                    </div>
                </div>
            </div>
            <div class="modal-body p-4">
                <div class="d-flex flex-column gap-3">
                    <!-- Date & Time -->
                    <div class="detail-item d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                        <div class="text-primary fs-4"><i class="fas fa-clock"></i></div>
                        <div>
                            <small class="text-muted d-block">Waktu Pelaksanaan</small>
                            <span id="modalDateTime" class="fw-bold text-dark"></span>
                        </div>
                    </div>
                    
                    <!-- Location -->
                    <div id="locationWrapper" class="detail-item d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                        <div class="text-danger fs-4"><i class="fas fa-map-marker-alt"></i></div>
                        <div>
                            <small class="text-muted d-block">Lokasi/Tempat</small>
                            <span id="modalLocation" class="fw-bold text-dark"></span>
                        </div>
                    </div>
                    
                    <!-- Description -->
                    <div id="descriptionWrapper" class="mt-2">
                        <h6 class="fw-bold text-dark mb-2"><i class="fas fa-align-left me-2 text-primary"></i> Deskripsi Kegiatan</h6>
                        <div id="modalDescription" class="text-muted small ps-1" style="white-space: pre-line;"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 p-4 pt-0">
                <button type="button" class="btn btn-secondary w-100 rounded-3" data-bs-dismiss="modal">Tutup Detail</button>
            </div>
        </div>
    </div>
</div>

@push('styles')
<!-- FullCalendar CSS -->
<link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css' rel='stylesheet' />
<style>
    :root {
        --fc-border-color: #f1f5f9;
        --fc-daygrid-event-dot-width: 8px;
        --fc-today-bg-color: rgba(5, 150, 105, 0.05);
        --primary-emerald: #059669;
        --primary-royal: #2563eb;
    }
    
    .blur-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .btn-icon-round {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        color: #475569;
        transition: all 0.2s;
    }
    .btn-icon-round:hover {
        background: var(--primary-emerald);
        color: white;
        border-color: var(--primary-emerald);
        transform: translateY(-2px);
    }

    .view-btn.active {
        background: var(--primary-emerald) !important;
        color: white !important;
        border-color: var(--primary-emerald) !important;
    }

    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }

    /* FullCalendar Luxury Overrides */
    .fc { font-family: 'Inter', sans-serif; border: none !important; }
    .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #f1f5f9 !important; }
    .fc-col-header-cell-cushion { padding: 15px 0 !important; color: #64748b !important; text-transform: uppercase; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; text-decoration: none !important; }
    .fc-daygrid-day-number { padding: 15px !important; font-weight: 600; color: #475569; text-decoration: none !important; }
    .fc-day-today { background-color: var(--fc-today-bg-color) !important; }
    .fc-day-today .fc-daygrid-day-number { color: var(--primary-emerald); font-weight: 800; }
    
    /* Sunday / Tanggal Merah Styling */
    .fc-day-sun .fc-daygrid-day-number {
        color: #e11d48 !important; /* National Red */
        font-weight: 800 !important;
    }
    .fc-day-sun {
        background-color: rgba(225, 29, 72, 0.02) !important;
    }

    .fc-event {
        border: none !important;
        padding: 5px 10px !important;
        margin: 2px 4px !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        font-size: 0.8rem !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        cursor: pointer !important;
        transition: transform 0.2s, box-shadow 0.2s !important;
    }
    .fc-event:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        filter: brightness(1.1);
    }
    
    .event-label-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .event-category-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: white;
        opacity: 0.8;
    }

    /* Modal Glassmorphism / Luxury Look */
    .modal-content {
        border: none;
        backdrop-filter: blur(20px);
        background-color: rgba(255, 255, 255, 0.98);
    }
    
    .icon-hero {
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 18px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
        color: white;
    }

    .badge-custom {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 4px 12px;
        border-radius: 50px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .modal-header {
        padding: 3rem 2rem 1.5rem !important;
    }

    /* List View Styling */
    .fc-list-event { cursor: pointer; }
    .fc-list-day-cushion { background: #f8fafc !important; }

    /* Modal Styling Theme Background */
    #modalThemeHeader {
        background: linear-gradient(135deg, var(--primary-emerald), var(--primary-royal));
    }
</style>
@endpush

@push('scripts')
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/locales/id.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js'></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const todayDateEl = document.getElementById('todayDate');
        todayDateEl.innerText = moment().format('dddd, DD MMMM YYYY');

        const calendarEl = document.getElementById('calendar');
        const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
        
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'id',
            displayEventTime: false,
            headerToolbar: false, // Custom toolbar used
            events: '{{ route("api.agendas") }}',
            eventContent: function(arg) {
                const category = arg.event.extendedProps.category || 'organisasi';
                const icons = {
                    'nasional': 'fa-star',
                    'organisasi': 'fa-users',
                    'keagamaan': 'fa-mosque',
                    'khusus': 'fa-calendar-check'
                };
                
                return {
                    html: `
                        <div class="event-label-wrapper">
                            <i class="fas ${icons[category] || 'fa-circle'} small"></i>
                            <span class="fc-event-title">${arg.event.title}</span>
                        </div>
                    `
                };
            },
            eventClick: function(info) {
                const event = info.event;
                const props = event.extendedProps;
                
                // Debug logging
                console.log('Event clicked:', {
                    title: event.title,
                    isAgenda: props.isAgenda,
                    hasLocation: !!props.location,
                    location: props.location
                });
                
                // Set Header Theme
                const header = document.getElementById('modalThemeHeader');
                const category = props.category || 'organisasi';
                const themeMap = {
                    'nasional': { bg: 'linear-gradient(135deg, #e11d48, #9f1239)', icon: 'fa-flag', label: 'Nasional' },
                    'organisasi': { bg: 'linear-gradient(135deg, #059669, #065f46)', icon: 'fa-users', label: 'Organisasi' },
                    'keagamaan': { bg: 'linear-gradient(135deg, #2563eb, #1e40af)', icon: 'fa-mosque', label: 'Keagamaan' },
                    'khusus': { bg: 'linear-gradient(135deg, #d97706, #92400e)', icon: 'fa-star', label: 'Khusus' }
                };
                
                const theme = themeMap[category] || themeMap['organisasi'];
                header.style.background = theme.bg;
                document.getElementById('modalIcon').className = `fas ${theme.icon} fs-3`;
                document.getElementById('modalCategoryLabel').innerText = theme.label;
                
                // Content
                document.getElementById('modalTitle').innerText = event.title;
                
                // Date & Time Logic
                let dateStr = moment(event.start).format('DD MMMM YYYY');
                if (props.time) {
                    dateStr += ` • ${props.time} WIB`;
                }
                document.getElementById('modalDateTime').innerText = dateStr;

                // Location - ONLY show for organizational activities (category = 'organisasi')
                // IMPORTANT: Reset/clear first to avoid stale data
                const locWrapper = document.getElementById('locationWrapper');
                const modalLocation = document.getElementById('modalLocation');
                
                // Clear previous location data
                modalLocation.innerText = '';
                
                // Only show if it's an organizational event AND has location
                // Hide for: keagamaan, nasional, khusus events
                if (category === 'organisasi' && props.location && props.location.trim() !== '') {
                    locWrapper.style.display = 'flex';
                    modalLocation.innerText = props.location;
                    console.log('Showing location for organisasi event:', props.location);
                } else {
                    locWrapper.style.display = 'none';
                    console.log('Hiding location field (category:', category, ')');
                }

                // Description
                const descWrapper = document.getElementById('descriptionWrapper');
                if (props.description && props.description.trim() !== '') {
                    descWrapper.style.display = 'block';
                    document.getElementById('modalDescription').innerText = props.description;
                } else {
                    descWrapper.style.display = 'none';
                }

                eventModal.show();
            },
            datesSet: function(info) {
                // Update Custom Header Title
                document.getElementById('calendarTitle').innerText = moment(calendar.getDate()).format('MMMM YYYY');
                updateTodayEvents(calendar.getEvents());
            },
            height: 'auto',
        });
        
        calendar.render();

        // Custom Toolbar Handlers
        document.getElementById('prevBtn').addEventListener('click', () => calendar.prev());
        document.getElementById('nextBtn').addEventListener('click', () => calendar.next());
        document.getElementById('todayBtn').addEventListener('click', () => calendar.today());
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                calendar.changeView(this.dataset.view);
            });
        });

        // Update Dashboard Info (Today's Events)
        function updateTodayEvents(allEvents) {
            const listContainer = document.getElementById('todayEventsList');
            const todayStr = moment().format('YYYY-MM-DD');
            const todayEvents = allEvents.filter(e => moment(e.start).format('YYYY-MM-DD') === todayStr);

            if (todayEvents.length > 0) {
                let html = '';
                todayEvents.forEach(e => {
                    html += `
                        <div class="d-flex align-items-start gap-3 p-2 mb-2 rounded hover-bg">
                            <div class="bg-primary rounded-circle" style="width: 8px; height: 8px; margin-top: 6px;"></div>
                            <div>
                                <div class="fw-bold small text-dark">${e.title}</div>
                                <div class="text-muted" style="font-size: 0.7rem;">${e.extendedProps.time || 'Sepanjang Hari'}</div>
                            </div>
                        </div>
                    `;
                });
                listContainer.innerHTML = html;
            } else {
                listContainer.innerHTML = `<div class="text-center py-3 text-muted small">Tidak ada agenda hari ini.</div>`;
            }
        }
    });
</script>
@endpush
@endsection