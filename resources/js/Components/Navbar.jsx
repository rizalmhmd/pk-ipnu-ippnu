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
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 left-0 right-0 z-50 lg:hidden"
                        >
                            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 shadow-2xl border-b border-emerald-700/50">
                                {/* Menu Header */}
                                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                                            {siteSetting?.site_logo ? (
                                                <img src={siteSetting.site_logo_url} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <i className="fas fa-users text-emerald-600 text-xl"></i>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-white font-serif leading-none">
                                                {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                                            </span>
                                            <span className="text-[9px] text-emerald-200 font-bold uppercase tracking-widest mt-1">Portal Resmi</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <i className="fas fa-times text-xl"></i>
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                href={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center gap-4 px-5 py-4 rounded-lg text-base font-semibold transition-all relative overflow-hidden group ${isActive(link.path)
                                                    ? 'bg-white/15 text-white shadow-lg border border-white/20'
                                                    : 'text-emerald-50 hover:bg-white/10 border border-transparent'
                                                    }`}
                                            >
                                                <i className={`fas fa-${link.icon} w-5 text-center ${isActive(link.path) ? 'text-emerald-300' : 'text-emerald-400'}`}></i>
                                                <span className="flex-1">{link.name}</span>
                                                {isActive(link.path) && (
                                                    <i className="fas fa-check-circle text-emerald-300 text-sm"></i>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Dashboard Admin Link (if authenticated) */}
                                    {auth?.user && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: navLinks.length * 0.05 }}
                                            className="pt-4 mt-4 border-t border-white/10"
                                        >
                                            <Link
                                                href="/admin/dashboard"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-4 px-5 py-4 rounded-lg text-base font-bold bg-blue-600 text-white border border-blue-500/30 shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <i className="fas fa-lock w-5 text-center"></i>
                                                <span className="flex-1">Dashboard Admin</span>
                                                <i className="fas fa-arrow-right text-sm"></i>
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
