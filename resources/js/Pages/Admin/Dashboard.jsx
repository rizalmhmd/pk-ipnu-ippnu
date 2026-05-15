import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Newspaper,
    Image as ImageIcon,
    Users,
    Calendar,
    ArrowRight,
    FileText,
    Quote,
    Activity,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRealtimeUpdates } from '@/Hooks/useRealtimeUpdates';

export default function Dashboard({ stats, recentActivities }) {
    useRealtimeUpdates(null); // Refresh dashboard on any content change
    const allStatCards = [
        { key: 'posts', title: 'Berita', count: stats?.posts, icon: Newspaper, color: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-200', href: '/admin/posts' },
        { key: 'articles', title: 'Artikel', count: stats?.articles, icon: FileText, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-200', href: '/admin/articles' },
        { key: 'members', title: 'Anggota', count: stats?.members, icon: Users, color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200', href: '/admin/members' },
        { key: 'agendas', title: 'Agenda', count: stats?.agendas, icon: Calendar, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-200', href: '/admin/agendas' },
        { key: 'galleries', title: 'Galeri', count: stats?.galleries, icon: ImageIcon, color: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-200', href: '/admin/galleries' },
        { key: 'quotes', title: 'Quotes', count: stats?.quotes, icon: Quote, color: 'from-pink-500 to-rose-600', shadow: 'shadow-pink-200', href: '/admin/quotes' },
        { key: 'statistics', title: 'Statistik', count: stats?.statistics, icon: Activity, color: 'from-orange-500 to-red-600', shadow: 'shadow-orange-200', href: '/admin/statistics' },
    ];

    const statCards = allStatCards.filter(card => card.count !== undefined);

    // Dynamic grid columns based on card count to avoid empty space on the right
    const gridCols = {
        1: 'xl:grid-cols-1',
        2: 'xl:grid-cols-2',
        3: 'xl:grid-cols-3',
        4: 'xl:grid-cols-4',
        5: 'xl:grid-cols-5',
        6: 'xl:grid-cols-6',
        7: 'xl:grid-cols-7',
    }[statCards.length] || 'xl:grid-cols-7';

    // Dynamic shortcuts based on permissions/available stats
    const shortcuts = [];
    if (stats?.posts !== undefined) shortcuts.push({ title: 'Post Berita', href: '/admin/posts/create', icon: Newspaper });
    if (stats?.articles !== undefined) shortcuts.push({ title: 'Buat Artikel', href: '/admin/articles/create', icon: FileText });
    if (stats?.agendas !== undefined) shortcuts.push({ title: 'Agenda Baru', href: '/admin/agendas/create', icon: Calendar });
    if (stats?.galleries !== undefined) shortcuts.push({ title: 'Upload Galeri', href: '/admin/galleries/create', icon: ImageIcon });
    if (stats?.quotes !== undefined) shortcuts.push({ title: 'Tambah Quote', href: '/admin/quotes/create', icon: Quote });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                        Dashboard <span className="text-emerald-600">Overview</span>
                    </h1>
                    <p className="text-[11px] md:text-sm text-slate-500 dark:text-slate-400 font-medium">Monitoring performa dan aktivitas platform Anda secara real-time.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600">
                        <Activity size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status Sistem</p>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-slate-200">Online & Stabil</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ${gridCols} gap-3 md:gap-4 lg:gap-6 mb-12`}
            >
                {statCards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 rounded-lg p-3 md:p-5 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-bl-xl`}></div>

                        <div className="relative z-10">
                            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-4 md:mb-6 shadow-lg ${card.shadow}/40 group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={20} className="md:w-7 md:h-7" />
                            </div>

                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.title}</p>
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">{card.count}</h3>

                            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-50 dark:border-slate-800/50">
                                <Link
                                    href={card.href}
                                    className="text-[9px] md:text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1 uppercase tracking-widest"
                                >
                                    Manage <ChevronRight size={12} className="md:w-[14px] md:h-[14px] group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-lg shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden"
                >
                    <div className="px-6 md:px-10 py-6 md:py-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 md:p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                                <Activity size={18} className="md:w-5 md:h-5" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Aktivitas Terakhir</h3>
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 md:px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full">LIVE Updates</span>
                    </div>

                    <div className="p-6 md:p-10">
                        {recentActivities && recentActivities.length > 0 ? (
                            <div className="space-y-8">
                                {recentActivities.map((activity, idx) => {
                                    let IconComponent = Activity;
                                    if (activity.icon === 'Newspaper') IconComponent = Newspaper;
                                    if (activity.icon === 'Calendar') IconComponent = Calendar;
                                    if (activity.icon === 'FileText') IconComponent = FileText;

                                    const colors = {
                                        emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20',
                                        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
                                        amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20',
                                    };

                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + (idx * 0.1) }}
                                            className="flex gap-6 items-center group"
                                        >
                                            <div className={`w-14 h-14 rounded-lg ${colors[activity.color] || colors.emerald} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                                <IconComponent size={24} />
                                            </div>
                                            <div className="flex-1 border-b border-slate-50 dark:border-slate-800/50 pb-8 last:border-0 last:pb-0">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                                    <h5 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                                                        {activity.title}
                                                    </h5>
                                                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{activity.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${colors[activity.color] || colors.emerald}`}>
                                                        {activity.type}
                                                    </span>
                                                    <span className="text-slate-300 dark:text-slate-700 font-bold">•</span>
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">
                                                        Oleh {activity.user}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-lg border-2 border-dashed border-slate-100 dark:border-slate-800">
                                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                    <Activity size={40} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Belum Ada Aktivitas</h4>
                                <p className="text-sm text-slate-300 dark:text-slate-600 font-medium mt-2">Sistem akan menampilkan entri terbaru secara otomatis.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Quick Shortcuts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-4 space-y-8"
                >
                    <div className="bg-emerald-600 p-6 md:p-10 rounded-lg text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full -mr-16 md:-mr-20 -mt-16 md:-mt-20 blur-3xl"></div>
                        <div className="relative z-10">
                            <h4 className="text-xl md:text-2xl font-black mb-4 md:mb-6 leading-tight">Mulai Kelola<br />Konten Hari Ini</h4>
                            <p className="text-emerald-50 text-xs md:text-sm font-medium leading-relaxed mb-8 md:mb-10 opacity-80">Gunakan pintasan di bawah untuk menambahkan konten baru dengan cepat.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4">
                                {shortcuts.map((shortcut, idx) => (
                                    <Link
                                        key={idx}
                                        href={shortcut.href}
                                        className="p-3 md:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-all group"
                                    >
                                        <shortcut.icon size={18} className="md:w-5 md:h-5" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center">{shortcut.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-lg border border-slate-50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-8 uppercase tracking-widest">Inspirasi Harian</h4>
                        <div className="relative p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg italic text-slate-500 dark:text-slate-400 font-serif leading-relaxed">
                            <span className="absolute -top-4 -left-2 text-6xl text-emerald-100 dark:text-emerald-900/40 non-italic">"</span>
                            Tingkatkan kualitas organisasi dengan literasi dan penyebaran informasi yang positif dan konsisten.
                            <div className="mt-4 font-sans not-italic text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">PKPT IPNU IPPNU</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}

