import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import ProfileTabs from '@/Components/ProfileTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Instagram, X } from 'lucide-react';

function sortLeaders(members) {
    return [...members].sort((a, b) => {
        const posA = a.position?.toLowerCase() || '';
        const posB = b.position?.toLowerCase() || '';
        if (posA.includes('ketua') && !posB.includes('ketua')) return -1;
        if (!posA.includes('ketua') && posB.includes('ketua')) return 1;
        return 0;
    });
}

function buildBranches(filteredMembers) {
    const level2Raw = filteredMembers.filter((m) => parseInt(m.level, 10) === 2);
    const departments = Array.from(new Set(filteredMembers.map((m) => m.department))).filter(Boolean);

    const groupedBranches = departments.map((dept) => {
        const deptMembers = filteredMembers.filter((m) => m.department === dept);
        return {
            key: `dept-${dept}`,
            kind: 'department',
            name: dept,
            leaders: sortLeaders(deptMembers.filter((m) => parseInt(m.level, 10) === 2)),
            staff: deptMembers.filter((m) => parseInt(m.level, 10) === 3),
        };
    });

    const ungroupedBranches = level2Raw
        .filter((m) => !m.department)
        .map((m) => ({
            key: `ungrouped-${m.id}`,
            kind: 'standalone',
            member: m,
        }));

    return [...groupedBranches, ...ungroupedBranches];
}

