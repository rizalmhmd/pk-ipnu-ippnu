import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import {
    Plus,
    Edit,
    Trash2,
    Calendar,
    MapPin,
    Clock,
    Tag,
    ClipboardList,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRealtimeUpdates } from '@/Hooks/useRealtimeUpdates';

export default function Index({ agendas }) {
    useRealtimeUpdates('Agenda', 'agendas');
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
            router.delete(route('admin.agendas.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const categoryStyles = {
        nasional: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800',
        organisasi: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800',
        keagamaan: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800',
        khusus: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800',
    };

    return (
        <AdminLayout>
            <Head title="Kelola Agenda" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Agenda & Kegiatan</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manajemen jadwal program kerja dan kegiatan organisasi.</p>
                </div>
                <Link
                    href={route('admin.agendas.create')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                    <Plus size={18} />
                    Tambah Agenda
                </Link>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu & Agenda</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Kategori</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {agendas.data.map((agenda) => (
                                <motion.tr
                                    key={agenda.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-800/50">
                                                <span className="text-xs font-black leading-none">{new Date(agenda.event_date).getDate()}</span>
                                                <span className="text-[8px] font-bold uppercase tracking-tighter">{new Date(agenda.event_date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base truncate mb-2 group-hover:text-emerald-600 transition-colors">
                                                    {agenda.title}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400 tracking-wide">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={12} className="text-emerald-500" />
                                                        {agenda.event_time ? agenda.event_time.substring(0, 5) : '--:--'} WIB
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin size={12} className="text-emerald-500" />
                                                        {agenda.location || 'Lokasi Belum Ditentukan'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 hidden md:table-cell">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border ${categoryStyles[agenda.category] || categoryStyles.organisasi}`}>
                                            {agenda.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-2">
                                            {agenda.is_registration_open && (
                                                <Link
                                                    href={route('admin.agendas.registrations', agenda.id)}
                                                    className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-800/30 rounded-lg transition-all"
                                                    title="Lihat Pendaftar"
                                                >
                                                    <Users size={18} />
                                                </Link>
                                            )}
                                            <Link
                                                href={route('admin.agendas.edit', agenda.id)}
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(agenda.id)}
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                title="Hapus"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {agendas.data.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                            <ClipboardList size={40} />
                        </div>
                        <h5 className="text-lg font-bold text-slate-400">Belum Ada Agenda</h5>
                        <p className="text-slate-300 dark:text-slate-600 text-sm italic">Mulai rencanakan kegiatan organisasi kedepan.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="scale-90 -mt-10">
                <Pagination links={agendas.links} />
            </div>
        </AdminLayout>
    );
}
