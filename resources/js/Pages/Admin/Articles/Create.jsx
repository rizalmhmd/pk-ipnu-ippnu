import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Send,
    CloudUpload,
    Lightbulb,
    Image as ImageIcon,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.articles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Artikel" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Tambah Artikel Baru</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Buat konten artikel mendalam dan informatif untuk organisasi Anda.</p>
                </div>
                <Link
                    href={route('admin.articles.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Judul Artikel</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500 dark:focus:border-emerald-500'
                                        }`}
                                    placeholder="Contoh: Peran Pemuda dalam Menjaga Tradisi Organisasi"
                                    required
                                />
                                {errors.title && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.title}</p>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white">Gambar Utama</label>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">Opsional</span>
                                </div>
                                <div className={`relative group border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all ${imagePreview ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
                                    }`}>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />

                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img src={imagePreview} className="max-h-80 rounded-3xl shadow-2xl " alt="Preview" />
                                            <button
                                                type="button"
                                                onClick={() => { setImagePreview(null); setData('image', null); }}
                                                className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-20"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <CloudUpload size={32} />
                                            </div>
                                            <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">Unggah Foto Artikel</h5>
                                            <p className="text-sm text-slate-400 font-medium">Format: JPG, PNG, atau WEBP. Max: 5MB.</p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.image}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Isi Artikel Lengkap</label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows="15"
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-[2rem] focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium leading-relaxed ${errors.content ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500 dark:focus:border-emerald-500'
                                        }`}
                                    placeholder="Tuliskan pemikiran dan artikel Anda di sini..."
                                    required
                                />
                                {errors.content && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.content}</p>}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800">
                                <button
                                    type="reset"
                                    onClick={() => { reset(); setImagePreview(null); }}
                                    className="px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors"
                                >
                                    Reset Form
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:translate-y-0 tracking-wider"
                                >
                                    <Send size={18} />
                                    PUBLIKASIKAN ARTIKEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Tips Card */}
                    <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                    <Lightbulb size={24} />
                                </div>
                                <h5 className="text-xl font-bold">Tips Artikel</h5>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Gunakan bahasa yang lugas dan informatif untuk audiens pembaca.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Sertakan gambar jika Artikel membutuhkan ilustrasi pendukung.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Judul menarik akan meningkatkan kemungkinan artikel dibaca.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