export default function Structure({ organizations, pageSetting }) {
    const [selectedOrg, setSelectedOrg] = useState('ipnu');
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        if (!selectedMember) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSelectedMember(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMember]);

    const filteredMembers = (organizations || []).filter((m) => m.type === selectedOrg);
    const level1 = filteredMembers.filter((m) => parseInt(m.level, 10) === 1);
    const branches = buildBranches(filteredMembers);
    const ungroupedLevel3 = filteredMembers.filter(
        (m) => parseInt(m.level, 10) === 3 && !m.department
    );

    const themeColor = selectedOrg === 'ipnu' ? 'emerald' : 'blue';
    const isEmerald = themeColor === 'emerald';

    return (
        <PublicLayout>
            <Head title="Struktur Pengurus - PKPT IPNU IPPNU" />

            <HeroSection
                bgImage={pageSetting?.hero_image_url || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3'}
                title={pageSetting?.hero_title || 'Struktur Pengurus'}
                subtitle={pageSetting?.hero_description || 'Susunan kepengurusan aktif PKPT IPNU IPPNU'}
            />

            <div className="container mx-auto px-6 py-12 md:py-20">
                <ProfileTabs active="structure" />

                {/* Section Header & Org Toggle */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <p
                        className={`text-[11px] font-bold uppercase tracking-[0.25em] mb-2 ${
                            isEmerald ? 'text-emerald-700' : 'text-blue-700'
                        }`}
                    >
                        Kepengurusan Aktif
                    </p>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-serif tracking-tight">
                        Struktur Pengurus
                    </h2>
                    <div
                        className={`w-12 h-1 mx-auto rounded-full mt-3 mb-8 ${
                            isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                    />

                    {/* Org Toggle */}
                    <div
                        role="tablist"
                        aria-label="Pilih Organisasi"
                        className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200/70"
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected={selectedOrg === 'ipnu'}
                            onClick={() => setSelectedOrg('ipnu')}
                            className={`px-8 py-2.5 rounded-lg text-xs font-black transition-all uppercase tracking-widest ${
                                selectedOrg === 'ipnu'
                                    ? 'bg-white text-emerald-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            IPNU
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={selectedOrg === 'ippnu'}
                            onClick={() => setSelectedOrg('ippnu')}
                            className={`px-8 py-2.5 rounded-lg text-xs font-black transition-all uppercase tracking-widest ${
                                selectedOrg === 'ippnu'
                                    ? 'bg-white text-blue-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            IPPNU
                        </button>
                    </div>
                </div>

                {filteredMembers.length > 0 ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedOrg}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Mobile & Tablet Stacked View (no horizontal scroll) */}
                            <div className="lg:hidden space-y-8">
                                {level1.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                            Pimpinan Tertinggi
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                                            {level1.map((m) => (
                                                <StructureCard
                                                    key={m.id}
                                                    member={m}
                                                    tier="top"
                                                    themeColor={themeColor}
                                                    onClick={setSelectedMember}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {branches.length > 0 && (
                                    <div className="space-y-6">
                                        {branches.map((branch) =>
                                            branch.kind === 'department' ? (
                                                <div
                                                    key={branch.key}
                                                    className="bg-white/80 rounded-2xl border border-slate-200/80 p-5 space-y-5 shadow-sm"
                                                >
                                                    <div className="flex items-center justify-center">
                                                        <span className="px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
                                                            {branch.name}
                                                        </span>
                                                    </div>

                                                    {branch.leaders.length > 0 && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {branch.leaders.map((leader) => (
                                                                <StructureCard
                                                                    key={leader.id}
                                                                    member={leader}
                                                                    tier="dept"
                                                                    themeColor={themeColor}
                                                                    onClick={setSelectedMember}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}

                                                    {branch.staff.length > 0 && (
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                                                            {branch.staff.map((staff) => (
                                                                <StructureCard
                                                                    key={staff.id}
                                                                    member={staff}
                                                                    tier="staff"
                                                                    themeColor={themeColor}
                                                                    onClick={setSelectedMember}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div key={branch.key} className="max-w-xs mx-auto">
                                                    <StructureCard
                                                        member={branch.member}
                                                        tier="dept"
                                                        themeColor={themeColor}
                                                        onClick={setSelectedMember}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Desktop Organizational Tree */}
                            <div className="hidden lg:block overflow-x-auto pb-8 no-scrollbar">
                                <div className="min-w-full inline-flex flex-col items-center py-4">
                                    {/* LEVEL 1: TOP LEADERSHIP */}
                                    {level1.length > 0 && (
                                        <div className="flex flex-col items-center">
                                            <div className="flex justify-center gap-6">
                                                {level1.map((m) => (
                                                    <div key={m.id} className="w-60">
                                                        <StructureCard
                                                            member={m}
                                                            tier="top"
                                                            themeColor={themeColor}
                                                            onClick={setSelectedMember}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            {branches.length > 0 && (
                                                <div className="w-0.5 h-10 bg-slate-300 relative">
                                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* LEVEL 2 & 3 BRANCHES WITH EXACT CENTER-TO-CENTER CONNECTORS */}
                                    {branches.length > 0 && (
                                        <div className="flex justify-center items-start">
                                            {branches.map((branch, idx) => {
                                                const isFirst = idx === 0;
                                                const isLast = idx === branches.length - 1;
                                                const showBus = branches.length > 1;

                                                return (
                                                    <div
                                                        key={branch.key}
                                                        className="relative flex flex-col items-center px-4 pt-10"
                                                    >
                                                        {/* Horizontal bus segment connecting branch centers */}
                                                        {showBus && !isFirst && (
                                                            <span
                                                                aria-hidden="true"
                                                                className="absolute top-0 left-0 right-1/2 h-0.5 bg-slate-300"
                                                            />
                                                        )}
                                                        {showBus && !isLast && (
                                                            <span
                                                                aria-hidden="true"
                                                                className="absolute top-0 left-1/2 right-0 h-0.5 bg-slate-300"
                                                            />
                                                        )}

                                                        {/* Vertical stem into branch */}
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-slate-300"
                                                        />

                                                        {branch.kind === 'department' ? (
                                                            <div className="flex flex-col items-center">
                                                                <div className="mb-5 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 z-10">
                                                                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 whitespace-nowrap">
                                                                        {branch.name}
                                                                    </span>
                                                                </div>

                                                                {branch.leaders.length > 0 && (
                                                                    <div className="flex justify-center gap-4">
                                                                        {branch.leaders.map((leader) => (
                                                                            <div key={leader.id} className="w-52">
                                                                                <StructureCard
                                                                                    member={leader}
                                                                                    tier="dept"
                                                                                    themeColor={themeColor}
                                                                                    onClick={setSelectedMember}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {branch.staff.length > 0 && (
                                                                    <>
                                                                        <div className="w-0.5 h-8 bg-slate-200 my-1 relative">
                                                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-200" />
                                                                        </div>

                                                                        <div
                                                                            className={`grid gap-3 ${
                                                                                branch.staff.length === 1
                                                                                    ? 'grid-cols-1'
                                                                                    : branch.staff.length <= 4
                                                                                      ? 'grid-cols-2'
                                                                                      : 'grid-cols-3'
                                                                            }`}
                                                                        >
                                                                            {branch.staff.map((staff) => (
                                                                                <div key={staff.id} className="w-44">
                                                                                    <StructureCard
                                                                                        member={staff}
                                                                                        tier="staff"
                                                                                        themeColor={themeColor}
                                                                                        onClick={setSelectedMember}
                                                                                    />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="w-52">
                                                                <StructureCard
                                                                    member={branch.member}
                                                                    tier="dept"
                                                                    themeColor={themeColor}
                                                                    onClick={setSelectedMember}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* UNGROUPED STAFF */}
                            {ungroupedLevel3.length > 0 && (
                                <div className="mt-16 pt-12 border-t border-slate-200/80">
                                    <div className="text-center mb-8">
                                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                                            Staff &amp; Anggota Lainnya
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {ungroupedLevel3.map((m) => (
                                            <StructureCard
                                                key={m.id}
                                                member={m}
                                                tier="staff"
                                                themeColor={themeColor}
                                                onClick={setSelectedMember}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="py-16 px-6 text-center bg-white rounded-2xl border border-dashed border-slate-200 max-w-2xl mx-auto">
                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium italic">
                            Data pengurus belum tersedia dalam sistem.
                        </p>
                    </div>
                )}
            </div>

            {/* Lightbox for Profile Summary */}
            <AnimatePresence>
                {selectedMember && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Profil ${selectedMember.name}`}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full border border-slate-200"
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedMember(null)}
                                aria-label="Tutup profil"
                                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 flex items-center justify-center transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <MemberPhoto
                                photoUrl={selectedMember.photo_url}
                                name={selectedMember.name}
                                themeColor={themeColor}
                                aspectClass="aspect-[4/5]"
                                iconSize="w-16 h-16"
                            />

                            <div className="p-7 text-center bg-gradient-to-b from-white to-slate-50">
                                <h4 className="text-xl font-black text-slate-900 font-serif mb-1.5 tracking-tight">
                                    {selectedMember.name}
                                </h4>
                                <p
                                    className={`font-bold text-xs uppercase tracking-[0.2em] mb-5 ${
                                        isEmerald ? 'text-emerald-700' : 'text-blue-700'
                                    }`}
                                >
                                    {selectedMember.position}
                                </p>
                                {selectedMember.instagram && (
                                    <a
                                        href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2.5 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold transition-all shadow-md ${
                                            isEmerald ? 'hover:bg-emerald-600' : 'hover:bg-blue-600'
                                        }`}
                                    >
                                        <Instagram size={16} />
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

function MemberPhoto({ photoUrl, name, themeColor, aspectClass = 'aspect-square', iconSize = 'w-12 h-12', hoverZoom = false }) {
    const [hasError, setHasError] = useState(false);
    const isEmerald = themeColor === 'emerald';

    useEffect(() => {
        setHasError(false);
    }, [photoUrl]);

    if (!photoUrl || hasError) {
        return (
            <div className={`w-full ${aspectClass} bg-slate-100 flex items-center justify-center`}>
                <Users className={`${iconSize} ${isEmerald ? 'text-emerald-200' : 'text-blue-200'}`} />
            </div>
        );
    }

    return (
        <img
            src={photoUrl}
            loading="lazy"
            decoding="async"
            alt={name}
            onError={() => setHasError(true)}
            className={`w-full ${aspectClass} object-cover ${
                hoverZoom ? 'group-hover:scale-105 transition-transform duration-500' : ''
            }`}
        />
    );
}

const TIER_STYLES = {
    top: {
        cardPadding: 'p-4 sm:p-5',
        cardRing: 'ring-4 ring-emerald-500/10',
        blueRing: 'ring-4 ring-blue-500/10',
        imageMargin: 'mb-4',
        nameSize: 'text-lg sm:text-xl min-h-[2.75rem]',
        badgeSize: 'text-[11px] px-2.5 py-1',
    },
    dept: {
        cardPadding: 'p-3.5 sm:p-4',
        cardRing: '',
        blueRing: '',
        imageMargin: 'mb-3.5',
        nameSize: 'text-sm sm:text-base min-h-[2.5rem]',
        badgeSize: 'text-[10px] sm:text-[11px] px-2.5 py-0.5',
    },
    staff: {
        cardPadding: 'p-3',
        cardRing: '',
        blueRing: '',
        imageMargin: 'mb-3',
        nameSize: 'text-sm min-h-[2.25rem]',
        badgeSize: 'text-[10px] px-2 py-0.5',
    },
};

function StructureCard({ member, tier = 'staff', themeColor, onClick }) {
    const isEmerald = themeColor === 'emerald';
    const styles = TIER_STYLES[tier] || TIER_STYLES.staff;
    const topRing = tier === 'top' ? (isEmerald ? styles.cardRing : styles.blueRing) : '';

    return (
        <button
            type="button"
            onClick={() => onClick(member)}
            className="w-full text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
        >
            <div
                className={`bg-white ${styles.cardPadding} rounded-xl shadow-sm border transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 overflow-hidden ${topRing} ${
                    isEmerald
                        ? 'border-slate-200/80 group-hover:border-emerald-300'
                        : 'border-slate-200/80 group-hover:border-blue-300'
                }`}
            >
                <div className={`relative rounded-lg overflow-hidden ${styles.imageMargin} bg-slate-100`}>
                    <MemberPhoto
                        photoUrl={member.photo_url}
                        name={member.name}
                        themeColor={themeColor}
                        hoverZoom
                    />
                </div>

                <div className="text-center px-1">
                    <h5
                        className={`font-bold tracking-tight leading-snug mb-1.5 line-clamp-2 flex items-center justify-center text-slate-900 ${styles.nameSize}`}
                    >
                        {member.name}
                    </h5>
                    <div
                        className={`w-7 h-0.5 mx-auto mb-2 rounded-full opacity-40 ${
                            isEmerald ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}
                    />
                    <p
                        className={`font-bold uppercase tracking-[0.14em] rounded-md inline-block ${styles.badgeSize} ${
                            isEmerald
                                ? 'text-emerald-700 bg-emerald-50'
                                : 'text-blue-700 bg-blue-50'
                        }`}
                    >
                        {member.position}
                    </p>
                </div>
            </div>
        </button>
    );
}
