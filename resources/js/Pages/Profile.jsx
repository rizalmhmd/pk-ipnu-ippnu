import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import PageHeaderCard from '@/Components/PageHeaderCard';
import MemberCard from '@/Components/MemberCard';
import Lightbox from '@/Components/Lightbox';
import { motion } from 'framer-motion';

export default function Profile({ siteSetting, sections, organizations, pageSetting }) {
    const [selectedTab, setSelectedTab] = useState('visi-misi');

    return (
        <PublicLayout>
            <Head title="Profil Organisasi" />

            <HeroSection
                bgImage="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3"
            />

            <PageHeaderCard
                title="Profil Organisasi"
                subtitle="Sejarah, Visi, Misi, dan Struktur Organisasi PKPT IPNU IPPNU"
                bgColor={pageSetting?.header_bg_color}
                textColor={pageSetting?.header_text_color}
                bgImage={pageSetting?.header_bg_image_url}
            />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-20">
                {/* Sections and Content */}
                <div className="space-y-16 sm:space-y-32">
                    {/* Vision Mission etc... (keeping the rest) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2ea55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                className="relative z-10 rounded-[3rem] shadow-2xl border-8 border-white"
                                alt="Organization"
                            />
                        </motion.div>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                {['visi-misi', 'sejarah'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedTab(tab)}
                                        className={`px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${selectedTab === tab
                                            ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                            }`}
                                    >
                                        {tab.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
                            >
                                {selectedTab === 'visi-misi' ? (
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-3">
                                                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs">01</span>
                                                Visi Kami
                                            </h4>
                                            <p className="text-slate-500 leading-relaxed italic">
                                                "Mewujudkan organisasi pelajar yang kompeten, progresif, dan berlandaskan nilai-nilai Ahlussunnah wal Jama'ah di lingkungan perguruan tinggi."
                                            </p>
                                        </div>
                                        <div className="h-px bg-slate-100"></div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-3">
                                                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs">02</span>
                                                Misi Kami
                                            </h4>
                                            <ul className="space-y-3 text-slate-500">
                                                {['Membangun kemandirian organisasi melalui pemberdayaan kader.', 'Memperkuat jaringan internal dan eksternal lintas organisasi.', 'Aktif dalam kegiatan sosial keagamaan dan kemanusiaan.'].map((misi, i) => (
                                                    <li key={i} className="flex gap-3">
                                                        <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                                                        <span>{misi}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <h4 className="text-2xl font-bold text-slate-800 font-serif flex items-center gap-3">
                                            <i className="fas fa-history text-emerald-500"></i>
                                            Sejarah Singkat
                                        </h4>
                                        <p className="text-slate-500 leading-relaxed">
                                            PKPT IPNU IPPNU didirikan sebagai wadah bagi Pelajar Nahdlatul Ulama yang menempuh pendidikan di perguruan tinggi. Berawal dari diskusi-diskusi kecil lintas fakultas, organisasi ini tumbuh menjadi pilar penting dakwah dan pengembangan diri mahasiswa.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Structure Section */}
                    <div>
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h3 className="text-4xl font-bold text-slate-800 font-serif mb-6">Struktur Organisasi</h3>
                            <p className="text-slate-500">Sinergi kepemimpinan untuk mewujudkan program kerja yang berdampak dan berkelanjutan.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                            {organizations?.length > 0 ? (
                                organizations.map((member, i) => (
                                    <MemberCard key={i} member={member} idx={i} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-slate-400 italic">Data pengurus belum tersedia.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
