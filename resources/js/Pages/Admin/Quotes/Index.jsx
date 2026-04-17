import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Plus,
    Edit,
    Trash2,
    Quote as QuoteIcon,
    User,
    CheckCircle2,
    XCircle,
    ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ quotes }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kutipan ini?')) {
            router.delete(route('admin.quotes.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Kutipan" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Quote & Inspirasi</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manajemen kutipan untuk ditampilkan di halaman depan.</p>
                </div>
                <Link
                    href={route('admin.quotes.create')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                    <Plus size={18} />
                    Tambah Quote
                </Link>
            </div>

            {/* Quotes Grid */}
            <div className="flex flex-wrap gap-8">
                {quotes.map((quote, idx) => (
                    <motion.div
                        key={quote.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex-grow min-w-[320px] max-w-[500px] bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-10 relative group"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-8 right-8">
                            {quote.is_active ? (
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 text-[8px] font-black uppercase tracking-widest">
                                    <CheckCircle2 size={10} /> Active
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full border border-slate-100 dark:border-slate-700 text-[8px] font-black uppercase tracking-widest">
                                    <XCircle size={10} /> Inactive
                                </div>
                            )}
                        </div>

                        <div className="mb-8 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg w-fit text-emerald-600 dark:text-emerald-400">
                            <QuoteIcon size={24} />
                        </div>

                        <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic mb-8 relative z-10">
                            "{quote.content}"
                        </p>

                        <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-50 dark:border-slate-700">
                                    {quote.image ? (
                                        <img src={quote.image_url} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={18} className="text-slate-300" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{quote.author || 'Anonymous'}</span>
                                    <span className="text-[10px] font-bold text-slate-400">Order: {quote.order}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={route('admin.quotes.edit', quote.id)}
                                    className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                                >
                                    <Edit size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(quote.id)}
                                    className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {quotes.length === 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-20 text-center shadow-xl shadow-slate-200/50 dark:shadow-none mt-10">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                        <QuoteIcon size={40} />
                    </div>
                    <h5 className="text-lg font-bold text-slate-400">Belum Ada Quote</h5>
                    <p className="text-slate-300 dark:text-slate-600 text-sm italic">Simpan kata-kata inspiratif untuk penyemangat organisasi.</p>
                </div>
            )}
        </AdminLayout>
    );
}
