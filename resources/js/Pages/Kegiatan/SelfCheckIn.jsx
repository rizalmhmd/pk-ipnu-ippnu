import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Clock,
    MapPin,
    Calendar,
    Lock,
    AlertCircle,
    ArrowLeft,
    UserCheck,
    RefreshCw,
} from 'lucide-react';

export default function SelfCheckIn({ registration, attendanceToken }) {
    const { flash } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isApproved = registration.status === 'approved';
    const isPresent = Boolean(registration.attended_at);
    const isAttendanceOpen = Boolean(registration.agenda?.is_attendance_open);

    const handleConfirmAttendance = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        router.post(
            route('kegiatan.attendance.confirm', registration.id),
            { token: attendanceToken },
            {
                preserveScroll: true,
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    return (
        <PublicLayout>
            <Head title={`Presensi - ${registration.agenda?.title || 'Kegiatan'}`} />

            <div className="bg-emerald-900 pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <Link
                            href={route('kegiatan.index')}
                            className="inline-flex items-center gap-2 text-emerald-300 hover:text-white mb-5 transition-colors text-sm font-semibold"
                        >
                            <ArrowLeft size={16} /> Kembali ke Kegiatan
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-serif mb-3 leading-tight">
                            Presensi Kehadiran Peserta
                        </h1>
                        <p className="text-emerald-100 text-base">
                            {registration.agenda?.title}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 -mt-8 relative z-20">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-7 md:p-9 border border-slate-100"
                    >
                        {flash?.success && (
                            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
                                <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                                <span>{flash.success}</span>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2.5">
                                <AlertCircle size={18} className="shrink-0 text-red-600" />
                                <span>{flash.error}</span>
                            </div>
                        )}

                        {/* Ticket Info */}
                        <div className="text-center mb-6">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mb-3">
                                E-Ticket Resmi
                            </span>
                            <h2 className="text-2xl font-extrabold text-slate-900">
                                {registration.registrant_name}
                            </h2>
                            <p className="font-mono text-sm font-bold text-emerald-700 mt-1">
                                {registration.ticket_code}
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5 text-sm mb-6">
                            <div className="flex items-center gap-2.5 text-slate-700">
                                <Calendar size={16} className="text-emerald-600 shrink-0" />
                                <span className="font-semibold">
                                    {registration.agenda?.event_date || '-'}
                                    {registration.agenda?.event_time ? ` • ${registration.agenda.event_time.slice(0, 5)} WIB` : ''}
                                </span>
                            </div>
                            {registration.agenda?.location && (
                                <div className="flex items-center gap-2.5 text-slate-700">
                                    <MapPin size={16} className="text-emerald-600 shrink-0" />
                                    <span>{registration.agenda.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Status / Action Area */}
                        {isPresent ? (
                            <div className="text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-200 mb-6">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 size={36} />
                                </div>
                                <h3 className="text-xl font-extrabold text-emerald-800 mb-1">
                                    Kehadiran Tercatat!
                                </h3>
                                <p className="text-sm text-emerald-700">
                                    Anda tercatat <strong>HADIR</strong> pada{' '}
                                    <span className="font-bold">
                                        {new Date(registration.attended_at).toLocaleString('id-ID', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </span>
                                </p>
                            </div>
                        ) : !isApproved ? (
                            <div className="text-center p-6 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
                                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <AlertCircle size={30} />
                                </div>
                                <h3 className="text-lg font-bold text-amber-900 mb-1">
                                    Pendaftaran Belum Disetujui
                                </h3>
                                <p className="text-sm text-amber-800">
                                    Status pendaftaran Anda saat ini <strong>{registration.status.toUpperCase()}</strong>. Presensi hanya tersedia bagi peserta berstatus Approved.
                                </p>
                            </div>
                        ) : isAttendanceOpen ? (
                            <div className="mb-6">
                                <button
                                    type="button"
                                    onClick={handleConfirmAttendance}
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2.5"
                                >
                                    <UserCheck size={20} />
                                    <span>{isSubmitting ? 'Mencatat Kehadiran...' : 'Konfirmasi Kehadiran — Saya Hadir'}</span>
                                </button>
                                <p className="text-xs text-slate-500 text-center mt-3">
                                    Klik tombol di atas untuk langsung mencatat kehadiran Anda pada daftar presensi panitia.
                                </p>
                            </div>
                        ) : (
                            <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                                <div className="w-14 h-14 bg-slate-200/70 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Lock size={26} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">
                                    Sesi Presensi Mandiri Belum Dibuka
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Panitia belum membuka sesi presensi mandiri untuk acara ini. Muat ulang halaman ini saat sesi presensi dibuka, atau tunjukkan QR E-Ticket di bawah ini ke panitia.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => router.reload()}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                                >
                                    <RefreshCw size={14} /> Cek Status Presensi Lagi
                                </button>
                            </div>
                        )}

                        {/* QR E-Ticket Backup */}
                        {isApproved && registration.qr_url && (
                            <div className="pt-5 border-t border-slate-100 text-center">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                    QR Code E-Ticket (Alternatif Scan Panitia)
                                </p>
                                <div className="inline-block p-3 bg-white rounded-xl border-2 border-dashed border-emerald-200">
                                    <img
                                        src={registration.qr_url}
                                        alt={`QR ${registration.ticket_code}`}
                                        className="w-36 h-36 mx-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}
