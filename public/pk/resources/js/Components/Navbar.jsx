import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { siteSetting, auth } = usePage().props;
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', path: '/', icon: 'home' },
        { name: 'Profil', path: '/profil', icon: 'landmark' },
        { name: 'Berita', path: '/berita', icon: 'newspaper' },
        { name: 'Artikel', path: '/artikel', icon: 'file-alt' },
        { name: 'Galeri', path: '/galeri', icon: 'images' },
        { name: 'Agenda', path: '/agenda', icon: 'calendar-alt' },
    ];

    const isActive = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-emerald-900/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center lg:justify-center lg:gap-10">
                    {/* Branding */}
                    <Link href="/" className="flex flex-row items-center gap-3 sm:gap-4 group">
                        <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-lg flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden">
                            {siteSetting?.site_logo ? (
                                <img src={siteSetting.site_logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <i className={`fas fa-users text-emerald-600 text-xl lg:text-2xl`}></i>
                            )}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-base sm:text-xl lg:text-2xl font-black text-white font-serif tracking-tight leading-none" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                                {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                            </span>
                            <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-emerald-200 font-bold uppercase tracking-[0.2em] mt-1 lg:mt-1.5 opacity-90 lg:block" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Portal Resmi</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isActive(link.path)
                                    ? 'bg-white/20 text-white border border-white/30'
                                    : 'text-emerald-50 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <i className={`fas fa-${link.icon} opacity-70`}></i>
                                {link.name}
                            </Link>
                        ))}

                        {auth?.user && (
                            <Link
                                href="/admin/dashboard"
                                className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                            >
                                <i className="fas fa-lock"></i> Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggler */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-white text-xl bg-emerald-700/80 hover:bg-emerald-700 rounded-lg transition-colors shadow-lg"
                    >
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[55] lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Side Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 350 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] z-[60] lg:hidden h-screen bg-emerald-900/90 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.5)] flex flex-col"
                        >
                            {/* Menu Header / Branding */}
                            <div className="px-6 py-5 border-b border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden ring-4 ring-white/10">
                                        {siteSetting?.site_logo ? (
                                            <img src={siteSetting.site_logo_url} alt="Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <i className="fas fa-users text-emerald-600 text-xl"></i>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-emerald-100 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
                                    >
                                        <i className="fas fa-times text-lg"></i>
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-white font-serif leading-tight">
                                        {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-4 bg-emerald-400"></div>
                                        <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-[0.2em]">Official Portal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Links */}
                            <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 custom-scrollbar">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group ${isActive(link.path)
                                                ? 'bg-gradient-to-r from-white/15 to-white/5 text-white shadow-xl shadow-emerald-950/20 ring-1 ring-white/20'
                                                : 'text-emerald-50/70 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive(link.path) ? 'bg-emerald-500 text-white' : 'bg-white/5 text-emerald-400 group-hover:text-emerald-300'}`}>
                                                <i className={`fas fa-${link.icon} text-xs`}></i>
                                            </div>
                                            <span className="flex-1">{link.name}</span>
                                            {isActive(link.path) && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}

                                {auth?.user && (
                                    <div className="pt-6 mt-6 border-t border-white/5 px-2">
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                                        >
                                            <i className="fas fa-lock"></i>
                                            Dashboard Admin
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Footer / Contact */}
                            <div className="mt-auto px-6 py-4 border-t border-white/10 bg-black/10">
                                <p className="text-[10px] text-emerald-500/50 font-bold uppercase tracking-[0.2em] mb-4">Get in Touch</p>
                                <div className="flex gap-3">
                                    {[
                                        { iconClass: 'fab fa-instagram', href: siteSetting?.instagram },
                                        { iconClass: 'fab fa-whatsapp', href: siteSetting?.whatsapp },
                                        { iconClass: 'fas fa-envelope', href: `mailto:${siteSetting?.email}` },
                                    ].map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400/60 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <i className={`${social.iconClass} text-sm`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
