@extends('layouts.public')

@section('title', 'Agenda Kegiatan')

@section('content')
<!-- Hero Section -->
<section class="py-5 bg-light position-relative overflow-hidden">
    <div class="container position-relative z-1 px-4">
        <div class="row align-items-center">
            <div class="col-lg-7">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-2">
                        <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-decoration-none text-primary">Beranda</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Agenda</li>
                    </ol>
                </nav>
                <h1 class="display-4 fw-bold text-dark mb-3">Kalender <span class="text-primary">Kegiatan</span></h1>
                <p class="lead text-muted mb-0">Lihat jadwal kegiatan dan program kerja terbaru dari PKPT IPNU IPPNU melalui kalender interaktif kami.</p>
            </div>
        </div>
    </div>
    <div class="position-absolute top-0 end-0 w-50 h-100 bg-primary opacity-5 d-none d-lg-block" style="clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);"></div>
</section>

<!-- Calendar Section -->
<section class="py-5">
    <div class="container px-4">
        <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-4 p-md-5">
                <div id="calendar"></div>
            </div>
        </div>
    </div>
</section>

<!-- Event Detail Modal -->
<div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold text-dark" id="eventModalLabel">Detail Kegiatan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div class="d-flex align-items-start mb-4">
                    <div class="flex-shrink-0 bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                        <i class="fas fa-calendar-day fs-3"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold text-dark mb-1" id="modalTitle"></h4>
                        <p class="text-muted mb-0" id="modalDate"></p>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-12" id="timeContainer">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-clock text-primary me-2"></i>
                            <span class="fw-semibold text-dark">Waktu:</span>
                        </div>
                        <p class="mt-1 mb-0 text-muted ps-4" id="modalTime"></p>
                    </div>
                    <div class="col-12" id="locationContainer">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-map-marker-alt text-danger me-2"></i>
                            <span class="fw-semibold text-dark">Lokasi:</span>
                        </div>
                        <p class="mt-1 mb-0 text-muted ps-4" id="modalLocation"></p>
                    </div>
                    <div class="col-12" id="descriptionContainer">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-align-left text-primary me-2"></i>
                            <span class="fw-semibold text-dark">Deskripsi:</span>
                        </div>
                        <p class="mt-1 mb-0 text-muted ps-4" id="modalDescription" style="white-space: pre-line;"></p>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-light px-4 rounded-3" data-bs-dismiss="modal">Tutup</button>
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
        --fc-event-bg-color: var(--primary-green);
        --fc-event-border-color: var(--primary-green);
        --fc-today-bg-color: rgba(0, 128, 0, 0.05);
    }
    
    .fc {
        font-family: 'Inter', sans-serif;
    }
    
    .fc .fc-toolbar-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1e293b;
    }
    
    .fc .fc-button-primary {
        background-color: #fff;
        border-color: #e2e8f0;
        color: #475569;
        font-weight: 600;
        text-transform: capitalize;
        padding: 0.5rem 1rem;
    }
    
    .fc .fc-button-primary:hover {
        background-color: #f8fafc;
        border-color: #cbd5e1;
        color: var(--primary-green);
    }
    
    .fc .fc-button-primary:not(:disabled).fc-button-active, 
    .fc .fc-button-primary:not(:disabled):active {
        background-color: var(--primary-green);
        border-color: var(--primary-green);
        color: #fff;
    }
    
    .fc .fc-col-header-cell-cushion {
        padding: 1rem 0;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 0.05em;
    }
    
    .fc-daygrid-day-number {
        padding: 0.5rem !important;
        font-weight: 600;
        color: #475569;
    }
    
    .fc-event {
        cursor: pointer;
        padding: 5px 8px;
        border-radius: 6px;
        font-weight: 700;
        border: none;
        transition: all 0.2s ease;
        font-size: 0.85rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .fc-event:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        filter: brightness(1.1);
    }

    .fc-daygrid-event {
        white-space: normal !important;
        align-items: center;
    }

    .fc-event-title {
        padding: 0 2px;
    }
    
    @media (max-width: 768px) {
        .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
        }
        .fc .fc-toolbar-title {
            font-size: 1.25rem;
        }
    }
</style>
@endpush

@push('scripts')
<!-- FullCalendar JS -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/locales/id.js'></script>
<script src='https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js'></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
        
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'id',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listMonth'
            },
            displayEventTime: false, // Hide the '00' or time prefix on the calendar grid
            events: '{{ route("api.agendas") }}',
            eventClick: function(info) {
                document.getElementById('modalTitle').innerText = info.event.title;
                document.getElementById('modalDate').innerText = moment(info.event.start).format('DD MMMM YYYY');
                
                // Time
                const time = info.event.extendedProps.time;
                const timeContainer = document.getElementById('timeContainer');
                if (time) {
                    timeContainer.style.display = 'block';
                    document.getElementById('modalTime').innerText = time + ' WIB';
                } else {
                    timeContainer.style.display = 'none';
                }

                // Location
                const location = info.event.extendedProps.location;
                const locContainer = document.getElementById('locationContainer');
                if (location) {
                    locContainer.style.display = 'block';
                    document.getElementById('modalLocation').innerText = location;
                } else {
                    locContainer.style.display = 'none';
                }
                
                // Description
                const description = info.event.extendedProps.description;
                const descContainer = document.getElementById('descriptionContainer');
                if (description) {
                    descContainer.style.display = 'block';
                    document.getElementById('modalDescription').innerText = description;
                } else {
                    descContainer.style.display = 'none';
                }
                
                eventModal.show();
            },
            eventDidMount: function(info) {
                // You can add tooltips here if needed
            },
            height: 'auto',
        });
        
        calendar.render();
    });
</script>
@endpush
@endsection
