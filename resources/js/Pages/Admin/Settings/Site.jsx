import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Save,
    Globe,
    Settings,
    Mail,
    Phone,
    MapPin,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    ImageIcon,
    Shield,
    Image as LucidImage,
    Layout
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Site({ setting }) {
    const { data, setData, processing, errors } = useForm({
        site_name: setting.site_name || '',
        meta_description: setting.meta_description || '',
        footer_description: setting.footer_description || '',
        address: setting.address || '',
        email: setting.email || '',
        phone: setting.phone || '',
        instagram: setting.instagram || '',
        facebook: setting.facebook || '',
        twitter: setting.twitter || '',
        youtube: setting.youtube || '',
        copyright_text: setting.copyright_text || '',
        home_news_title: setting.home_news_title || '',
        home_agenda_title: setting.home_agenda_title || '',
        default_hero_title: setting.default_hero_title || '',
        default_hero_subtitle: setting.default_hero_subtitle || '',
        site_logo: null,
        favicon: null,
        default_hero_image: null,
        _method: 'PUT',
    });

    const [previews, setPreviews] = useState({
        site_logo: setting.site_logo_url,
        favicon: setting.favicon_url,
        default_hero_image: setting.default_hero_image_url,
    });

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        setData(field, file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.site-settings.update'), data);
    };

    const SectionHeader = ({ icon: Icon, title, subtitle }) => (
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <Icon size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1">{title}</h3>
                <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Pengaturan Situs" />

            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Konfigurasi Situs</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Kelola identitas, kontak, dan pengaturan global platform.</p>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    {/* General Settings */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <SectionHeader icon={Globe} title="Identitas Utama" subtitle="Informasi publik yang muncul di seluruh bagian situs." />

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Nama Situs</label>
                                <input
                                    type="text"
                                    value={data.site_name}
                                    onChange={e => setData('site_name', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold placeholder:text-slate-300"
                                    placeholder="Contoh: PKPT IPNU IPPNU UNEJ"
                                    required
                                />
                                {errors.site_name && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.site_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Meta Deskripsi (SEO)</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows="3"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-medium leading-relaxed"
                                    placeholder="Deskripsi singkat untuk mesin pencari..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Teks Copyright</label>
                                <input
                                    type="text"
                                    value={data.copyright_text}
                                    onChange={e => setData('copyright_text', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                    placeholder="© 2026 IPNU IPPNU"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section Titles */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <SectionHeader icon={Settings} title="Pengaturan Beranda" subtitle="Judul seksi yang ditampilkan di halaman depan." />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Judul Seksi Berita</label>
                                <input
                                    type="text"
                                    value={data.home_news_title}
                                    onChange={e => setData('home_news_title', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Judul Seksi Agenda</label>
                                <input
                                    type="text"
                                    value={data.home_agenda_title}
                                    onChange={e => setData('home_agenda_title', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hero Section Default */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <SectionHeader icon={Layout} title="Default Hero Header" subtitle="Digunakan untuk halaman yang tidak memiliki pengaturan hero khusus." />

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Hero Title</label>
                                    <input
                                        type="text"
                                        value={data.default_hero_title}
                                        onChange={e => setData('default_hero_title', e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="md:row-span-2">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Hero Image</label>
                                    <div className={`relative group aspect-video border-2 border-dashed rounded-3xl overflow-hidden flex items-center justify-center transition-all ${previews.default_hero_image ? 'border-emerald-500' : 'border-slate-100 dark:border-slate-800'}`}>
                                        <input type="file" onChange={e => handleFileChange(e, 'default_hero_image')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                                        {previews.default_hero_image ? (
                                            <img src={previews.default_hero_image} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center">
                                                <LucidImage size={32} className="text-slate-200 mx-auto mb-2" />
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Hero Subtitle</label>
                                    <textarea
                                        value={data.default_hero_subtitle}
                                        onChange={e => setData('default_hero_subtitle', e.target.value)}
                                        rows="3"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-medium leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    {/* Visual Assets */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <SectionHeader icon={LucidImage} title="Aset Visual" subtitle="Logo & Favicon" />

                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Logo Situs</label>
                                <div className={`relative group p-6 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all ${previews.site_logo ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-50 dark:border-slate-800'}`}>
                                    <input type="file" onChange={e => handleFileChange(e, 'site_logo')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    {previews.site_logo ? (
                                        <img src={previews.site_logo} className="max-h-20 object-contain" />
                                    ) : (
                                        <ImageIcon size={24} className="text-slate-200" />
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Favicon (32x32)</label>
                                <div className={`relative group p-6 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all ${previews.favicon ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-50 dark:border-slate-800'}`}>
                                    <input type="file" onChange={e => handleFileChange(e, 'favicon')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    {previews.favicon ? (
                                        <img src={previews.favicon} className="w-10 h-10 object-contain shadow-lg" />
                                    ) : (
                                        <ImageIcon size={20} className="text-slate-200" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <SectionHeader icon={Mail} title="Kontak & Sosial" subtitle="Update cara audiens menemukan Anda." />

                        <div className="space-y-6">
                            <div className="relative">
                                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm" placeholder="Email Organisasi" />
                            </div>
                            <div className="relative">
                                <Phone size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm" placeholder="Nomor Telepon/WA" />
                            </div>
                            <div className="relative">
                                <Instagram size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm" placeholder="Instagram Username" />
                            </div>
                            <div className="relative">
                                <Youtube size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" value={data.youtube} onChange={e => setData('youtube', e.target.value)} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm" placeholder="URL Channel Youtube" />
                            </div>
                        </div>
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
