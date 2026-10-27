import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import { Trash2, Users, Download, Check, X, FileImage, Eye, Filter, RefreshCw, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { parseFullNik } from '@/Utils/nikParser';

export default function RegistrationsIndex({ registrations, agendas, filters }) {
    const [selectedReg, setSelectedReg] = useState(null);
    const [syncingId, setSyncingId] = useState(null);
    const [isSyncingAll, setIsSyncingAll] = useState(false);

    const handleFilterChange = (key, value) => {
        router.get(route('admin.registrations.index'), { ...filters, [key]: value }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pendaftar ini?')) {
            router.delete(route('admin.registrations.destroy', id), { preserveScroll: true });
        }
    };

    const handleSyncMidtrans = (id) => {
        setSyncingId(id);
        router.post(route('admin.registrations.syncMidtrans', id), {}, {
            preserveScroll: true,
            onFinish: () => {
                setSyncingId(null);
                // Also update selectedReg if modal is open
                if (selectedReg && selectedReg.id === id) {
                    const updated = registrations.data.find(r => r.id === id);
                    if (updated) setSelectedReg(updated);
                }
            },
        });
    };

    const handleSyncAllMidtrans = () => {
        setIsSyncingAll(true);
        router.post(route('admin.registrations.syncAllMidtrans'), {}, {
            preserveScroll: true,
            onFinish: () => setIsSyncingAll(false),
        });
    };

    const handleUpdateStatus = (id, status) => {
        if (status === 'rejected') {
            Swal.fire({
                title: 'Tolak Pendaftaran?',
                text: 'Masukkan alasan penolakan (opsional, akan dikirim ke email pendaftar):',
                input: 'textarea',
                inputPlaceholder: 'Contoh: Bukti transfer tidak terbaca / Nominal tidak sesuai.',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                confirmButtonText: 'Tolak & Kirim Email',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.put(
                        route('admin.registrations.updateStatus', id), 
                        { status: 'rejected', reason: result.value || '' }, 
                        { preserveScroll: true }
                    );
                }
            });
        } else {
            router.put(route('admin.registrations.updateStatus', id), { status }, { preserveScroll: true });
        }
    };

    const getRegistrantName = (reg) => {
        if (!reg.responses || typeof reg.responses !== 'object') return 'Peserta';
        const schema = reg.agenda?.form_schema;
        if (schema && Array.isArray(schema)) {
            const nameField = schema.find(f => f.label.toLowerCase().includes('nama'));
            if (nameField && reg.responses[nameField.id]) return reg.responses[nameField.id];
            if (schema.length > 0 && reg.responses[schema[0].id]) return reg.responses[schema[0].id];
        }
        const values = Object.values(reg.responses);
        return values.length > 0 && typeof values[0] === 'string' ? values[0] : 'Peserta';
    };

    const getRegistrantPhone = (reg) => {
        if (!reg.responses || typeof reg.responses !== 'object') return null;
        for (const [k, v] of Object.entries(reg.responses)) {
            const keyLower = k.toLowerCase();
            if (keyLower.includes('phone') || keyLower.includes('whatsapp') || keyLower.includes('hp')) return v;
        }
        return null;
    };

    const getRegistrantEmail = (reg) => {
        if (reg.user?.email) return reg.user.email;
        if (!reg.responses || typeof reg.responses !== 'object') return null;
        for (const [k, v] of Object.entries(reg.responses)) {
            if (k.toLowerCase().includes('email') || (typeof v === 'string' && v.includes('@'))) return v;
        }
        return null;
    };

    const getRegistrantNik = (reg) => {
        if (!reg.responses || typeof reg.responses !== 'object') return null;
        for (const [k, v] of Object.entries(reg.responses)) {
            if (k.toLowerCase().includes('nik') && v) return v;
        }
        return null;
    };

    return (
        <AdminLayout>
            <Head title="Semua Pendaftar" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">Data Pendaftar Global</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Kelola semua pendaftar dari berbagai agenda.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleSyncAllMidtrans}
                        disabled={isSyncingAll}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                        title="Periksa dan perbarui status semua transaksi Midtrans yang masih pending"
                    >
                        <RefreshCw size={15} className={isSyncingAll ? "animate-spin" : ""} />
                        <span>{isSyncingAll ? "Menyinkronkan..." : "Sinkronkan Semua Midtrans"}</span>
                    </button>

                    <div className="relative">
                        <select 
                            value={filters.agenda_id || ''} 
                            onChange={(e) => handleFilterChange('agenda_id', e.target.value)}
                            className="pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none min-w-[200px]"
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
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Pendaftar & Agenda</th>
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
                                        <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{getRegistrantName(reg)}</p>
                                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 line-clamp-1">{reg.agenda?.title}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                                            {getRegistrantPhone(reg) && (
                                                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/50">
                                                    WA: {getRegistrantPhone(reg)}
                                                </span>
                                            )}
                                            {getRegistrantEmail(reg) && (
                                                <span className="text-slate-400 dark:text-slate-500">
                                                    • {getRegistrantEmail(reg)}
                                                </span>
                                            )}
                                            {getRegistrantNik(reg) && (
                                                <span className="font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                                                    NIK: {getRegistrantNik(reg)}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {reg.payment_method === 'midtrans' ? (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                                    MIDTRANS
                                                </span>
                                                {reg.midtrans_payment_type && (
                                                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 capitalize">
                                                        {reg.midtrans_payment_type.replace('_', ' ')}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                reg.payment_method === 'transfer' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' :
                                                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                                {reg.payment_method}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                reg.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' :
                                                reg.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' :
                                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400'
                                            }`}>
                                                {reg.status}
                                            </span>
                                            {reg.payment_method === 'midtrans' && reg.midtrans_transaction_status && (
                                                <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                    ({reg.midtrans_transaction_status})
                                                </span>
                                            )}
                                        </div>
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
                                        <div className="flex items-center justify-center gap-1.5">
                                            <button
                                                onClick={() => setSelectedReg(reg)}
                                                className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-500 rounded-lg transition-all"
                                                title="Lihat Detail Form"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            
                                            {reg.payment_method === 'midtrans' && (
                                                <button
                                                    onClick={() => handleSyncMidtrans(reg.id)}
                                                    disabled={syncingId === reg.id}
                                                    className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-lg transition-all disabled:opacity-50"
                                                    title="Sinkronkan status dari Midtrans"
                                                >
                                                    <RefreshCw size={16} className={syncingId === reg.id ? "animate-spin" : ""} />
                                                </button>
                                            )}

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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setSelectedReg(null)} 
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Detail Jawaban Form</h3>
                                <button onClick={() => setSelectedReg(null)} className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors"><X size={20} /></button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Agenda</p>
                                    <p className="font-bold text-slate-800 dark:text-white">{selectedReg.agenda?.title}</p>
                                </div>

                                {selectedReg.payment_method === 'midtrans' && (
                                    <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                                                <CreditCard size={15} /> Informasi Midtrans
                                            </span>
                                            <button
                                                onClick={() => handleSyncMidtrans(selectedReg.id)}
                                                disabled={syncingId === selectedReg.id}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all disabled:opacity-50"
                                            >
                                                <RefreshCw size={12} className={syncingId === selectedReg.id ? "animate-spin" : ""} />
                                                Sinkronkan Sekarang
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Order ID</span>
                                                <strong className="font-mono text-slate-800 dark:text-slate-200 text-[11px]">{selectedReg.midtrans_order_id || `REG-${selectedReg.id}`}</strong>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Status Midtrans</span>
                                                <strong className="text-slate-800 dark:text-slate-200 uppercase">{selectedReg.midtrans_transaction_status || 'Belum tersinkron'}</strong>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Metode / Channel</span>
                                                <strong className="text-slate-800 dark:text-slate-200 capitalize">{selectedReg.midtrans_payment_type ? selectedReg.midtrans_payment_type.replace('_', ' ') : '-'}</strong>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Waktu Bayar</span>
                                                <strong className="text-slate-800 dark:text-slate-200 text-[11px]">
                                                    {selectedReg.midtrans_settlement_time ? new Date(selectedReg.midtrans_settlement_time).toLocaleString('id-ID') : '-'}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                                    {selectedReg.agenda?.form_schema?.map(field => {
                                        const val = selectedReg.responses?.[field.id];
                                        const isNik = field.type === 'nik' || field.id.includes('nik') || (field.label || '').toLowerCase().includes('nik');
                                        const parsed = (isNik && val) ? parseFullNik(val) : null;

                                        return (
                                            <div key={field.id} className="space-y-1.5">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field.label}</p>
                                                <p className="font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 whitespace-pre-wrap">
                                                    {val || '-'}
                                                </p>

                                                {parsed && parsed.isValid && (
                                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs space-y-2">
                                                        <div className="flex items-center justify-between pb-1 border-b border-emerald-200/60 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold">
                                                            <span>{parsed.genderLabel}</span>
                                                            <span className="text-[10px] bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">NIK Terdeteksi</span>
                                                        </div>
                                                        <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                                                            <div className="flex justify-between gap-2">
                                                                <span className="text-slate-400">Kecamatan:</span>
                                                                <strong className="text-right">{parsed.kecamatan}</strong>
                                                            </div>
                                                            <div className="flex justify-between gap-2">
                                                                <span className="text-slate-400">Kabupaten/Kota:</span>
                                                                <strong className="text-right">{parsed.kabupatenKota}</strong>
                                                            </div>
                                                            <div className="flex justify-between gap-2">
                                                                <span className="text-slate-400">Provinsi:</span>
                                                                <strong className="text-right">{parsed.province}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}

