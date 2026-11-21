import React from 'react';
import { Link } from '@inertiajs/react';

const PROFILE_TABS = [
    { key: 'vision-mission', label: 'Visi & Misi', href: '/profil/visi-misi' },
    { key: 'history', label: 'Sejarah', href: '/profil/sejarah' },
    { key: 'structure', label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
];

export default function ProfileTabs({ active }) {
    return (
        <nav aria-label="Navigasi Profil" className="max-w-3xl mx-auto mb-10 md:mb-12 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 bg-slate-100 rounded-xl border border-slate-200/70">
                {PROFILE_TABS.map((tab) => {
                    const isActive = active === tab.key;
                    return (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                isActive
                                    ? 'bg-white text-emerald-700 shadow-sm'
                                    : 'text-slate-600 hover:text-emerald-700 hover:bg-white/60'
                            }`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
