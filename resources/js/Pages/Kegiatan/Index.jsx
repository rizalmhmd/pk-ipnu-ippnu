import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function KegiatanIndex({ kegiatans = [], pageSetting }) {
    const [activeFilter, setActiveFilter] = useState('semua');

    const categories = [
        { id: 'semua', name: 'Semua Kegiatan', icon: 'fa-list' },
        { id: 'organisasi', name: 'Organisasi', icon: 'fa-users', color: 'bg-emerald-500' },
        { id: 'khusus', name: 'Khusus', icon: 'fa-star', color: 'bg-amber-500' },
    ];

    const filteredKegiatans = kegiatans.filter(k => {
        if (activeFilter === 'semua') return true;
        return (k.category || 'organisasi') === activeFilter;
    });

    // Group by month
    const groupedKegiatans = filteredKegiatans.reduce((groups, item) => {
        const month = new Date(item.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        if (!groups[month]) groups[month] = [];
        groups[month].push(item);
        return groups;
    }, {});

    return (
        <PublicLayout>
            <Head title="Kegiatan Organisasi" />

            <HeroSection
                bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                title="Kegiatan Organisasi"
                subtitle="Dokumentasi dan jadwal program kerja PKPT IPNU IPPNU"
            />

            <div className="container mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* Left: Filters (Sticky) */}
                    <div className="lg:w-[350px] shrink-0">
                        <div className="lg:sticky lg:top-32 space-y-10">
                            {/* Card Info */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20 group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner">
                                            <i className="fas fa-tasks text-2xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold font-serif text-lg tracking-tight">Program Kerja</h4>
                                            <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                                                Aktivitas Organisasi
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-emerald-50/80 text-sm leading-relaxed mb-6 italic">
                                        Seluruh kegiatan dan program kerja yang diselenggarakan oleh pengurus untuk anggota dan masyarakat.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md"><i className="fas fa-user"></i></div>
                                            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md"><i className="fas fa-users"></i></div>
                                            <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md text-emerald-900"><i className="fas fa-plus"></i></div>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-200 ml-2">{kegiatans.length} Kegiatan Tercatat</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Filters */}
                            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-600"></div>
                                <h4 className="text-xl font-bold text-slate-800 font-serif mb-8">Filter Kategori</h4>
                                <div className="space-y-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveFilter(cat.id)}
                                            className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 font-bold text-sm group/btn ${activeFilter === cat.id
                                                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 -translate-y-1'
                                                : 'bg-slate-50 text-slate-500 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 border border-transparent hover:border-slate-100'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeFilter === cat.id ? 'bg-white/20' : 'bg-slate-200/50 text-slate-400 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600'}`}>
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

                    {/* Right: List Kegiatan */}
                    <div className="flex-grow">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`list-${activeFilter}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-16"
                            >
                                {Object.keys(groupedKegiatans).length > 0 ? (
                                    Object.entries(groupedKegiatans).map(([month, items]) => (
                                        <div key={month}>
                                            <h3 className="text-2xl font-bold text-slate-800 font-serif mb-8 flex items-center gap-4">
                                                <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-lg border border-emerald-100">{month}</span>
                                                <div className="h-px bg-slate-200 flex-grow"></div>
                                            </h3>
                                            <div className="space-y-6">
                                                {items.map((item, idx) => {
                                                    const date = new Date(item.event_date);
                                                    const category = categories.find(c => c.id === (item.category || 'organisasi')) || categories[1];

                                                    return (
                                                        <motion.div
                                                            key={`kegiatan-${item.id}`}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.05 }}
                                                            className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-500 hover:shadow-emerald-900/10 hover:border-emerald-100 group"
                                                        >
                                                            {/* Date Column */}
                                                            <div className="flex items-center gap-4 md:flex-col md:w-28 md:h-28 md:bg-emerald-50 md:rounded-2xl md:justify-center md:border md:border-emerald-100/50 group-hover:bg-emerald-600 transition-colors shrink-0 overflow-hidden relative">
                                                                <div className="hidden md:block absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
                                                                <div className="hidden md:block absolute -bottom-4 -left-4 w-12 h-12 bg-black/5 rounded-full blur-md"></div>
                                                                
                                                                <div className="bg-emerald-600 text-white w-16 h-16 rounded-xl flex flex-col items-center justify-center md:bg-transparent md:text-emerald-700 group-hover:md:text-white transition-colors relative z-10">
                                                                    <span className="text-xs font-bold uppercase md:mb-1 tracking-wider">
                                                                        {date.toLocaleDateString('id-ID', { month: 'short' })}
                                                                    </span>
                                                                    <span className="text-2xl font-black font-serif leading-none">
                                                                        {date.getDate()}
                                                                    </span>
                                                                </div>
                                                                <div className="md:hidden">
                                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white ${category?.color}`}>
                                                                        {category?.name}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Content Column */}
                                                            <div className="flex-grow flex flex-col justify-center">
                                                                <div className="hidden md:flex items-center gap-3 mb-4">
                                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm shadow-emerald-950/10 ${category?.color}`}>
                                                                        {category?.name}
                                                                    </span>
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                                                                </div>
                                                                
                                                                <h4 className="text-xl md:text-2xl font-bold text-slate-800 font-serif mb-4 group-hover:text-emerald-700 transition-colors leading-tight">
                                                                    {item.title}
                                                                </h4>
                                                                
                                                                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500 font-medium">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                                            <i className="far fa-clock"></i>
                                                                        </div>
                                                                        {item.event_time ? item.event_time.substring(0, 5) + ' WIB' : '00:00 WIB'}
                                                                    </div>
                                                                    {item.location && (
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                                                                <i className="fas fa-map-marker-alt"></i>
                                                                            </div>
                                                                            {item.location}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                {item.description && (
                                                                    <div className="mt-6 pt-6 border-t border-slate-100">
                                                                        <p className="text-slate-600 text-sm leading-relaxed">
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Registration Info */}
                                                                {(item.is_registration_open || item.registration_fee) && (
                                                                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                                        {item.registration_fee && (
                                                                            <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-lg">
                                                                                <i className="fas fa-ticket-alt"></i>
                                                                                HTM: {item.registration_fee}
                                                                            </div>
                                                                        )}
                                                                        {!item.registration_fee && <div></div>}
                                                                        
                                                                        {item.is_registration_open && (
                                                                            <Link
                                                                                href={route('kegiatan.daftar', item.id)}
                                                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest"
                                                                            >
                                                                                Daftar Sekarang
                                                                                <i className="fas fa-arrow-right text-xs"></i>
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-24 text-center bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                            <i className="fas fa-clipboard-list text-5xl text-slate-300"></i>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-700 font-serif mb-2">Belum Ada Kegiatan</h4>
                                        <p className="text-slate-500 font-medium max-w-sm mx-auto">Tidak ada catatan kegiatan untuk kategori ini. Coba pilih kategori lain.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
