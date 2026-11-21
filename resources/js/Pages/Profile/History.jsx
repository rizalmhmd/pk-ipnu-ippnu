import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import { motion } from 'framer-motion';
import { Sprout, ScrollText, Compass, Globe } from 'lucide-react';

export default function History({ pageSetting }) {
    const milestones = [
        {
            year: '2015',
            phase: 'Fase Awal',
            title: 'Inisiasi Pembentukan',
            desc: 'Pertemuan awal para pelajar dan santri mahasiswa UNSIQ untuk merintis wadah kaderisasi IPNU-IPPNU di lingkungan kampus.',
            Icon: Sprout,
        },
        {
            year: '2017',
            phase: 'Legitimasi',
            title: 'Deklarasi & Pelantikan Pertama',
            desc: 'Pengesahan resmi dan pelantikan kepengurusan perdana PKPT IPNU IPPNU UNSIQ oleh Pimpinan Cabang Wonosobo.',
            Icon: ScrollText,
        },
        {
            year: '2020',
            phase: 'Penguatan Kader',
            title: 'Ekspansi Program & Keilmuan',
            desc: 'Pengembangan program rutin MAKESTA, kajian intelektual Al-Qur’an, literasi jurnalistik, serta pengabdian masyarakat.',
            Icon: Compass,
        },
        {
            year: '2026',
            phase: 'Transformasi',
            title: 'Digitalisasi Sistem Informasi',
            desc: 'Peluncuran portal web resmi PKPT IPNU IPPNU UNSIQ untuk manajemen profil, publikasi warta, pendaftaran kegiatan, dan presensi digital.',
            Icon: Globe,
        },
    ];

    return (
        <PublicLayout>
            <Head title="Sejarah - PKPT IPNU IPPNU" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                title={pageSetting?.hero_title || 'Sejarah Organisasi'}
                subtitle={pageSetting?.hero_description || 'Jejak langkah & khidmah PKPT IPNU IPPNU UNSIQ'}
            />

            <div className="container mx-auto px-6 py-16 md:py-24">
                {/* Narasi Sejarah */}
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest border border-emerald-100">
                            Narasi Sejarah
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="border-l-2 border-emerald-600 pl-6 md:pl-8 space-y-4">
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                            {pageSetting?.content_sejarah || 'Sejarah belum dikonfigurasi di panel admin. Narasi perjalanan organisasi akan ditampilkan di sini setelah diinputkan.'}
                        </p>
                    </div>
                </div>

                {/* Editorial Vertical Timeline */}
                <div className="max-w-3xl mx-auto">
                    <div className="mb-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-2">
                            Rekam Jejak
                        </p>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-serif tracking-tight">
                            Milestone Perjalanan
                        </h3>
                    </div>

                    <div className="relative pl-8 md:pl-10 space-y-6 before:content-[''] before:absolute before:left-3.5 md:before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                        {milestones.map((milestone, idx) => {
                            const IconComponent = milestone.Icon;
                            return (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                                    className="relative group"
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute -left-8 md:-left-10 top-6 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <IconComponent size={14} />
                                    </div>

                                    {/* Card */}
                                    <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-7 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
                                        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-xs font-bold tracking-wide">
                                                {milestone.year}
                                            </span>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                {milestone.phase}
                                            </span>
                                        </div>

                                        <h4 className="text-lg md:text-xl font-bold text-slate-900 font-serif mb-2">
                                            {milestone.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                                            {milestone.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Refined Editorial Closing Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mt-20 px-8 py-10 md:px-12 md:py-12 bg-emerald-950 rounded-2xl text-center text-white border border-emerald-900/60 shadow-lg"
                >
                    <div className="w-10 h-1 bg-emerald-400 mx-auto rounded-full mb-6" />
                    <blockquote className="text-xl md:text-2xl font-serif italic text-emerald-50 leading-snug mb-4">
                        &ldquo;Menolak Lupa, Merawat Tradisi, Menatap Masa Depan&rdquo;
                    </blockquote>
                    <p className="text-emerald-400 uppercase tracking-[0.3em] text-[11px] font-bold">
                        Belajar &bull; Berjuang &bull; Bertaqwa
                    </p>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
