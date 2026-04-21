import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import MemberCard from '@/Components/MemberCard';
import Lightbox from '@/Components/Lightbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Users } from 'lucide-react';

export default function Profile({ siteSetting, sections, organizations, pageSetting }) {
    const [selectedTab, setSelectedTab] = useState('visi-misi');
    const [selectedOrg, setSelectedOrg] = useState('ipnu');
    const [selectedMember, setSelectedMember] = useState(null);

    // Filter and Level Logic
    const filteredMembers = (organizations || []).filter(m => m.type === selectedOrg);
    const level1 = filteredMembers.filter(m => parseInt(m.level) === 1);
    const level2Raw = filteredMembers.filter(m => parseInt(m.level) === 2);
    const level3Raw = filteredMembers.filter(m => parseInt(m.level) === 3);

    // Grouping by department
    const departments = Array.from(new Set(filteredMembers.map(m => m.department))).filter(Boolean);

    const groupedStructure = departments.map(dept => {
        const deptMembers = filteredMembers.filter(m => m.department === dept);
        
        // Leaders (Level 2) sorted: Ketua always first, then Waka, then others
        const leaders = deptMembers
            .filter(m => parseInt(m.level) === 2)
            .sort((a, b) => {
                const posA = a.position?.toLowerCase() || '';
                const posB = b.position?.toLowerCase() || '';
                if (posA.includes('ketua') && !posB.includes('ketua')) return -1;
                if (!posA.includes('ketua') && posB.includes('ketua')) return 1;
                return 0;
            });

        const staff = deptMembers.filter(m => parseInt(m.level) === 3);

        return {
            name: dept,
            leaders,
            staff
        };
    });

    // Handle "Ungrouped" Level 2/3 (where department is empty)
    const ungroupedLevel2 = level2Raw.filter(m => !m.department);
    const ungroupedLevel3 = level3Raw.filter(m => !m.department);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const closeLightbox = () => {
        setSelectedMember(null);
    };

    return (
        <PublicLayout>
            <Head title="Profil Organisasi" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3"}
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
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50"></div>
                            <img
                                src={pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1522202176988-66273c2ea55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                className="relative z-10 rounded-2xl shadow-2xl border-4 sm:border-8 border-white dark:border-slate-900 w-full object-cover aspect-[4/3]"
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
                                    <div className="space-y-8 sm:space-y-10 whitespace-pre-line">
                                        {pageSetting?.content_visi_misi ? (
                                            <div className="text-sm sm:text-lg text-slate-500 leading-relaxed italic border-l-4 border-emerald-100 pl-6">
                                                {pageSetting.content_visi_misi}
                                            </div>
                                        ) : (
                                            <p className="text-slate-300 italic">Visi & Misi belum dikonfigurasi.</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6 sm:space-y-8">
                                        <h4 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white font-serif flex items-center gap-4">
                                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                                                <i className="fas fa-history text-sm sm:text-base"></i>
                                            </div>
                                            Sejarah Singkat
                                        </h4>
                                        <div className="text-sm sm:text-lg text-slate-500 leading-relaxed text-justify sm:text-left whitespace-pre-line">
                                            {pageSetting?.content_sejarah || "Sejarah belum dikonfigurasi."}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Structure Section */}
                    <div className="py-12 md:py-16">
                        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                            <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white font-serif mb-6 leading-tight uppercase tracking-tight">Struktur Pengurus</h3>
                            <div className="w-16 md:w-20 h-1.5 bg-emerald-600 mx-auto rounded-full mb-10"></div>

                            {/* Org Toggle */}
                            <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl mb-12 shadow-inner">
                                <button
                                    onClick={() => setSelectedOrg('ipnu')}
                                    className={`px-8 py-3 rounded-lg text-sm font-black transition-all duration-500 uppercase tracking-widest ${selectedOrg === 'ipnu'
                                        ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-md scale-105 outline-none'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    IPNU
                                </button>
                                <button
                                    onClick={() => setSelectedOrg('ippnu')}
                                    className={`px-8 py-3 rounded-lg text-sm font-black transition-all duration-500 uppercase tracking-widest ${selectedOrg === 'ippnu'
                                        ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md scale-105 outline-none'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    IPPNU
                                </button>
                            </div>
                        </div>

                        {/* Organizational Tree Container */}
                        <div className="relative overflow-x-auto pb-20 no-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedOrg}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="min-w-[1000px] lg:min-w-0 py-10"
                                >
                                    {/* LEVEL 1: TOP LEADERSHIP */}
                                    <div className="flex justify-center relative mb-24">
                                        {level1.map(m => (
                                            <div key={m.id} className="relative z-10 w-56 md:w-64">
                                                <StructureCard member={m} isTop themeColor={selectedOrg === 'ipnu' ? 'emerald' : 'blue'} onClick={setSelectedMember} />
                                                {/* Vertical line down from Ketua to Branch */}
                                                <div className="absolute top-[102%] left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2">
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* HORIZONTAL BUS LINE (The Branch Connector) */}
                                    {groupedStructure.length > 1 && (
                                        <div className="relative h-px mb-20">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                                        </div>
                                    )}

                                    {/* DEPARTMENTS CONTAINER */}
                                    <div className={`flex flex-wrap justify-center gap-y-24 ${groupedStructure.length > 4 ? 'gap-x-12' : 'gap-x-20'}`}>
                                        {groupedStructure.map((group, idx) => (
                                            <div key={idx} className="flex flex-col items-center relative group/dept">
                                                {/* Vertical line from Bus to Dept Header */}
                                                <div className="absolute -top-20 left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2"></div>
                                                
                                                {/* Dept Title Badge */}
                                                <div className="mb-8 px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border-2 border-slate-200 dark:border-slate-700 z-10">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{group.name}</span>
                                                </div>

                                                {/* LEADERS BOX (KETUA & WAKA) */}
                                                <div className="flex justify-center gap-6 mb-12 relative z-10 w-full">
                                                    {group.leaders.map(leader => (
                                                        <div key={leader.id} className="w-48 md:w-56">
                                                            <StructureCard member={leader} isDept themeColor={selectedOrg === 'ipnu' ? 'emerald' : 'blue'} onClick={setSelectedMember} />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Connector from Leaders to Staff */}
                                                {group.staff.length > 0 && (
                                                    <div className="mb-10 w-[3px] h-12 bg-slate-200 dark:bg-slate-800 relative">
                                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                                    </div>
                                                )}

                                                {/* STAFF GRID (Wrapping 4 columns) */}
                                                <div className={`grid gap-4 px-4 ${
                                                    group.staff.length <= 2 ? 'grid-cols-2' : 
                                                    group.staff.length === 3 ? 'grid-cols-3' : 
                                                    'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                                }`}>
                                                    {group.staff.map(s => (
                                                        <div key={s.id} className="w-40 md:w-44 lg:w-48">
                                                            <StructureCard member={s} isStaff themeColor={selectedOrg === 'ipnu' ? 'emerald' : 'blue'} onClick={setSelectedMember} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* UNGROUPED LEVEL 2 (Standalone branches) */}
                                        {ungroupedLevel2.map(m => (
                                            <div key={m.id} className="flex flex-col items-center relative">
                                                <div className="absolute -top-20 left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2"></div>
                                                <div className="w-56">
                                                    <StructureCard member={m} isDept themeColor={selectedOrg === 'ipnu' ? 'emerald' : 'blue'} onClick={setSelectedMember} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* BOTTOM MARGINAL STAFF (Ungrouped) */}
                                    {ungroupedLevel3.length > 0 && (
                                        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800">
                                            <div className="text-center mb-12">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Staff & Anggota Lainnya</span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
                                                {ungroupedLevel3.map(m => (
                                                    <StructureCard key={m.id} member={m} isStaff themeColor={selectedOrg === 'ipnu' ? 'emerald' : 'blue'} onClick={setSelectedMember} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {filteredMembers.length === 0 && (
                            <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-medium tracking-wide italic">Data pengurus belum tersedia dalam sistem.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox for Profile Summary */}
            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full border border-white/20"
                        >
                            <img src={selectedMember.photo_url} className="w-full aspect-[4/5] object-cover" />
                            <div className="p-8 text-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white font-serif mb-2 tracking-tight">{selectedMember.name}</h4>
                                <p className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-6">{selectedMember.position}</p>
                                {selectedMember.instagram && (
                                    <a
                                        href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`}
                                        target="_blank"
                                        className="inline-flex items-center gap-3 px-8 py-3 bg-black text-white rounded-xl text-sm font-black hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/10"
                                    >
                                        <Instagram size={18} />
                                        @{selectedMember.instagram.replace('@', '')}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}

// Internal Specialized Component for Structure Tree
function StructureCard({ member, isTop, isDept, isStaff, themeColor, onClick }) {
    const isEmerald = themeColor === 'emerald';

    return (
        <motion.div
            Layout
            onClick={() => onClick(member)}
            className={`relative group cursor-pointer transition-all duration-500 ${isTop ? 'w-full' : 'w-full'} 
            ${isStaff ? 'scale-[0.85] hover:scale-95' : isDept ? 'scale-[0.95] hover:scale-105' : 'hover:scale-105'}`}
        >
            <div className={`bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border-2 transition-all duration-500 hover:shadow-2xl overflow-hidden ${isTop ? 'ring-8 ring-emerald-500/5 dark:ring-emerald-500/10' : ''
                } ${isEmerald ? 'border-emerald-50 hover:border-emerald-400' : 'border-blue-50 hover:border-blue-400'}`}>

                {/* Photo with Overlay */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 group/img">
                    {member.photo_url ? (
                        <img src={member.photo_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={member.name} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Users className={`w-12 h-12 ${isEmerald ? 'text-emerald-100 dark:text-emerald-900/40' : 'text-blue-100 dark:text-blue-900/40'}`} />
                        </div>
                    )}
                    
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover/img:opacity-20 transition-opacity duration-700 ${isEmerald ? 'bg-emerald-400' : 'bg-blue-400'}`}></div>
                </div>

                {/* Details */}
                <div className="text-center px-1">
                    <h5 className={`font-black tracking-tight leading-tight mb-1 line-clamp-2 min-h-[2.5rem] flex items-center justify-center text-slate-900 dark:text-white ${isTop ? 'text-xl md:text-2xl' : isDept ? 'text-base md:text-lg' : 'text-sm'}`}>
                        {member.name}
                    </h5>
                    <div className={`w-8 h-1 mx-auto mb-3 rounded-full opacity-30 ${isEmerald ? 'bg-emerald-600' : 'bg-blue-600'}`}></div>
                    <p className={`font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md inline-block ${isEmerald ? 'text-emerald-600 bg-emerald-50/50' : 'text-blue-600 bg-blue-50/50'} ${isTop ? 'text-[10px] md:text-xs' : 'text-[8px] md:text-[10px]'}`}>
                        {member.position}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
