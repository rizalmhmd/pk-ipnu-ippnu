import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Newspaper,
    Image,
    Users,
    Calendar,
    ArrowRight
} from 'lucide-react';

export default function Dashboard({ stats, activities }) {
    const statCards = [
        { title: 'Berita', count: stats?.posts || 0, icon: Newspaper, color: 'bg-emerald-500', href: '/admin/posts' },
        { title: 'Galeri', count: stats?.galleries || 0, icon: Image, color: 'bg-blue-500', href: '/admin/galleries' },
        { title: 'Anggota', count: stats?.members || 0, icon: Users, color: 'bg-indigo-500', href: '/admin/members' },
        { title: 'Agenda', count: stats?.agendas || 0, icon: Calendar, color: 'bg-amber-500', href: '/admin/agendas' },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500 dark:text-slate-400">Selamat datang kembali di panel administrasi.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.title}</p>
                                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">{card.count}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${card.color} text-white shadow-lg shadow-emerald-500/20`}>
                                <card.icon size={24} />
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-700">
                            <Link href={card.href} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 group">
                                Kelola Data <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section (Simplified) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-white">Aktivitas Terbaru</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded">Real-time</span>
                </div>
                <div className="p-6">
                    {activities && activities.length > 0 ? (
                        <div className="space-y-6">
                            {activities.map((activity, idx) => {
                                const IconComponent = activity.icon === 'Newspaper' ? Newspaper : Calendar;
                                return (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                            <IconComponent size={18} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-white">
                                                {activity.title}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {activity.time} &bull; oleh {activity.user}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            <p>Belum ada aktivitas terbaru.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
