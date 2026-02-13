import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import {
    Plus,
    Edit,
    Trash2,
    User,
    UserPlus,
    Instagram,
    MoreVertical,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ members }) {
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
            router.delete(route('admin.members.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Anggota" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Kelola Anggota</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Manajemen data personalia kepengurusan PKPT IPNU IPPNU.</p>
                </div>
                <Link
                    href={route('admin.members.create')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                >
                    <UserPlus size={18} />
                    Tambah Anggota
                </Link>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profil & Jabatan</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell text-center">Organisasi</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {members.data.map((member) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm relative group/photo">
                                                {member.photo ? (
                                                    <img src={member.photo_url} className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500" alt="" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                                        <User size={24} />
                                                    </div>
                                                )}
                                                {member.instagram && (
                                                    <a
                                                        href={`https://instagram.com/${member.instagram}`}
                                                        target="_blank"
                                                        className="absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white scale-0 group-hover/photo:scale-100 transition-transform duration-300"
                                                    >
                                                        <Instagram size={10} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base truncate mb-1">
                                                    {member.name}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                        {member.position}
                                                    </span>
                                                    <span className="text-slate-200 dark:text-slate-700">|</span>
                                                    <span className="text-[10px] font-bold text-slate-400">Order: {member.order || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 hidden md:table-cell text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${member.type === 'ipnu'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800'
                                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800'
                                            }`}>
                                            {member.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={route('admin.members.edit', member.id)}
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                title="Hapus"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {members.data.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6">
                            <Users size={40} />
                        </div>
                        <h5 className="text-lg font-bold text-slate-400">Belum Ada Anggota</h5>
                        <p className="text-slate-300 dark:text-slate-600 text-sm italic">Input data kepengurusan pertama Anda sekarang.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="scale-90 -mt-10">
                <Pagination links={members.links} />
            </div>
        </AdminLayout>
    );
}
