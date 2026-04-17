import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Layout,
    Edit,
    Home,
    Info,
    Image as ImageIcon,
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ settings }) {
    const pageIcons = {
        home: Home,
        about: Info,
        gallery: ImageIcon,
        agenda: Calendar,
        home_greeting: Home,
        home_agenda: Calendar,
    };

    const getPageName = (slug) => {
        switch (slug) {
            case 'home': return 'Beranda';
            case 'about': return 'Profil / Tentang';
            case 'gallery': return 'Galeri Foto';
            case 'agenda': return 'Agenda & Kegiatan';
            case 'home_greeting': return 'Beranda: Sambutan';
            case 'home_agenda': return 'Beranda: Agenda';
            default: return slug;
        }
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Halaman" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Manajemen Halaman</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Atur konten dinamis, hero section, dan metadata tiap halaman.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-8">
                {settings.map((page, idx) => {
                    const Icon = pageIcons[page.page_name] || Layout;
                    return (
                        <motion.div
                            key={page.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex-grow min-w-[320px] max-w-[450px] bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-10 relative group overflow-hidden flex flex-col h-full"
                        >
                            {/* Accent Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit group-hover:scale-110 transition-transform duration-500">
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight leading-tight">
                                    {getPageName(page.page_name)}
                                </h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 italic">
                                    /{page.page_name}
                                </p>

                                <div className="space-y-4 mb-auto pb-10">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span>Hero Title</span>
                                        <span className={page.hero_title ? 'text-emerald-500' : 'text-slate-200'}>{page.hero_title ? 'Set' : 'Not Set'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span>Banner</span>
                                        <span className={page.hero_image ? 'text-emerald-500' : 'text-slate-200'}>{page.hero_image ? 'Exist' : 'Empty'}</span>
                                    </div>
                                </div>

                                <Link
                                    href={route('admin.page-settings.edit', page.id)}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-900/20 transition-all"
                                >
                                    Konfigurasi
                                    <ChevronRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
