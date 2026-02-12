import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { siteSetting } = usePage().props;

    return (
        <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand & Social */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 overflow-hidden">
                                {siteSetting?.site_logo ? (
                                    <img src={`/storage/${siteSetting.site_logo}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <i className="fas fa-users text-white text-xl"></i>
                                )}
                            </div>
                            <span className="text-2xl font-bold text-white font-serif">
                                {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
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
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                                >
                                    <i className={`fab fa-${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-8 relative inline-block">
                            Tautan Cepat
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <ul className="space-y-4">
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
                    <div>
                        <h4 className="text-white font-bold mb-8 relative inline-block">
                            Informasi
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bantuan / FAQ</a></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Login Pengurus</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-8 relative inline-block">
                            Kontak Kami
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full"></div>
                        </h4>
                        <div className="space-y-6">
                            {[
                                { icon: 'map-marker-alt', text: siteSetting?.address },
                                { icon: 'envelope', text: siteSetting?.email, href: `mailto:${siteSetting?.email}` },
                                { icon: 'phone', text: siteSetting?.phone, href: `tel:${siteSetting?.phone}` },
                            ].map((contact, idx) => contact.text && (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                                        <i className={`fas fa-${contact.icon}`}></i>
                                    </div>
                                    <span className="text-sm leading-relaxed group-hover:text-white transition-colors">
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
