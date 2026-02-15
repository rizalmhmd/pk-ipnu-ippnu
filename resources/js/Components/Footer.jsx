import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { siteSetting } = usePage().props;

    return (
        <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                {/* Centered Brand & Social Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-8">
                    <Link href="/" className="flex flex-col items-center gap-4 group">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 overflow-hidden">
                            {siteSetting?.site_logo ? (
                                <img src={siteSetting.site_logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <i className="fas fa-users text-emerald-600 text-2xl"></i>
                            )}
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-white font-serif tracking-tight leading-none uppercase">
                                {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                            </span>
                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-[0.2em] mt-2">Portal Resmi</span>
                        </div>
                    </Link>

                    <p className="text-sm leading-relaxed max-w-2xl text-slate-400">
                        {siteSetting?.footer_description || 'Wadah pengembangan kader pelajar terpadu yang berkomitmen membentuk generasi muda yang berkualitas dan berakhlak mulia.'}
                    </p>

                    <div className="flex gap-4">
                        {[
                            { icon: 'facebook-f', link: siteSetting?.facebook },
                            { icon: 'instagram', link: siteSetting?.instagram },
                            { icon: 'twitter', link: siteSetting?.twitter },
                            { icon: 'youtube', link: siteSetting?.youtube },
                        ].map((social, idx) => social.link && (
                            <a
                                key={idx}
                                href={social.link}
                                target="_blank"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className={`fab fa-${social.icon}`}></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Info & Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto border-t border-white/5 pt-16">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 relative inline-block">
                            Tautan Cepat
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            {[
                                { name: 'Beranda', path: '/' },
                                { name: 'Profil', path: '/profil' },
                                { name: 'Berita', path: '/berita' },
                                { name: 'Galeri', path: '/galeri' },
                                { name: 'Agenda', path: '/agenda' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link href={link.path} className="group flex items-center gap-2 hover:text-white transition-colors">
                                        <i className="fas fa-chevron-right text-[10px] text-emerald-500 group-hover:translate-x-1 transition-transform"></i>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="pl-0 md:pl-8">
                        <h4 className="text-white font-bold mb-6 relative inline-block">
                            Informasi
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bantuan / FAQ</a></li>
                            <li><Link href="/login" className="hover:text-white transition-colors font-bold text-emerald-500">Login Pengurus</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Spans 2 columns on mobile */}
                    <div className="col-span-2 md:col-span-1 border-t md:border-t-0 border-white/5 pt-12 md:pt-0">
                        <h4 className="text-white font-bold mb-6 relative inline-block">
                            Kontak Kami
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                            {[
                                { icon: 'map-marker-alt', text: siteSetting?.address },
                                { icon: 'envelope', text: siteSetting?.email, href: `mailto:${siteSetting?.email}` },
                                { icon: 'phone', text: siteSetting?.phone, href: `tel:${siteSetting?.phone}` },
                            ].map((contact, idx) => contact.text && (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                                        <i className={`fas fa-${contact.icon}`}></i>
                                    </div>
                                    <span className="text-sm leading-relaxed group-hover:text-white transition-colors break-all">
                                        {contact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>
                        © {new Date().getFullYear()} {siteSetting?.site_name || 'PKPT IPNU IPPNU'}.
                        {siteSetting?.copyright_text || ' Hak Cipta Dilindungi.'}
                    </p>
                    <p className="flex items-center gap-2">
                        Dibangun dengan <i className="fas fa-heart text-emerald-500 animate-pulse"></i> untuk kemajuan generasi muda
                    </p>
                </div>
            </div>
        </footer>
    );
}
