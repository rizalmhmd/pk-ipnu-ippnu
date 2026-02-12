import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    Save,
    Layout,
    ImageIcon as LucidImage,
    FileText,
    History,
    Target,
    Settings2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Edit({ pageSetting }) {
    const { data, setData, processing, errors } = useForm({
        hero_title: pageSetting.hero_title || '',
        hero_description: pageSetting.hero_description || '',
        header_bg_color: pageSetting.header_bg_color || '',
        header_text_color: pageSetting.header_text_color || '',
        content_sejarah: pageSetting.content_sejarah || '',
        content_visi_misi: pageSetting.content_visi_misi || '',
        hero_image: null,
        header_bg_image: null,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState(pageSetting.hero_image ? `/storage/${pageSetting.hero_image}` : null);
    const [headerImagePreview, setHeaderImagePreview] = useState(pageSetting.header_bg_image ? `/storage/${pageSetting.header_bg_image}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('hero_image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(pageSetting.hero_image ? `/storage/${pageSetting.hero_image}` : null);
        }
    };

    const handleHeaderImageChange = (e) => {
        const file = e.target.files[0];
        setData('header_bg_image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeaderImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setHeaderImagePreview(pageSetting.header_bg_image ? `/storage/${pageSetting.header_bg_image}` : null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.page-settings.update', pageSetting.id), data);
    };

    const isAboutPage = pageSetting.page_name === 'about';

    return (
        <AdminLayout>
            <Head title={`Edit Halaman - ${pageSetting.page_name?.toUpperCase() || ''}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href={route('admin.page-settings.index')}
                            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-xl transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight uppercase tracking-tight">Setelan Halaman {pageSetting.page_name}</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Kustomisasi konten spesifik untuk halaman terpilih.</p>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    {/* Hero Settings */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                                <Layout size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Hero Section</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Header halaman utama</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Judul Utama (Hero Title)</label>
                                <input
                                    type="text"
                                    value={data.hero_title}
                                    onChange={e => setData('hero_title', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold placeholder:text-slate-300"
                                    placeholder="Nama atau Judul Halaman..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Deskripsi Hero</label>
                                <textarea
                                    value={data.hero_description}
                                    onChange={e => setData('hero_description', e.target.value)}
                                    rows="3"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-medium leading-relaxed"
                                    placeholder="Jelaskan tentang halaman ini dalam 1-2 kalimat..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Header Card Customization */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                <Settings2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Header Card (Page Title Card)</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Kustomisasi kartu judul halaman</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Warna Background (Hex/Gradient)</label>
                                <div className="flex gap-3">
                                    <input
                                        type="color"
                                        value={data.header_bg_color?.startsWith('linear') ? '#4f46e5' : data.header_bg_color || '#4f46e5'}
                                        onChange={e => setData('header_bg_color', e.target.value)}
                                        className="h-14 w-14 p-1 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-xl focus:outline-none transition-all cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.header_bg_color}
                                        onChange={e => setData('header_bg_color', e.target.value)}
                                        className="flex-grow px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-mono text-sm"
                                        placeholder="e.g., #4f46e5 or linear-gradient(...)"
                                    />
                                </div>
                                <p className="mt-2 text-[10px] text-slate-400 font-medium italic">Kosongkan untuk menggunakan default branded gradient.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Warna Teks (Hex)</label>
                                <div className="flex gap-3">
                                    <input
                                        type="color"
                                        value={data.header_text_color || '#ffffff'}
                                        onChange={e => setData('header_text_color', e.target.value)}
                                        className="h-14 w-14 p-1 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-xl focus:outline-none transition-all cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.header_text_color}
                                        onChange={e => setData('header_text_color', e.target.value)}
                                        className="flex-grow px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-mono text-sm"
                                        placeholder="#ffffff"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Specific Content */}
                    {isAboutPage && (
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Konten Profil</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sejarah, Visi, & Misi</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <History size={16} className="text-slate-400" />
                                        Sejarah Singkat
                                    </label>
                                    <textarea
                                        value={data.content_sejarah}
                                        onChange={e => setData('content_sejarah', e.target.value)}
                                        rows="8"
                                        className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-[2rem] focus:outline-none transition-all font-medium leading-relaxed"
                                        placeholder="Tuliskan sejarah organisasi di sini..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Target size={16} className="text-slate-400" />
                                        Visi & Misi
                                    </label>
                                    <textarea
                                        value={data.content_visi_misi}
                                        onChange={e => setData('content_visi_misi', e.target.value)}
                                        rows="8"
                                        className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-[2rem] focus:outline-none transition-all font-medium leading-relaxed"
                                        placeholder="Tuliskan visi dan misi organisasi..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-10">
                    {/* Hero Image Card */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h5 className="text-sm font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                            <LucidImage size={16} className="text-emerald-500" />
                            Hero Banner
                        </h5>

                        <div className={`relative group aspect-video border-2 border-dashed rounded-[2rem] overflow-hidden flex items-center justify-center transition-all ${imagePreview ? 'border-emerald-500' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-400'
                            }`}>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />

                            {imagePreview ? (
                                <div className="w-full h-full relative">
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                                        <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Ganti Banner</p>
                                    </div>
                                </div>

                            ) : (
                                <div className="text-center p-6">
                                    <LucidImage size={32} className="text-slate-200 mx-auto mb-2" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Banner</p>
                                </div>
                            )}
                        </div>
                        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed italic">Rekomendasi: 1920x600px <br /> dengan overlay gelap.</p>
                    </div>

                    {/* Header Card Image Card */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h5 className="text-sm font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                            <LucidImage size={16} className="text-indigo-500" />
                            Header Card BG Image
                        </h5>

                        <div className={`relative group aspect-video border-2 border-dashed rounded-[2rem] overflow-hidden flex items-center justify-center transition-all ${headerImagePreview ? 'border-indigo-500' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-400'
                            }`}>
                            <input
                                type="file"
                                onChange={handleHeaderImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />

                            {headerImagePreview ? (
                                <div className="w-full h-full relative">
                                    <img src={headerImagePreview} className="w-full h-full object-cover" alt="Preview Header" />
                                    <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                                        <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Ganti BG Image</p>
                                    </div>
                                </div>

                            ) : (
                                <div className="text-center p-6">
                                    <LucidImage size={32} className="text-slate-200 mx-auto mb-2" />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Header BG Image</p>
                                </div>
                            )}
                        </div>
                        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed italic">Opsional: Gambar akan menimpa warna background jika disertakan.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 tracking-[0.2em] uppercase text-sm"
                    >
                        <Save size={20} />
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
