import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UserCog, Plus, Edit, Trash2, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UsersIndex({ users }) {
    const { flash } = usePage().props;

    const roleBadge = {
        admin:      { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Administrator' },
        ketua:      { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Ketua IPNU/IPPNU' },
        departemen: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', label: 'Ketua Departemen' },
    };

    const handleDelete = (user) => {
        if (confirm(`Hapus user "${user.name}"? Tindakan ini tidak bisa dibatalkan.`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen User" />

            {/* Flash Messages */}
            {flash?.success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium"
                >
                    ✓ {flash.success}
                </motion.div>
            )}
            {flash?.error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium"
                >
                    ✕ {flash.error}
                </motion.div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">
                        Manajemen <span className="text-emerald-600">User</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        Kelola akun dan hak akses pengguna sistem
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all"
                    >
                        <Plus size={18} />
                        Tambah User
                    </Link>
                </motion.div>
            </div>

            {/* Users Grid */}
            <div className="flex flex-wrap gap-6">
                {users.map((user, idx) => {
                    const badge = roleBadge[user.role] || roleBadge.admin;
                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex-grow min-w-[300px] max-w-[500px] bg-white dark:bg-slate-900 rounded-lg p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 group hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200/50 dark:shadow-none">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${badge.bg} ${badge.text}`}>
                                    {badge.label}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                                {user.name}
                            </h3>
                            <p className="text-sm text-slate-400 mb-1">{user.email}</p>
                            <p className="text-xs text-slate-300 dark:text-slate-600">Bergabung {user.created_at}</p>

                            <div className="flex gap-2 mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                                <Link
                                    href={`/admin/users/${user.id}/edit`}
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-400 hover:text-emerald-600 rounded-lg text-xs font-bold transition-all"
                                >
                                    <Edit size={14} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(user)}
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 hover:text-red-600 rounded-lg text-xs font-bold transition-all"
                                >
                                    <Trash2 size={14} />
                                    Hapus
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {users.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                        <UserCog size={40} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-400">Belum Ada User</h4>
                    <p className="text-sm text-slate-300 dark:text-slate-600 mt-2">Tambahkan user baru untuk mengelola sistem.</p>
                </div>
            )}
        </AdminLayout>
    );
}
