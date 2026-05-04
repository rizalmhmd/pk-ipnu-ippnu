import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function VisionMission({ pageSetting }) {
    // Logic to separate Visi and Misi from a single text field
    const content = pageSetting?.content_visi_misi || "";
    
    // Simple parsing: Split by double newline or specific marker
    const sections = content.split(/\n\s*\n/);
    const visi = sections[0] || "Visi belum dikonfigurasi.";
    const missionsRaw = sections.slice(1).join("\n").split("\n").filter(line => line.trim().length > 0);
    
    // Default missions if empty
    const defaultMissions = [
        "Membentuk kader yang berilmu, beramal, dan bertaqwa.",
        "Mengembangkan potensi minat dan bakat anggota.",
        "Memperkuat ukhuwah Islamiyah di kalangan pelajar."
    ];
    
    const missions = missionsRaw.length > 0 ? missionsRaw : defaultMissions;

    return (
        <PublicLayout>
            <Head title="Visi & Misi - PKPT IPNU IPPNU" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3"}
            />

            <div className="container mx-auto px-6 py-20">
                <div className="space-y-32">
                    {/* Vision Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl opacity-50"></div>
                            <img
                                src={pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1522202176988-66273c2ea55f?ixlib=rb-4.0.3"}
                                className="relative z-10 rounded-lg shadow-2xl border-4 sm:border-8 border-white dark:border-slate-900 w-full object-cover aspect-[4/3]"
                                alt="Organization"
                            />
                        </motion.div>

                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest">
                                Visi Kami
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white font-serif leading-tight">
                                Mewujudkan Generasi Pelajar yang <span className="text-emerald-600 italic">Berkarakter</span>
                            </h2>
                            <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-emerald-500 pl-6 whitespace-pre-line">
                                {visi}
                            </div>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="space-y-12">
                        <div className="text-center max-w-2xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-serif mb-4 uppercase tracking-tight">Misi Strategis</h3>
                            <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-6"></div>
                            <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-bold">Langkah Nyata Mencapai Tujuan</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {missions.map((mission, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-white dark:bg-slate-900 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-start gap-6 hover:border-emerald-500 transition-all group"
                                >
                                    <div className="mt-1 p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                        {mission.replace(/^[0-9.-]+\s*/, '')}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
