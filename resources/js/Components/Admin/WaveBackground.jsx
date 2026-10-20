import React from 'react';

/**
 * Minimalist Solid Single Wave Background
 * Features:
 * - 1 Gelombang tunggal dengan ketinggian yang proporsional dan santun (tidak terlalu tinggi / curam)
 * - Amplitudo terukur (~80px) sehingga tetap tampak jelas sebagai gelombang yang luwes, tanpa menjulang tinggi
 * - Warna solid monokromatik Emerald Green (#059669 / #10b981) khas IPNU IPPNU
 */
export default function WaveBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-gradient-to-br from-slate-50 via-[#f4f9f6] to-[#ebf6f0] dark:bg-gradient-to-br dark:from-[#060b13] dark:via-[#07131b] dark:to-[#031812] transition-colors duration-500">
            {/* ─── Pendaran Cahaya Ambient (Menghidupkan Nuansa Gelombang) ─── */}
            <div className="absolute top-10 right-1/4 w-[600px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px]" />
            <div className="absolute bottom-10 left-1/3 w-[500px] h-[350px] bg-teal-500/5 dark:bg-emerald-600/10 rounded-full blur-[160px]" />

            {/* ─── Single Wave Canvas ─── */}
            <div className="absolute inset-0 w-full h-full">
                <svg
                    className="w-full h-full object-cover"
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        {/* Solid & Clean Emerald Fill */}
                        <linearGradient id="solid-emerald-wave" x1="0%" y1="0%" x2="100%" y2="80%">
                            <stop offset="0%" stopColor="#047857" stopOpacity="0.20" />
                            <stop offset="60%" stopColor="#059669" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
                        </linearGradient>

                        {/* Clean Solid Crest Stroke */}
                        <linearGradient id="solid-crest-line" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#047857" />
                            <stop offset="40%" stopColor="#10b981" />
                            <stop offset="80%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                    </defs>

                    {/* ── Gelombang Tunggal Proporsional (Tinggi Sedang & Anggun) ── */}
                    {/* Mengalun dari Y:365, turun lembut ke lembah Y:415, naik santun ke bukit Y:335, dan melandai ke Y:370 */}
                    <path
                        d="M -60,-20 L 1500,-20 L 1500,370 C 1380,365 1260,335 1100,335 C 880,335 750,415 540,415 C 330,415 180,365 -60,365 Z"
                        fill="url(#solid-emerald-wave)"
                    />

                    {/* ── Garis Puncak Gelombang Utama (Rapi, Tegas & Rendah) ── */}
                    <path
                        d="M -60,365 C 180,365 330,415 540,415 C 750,415 880,335 1100,335 C 1260,335 1380,365 1500,370"
                        stroke="url(#solid-crest-line)"
                        strokeWidth="2"
                        className="opacity-65 dark:opacity-80"
                    />
                </svg>
            </div>
        </div>
    );
}
