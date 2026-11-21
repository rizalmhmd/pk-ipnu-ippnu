import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import ProfileTabs from '@/Components/ProfileTabs';
import { motion } from 'framer-motion';
import {
    Sprout,
    ScrollText,
    Compass,
    Globe,
    BookOpen,
    Quote,
    ArrowRight,
    Sparkles,
    History as HistoryIcon,
} from 'lucide-react';

const MILESTONES = [
    {
        year: '2015',
        step: '01',
        phase: 'Fase Awal',
        title: 'Inisiasi Pembentukan',
        desc: 'Pertemuan awal para pelajar dan santri mahasiswa UNSIQ untuk merintis wadah kaderisasi IPNU-IPPNU di lingkungan kampus.',
        tags: ['Konsolidasi Awal', 'Santri Mahasiswa UNSIQ'],
        Icon: Sprout,
    },
    {
        year: '2017',
        step: '02',
        phase: 'Legitimasi',
        title: 'Deklarasi & Pelantikan Pertama',
        desc: 'Pengesahan resmi dan pelantikan kepengurusan perdana PKPT IPNU IPPNU UNSIQ oleh Pimpinan Cabang Wonosobo.',
        tags: ['Pengesahan Resmi', 'PC Wonosobo'],
        Icon: ScrollText,
    },
    {
        year: '2020',
        step: '03',
        phase: 'Penguatan Kader',
        title: 'Ekspansi Program & Keilmuan',
        desc: 'Pengembangan program rutin MAKESTA, kajian intelektual Al-Qur’an, literasi jurnalistik, serta pengabdian masyarakat.',
        tags: ['MAKESTA', 'Kajian Al-Qur’an', 'Jurnalistik'],
        Icon: Compass,
    },
    {
        year: '2026',
        step: '04',
        phase: 'Transformasi',
        title: 'Digitalisasi Sistem Informasi',
        desc: 'Peluncuran portal web resmi PKPT IPNU IPPNU UNSIQ untuk manajemen profil, publikasi warta, pendaftaran kegiatan, dan presensi digital.',
        tags: ['Portal Resmi', 'Presensi Digital'],
        Icon: Globe,
    },
];

