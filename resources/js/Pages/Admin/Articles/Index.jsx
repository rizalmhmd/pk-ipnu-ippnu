import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    FileText,
    Calendar,
    Image as ImageIcon,
    MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ articles }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(route('admin.articles.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Flash message handled by layout
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Artikel" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Kelola Artikel</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manajemen seluruh konten artikel dan informasi organisasi.</p>
                </div>
                <Link
                    href={route('admin.articles.create')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                    <Plus size={18} />
                    Tambah Artikel
                </Link>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Artikel</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Statistik</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {articles.data.map((article) => (
                                <motion.tr
                                    key={article.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm">
                                                {article.image ? (
                                                    <img src={article.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                                        <FileText size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base truncate mb-1 group-hover:text-emerald-600 transition-colors">
                                                    {article.title}
                                                </h4>
                                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px]">
                                                        <Calendar size={12} className="text-emerald-500" />
                                                        {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="truncate max-w-[150px]">Oleh: {article.author || 'Admin'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 hidden md:table-cell">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-wider">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Published</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {/* Note: View link might need adjustment if public view exists */}
                                            <button
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all opacity-50 cursor-not-allowed"
                                                title="Lihat (Soon)"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <Link
                                                href={route('admin.articles.edit', article.id)}
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article.id)}
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

                {articles.data.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                            <FileText size={40} />
                        </div>
                        <h5 className="text-lg font-bold text-slate-400">Belum Ada Artikel</h5>
                        <p className="text-slate-300 dark:text-slate-600 text-sm italic">Mulai dengan menambahkan artikel pertama Anda.</p>
                    </div>
                )}
            </div>

            {/* Pagination wrapper for better spacing in Admin */}
            <div className="scale-90 -mt-10">
                <Pagination links={articles.links} />
            </div>
        </AdminLayout>
    );
}
