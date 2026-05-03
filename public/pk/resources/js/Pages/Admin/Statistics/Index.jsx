
import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ statistics }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data statistik akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.statistics.destroy', id), {
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Data statistik berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    const colorClasses = {
        emerald: 'bg-emerald-100 text-emerald-800',
        blue: 'bg-blue-100 text-blue-800',
        amber: 'bg-amber-100 text-amber-800',
        red: 'bg-red-100 text-red-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        cyan: 'bg-cyan-100 text-cyan-800',
        teal: 'bg-teal-100 text-teal-800',
        orange: 'bg-orange-100 text-orange-800',
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Statistik" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Statistik</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola data statistik yang ditampilkan di beranda.</p>
                </div>
                <Link
                    href={route('admin.statistics.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-600/20"
                >
                    <Plus size={18} />
                    <span>Tambah Statistik</span>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-bold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4">Urutan</th>
                                <th className="px-6 py-4">Judul</th>
                                <th className="px-6 py-4">Nilai</th>
                                <th className="px-6 py-4">Warna</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {statistics.length > 0 ? (
                                statistics.map((stat) => (
                                    <tr key={stat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold">#{stat.order}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800 dark:text-slate-200">{stat.title}</div>
                                            <div className="text-xs text-slate-500">{stat.subtitle}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                                                {stat.value} {stat.unit}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${colorClasses[stat.color] || 'bg-slate-100 text-slate-800'}`}>
                                                {stat.color}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {stat.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold">
                                                    <CheckCircle size={14} /> Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-bold">
                                                    <XCircle size={14} /> Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={route('admin.statistics.edit', stat.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(stat.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <i className="fas fa-chart-bar text-4xl mb-2 opacity-20"></i>
                                            <p>Belum ada data statistik.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
