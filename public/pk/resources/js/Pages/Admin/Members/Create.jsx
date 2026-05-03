import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft,
    UserPlus,
    CloudUpload,
    X,
    Instagram,
    User,
    Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        position: '',
        photo: null,
        instagram: '',
        type: 'ipnu',
        order: 0,
        level: 3,
        department: '',
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.members.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Anggota" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Tambah Anggota Baru</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Lengkapi data personalia kepengurusan PKPT IPNU IPPNU.</p>
                </div>
                <Link
                    href={route('admin.members.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Daftar
                </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500'
                                        }`}
                                    placeholder="Contoh: Ahmad Rizki"
                                    required
                                />
                                {errors.name && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.name}</p>}
                            </div>

                            {/* Position */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Jabatan</label>
                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={e => setData('position', e.target.value)}
                                    className={`w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.position ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent focus:border-emerald-500'
                                        }`}
                                    placeholder="Contoh: Ketua PKPT"
                                    required
                                />
                                {errors.position && <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider">{errors.position}</p>}
                            </div>

                            {/* Hierarchical Level */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Tingkatan (Level Hierarchy)</label>
                                <select
                                    value={data.level}
                                    onChange={e => setData('level', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                >
                                    <option value="1">Level 1: Ketua PKPT</option>
                                    <option value="2">Level 2: Ketua Departemen / Inti</option>
                                    <option value="3">Level 3: Anggota Departemen / Staff</option>
                                </select>
                                <p className="mt-2 text-[10px] text-slate-400 italic">Level menentukan posisi dalam pohon organisasi.</p>
                            </div>

                            {/* Department Grouping */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Departemen / Bidang</label>
                                <input
                                    type="text"
                                    value={data.department}
                                    onChange={e => setData('department', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                    placeholder="Contoh: Kaderisasi, Dakwah, dll"
                                />
                                <p className="mt-2 text-[10px] text-slate-400 italic">Gunakan nama yang sama untuk mengelompokkan anggota.</p>
                            </div>

                            {/* Instagram */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Instagram size={14} className="text-slate-400" />
                                    Instagram Username
                                </label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                    <input
                                        type="text"
                                        value={data.instagram}
                                        onChange={e => setData('instagram', e.target.value)}
                                        className="w-full pl-11 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold"
                                        placeholder="username"
                                    />
                                </div>
                            </div>

                            {/* Order */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Urutan Tampilan</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                                />
                            </div>

                            {/* Organization Type */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4">Pilih Organisasi</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'ipnu')}
                                        className={`flex items-center justify-center gap-3 p-5 rounded-lg border-2 transition-all font-bold ${data.type === 'ipnu'
                                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                                : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400'
                                            }`}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${data.type === 'ipnu' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                        Kader IPNU
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'ippnu')}
                                        className={`flex items-center justify-center gap-3 p-5 rounded-lg border-2 transition-all font-bold ${data.type === 'ippnu'
                                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400'
                                                : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400'
                                            }`}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${data.type === 'ippnu' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
                                        Kader IPPNU
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-10 mt-10 border-t border-slate-50 dark:border-slate-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase"
                            >
                                <UserPlus size={18} />
                                Tambah Anggota
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Photo Upload Card */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                            <User size={16} className="text-emerald-500" />
                            Foto Anggota
                        </h5>

                        <div className={`relative group aspect-[3/4] border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center transition-all ${photoPreview ? 'border-emerald-500' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-400'
                            }`}>
                            <input
                                type="file"
                                onChange={handlePhotoChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                            />

                            {photoPreview ? (
                                <div className="w-full h-full relative">
                                    <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
                                        <CloudUpload size={32} className="text-white mb-2" />
                                        <p className="text-white font-bold text-xs uppercase tracking-widest">Ganti Foto</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <User size={32} />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Klik untuk unggah</p>
                                </div>
                            )}
                        </div>
                        {errors.photo && <p className="mt-4 text-xs font-bold text-red-500 uppercase tracking-wider text-center">{errors.photo}</p>}
                        <p className="mt-6 text-[10px] text-slate-400 font-medium text-center leading-relaxed">Format: JPG atau PNG. Ukuran yang disarankan: 600x800px dengan background polos.</p>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-slate-950 p-8 rounded-lg text-white shadow-2xl shadow-emerald-900/40 relative overflow-hidden h-[300px]">
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-20 -mb-20 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                            <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/30 rounded-full mb-6 flex items-center justify-center overflow-hidden">
                                {photoPreview ? <img src={photoPreview} className="w-full h-full object-cover" /> : <User size={40} className="text-emerald-500" />}
                            </div>
                            <h6 className="font-bold text-lg leading-tight mb-1">{data.name || 'Nama Lengkap'}</h6>
                            <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{data.position || 'Jabatan'}</p>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border ${data.type === 'ipnu' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                }`}>
                                {data.type}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
