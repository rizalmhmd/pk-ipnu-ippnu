import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Save,
    CloudUpload,
    Lightbulb,
    Image as ImageIcon,
    X,
    History
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ post }) {
    const { data, setData, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        image: null,
        remove_image: false,
        _method: 'PUT', // Method spoofing for file uploads in PUT requests
    });

    const [imagePreview, setImagePreview] = useState(post.image_url);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData(prev => ({
            ...prev,
            image: file,
            remove_image: false
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(post.image_url);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setData(prev => ({
            ...prev,
            image: null,
            remove_image: true
        }));
        setImagePreview(null);
    };

    const submit = (e) => {
        e.preventDefault();
        // Use POST with method spoofing for file uploads
        router.post(route('admin.posts.update', post.id), data, {
            onSuccess: () => {
                // Flash message handled by layout
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit - ${post.title}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href={route('admin.posts.index')}
                            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">Edit Berita</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Perbarui konten dan informasi berita yang sudah dipublikasikan.</p>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <History size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Terakhir Diubah</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {new Date(post.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Form Card */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Judul Berita</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500 dark:focus:border-emerald-500'
                                        }`}
                                    placeholder="Contoh: PKPT IPNU IPPNU Sukses Gelar Makesta 2026"
                                    required
                                />
                                {errors.title && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.title}</p>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Gambar Utama</label>
                                <div className={`relative group border-2 border-dashed rounded-lg p-10 text-center transition-all ${imagePreview ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600'
                                    }`}>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />

                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img src={imagePreview} className="max-h-80 rounded-lg shadow-2xl " alt="Preview" />
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-lg transition-all duration-300">
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <CloudUpload size={32} className="text-white mb-2" />
                                                        <p className="text-white font-bold text-xs">Ganti Gambar</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveImage}
                                                        className="flex flex-col items-center text-red-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={32} className="mb-2" />
                                                        <p className="font-bold text-xs text-white">Hapus Gambar</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <CloudUpload size={32} />
                                            </div>
                                            <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">Ganti Foto Berita</h5>
                                            <p className="text-sm text-slate-400 font-medium">Format: JPG, PNG, atau WEBP. Max: 5MB.</p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.image}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Isi Berita Lengkap</label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows="15"
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium leading-relaxed ${errors.content ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500 dark:focus:border-emerald-500'
                                        }`}
                                    placeholder="Mulailah menulis narasi berita Anda di sini..."
                                    required
                                />
                                {errors.content && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.content}</p>}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800">
                                <Link
                                    href={route('admin.posts.index')}
                                    className="px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors"
                                >
                                    Batalkan Perubahan
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:translate-y-0 tracking-wider"
                                >
                                    <Save size={18} />
                                    SIMPAN PERUBAHAN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Tips Card */}
                    <div className="bg-emerald-600 p-10 rounded-lg text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-lg">
                                    <Lightbulb size={24} />
                                </div>
                                <h5 className="text-xl font-bold">Tips Mengedit</h5>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Periksa kembali typo atau kesalahan data sebelum menyimpan perubahan.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Ganti gambar utama jika Anda menemukan visual yang lebih representatif.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Update isi berita jika terdapat perkembangan informasi terbaru.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Preview (Simplified) */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                            <ImageIcon size={16} className="text-emerald-500" />
                            Preview Visual
                        </h5>
                        <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700">
                            {imagePreview ? (
                                <img src={imagePreview} className="w-full h-full object-cover" alt="Visual Preview" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 dark:text-slate-700 scale-150">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
