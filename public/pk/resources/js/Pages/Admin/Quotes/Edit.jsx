import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Save,
    CloudUpload,
    X,
    User,
    Quote as QuoteIcon,
    CheckCircle2,
    XCircle,
    History
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ quote }) {
    const { data, setData, processing, errors } = useForm({
        content: quote.content || '',
        author: quote.author || '',
        image: null,
        order: quote.order || 0,
        is_active: !!quote.is_active,
        remove_image: false,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState(quote.image_url);

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
            setImagePreview(quote.image_url);
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
        router.post(route('admin.quotes.update', quote.id), data);
    };

    return (
        <AdminLayout>
            <Head title={`Edit Quote - ${quote.author || 'Anonymous'}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href={route('admin.quotes.index')}
                            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">Edit Quote</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Perbarui pesan inspiratif atau detail penulis kutipan.</p>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <History size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Terdaftar Sejak</p>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {new Date(quote.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={submit} className="bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-0">
                                    <QuoteIcon size={16} className="text-emerald-500" />
                                    Isi Kutipan
                                </label>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${data.content.length > 180 ? 'text-red-500' : 'text-slate-400'}`}>
                                    {data.content.length} / 200 Karakter
                                </span>
                            </div>
                            <textarea
                                value={data.content}
                                onChange={e => {
                                    if (e.target.value.length <= 200) {
                                        setData('content', e.target.value)
                                    }
                                }}
                                rows="5"
                                className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium italic ${errors.content ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500'
                                    }`}
                                placeholder="Tuliskan kata-kata inspiratif di sini (Maksimal 200 karakter)..."
                                required
                            />
                            {errors.content && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.content}</p>}
                        </div>

                        {/* Author & Order */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <User size={16} className="text-slate-400" />
                                    Nama Penulis (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.author}
                                    onChange={e => setData('author', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                    placeholder="Contoh: K.H. Hasyim Asy'ari"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Urutan Tampilan</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                />
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm ${data.is_active ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {data.is_active ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                </div>
                                <div>
                                    <h6 className="font-bold text-slate-900 dark:text-white mb-0.5">Status Aktif</h6>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tampilkan di halaman depan</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData('is_active', !data.is_active)}
                                className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${data.is_active ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${data.is_active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Background Quote (Opsional)</label>
                            <div className={`relative group border-2 border-dashed rounded-lg p-10 text-center transition-all ${imagePreview ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-400'
                                }`}>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept="image/*"
                                />

                                {imagePreview ? (
                                    <div className="relative inline-block w-full">
                                        <img src={imagePreview} className="w-full h-48 object-cover rounded-lg shadow-2xl " alt="Preview" />
                                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-lg transition-all duration-300">
                                            <div className="flex gap-6">
                                                <div className="flex flex-col items-center">
                                                    <CloudUpload size={32} className="text-white mb-2" />
                                                    <p className="text-white font-bold text-[10px] uppercase tracking-widest leading-none">Ganti</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="flex flex-col items-center text-red-100 hover:text-red-400 transition-colors"
                                                >
                                                    <X size={32} className="mb-2" />
                                                    <p className="text-white font-bold text-[10px] uppercase tracking-widest leading-none">Hapus</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mb-4 group-hover:scale-110 transition-transform">
                                            <CloudUpload size={32} />
                                        </div>
                                        <h5 className="font-bold text-slate-900 dark:text-white mb-2">Unggah Background</h5>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Resolusi tinggi disarankan (1920x1080)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800">
                            <Link
                                href={route('admin.quotes.index')}
                                className="px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors"
                            >
                                Batalkan
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase"
                            >
                                <Save size={18} />
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
