import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NationalCalendar({ agendas = [], nationalHolidays = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    // Merge agendas and holidays for the current month
    const getEventsForDay = (day) => {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const dayAgendas = agendas.filter(a => {
            const rawDate = a.event_date || a.date;
            if (!rawDate) return false;

            // Handle ISO strings with 'T' (like from server) vs plain 'YYYY-MM-DD'
            let formattedDate = '';
            if (rawDate.includes('T')) {
                const d = new Date(rawDate);
                // Get local date parts to avoid UTC shift
                formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            } else {
                formattedDate = rawDate.substring(0, 10);
            }

            return formattedDate === dateString;
        });

        const dayHolidays = nationalHolidays.filter(h => {
            const rawDate = h.date || h.event_date;
            if (!rawDate) return false;

            let formattedDate = '';
            if (rawDate.includes('T')) {
                const d = new Date(rawDate);
                formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            } else {
                formattedDate = rawDate.substring(0, 10);
            }

            return formattedDate === dateString;
        });

        return [...dayAgendas.map(a => ({ ...a, type: 'agenda' })), ...dayHolidays.map(h => ({ ...h, type: 'holiday' }))];
    };

    const calendarDays = [];
    const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let d = 1; d <= days; d++) {
        calendarDays.push(d);
    }

    return (
        <div className="bg-white rounded-lg shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative z-0 isolate">
            <motion.div
                animate={{ filter: selectedEvent ? 'blur(10px) brightness(0.95)' : 'blur(0px) brightness(1)' }}
                className="transition-all duration-500 relative h-full w-full overflow-hidden rounded-lg"
            >
                {/* Calendar Header */}
                <div className="bg-slate-50 p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-800 font-serif">
                        {monthNames[month]} {year}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={nextMonth} className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="p-4 md:p-8">
                    <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
                        {dayLabels.map((day, idx) => (
                            <div key={idx} className={`bg-slate-50 p-4 text-center text-xs font-bold uppercase tracking-widest ${idx === 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day, idx) => {
                            const events = day ? getEventsForDay(day) : [];
                            const isSunday = idx % 7 === 0;
                            const hasHoliday = events.some(e => e.type === 'holiday');
                            const hasAgenda = events.some(e => e.type === 'agenda');
                            const isToday = day && new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                            return (
                                <div 
                                    key={idx} 
                                    className={`min-h-[100px] md:min-h-[140px] p-2 md:p-3 group transition-all flex flex-col 
                                    ${day ? 'bg-white hover:bg-slate-50 relative cursor-default' : 'bg-slate-50/30'}
                                    ${hasAgenda && !isToday ? 'bg-emerald-50/20' : ''}
                                    ${hasHoliday && !isToday ? 'bg-red-50/10' : ''}
                                    `}
                                >
                                    {day && (
                                        <>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-sm font-black transition-colors ${
                                                    isToday 
                                                        ? 'w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30' 
                                                        : (hasHoliday || isSunday 
                                                            ? 'text-red-500' 
                                                            : (hasAgenda ? 'text-emerald-600' : 'text-slate-400')
                                                          )
                                                }`}>
                                                    {day}
                                                </span>
                                                {hasAgenda && !isToday && (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                )}
                                            </div>
                                            <div className="space-y-1 overflow-y-auto max-h-[80px] md:max-h-[100px] no-scrollbar">
                                                {events.map((event, eIdx) => (
                                                    <button
                                                        key={eIdx}
                                                        onClick={() => setSelectedEvent(event)}
                                                        className={`w-full text-left text-[8px] md:text-[9px] p-2 rounded-lg font-black leading-tight line-clamp-2 transition-all hover:scale-[1.02] active:scale-95 shadow-sm ${event.type === 'holiday'
                                                            ? (event.cat === 'nasional'
                                                                ? 'bg-red-50 text-red-600 border border-red-100'
                                                                : event.cat === 'keagamaan'
                                                                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                                                    : event.cat === 'cuti_bersama'
                                                                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                                                        : 'bg-slate-100 text-slate-700 border border-slate-200')
                                                            : 'bg-emerald-600 text-white border border-emerald-500 shadow-emerald-900/10'
                                                            }`}
                                                    >
                                                        {event.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-slate-50 p-8 border-t border-slate-100">
                    <div className="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-slate-500">Libur Nasional</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-slate-500">Hari Besar Keagamaan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-slate-500">Cuti Bersama</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-slate-500">Agenda Organisasi</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <>
                        {/* Backdrop - DARK overlay, NO blur here (preventing bleed) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 z-[60] bg-slate-950/20"
                        />
                        {/* Content Container - Centered within the Relative Calendar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="w-[95%] max-w-md bg-white rounded-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-8 md:p-10 border border-white relative pointer-events-auto">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                >
                                    <i className="fas fa-times"></i>
                                </button>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-center">
                                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-xl ${selectedEvent.type === 'holiday'
                                            ? (selectedEvent.cat === 'nasional'
                                                ? 'bg-red-50 text-red-500'
                                                : selectedEvent.cat === 'keagamaan'
                                                    ? 'bg-blue-50 text-blue-500'
                                                    : selectedEvent.cat === 'cuti_bersama'
                                                        ? 'bg-amber-50 text-amber-500'
                                                        : 'bg-slate-100 text-slate-600')
                                            : 'bg-emerald-50 text-emerald-500'
                                            }`}>
                                            <i className={`fas ${selectedEvent.type === 'holiday' ? (selectedEvent.cat === 'nasional' ? 'fa-flag' : selectedEvent.cat === 'keagamaan' ? 'fa-mosque' : selectedEvent.cat === 'cuti_bersama' ? 'fa-calendar-day' : 'fa-star') : 'fa-calendar-check'}`}></i>
                                        </div>
                                        <div>
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedEvent.type === 'holiday'
                                                ? (selectedEvent.cat === 'nasional'
                                                    ? 'bg-red-500 text-white'
                                                    : selectedEvent.cat === 'keagamaan'
                                                        ? 'bg-blue-500 text-white'
                                                        : selectedEvent.cat === 'cuti_bersama'
                                                            ? 'bg-amber-500 text-white'
                                                            : 'bg-slate-500 text-white')
                                                : 'bg-emerald-500 text-white'
                                                }`}>
                                                {selectedEvent.type === 'holiday' 
                                                     ? (selectedEvent.cat === 'nasional' ? 'Libur Nasional' : selectedEvent.cat === 'keagamaan' ? 'Hari Besar Keagamaan' : selectedEvent.cat === 'cuti_bersama' ? 'Cuti Bersama' : 'Hari Istimewa') 
                                                     : (selectedEvent.category ? `Agenda ${selectedEvent.category}` : 'Agenda Organisasi')}
                                            </span>
                                            <h4 className="text-xl font-bold text-slate-800 font-serif mt-1">{selectedEvent.title}</h4>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-slate-500">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                                <i className="far fa-calendar-alt text-slate-400"></i>
                                            </div>
                                            <span className="text-sm font-medium">
                                                {new Date(selectedEvent.date || selectedEvent.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>

                                        {selectedEvent.event_time && (
                                            <div className="flex items-center gap-4 text-slate-500">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                                    <i className="far fa-clock text-slate-400"></i>
                                                </div>
                                                <span className="text-sm font-medium">{selectedEvent.event_time.substring(0, 5)} WIB</span>
                                            </div>
                                        )}

                                        {selectedEvent.location && (
                                            <div className="flex items-center gap-4 text-slate-500">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                                    <i className="fas fa-map-marker-alt text-red-400"></i>
                                                </div>
                                                <span className="text-sm font-medium">{selectedEvent.location}</span>
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-slate-50">
                                            <p className="text-slate-500 text-sm leading-relaxed italic">
                                                {selectedEvent.desc || selectedEvent.description || 'Tidak ada deskripsi tambahan untuk agenda ini.'}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="w-full py-4 rounded-lg bg-slate-900 text-white font-bold text-sm tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        TUTUP
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
