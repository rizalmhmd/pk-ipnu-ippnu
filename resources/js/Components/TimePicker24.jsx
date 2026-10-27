import React, { useState, useRef, useEffect } from 'react';
import { Clock, X, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TimePicker24
 * Komponen input waktu khusus format 24 jam (00:00 - 23:59).
 * Menghilangkan dependensi terhadap locale AM/PM browser OS.
 */
export default function TimePicker24({
    value = '',
    onChange,
    placeholder = '00:00',
    disabled = false,
    className = '',
    id = 'event_time',
    error = null,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Normalisasi nilai agar selalu 'HH:mm'
    const normalizedValue = value ? String(value).substring(0, 5) : '';

    // Ambil jam dan menit dari nilai saat ini
    let currentHour = '';
    let currentMinute = '';
    if (normalizedValue.includes(':')) {
        const parts = normalizedValue.split(':');
        currentHour = parts[0] || '';
        currentMinute = parts[1] || '';
    }

    // Tutup popover jika klik di luar komponen
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Format input ketik langsung
    const handleInputChange = (e) => {
        let raw = e.target.value.replace(/[^0-9]/g, '');

        if (!raw) {
            onChange('');
            return;
        }

        if (raw.length > 4) raw = raw.slice(0, 4);

        let h = raw.slice(0, 2);
        let m = raw.slice(2, 4);

        if (h.length === 2) {
            const numH = parseInt(h, 10);
            if (numH > 23) h = '23';
        }

        if (m.length === 2) {
            const numM = parseInt(m, 10);
            if (numM > 59) m = '59';
        }

        if (raw.length > 2) {
            onChange(`${h}:${m}`);
        } else {
            onChange(h);
        }
    };

    const handleBlur = () => {
        if (!normalizedValue) return;
        const parts = normalizedValue.split(':');
        let h = parts[0] || '00';
        let m = parts[1] || '00';

        const numH = Math.min(23, Math.max(0, parseInt(h, 10) || 0));
        const numM = Math.min(59, Math.max(0, parseInt(m, 10) || 0));

        onChange(`${String(numH).padStart(2, '0')}:${String(numM).padStart(2, '0')}`);
    };

    // Pilih jam
    const handleSelectHour = (hour) => {
        const minute = currentMinute ? String(currentMinute).padStart(2, '0') : '00';
        onChange(`${hour}:${minute}`);
    };

    // Pilih menit
    const handleSelectMinute = (minute) => {
        const hour = currentHour ? String(currentHour).padStart(2, '0') : '08';
        onChange(`${hour}:${minute}`);
    };

    // Waktu sekarang
    const handleSetCurrentTime = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        onChange(`${h}:${m}`);
    };

    // Preset cepat agenda
    const presets = [
        { label: '08:00', desc: 'Pagi', time: '08:00' },
        { label: '09:00', desc: 'Pagi', time: '09:00' },
        { label: '13:00', desc: 'Siang', time: '13:00' },
        { label: '14:00', desc: 'Siang', time: '14:00' },
        { label: '16:00', desc: 'Sore', time: '16:00' },
        { label: '19:30', desc: 'Malam', time: '19:30' },
        { label: '20:00', desc: 'Malam', time: '20:00' },
    ];

    // Opsi jam 00-23
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

    // Opsi menit (kelipatan 5)
    const minutes = [
        '00', '05', '10', '15', '20', '25',
        '30', '35', '40', '45', '50', '55'
    ];

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    inputMode="numeric"
                    value={normalizedValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onClick={() => setIsOpen(true)}
                    placeholder={placeholder}
                    maxLength={5}
                    disabled={disabled}
                    className={`w-full pl-5 pr-28 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg font-bold text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-normal focus:outline-none transition-all ${
                        isOpen
                            ? 'border-emerald-500 bg-white dark:bg-slate-900 shadow-md shadow-emerald-500/10'
                            : 'border-transparent focus:border-emerald-500'
                    } ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''} ${className}`}
                />

                {/* Tombol Aksi di Kanan Input */}
                <div className="absolute right-3 flex items-center gap-1.5">
                    {normalizedValue && !disabled && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange('');
                            }}
                            title="Kosongkan waktu"
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                        >
                            <X size={15} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        title="Buka pemilih waktu format 24 jam"
                        disabled={disabled}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-black tracking-wide transition-all cursor-pointer ${
                            isOpen
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700'
                        }`}
                    >
                        <Clock size={14} className={isOpen ? 'text-white' : 'text-slate-500 dark:text-slate-400'} />
                        <span>24 Jam</span>
                    </button>
                </div>
            </div>

            {/* Helper Text */}
            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Format 24 jam (00:00 - 23:59 WIB). Ketik langsung atau pilih jam dari popup.
            </p>

            {/* Popover 24-Hour Time Picker */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 sm:right-auto sm:w-[380px] top-full mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-5"
                    >
                        {/* Header Popover */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                    Waktu Terpilih (24 Jam)
                                </span>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                                        {currentHour || '--'}:{currentMinute || '--'}
                                    </span>
                                    <span className="text-xs font-bold text-slate-400">WIB</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Preset Cepat */}
                        <div className="mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                                Pilihan Cepat
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {presets.map((preset) => {
                                    const isSelected = normalizedValue === preset.time;
                                    return (
                                        <button
                                            key={preset.time}
                                            type="button"
                                            onClick={() => onChange(preset.time)}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                                isSelected
                                                    ? 'bg-emerald-600 text-white shadow-sm'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {preset.label} <span className="text-[10px] opacity-70">({preset.desc})</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Grid Pemilih Jam & Menit */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {/* Kolom Jam (00 - 23) */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                        Jam (00 - 23)
                                    </span>
                                    {currentHour && (
                                        <span className="text-[11px] font-mono font-bold text-emerald-600">
                                            {currentHour}
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                                    {hours.map((h) => {
                                        const isSelected = currentHour === h;
                                        return (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => handleSelectHour(h)}
                                                className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                                                    isSelected
                                                        ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                                                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                {h}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Kolom Menit (00 - 55) */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                        Menit (00 - 55)
                                    </span>
                                    {currentMinute && (
                                        <span className="text-[11px] font-mono font-bold text-emerald-600">
                                            {currentMinute}
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                                    {minutes.map((m) => {
                                        const isSelected = currentMinute === m;
                                        return (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => handleSelectMinute(m)}
                                                className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                                                    isSelected
                                                        ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                                                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                {m}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Footer Popover */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                            <button
                                type="button"
                                onClick={handleSetCurrentTime}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                <Sparkles size={13} className="text-amber-500" />
                                Sekarang
                            </button>

                            <div className="flex items-center gap-2">
                                {normalizedValue && (
                                    <button
                                        type="button"
                                        onClick={() => onChange('')}
                                        className="px-2.5 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                                    >
                                        Kosongkan
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                                >
                                    <Check size={13} />
                                    Selesai
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