export default function History({ pageSetting }) {
    const [activeYear, setActiveYear] = useState(MILESTONES[0].year);

    const historyParagraphs = (pageSetting?.content_sejarah || '')
        .split(/\r?\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const scrollToMilestone = (year) => {
        setActiveYear(year);
        const target = document.getElementById(`milestone-${year}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <PublicLayout>
            <Head title="Sejarah - PKPT IPNU IPPNU" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                title={pageSetting?.hero_title || 'Sejarah Organisasi'}
                subtitle={pageSetting?.hero_description || 'Jejak langkah & khidmah PKPT IPNU IPPNU UNSIQ'}
            />

            <div className="container mx-auto px-6 py-12 md:py-20">
                <ProfileTabs active="history" />

                {/* Narasi Sejarah + Ringkasan Linimasa */}
                <section className="max-w-5xl mx-auto mb-16 md:mb-20 pb-14 border-b border-slate-200/80">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Editorial Narrative Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                            className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
                        >
                            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400" />
                            <div className="p-7 md:p-10">
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest border border-emerald-200/70">
                                        <HistoryIcon size={13} />
                                        Narasi Sejarah
                                    </span>
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                        2015 &mdash; Sekarang
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-serif tracking-tight mb-6">
                                    Akar Perjuangan &amp; Khidmah di Lingkungan Kampus
                                </h2>

                                {historyParagraphs.length > 0 ? (
                                    <div className="space-y-4">
                                        {historyParagraphs.map((paragraph, idx) => (
                                            <p
                                                key={idx}
                                                className={`text-base md:text-[17px] text-slate-700 leading-relaxed whitespace-pre-line ${
                                                    idx === 0
                                                        ? 'first-letter:text-4xl md:first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-emerald-700 first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]'
                                                        : ''
                                                }`}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 px-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 text-sm font-medium italic">
                                            Narasi sejarah organisasi belum tersedia saat ini.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Sticky Quick Era Navigator Card */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="lg:col-span-4 bg-emerald-950 text-white rounded-2xl p-6 md:p-7 border border-emerald-900/60 shadow-lg lg:sticky lg:top-24 relative overflow-hidden"
                        >
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_60%)] pointer-events-none"
                            />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.22em] mb-2">
                                    <Sparkles size={13} />
                                    Lintasan Masa
                                </div>
                                <h3 className="text-xl font-bold font-serif text-emerald-50 mb-2">
                                    4 Fase Transformasi
                                </h3>
                                <p className="text-xs text-emerald-100/80 leading-relaxed mb-6">
                                    Pilih tahun di bawah untuk langsung menuju tonggak perjalanan organisasi.
                                </p>

                                <div className="space-y-2.5">
                                    {MILESTONES.map((item) => {
                                        const isSelected = activeYear === item.year;
                                        return (
                                            <button
                                                key={item.year}
                                                type="button"
                                                onClick={() => scrollToMilestone(item.year)}
                                                className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all ${
                                                    isSelected
                                                        ? 'bg-emerald-600/30 border-emerald-400/60 text-white shadow-sm'
                                                        : 'bg-white/5 border-white/10 text-emerald-100/85 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-400/30">
                                                        {item.year}
                                                    </span>
                                                    <div className="truncate">
                                                        <p className="text-xs font-bold truncate">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-[10px] uppercase tracking-wider text-emerald-300/75">
                                                            {item.phase}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowRight size={14} className="shrink-0 text-emerald-300" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </section>

                {/* Alternating Chronicle Timeline */}
                <section className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-2">
                            Rekam Jejak
                        </p>
                        <h3 className="text-2xl md:text-4xl font-black text-slate-900 font-serif tracking-tight">
                            Milestone Perjalanan
                        </h3>
                        <div className="w-12 h-1 bg-emerald-600 rounded-full mx-auto mt-3 mb-4" />
                        <p className="text-sm md:text-base text-slate-600">
                            Setiap periode menghadirkan pijakan baru dalam merawat kaderisasi pelajar Nahdlatul Ulama.
                        </p>
                    </div>

                    <div>
                        {MILESTONES.map((milestone, idx) => {
                            const IconComponent = milestone.Icon;
                            const isLast = idx === MILESTONES.length - 1;
                            const isEven = idx % 2 === 0;
                            const isFocused = activeYear === milestone.year;

                            return (
                                <motion.div
                                    id={`milestone-${milestone.year}`}
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                                    onMouseEnter={() => setActiveYear(milestone.year)}
                                    className={`relative group pl-14 md:pl-0 ${isLast ? '' : 'pb-10 md:pb-12'}`}
                                >
                                    {/* Mobile vertical connector (center-to-center) */}
                                    {!isLast && (
                                        <span
                                            aria-hidden="true"
                                            className="md:hidden absolute left-5 top-11 -bottom-11 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-400 to-slate-200 z-0"
                                        />
                                    )}

                                    {/* Desktop center spine connector (center-to-center) */}
                                    {!isLast && (
                                        <span
                                            aria-hidden="true"
                                            className="hidden md:block absolute left-1/2 top-12 -bottom-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500/80 to-slate-200 z-0"
                                        />
                                    )}

                                    {/* Timeline Node */}
                                    <div
                                        className={`absolute left-0 top-6 md:left-1/2 md:-translate-x-1/2 md:top-7 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                                            isFocused
                                                ? 'bg-emerald-600 border-emerald-600 text-white ring-4 ring-emerald-500/15 scale-105'
                                                : 'bg-white border-emerald-600 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                                        }`}
                                    >
                                        <IconComponent size={17} />
                                    </div>

                                    {/* Two-column alternating layout on desktop */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-14 items-start">
                                        {/* Year / Phase Marker Column */}
                                        <div
                                            className={`hidden md:flex flex-col pt-5 ${
                                                isEven
                                                    ? 'md:order-2 md:items-start md:text-left'
                                                    : 'md:order-1 md:items-end md:text-right'
                                            }`}
                                        >
                                            <span className="font-mono text-5xl font-black tracking-tight text-emerald-900/15 select-none leading-none mb-2">
                                                {milestone.year}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                                                <span>{milestone.step}</span>
                                                <span>&bull;</span>
                                                <span>{milestone.phase}</span>
                                            </span>
                                        </div>

                                        {/* Milestone Card Column */}
                                        <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                                            <div
                                                className={`bg-white rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
                                                    isFocused
                                                        ? 'border-emerald-300 shadow-lg shadow-emerald-900/5'
                                                        : 'border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300'
                                                }`}
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-xs font-bold tracking-wide">
                                                            {milestone.year}
                                                        </span>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                            {milestone.phase}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-xs font-bold text-slate-400">
                                                        #{milestone.step}
                                                    </span>
                                                </div>

                                                <h4 className="text-lg md:text-xl font-bold text-slate-900 font-serif mb-2.5">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed mb-4">
                                                    {milestone.desc}
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                                                    {milestone.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] font-semibold text-slate-600"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Refined Editorial Closing Quote + Next Profile Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto mt-16 md:mt-20 px-7 py-10 md:px-12 md:py-12 bg-emerald-950 rounded-2xl text-center text-white border border-emerald-900/60 shadow-lg relative overflow-hidden"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_55%)] pointer-events-none"
                    />
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mx-auto mb-5">
                            <Quote size={18} />
                        </div>
                        <blockquote className="text-xl md:text-2xl font-serif italic text-emerald-50 leading-snug mb-4 max-w-2xl mx-auto">
                            &ldquo;Menolak Lupa, Merawat Tradisi, Menatap Masa Depan&rdquo;
                        </blockquote>
                        <p className="text-emerald-400 uppercase tracking-[0.3em] text-[11px] font-bold mb-8">
                            Belajar &bull; Berjuang &bull; Bertaqwa
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/profil/visi-misi"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                            >
                                Lihat Visi &amp; Misi
                                <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="/profil/struktur-organisasi"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm"
                            >
                                Lihat Struktur Pengurus
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
