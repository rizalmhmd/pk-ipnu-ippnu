import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { Trash2, Users, Download, Check, X, FileImage, Eye, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationsIndex({ registrations, agendas, filters }) {
    const [selectedReg, setSelectedReg] = useState(null);

    const handleFilterChange = (key, value) => {
        router.get(route('admin.registrations.index'), { ...filters, [key]: value }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pendaftar ini?')) {
            router.delete(route('admin.registrations.destroy', id), { preserveScroll: true });
        }
    };

    const handleUpdateStatus = (id, status) => {
        router.put(route('admin.registrations.updateStatus', id), { status }, { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <Head title="Semua Pendaftar" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">Data Pendaftar Global</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Kelola semua pendaftar dari berbagai agenda.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <select 
                            value={filters.agenda_id || ''} 
                            onChange={(e) => handleFilterChange('agenda_id', e.target.value)}
                            className="pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none min-w-[200px]"
                        >
                            <option value="">Semua Agenda</option>
                            {agendas.map(a => (
                                <option key={a.id} value={a.id}>{a.title}</option>
                            ))}
                        </select>
                        <Filter size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Waktu Daftar</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Agenda</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Metode</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center">Bukti Bayar</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {registrations.data.map((reg) => (
                                <tr key={reg.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                        {new Date(reg.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{reg.agenda?.title}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reg.payment_method === 'transfer' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {reg.payment_method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            reg.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                            reg.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {reg.payment_proof ? (
                                            <a href={`/${reg.payment_proof}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Lihat Bukti Bayar">
                                                <FileImage size={16} />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedReg(reg)}
                                                className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-500 rounded-lg transition-all"
                                                title="Lihat Detail Form"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {reg.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(reg.id, 'approved')} className="p-2 bg-emerald-50 text-emerald-500 hover:bg-emerald-100 rounded-lg transition-all" title="Setujui"><Check size={16} /></button>
                                                    <button onClick={() => handleUpdateStatus(reg.id, 'rejected')} className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all" title="Tolak"><X size={16} /></button>
                                                </>
                                            )}
                                            <button onClick={() => handleDelete(reg.id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Hapus"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {registrations.data.length === 0 && (
                    <div className="py-20 text-center">
                        <Users size={40} className="mx-auto text-slate-300 mb-4" />
                        <h5 className="text-lg font-bold text-slate-400">Tidak ada pendaftar</h5>
                    </div>
                )}
            </div>
            
            {registrations.links && (
                <div className="mt-6 flex justify-center">
                    <Pagination links={registrations.links} />
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedReg && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReg(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Detail Jawaban Form</h3>
                                <button onClick={() => setSelectedReg(null)} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors"><X size={20} /></button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Agenda</p>
                                    <p className="font-bold text-slate-800 dark:text-white">{selectedReg.agenda?.title}</p>
                                </div>
                                <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                                    {selectedReg.agenda?.form_schema?.map(field => (
                                        <div key={field.id}>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{field.label}</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 whitespace-pre-wrap">{selectedReg.responses[field.id] || '-'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
