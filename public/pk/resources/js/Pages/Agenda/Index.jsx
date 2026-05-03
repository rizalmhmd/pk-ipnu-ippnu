import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import SectionTitle from '@/Components/SectionTitle';
import NationalCalendar from '@/Components/NationalCalendar';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgendaIndex({ agendas = [], todayAgendas = [], pageSetting, nationalHolidays = [] }) {
    const [activeFilter, setActiveFilter] = useState('semua');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

    const categories = [
        { id: 'semua', name: 'Semua', icon: 'fa-list' },
        { id: 'organisasi', name: 'Organisasi', icon: 'fa-users', color: 'bg-emerald-500' },
        { id: 'nasional', name: 'Nasional', icon: 'fa-flag', color: 'bg-red-500' },
        { id: 'keagamaan', name: 'Keagamaan', icon: 'fa-mosque', color: 'bg-blue-500' },
        { id: 'khusus', name: 'Khusus', icon: 'fa-star', color: 'bg-amber-500' },
    ];

    const filteredAgendas = agendas.filter(a => {
        if (activeFilter === 'semua') return true;
        if (activeFilter === 'organisasi') return (a.category || 'organisasi') === 'organisasi';
        return a.category === activeFilter;
    });

    const filteredHolidays = nationalHolidays.filter(h => {
        if (activeFilter === 'semua') return true;
        if (activeFilter === 'nasional') return h.cat === 'nasional';
        if (activeFilter === 'keagamaan') return h.cat === 'keagamaan';
        return false;
    });

    // Combine for List View
    const combinedList = [
        ...filteredAgendas.map(a => ({ ...a, type: 'agenda' })),
        ...filteredHolidays.map(h => ({ ...h, type: 'holiday', event_date: h.date }))
    ].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

    // Group by month
    const groupedAgendas = combinedList.reduce((groups, item) => {
        const month = new Date(item.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        if (!groups[month]) groups[month] = [];
        groups[month].push(item);
        return groups;
    }, {});

    return (
        <PublicLayout>
            <Head title="Agenda & Kegiatan" />

            <HeroSection
                bgImage="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            />



            <div className="container mx-auto px-6 md:px-12 py-12">
                {/* View Selector */}
                <div className="flex justify-center mb-16">
                    <div className="bg-slate-100 p-2 rounded-lg flex gap-2">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <i className="fas fa-list-ul mr-2"></i> List Agenda
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <i className="fas fa-calendar-alt mr-2"></i> Kalender Nasional
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* Left: Today's Highlight & Filters (Sticky on Desktop) */}
                    <div className="lg:w-[380px] shrink-0">
                        <div className="lg:sticky lg:top-32 space-y-10">
                            {/* Today Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-lg p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20 group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-5 mb-10">
                                        <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center text-emerald-400 shadow-inner">
                                            <i className="fas fa-calendar-check text-2xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-serif text-lg tracking-tight">Agenda Hari Ini</h4>
                                            <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {todayAgendas.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-1.5 h-auto bg-emerald-400 rounded-full shrink-0"></div>
                                                <div>
                                                    <h5 className="font-bold text-sm leading-tight mb-1">{item.title}</h5>
                                                    <p className="text-emerald-100/60 text-[10px] font-medium uppercase tracking-wider">
                                                        {item.event_time ? item.event_time.substring(0, 5) : '00:00'} WIB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {todayAgendas.length === 0 && (
                                            <div className="py-4 px-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                                                <p className="text-emerald-100/40 text-sm italic font-medium">✨ Menunggu agenda selanjutnya...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Filters */}
                            <div className="bg-white rounded-lg p-8 md:p-10 shadow-2xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
                                <h4 className="text-2xl font-bold text-slate-800 font-serif mb-10">Kategori</h4>
                                <div className="space-y-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveFilter(cat.id)}
                                            className={`w-full flex items-center justify-between px-5 py-4 rounded-lg transition-all duration-300 font-bold text-sm group/btn ${activeFilter === cat.id
                                                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 -translate-y-1'
                                                : 'bg-slate-50 text-slate-500 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 border border-transparent hover:border-slate-100'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeFilter === cat.id ? 'bg-white/20' : 'bg-slate-200/50 text-slate-400 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600'}`}>
                                                    <i className={`fas ${cat.icon}`}></i>
                                                </div>
                                                {cat.name}
                                            </div>
                                            <i className={`fas fa-arrow-right text-[10px] transition-all ${activeFilter === cat.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Agenda List or Calendar */}
                    <div className="flex-grow">
                        <AnimatePresence mode="wait">
                            {viewMode === 'list' ? (
                                <motion.div
                                    key="list-view"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="space-y-16"
                                >
                                    {Object.keys(groupedAgendas).length > 0 ? (
                                        Object.entries(groupedAgendas).map(([month, items]) => (
                                            <div key={month}>
                                                <h3 className="text-2xl font-bold text-slate-800 font-serif mb-8 flex items-center gap-4">
                                                    {month}
                                                    <div className="h-px bg-slate-100 flex-grow"></div>
                                                </h3>
                                                <div className="space-y-6">
                                                    {items.map((item, idx) => {
                                                        const date = new Date(item.event_date);
                                                        const isHoliday = item.type === 'holiday';
                                                        const category = isHoliday
                                                            ? categories.find(c => c.id === item.cat)
                                                            : categories.find(c => c.id === (item.category || 'organisasi'));

                                                        return (
                                                            <motion.div
                                                                key={isHoliday ? `h-${item.date}-${idx}` : `a-${item.id}`}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className={`flex flex-col md:flex-row gap-6 p-8 bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group ${isHoliday ? 'hover:shadow-blue-900/10' : 'hover:shadow-emerald-900/10'}`}
                                                            >
                                                                {/* Date Badge */}
                                                                <div className="flex items-center gap-4 md:flex-col md:w-24 md:h-24 md:bg-slate-50 md:rounded-lg md:justify-center md:border md:border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors shrink-0">
                                                                    <div className={`${isHoliday ? (item.cat === 'nasional' ? 'bg-red-600' : 'bg-blue-600') : 'bg-emerald-600'} text-white w-14 h-14 rounded-lg flex flex-col items-center justify-center md:bg-transparent ${isHoliday ? (item.cat === 'nasional' ? 'md:text-red-600' : 'md:text-blue-600') : 'md:text-emerald-600'}`}>
                                                                        <span className="text-[10px] font-bold uppercase md:mb-1">
                                                                            {date.toLocaleDateString('id-ID', { month: 'short' })}
                                                                        </span>
                                                                        <span className="text-xl font-bold font-serif">
                                                                            {date.getDate()}
                                                                        </span>
                                                                    </div>
                                                                    <div className="md:hidden">
                                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white ${category?.color || 'bg-emerald-500'}`}>
                                                                            {category?.name}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Content */}
                                                                <div className="flex-grow">
                                                                    <div className="hidden md:block mb-3">
                                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm shadow-emerald-950/10 ${category?.color || 'bg-emerald-500'}`}>
                                                                            {category?.name}
                                                                        </span>
                                                                    </div>
                                                                    <h4 className={`text-xl font-bold text-slate-800 font-serif mb-4 transition-colors ${isHoliday ? (item.cat === 'nasional' ? 'group-hover:text-red-700' : 'group-hover:text-blue-700') : 'group-hover:text-emerald-700'}`}>
                                                                        {item.title}
                                                                    </h4>
                                                                    <div className="flex flex-wrap gap-6 text-sm text-slate-400 font-medium">
                                                                        <div className="flex items-center gap-2">
                                                                            <i className={`far fa-clock ${isHoliday ? 'text-slate-300' : 'text-emerald-500'}`}></i>
                                                                            {isHoliday ? 'Sepanjang Hari' : (item.event_time ? item.event_time.substring(0, 5) + ' WIB' : '00:00 WIB')}
                                                                        </div>
                                                                        {item.location && (
                                                                            <div className="flex items-center gap-2">
                                                                                <i className="fas fa-map-marker-alt text-red-500"></i>
                                                                                {item.location}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {(item.description || item.desc) && (
                                                                        <p className="mt-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-6 italic">
                                                                            {item.description || item.desc}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-20 text-center bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100">
                                            <i className="far fa-calendar-times text-6xl text-slate-100 mb-6 block"></i>
                                            <p className="text-slate-500 font-medium">Tidak ada agenda untuk kategori ini.</p>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="calendar-view"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                >
                                    <NationalCalendar agendas={filteredAgendas} nationalHolidays={filteredHolidays} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
