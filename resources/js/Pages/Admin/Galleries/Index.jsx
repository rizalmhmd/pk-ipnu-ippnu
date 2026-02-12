import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    MoreVertical,
    FileImage
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ galleries }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri?')) {
            router.delete(route('admin.galleries.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Galeri" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Galeri Foto</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manajemen dokumentasi visual kegiatan organisasi.</p>
                </div>
                <Link
                    href={route('admin.galleries.create')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                    <Plus size={18} />
                    Tambah Foto
                </Link>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {galleries.data.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500"
                    >
                        <div className="aspect-square relative overflow-hidden">
                            <img
                                src={`/storage/${item.image_path}?v=${new Date(item.updated_at).getTime()}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={item.title}
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    title="Hapus"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2 leading-relaxed">
                                {item.title}
                            </h4>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {new Date(item.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                </span>
                                <div className="p-1 px-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[8px] font-bold uppercase tracking-widest">
                                    JPEG/PNG
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {galleries.data.length === 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-20 text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                        <FileImage size={40} />
                    </div>
                    <h5 className="text-lg font-bold text-slate-400">Belum Ada Foto</h5>
                    <p className="text-slate-300 dark:text-slate-600 text-sm italic">Gallery foto masih kosong, upload dokumentasi pertama Anda.</p>
                </div>
            )}

            {/* Pagination */}
            {galleries.data.length > 0 && (
                <div className="scale-90 -mt-10">
                    <Pagination links={galleries.links} />
                </div>
            )}
        </AdminLayout>
    );
}
