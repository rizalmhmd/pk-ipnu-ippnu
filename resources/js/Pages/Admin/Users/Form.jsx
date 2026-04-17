import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserForm({ user, roles }) {
    const isEditing = !!user;

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        role: user?.role || 'departemen',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/users/${user.id}`);
        } else {
            post('/admin/users');
        }
    };

    const roleBadge = {
        admin:      { bg: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-400', desc: 'Akses penuh ke seluruh fitur sistem' },
        ketua:      { bg: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-400', desc: 'Mengelola agenda, galeri, anggota, statistik' },
        departemen: { bg: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-400', desc: 'Mengelola quotes, artikel, berita' },
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit User' : 'Tambah User'} />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/users"
                    className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </Link>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {isEditing ? 'Edit' : 'Tambah'} <span className="text-emerald-600">User</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        {isEditing ? `Mengubah data ${user.name}` : 'Buat akun baru untuk pengguna sistem'}
                    </p>
                </motion.div>
            </div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-8 sm:p-10 space-y-8">
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                                placeholder="email@contoh.com"
                            />
                            {errors.email && <p className="mt-2 text-xs text-red-500 font-bold">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                    Password {isEditing && <span className="text-slate-300 dark:text-slate-600 normal-case tracking-normal">(kosongkan jika tidak diubah)</span>}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="Min. 6 karakter"
                                />
                                {errors.password && <p className="mt-2 text-xs text-red-500 font-bold">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                                    placeholder="Ulangi password"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                                Role / Hak Akses
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {roles.map((role) => {
                                    const badge = roleBadge[role.value] || roleBadge.departemen;
                                    const isSelected = data.role === role.value;
                                    return (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => setData('role', role.value)}
                                            className={`p-5 rounded-lg border-2 text-left transition-all duration-200 ${
                                                isSelected
                                                    ? `${badge.bg} ${badge.text} border-current shadow-lg scale-[1.02]`
                                                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                    isSelected ? 'border-current' : 'border-slate-300 dark:border-slate-600'
                                                }`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-current" />}
                                                </div>
                                                <span className="font-bold text-sm">{role.label}</span>
                                            </div>
                                            <p className={`text-xs leading-relaxed ${isSelected ? 'opacity-80' : 'text-slate-400'}`}>
                                                {badge.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && <p className="mt-2 text-xs text-red-500 font-bold">{errors.role}</p>}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 sm:px-10 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                        <Link
                            href="/admin/users"
                            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Save size={16} />
                            {processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah User')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </AdminLayout>
    );
}
