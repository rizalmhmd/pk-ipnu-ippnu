import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import ProfileTabs from '@/Components/ProfileTabs';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Sparkles, Target } from 'lucide-react';

function cleanMissionLine(line) {
    return line.replace(/^[0-9]+[.)]?\s*/, '').replace(/^[-*•]\s*/, '').trim();
}

function parseVisionMission(rawContent) {
    const normalized = (rawContent || '').replace(/\r\n/g, '\n').trim();
    if (!normalized) {
        return { visionParagraphs: [], missions: [] };
    }

    const lines = normalized.split('\n');
    const hasMissionHeading = lines.some((line) => /^\s*misi\s*:?\s*/i.test(line));

    if (hasMissionHeading) {
        const visionLines = [];
        const missionLines = [];
        let mode = 'vision';

        for (const rawLine of lines) {
            const line = rawLine.trim();
            const visiMatch = line.match(/^visi\s*:?\s*(.*)$/i);
            const misiMatch = line.match(/^misi\s*:?\s*(.*)$/i);

            if (misiMatch) {
                mode = 'mission';
                if (misiMatch[1]?.trim()) {
                    missionLines.push(misiMatch[1].trim());
                }
                continue;
            }

            if (visiMatch && mode === 'vision' && visionLines.length === 0) {
                if (visiMatch[1]?.trim()) {
                    visionLines.push(visiMatch[1].trim());
                }
                continue;
            }

            if (mode === 'vision') {
                visionLines.push(rawLine);
            } else if (line) {
                missionLines.push(line);
            }
        }

        const visionParagraphs = visionLines
            .join('\n')
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean);

        const missions = missionLines.map(cleanMissionLine).filter(Boolean);
        return { visionParagraphs, missions };
    }

    const blocks = normalized
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean);

    const firstBlock = (blocks[0] || '').replace(/^visi\s*:\s*/i, '').trim();
    const visionParagraphs = firstBlock ? [firstBlock] : [];

    const missions = blocks
        .slice(1)
        .join('\n')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !/^misi\s*:?\s*$/i.test(line))
        .map(cleanMissionLine)
        .filter(Boolean);

    return { visionParagraphs, missions };
}

const CORE_PILLARS = [
    {
        code: '01',
        title: 'Belajar',
        desc: 'Menumbuhkan tradisi keilmuan, literasi, dan nalar kritis pelajar Nahdlatul Ulama.',
        Icon: BookOpen,
    },
    {
        code: '02',
        title: 'Berjuang',
        desc: 'Menggerakkan pengabdian sosial, kepemimpinan mahasiswa, dan dakwah kampus.',
        Icon: Compass,
    },
    {
        code: '03',
        title: 'Bertaqwa',
        desc: 'Menjaga akhlakul karimah serta nilai Ahlussunnah wal Jamaah an-Nahdliyah.',
        Icon: Sparkles,
    },
];

export default function VisionMission({ pageSetting }) {
    const { visionParagraphs, missions } = parseVisionMission(pageSetting?.content_visi_misi);

    return (
        <PublicLayout>
            <Head title="Visi & Misi - PKPT IPNU IPPNU" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
                title={pageSetting?.hero_title || 'Visi & Misi'}
                subtitle={pageSetting?.hero_description || 'Arah gerak & cita-cita kader pelajar NU'}
            />

            <div className="container mx-auto px-6 py-12 md:py-20">
                <ProfileTabs active="vision-mission" />

                {/* Vision Section */}
                <div className="max-w-5xl mx-auto mb-14 md:mb-16 pb-14 border-b border-slate-200/80">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                            className="lg:col-span-7 space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-widest border border-emerald-200/70">
                                    <Target size={13} />
                                    Visi Kami
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <div>
                                <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-serif leading-tight tracking-tight">
                                    Mewujudkan Generasi Pelajar yang{' '}
                                    <span className="text-emerald-700 italic">Berkarakter</span>
                                </h2>
                                <div className="w-12 h-1 bg-emerald-600 rounded-full mt-4" />
                            </div>

                            {visionParagraphs.length > 0 ? (
                                <div className="border-l-2 border-emerald-600 pl-6 md:pl-8 space-y-4">
                                    {visionParagraphs.map((paragraph, idx) => (
                                        <p
                                            key={idx}
                                            className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 px-6 text-center bg-white rounded-xl border border-dashed border-slate-200">
                                    <Target className="w-9 h-9 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm font-medium italic">
                                        Visi organisasi belum tersedia saat ini.
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Core Trilogy Card (avoids duplicating hero banner image) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-7 md:p-8 border border-emerald-900/60 shadow-lg"
                        >
                            <p className="text-emerald-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-2">
                                Trilogi Kader
                            </p>
                            <h3 className="text-xl font-bold font-serif text-emerald-50 mb-6">
                                Nilai Dasar Pengabdian
                            </h3>

                            <div className="space-y-4">
                                {CORE_PILLARS.map(({ code, title, desc, Icon }) => (
                                    <div
                                        key={code}
                                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10"
                                    >
                                        <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                                            <Icon size={16} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-mono text-[11px] font-bold text-emerald-400">
                                                    {code}
                                                </span>
                                                <h4 className="font-bold text-sm text-white">
                                                    {title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-emerald-100/80 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 md:mb-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-2">
                            Langkah Nyata
                        </p>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-serif tracking-tight">
                            Misi Strategis
                        </h3>
                        <div className="w-12 h-1 bg-emerald-600 rounded-full mt-3" />
                    </div>

                    {missions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            {missions.map((mission, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                                    className="p-6 md:p-7 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 flex items-start gap-4 transition-all group"
                                >
                                    <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-mono text-xs font-bold flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <p className="text-slate-700 text-sm md:text-[15px] font-medium leading-relaxed pt-0.5">
                                        {mission}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 px-6 text-center bg-white rounded-xl border border-dashed border-slate-200">
                            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm font-medium italic">
                                Daftar misi organisasi belum tersedia saat ini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
