import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    CalendarPlus,
    Send,
    Tag,
    Clock,
    MapPin,
    FileText,
    List,
    Users,
    DollarSign,
    Lightbulb,
    ImagePlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FormBuilder from '@/Components/FormBuilder';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'organisasi',
        event_date: '',
        event_time: '',
        location: '',
        description: '',
        is_registration_open: false,
        registration_fee: '',
        payment_account: '',
        image: null,
        form_schema: [
            { id: 'field_name', label: 'Nama Lengkap', type: 'text', required: true, options: [] },
            { id: 'field_email', label: 'Email', type: 'email', required: true, options: [] },
            { id: 'field_phone', label: 'No. WhatsApp', type: 'number', required: true, options: [] },
        ],
    });

    const categories = [
        { id: 'organisasi', name: 'Organisasi', color: 'emerald' },
        { id: 'nasional', name: 'Nasional', color: 'red' },
        { id: 'keagamaan', name: 'Keagamaan', color: 'blue' },
        { id: 'khusus', name: 'Khusus', color: 'amber' },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.agendas.store'), { forceFormData: true });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Agenda" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Tambah Agenda Baru</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Jadwalkan kegiatan dan program kerja terbaru organisasi.</p>
                </div>
                <Link
                    href={route('admin.agendas.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    {/* Basic Info Card */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <FileText className="text-emerald-500" />
                            Informasi Dasar
                        </h3>
                        <div className="space-y-8">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Judul Agenda</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500'
                                        }`}
                                    placeholder="Contoh: Rapat Pleno I Kepengurusan"
                                    required
                                />
                                {errors.title && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.title}</p>}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <ImagePlus size={16} className="text-slate-400" />
                                    Pamflet / Poster (Opsional)
                                </label>
                                <input
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                    accept="image/*"
                                />
                                {errors.image && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.image}</p>}
                            </div>

                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Tag size={16} className="text-slate-400" />
                                    Kategori Agenda
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setData('category', cat.id)}
                                            className={`p-4 rounded-lg border-2 transition-all font-bold text-xs uppercase tracking-widest ${data.category === cat.id
                                                    ? `bg-${cat.color}-50 dark:bg-${cat.color}-900/20 border-${cat.color}-500 text-${cat.color}-600 dark:text-${cat.color}-400`
                                                    : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400'
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                                {errors.category && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.category}</p>}
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Clock size={16} className="text-slate-400" />
                                        Tanggal Pelaksanaan
                                    </label>
                                    <input
                                        type="date"
                                        value={data.event_date}
                                        onChange={e => setData('event_date', e.target.value)}
                                        className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all font-bold ${errors.event_date ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500'
                                            }`}
                                        required
                                    />
                                    {errors.event_date && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.event_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Clock size={16} className="text-slate-400" />
                                        Waktu (Opsional)
                                    </label>
                                    <input
                                        type="time"
                                        value={data.event_time}
                                        onChange={e => setData('event_time', e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" />
                                    Lokasi Kegiatan
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold"
                                    placeholder="Contoh: Gedung Serbaguna Kampus"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <FileText size={16} className="text-slate-400" />
                                    Deskripsi Tambahan
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="5"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-medium leading-relaxed"
                                    placeholder="Berikan detail tambahan tentang agenda ini..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Registration Config Card */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-xl ${data.is_registration_open ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Form Pendaftaran</h3>
                                    <p className="text-sm text-slate-500">Aktifkan untuk menerima pendaftar secara online</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={data.is_registration_open}
                                    onChange={e => setData('is_registration_open', e.target.checked)}
                                />
                                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>

                        <AnimatePresence>
                            {data.is_registration_open && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-8 overflow-hidden pt-4 border-t border-slate-100 dark:border-slate-800"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <DollarSign size={16} className="text-slate-400" />
                                            Harga Tiket Masuk (HTM)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.registration_fee}
                                            onChange={e => setData('registration_fee', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold"
                                            placeholder="Contoh: Gratis, Rp 50.000, Infaq Seikhlasnya"
                                        />
                                        <p className="mt-2 text-xs text-slate-500 font-medium">Kosongkan jika tidak ada HTM.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                            <DollarSign size={16} className="text-slate-400" />
                                            Informasi Rekening / Pembayaran
                                        </label>
                                        <input
                                            type="text"
                                            value={data.payment_account}
                                            onChange={e => setData('payment_account', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold"
                                            placeholder="Contoh: BCA 123456 a.n PKPT IPNU"
                                        />
                                        <p className="mt-2 text-xs text-slate-500 font-medium">Isi jika pendaftar bisa membayar melalui transfer.</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Desain Form (Custom Form Builder)</h4>
                                        <FormBuilder 
                                            schema={data.form_schema} 
                                            onChange={(newSchema) => setData('form_schema', newSchema)} 
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase"
                        >
                            <Send size={18} />
                            Simpan & Publikasikan
                        </button>
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
                                <h5 className="text-xl font-bold">Tips Agenda</h5>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Tulis judul agenda dengan jelas agar peserta dapat dengan mudah mengenali kegiatan.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Pastikan memilih kategori yang tepat untuk memudahkan pengelompokan di kalender.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5"></div>
                                    <p className="text-sm font-medium leading-relaxed text-emerald-50">Aktifkan Form Pendaftaran jika agenda ini membutuhkan data partisipan dan tiket masuk.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
