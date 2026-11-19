import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Pagination';
import {
    QrCode,
    Camera,
    CameraOff,
    CheckCircle2,
    XCircle,
    Clock,
    Users,
    UserCheck,
    UserX,
    Search,
    Filter,
    ScanLine,
    AlertTriangle,
    RotateCcw,
    X,
    ArrowLeft,
    Power,
    ExternalLink,
    Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function AttendanceIndex({ registrations, agendas, selectedAgenda, stats, filters }) {
    const [codeInput, setCodeInput] = useState('');
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState('');
    const [qrModalReg, setQrModalReg] = useState(null);

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const scanLoopRef = useRef(null);
    const lastScannedRef = useRef({ code: '', time: 0 });
    const inputRef = useRef(null);

    const handleFilterChange = (key, value) => {
        router.get(
            route('admin.attendance.index'),
            { ...filters, [key]: value },
            { preserveState: true, preserveScroll: true }
        );
    };

    const submitCheckIn = useCallback(async (rawCode) => {
        const trimmed = (rawCode || '').trim();
        if (!trimmed || isCheckingIn) return;

        setIsCheckingIn(true);
        try {
            const payload = { code: trimmed };
            if (filters.agenda_id && filters.agenda_id !== 'all') {
                payload.agenda_id = Number(filters.agenda_id);
            }

            const res = await axios.post(route('admin.attendance.checkIn'), payload);
            const data = res.data;

            if (data.success) {
                setScanResult({
                    type: 'success',
                    title: 'Presensi Berhasil!',
                    message: data.message,
                    registration: data.registration,
                });
                setCodeInput('');
                router.reload({ only: ['registrations', 'stats'], preserveScroll: true });
            } else {
                setScanResult({
                    type: 'warning',
                    title: 'Sudah Presensi Sebelumnya',
                    message: data.message,
                    registration: data.registration,
                });
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal memproses presensi. Pastikan kode tiket valid.';
            setScanResult({
                type: 'error',
                title: 'Presensi Ditolak',
                message: msg,
                registration: null,
            });
        } finally {
            setIsCheckingIn(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [filters.agenda_id, isCheckingIn]);

    const stopCamera = useCallback(() => {
        if (scanLoopRef.current) {
            cancelAnimationFrame(scanLoopRef.current);
            scanLoopRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
    }, []);

    const startCamera = async () => {
        setCameraError('');
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setCameraError('Browser tidak mendukung akses kamera. Gunakan input kode tiket manual di sebelah kiri.');
            return;
        }

        const hasBarcodeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window;
        if (!hasBarcodeDetector) {
            setCameraError('Browser ini belum mendukung BarcodeDetector QR bawaan (gunakan Google Chrome/Edge terbaru atau ketik kode tiket manual).');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });
            streamRef.current = stream;
            setCameraActive(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play().catch(() => {});
                }

                const detector = new window.BarcodeDetector({ formats: ['qr_code'] });

                const scanFrame = async () => {
                    if (!videoRef.current || !streamRef.current) return;
                    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                        try {
                            const barcodes = await detector.detect(videoRef.current);
                            if (barcodes && barcodes.length > 0) {
                                const code = barcodes[0].rawValue;
                                const now = Date.now();
                                if (code && (code !== lastScannedRef.current.code || now - lastScannedRef.current.time > 3500)) {
                                    lastScannedRef.current = { code, time: now };
                                    submitCheckIn(code);
                                }
                            }
                        } catch {
                            // Ignore transient frame detection errors
                        }
                    }
                    scanLoopRef.current = requestAnimationFrame(scanFrame);
                };

                scanLoopRef.current = requestAnimationFrame(scanFrame);
            }, 150);
        } catch (err) {
            setCameraError('Izin kamera ditolak atau kamera tidak ditemukan. Anda tetap bisa check-in menggunakan input kode tiket.');
            stopCamera();
        }
    };

    useEffect(() => {
        return () => stopCamera();
    }, [stopCamera]);

    const handleToggleAttendance = (id) => {
        router.put(route('admin.registrations.toggleAttendance', id), {}, { preserveScroll: true });
    };

    const handleToggleAgendaOpen = () => {
        if (!selectedAgenda) return;
        router.put(route('admin.attendance.toggleOpen', selectedAgenda.id), {}, { preserveScroll: true });
    };

    const handleCopySelfCheckIn = (url) => {
        if (!url) return;
        navigator.clipboard?.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const getRegistrantName = (reg) => {
        if (!reg.responses || typeof reg.responses !== 'object') return reg.user?.name || 'Peserta';
        const schema = reg.agenda?.form_schema;
        if (schema && Array.isArray(schema)) {
            const nameField = schema.find((f) => (f.label || '').toLowerCase().includes('nama'));
            if (nameField && reg.responses[nameField.id]) return reg.responses[nameField.id];
            if (schema.length > 0 && reg.responses[schema[0].id]) return reg.responses[schema[0].id];
        }
        const values = Object.values(reg.responses);
        return values.length > 0 && typeof values[0] === 'string' ? values[0] : (reg.user?.name || 'Peserta');
    };

    const getRegistrantPhone = (reg) => {
        if (!reg.responses || typeof reg.responses !== 'object') return null;
        for (const [k, v] of Object.entries(reg.responses)) {
            const keyLower = k.toLowerCase();
            if (keyLower.includes('phone') || keyLower.includes('whatsapp') || keyLower.includes('hp')) return v;
        }
        return null;
    };

    return (
        <AdminLayout>
            <Head title="Presensi & Check-in QR" />

            {/* Header */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            <QrCode size={13} /> Presensi Digital
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">
                        Presensi &amp; Check-in Kegiatan
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Scan QR E-Ticket, masukkan kode tiket, atau tandai kehadiran peserta secara langsung.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={route('admin.registrations.index')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold shadow-sm transition-all"
                    >
                        <ArrowLeft size={16} />
                        <span>Data Pendaftar</span>
                    </Link>
                </div>
            </div>

            {/* Self Check-in Toggle Banner for Selected Agenda */}
            {selectedAgenda && (
                <div className={`mb-6 p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    selectedAgenda.is_attendance_open
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}>
                    <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                            selectedAgenda.is_attendance_open
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}>
                            <Power size={20} />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                    Presensi Mandiri Peserta (via Tautan Email E-Ticket)
                                </h2>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    selectedAgenda.is_attendance_open
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}>
                                    {selectedAgenda.is_attendance_open ? 'DIBUKA' : 'DITUTUP'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                Agenda: <strong>{selectedAgenda.title}</strong> —{' '}
                                {selectedAgenda.is_attendance_open
                                    ? 'Peserta yang sudah Approved kini bisa langsung klik tombol "Hadir" dari email E-Ticket mereka.'
                                    : 'Aktifkan saklar saat acara dimulai agar peserta dapat melakukan presensi mandiri dari email E-Ticket.'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleToggleAgendaOpen}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                            selectedAgenda.is_attendance_open
                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                        }`}
                    >
                        <Power size={15} />
                        <span>{selectedAgenda.is_attendance_open ? 'Tutup Presensi Mandiri' : 'Buka Presensi Mandiri'}</span>
                    </button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Peserta Approved</span>
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            <Users size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.total_approved}</p>
                    <p className="text-xs text-slate-500 mt-1">Total peserta terverifikasi</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Sudah Hadir</span>
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                            <UserCheck size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.total_present}</p>
                    <p className="text-xs text-slate-500 mt-1">Tercatat check-in hadir</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-100 dark:border-amber-900/40 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Belum Hadir</span>
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                            <UserX size={18} />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{stats.total_absent}</p>
                    <p className="text-xs text-slate-500 mt-1">Menunggu kedatangan</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tingkat Kehadiran</span>
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{stats.percentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3 mb-2">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500">
                        {stats.total_present} dari {stats.total_approved} peserta hadir
                    </p>
                </div>
            </div>

            {/* Check-in Scanner & Manual Input Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <ScanLine size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Check-in Cepat</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Ketik kode tiket (<code className="font-mono font-bold">REG-00001</code>) atau scan dengan alat/kamera QR
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={cameraActive ? stopCamera : startCamera}
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                                cameraActive
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            }`}
                        >
                            {cameraActive ? <CameraOff size={15} /> : <Camera size={15} />}
                            <span>{cameraActive ? 'Tutup Kamera' : 'Scan Kamera QR'}</span>
                        </button>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitCheckIn(codeInput);
                        }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="relative flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={codeInput}
                                onChange={(e) => setCodeInput(e.target.value)}
                                placeholder="Masukkan kode tiket (contoh: REG-00001) atau payload QR..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                autoFocus
                            />
                            <QrCode size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                        <button
                            type="submit"
                            disabled={isCheckingIn || !codeInput.trim()}
                            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 whitespace-nowrap"
                        >
                            {isCheckingIn ? 'Memproses...' : 'Catat Hadir'}
                        </button>
                    </form>

                    {cameraError && (
                        <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                            <span>{cameraError}</span>
                        </div>
                    )}

                    {/* Feedback Banner */}
                    <AnimatePresence mode="wait">
                        {scanResult && (
                            <motion.div
                                key={scanResult.message}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className={`mt-4 p-4 rounded-xl border flex items-start justify-between gap-3 ${
                                    scanResult.type === 'success'
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                                        : scanResult.type === 'warning'
                                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                                        : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {scanResult.type === 'success' ? (
                                        <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-emerald-600" />
                                    ) : scanResult.type === 'warning' ? (
                                        <AlertTriangle size={20} className="shrink-0 mt-0.5 text-amber-600" />
                                    ) : (
                                        <XCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
                                    )}
                                    <div className="text-sm">
                                        <p className="font-bold">{scanResult.title}</p>
                                        <p className="text-xs opacity-90 mt-0.5">{scanResult.message}</p>
                                        {scanResult.registration && (
                                            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
                                                <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-slate-900/50 font-mono">
                                                    {scanResult.registration.ticket_code}
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-slate-900/50">
                                                    {scanResult.registration.name}
                                                </span>
                                                <span className="px-2 py-0.5 rounded bg-white/70 dark:bg-slate-900/50">
                                                    {scanResult.registration.attended_at}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setScanResult(null)}
                                    className="p-1 rounded hover:bg-black/5"
                                >
                                    <X size={16} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Camera Preview / Info Box */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none flex flex-col justify-center">
                    {cameraActive ? (
                        <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video">
                            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-44 h-44 border-2 border-emerald-400 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
                            </div>
                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 text-emerald-300 text-[11px] font-bold">
                                Arahkan QR E-Ticket ke kotak hijau
                            </span>
                        </div>
                    ) : (
                        <div className="text-center py-4 px-2">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <QrCode size={28} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                                Verifikasi QR E-Ticket Terenkripsi
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Setiap peserta berstatus <strong>Approved</strong> memiliki kode tiket unik (<code className="font-mono">REG-XXXXX</code>) &amp; QR Code bertanda tangan HMAC. Klik <strong>Scan Kamera QR</strong> atau gunakan tombol <strong>Tandai Hadir</strong> di daftar bawah.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Cari nama peserta, kode tiket (REG-00001), WA, atau email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFilterChange('search', searchTerm);
                                }
                            }}
                            className="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                            <select
                                value={filters.agenda_id || 'all'}
                                onChange={(e) => handleFilterChange('agenda_id', e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none"
                            >
                                <option value="all">Semua Agenda</option>
                                {agendas.map((a) => (
                                    <option key={a.id} value={a.id}>{a.title}</option>
                                ))}
                            </select>
                            <Filter size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>

                        <div className="relative min-w-[160px] flex-1 sm:flex-initial">
                            <select
                                value={filters.attendance || ''}
                                onChange={(e) => handleFilterChange('attendance', e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 appearance-none"
                            >
                                <option value="">Semua Kehadiran</option>
                                <option value="present">Sudah Hadir</option>
                                <option value="absent">Belum Hadir</option>
                            </select>
                            <Filter size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kode Tiket</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Peserta &amp; Agenda</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status Presensi</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Waktu Check-in</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {registrations.data.map((reg) => (
                                <tr key={reg.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                                            {reg.ticket_code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">{getRegistrantName(reg)}</p>
                                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{reg.agenda?.title}</p>
                                        {getRegistrantPhone(reg) && (
                                            <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                WA: {getRegistrantPhone(reg)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {reg.attended_at ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                                <CheckCircle2 size={13} /> Hadir
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                <Clock size={13} /> Belum Hadir
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        {reg.attended_at ? (
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-200">
                                                    {new Date(reg.attended_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                                </p>
                                                {reg.checked_in_by?.name && (
                                                    <p className="text-[10px] text-slate-400">oleh {reg.checked_in_by.name}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 italic">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setQrModalReg(reg)}
                                                className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-600 rounded-lg transition-colors"
                                                title="Lihat QR E-Ticket"
                                            >
                                                <QrCode size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleAttendance(reg.id)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    reg.attended_at
                                                        ? 'bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 dark:bg-slate-800 dark:text-slate-300'
                                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20'
                                                }`}
                                            >
                                                {reg.attended_at ? (
                                                    <>
                                                        <RotateCcw size={13} /> Batal
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 size={13} /> Tandai Hadir
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {registrations.data.length === 0 && (
                    <div className="py-16 text-center">
                        <Users size={40} className="mx-auto text-slate-300 mb-3" />
                        <h5 className="text-base font-bold text-slate-500">Belum ada peserta berstatus Approved</h5>
                        <p className="text-xs text-slate-400 mt-1">Setujui pendaftar di halaman Data Pendaftar agar muncul pada daftar presensi.</p>
                    </div>
                )}
            </div>

            {registrations.links && (
                <div className="mt-6 flex justify-center">
                    <Pagination links={registrations.links} />
                </div>
            )}

            {/* E-Ticket QR Modal */}
            <AnimatePresence>
                {qrModalReg && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setQrModalReg(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 text-center border border-slate-100 dark:border-slate-800"
                        >
                            <button
                                onClick={() => setQrModalReg(null)}
                                className="absolute right-4 top-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700"
                            >
                                <X size={18} />
                            </button>
                            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 mb-3">
                                E-TICKET PRESENSI
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{getRegistrantName(qrModalReg)}</h3>
                            <p className="text-xs font-medium text-emerald-600 mb-4">{qrModalReg.agenda?.title}</p>

                            <div className="bg-white p-4 rounded-xl border-2 border-dashed border-emerald-200 inline-block mb-4">
                                <img
                                    src={qrModalReg.qr_url}
                                    alt={`QR ${qrModalReg.ticket_code}`}
                                    className="w-48 h-48 mx-auto"
                                />
                            </div>

                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl mb-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kode Tiket</p>
                                <p className="text-xl font-mono font-black text-slate-900 dark:text-white">{qrModalReg.ticket_code}</p>
                            </div>

                            {qrModalReg.self_check_in_url && (
                                <div className="flex items-center gap-2">
                                    <a
                                        href={qrModalReg.self_check_in_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        <ExternalLink size={14} /> Buka Link Presensi
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleCopySelfCheckIn(qrModalReg.self_check_in_url)}
                                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
                                    >
                                        <Copy size={14} /> {copiedLink ? 'Tersalin!' : 'Salin'}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
