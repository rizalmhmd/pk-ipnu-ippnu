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
    const [selectedMember, setSelectedMember] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

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

            <div className="container mx-auto px-6 sm:px-12 py-10 sm:py-20">
                {/* Sections and Content */}
                <div className="space-y-24 sm:space-y-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2ea55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                className="relative z-10 rounded-lg shadow-2xl border-4 sm:border-8 border-white"
                                alt="Organization"
                            />
                        </motion.div>

                        <div className="space-y-8 sm:space-y-10">
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {['visi-misi', 'sejarah'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedTab(tab)}
                                        className={`px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedTab === tab
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
                                className="bg-white rounded-lg sm:rounded-lg p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-50"
                            >
                                {selectedTab === 'visi-misi' ? (
                                    <div className="space-y-8 sm:space-y-10">
                                        <div className="group">
                                            <h4 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-4 group-hover:text-emerald-700 transition-colors">
                                                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold">01</span>
                                                Visi Kami
                                            </h4>
                                            <p className="text-sm sm:text-lg text-slate-500 leading-relaxed italic border-l-4 border-emerald-100 pl-6">
                                                "Mewujudkan organisasi pelajar yang kompeten, progresif, dan berlandaskan nilai-nilai Ahlussunnah wal Jama'ah di lingkungan perguruan tinggi."
                                            </p>
                                        </div>
                                        <div className="h-px bg-slate-100"></div>
                                        <div>
                                            <h4 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-6 flex items-center gap-4">
                                                <span className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold">02</span>
                                                Misi Kami
                                            </h4>
                                            <ul className="space-y-4 sm:space-y-5 text-slate-500">
                                                {['Membangun kemandirian organisasi melalui pemberdayaan kader.', 'Memperkuat jaringan internal dan eksternal lintas organisasi.', 'Aktif dalam kegiatan sosial keagamaan dan kemanusiaan.'].map((misi, i) => (
                                                    <li key={i} className="flex gap-4 items-start group">
                                                        <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                            <i className="fas fa-check text-[10px]"></i>
                                                        </div>
                                                        <span className="text-sm sm:text-base leading-relaxed group-hover:text-slate-800 transition-colors">{misi}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 sm:space-y-8">
                                        <h4 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif flex items-center gap-4">
                                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                                                <i className="fas fa-history text-sm sm:text-base"></i>
                                            </div>
                                            Sejarah Singkat
                                        </h4>
                                        <p className="text-sm sm:text-lg text-slate-500 leading-relaxed text-justify sm:text-left">
                                            PKPT IPNU IPPNU didirikan sebagai wadah bagi Pelajar Nahdlatul Ulama yang menempuh pendidikan di perguruan tinggi. Berawal dari diskusi-diskusi kecil lintas fakultas, organisasi ini tumbuh menjadi pilar penting dakwah dan pengembangan diri mahasiswa.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Structure Section */}
                    <div>
                        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">Struktur Organisasi</h3>
                            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full mb-8"></div>
                            <p className="text-base sm:text-xl text-slate-500 font-medium">Sinergi kepemimpinan untuk mewujudkan program kerja yang berdampak dan berkelanjutan.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                            {organizations?.length > 0 ? (
                                organizations.map((member, i) => (
                                    <MemberCard key={i} member={member} idx={i} onClick={handleMemberClick} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Data pengurus belum tersedia.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={closeLightbox}
                member={selectedMember}
            />
        </PublicLayout>
    );
}
