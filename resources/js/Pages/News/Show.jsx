import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';

export default function NewsDetail({ post }) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = post.title;

    const shareSocials = [
        {
            name: 'WhatsApp',
            icon: 'fab fa-whatsapp',
            color: 'bg-green-500',
            link: `https://wa.me/?text=${encodeURIComponent(shareText + ' - ' + shareUrl)}`
        },
        {
            name: 'Facebook',
            icon: 'fab fa-facebook-f',
            color: 'bg-blue-600',
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'Twitter',
            icon: 'fab fa-twitter',
            color: 'bg-slate-900',
            link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        },
    ];

    return (
        <PublicLayout>
            <Head title={post.title} />

            <div className="container mx-auto px-6 md:px-12 py-32 lg:py-40">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="mb-10">
                        <ol className="flex items-center gap-3 text-sm font-medium">
                            <li><Link href="/" className="text-slate-400 hover:text-emerald-600 transition-colors">Beranda</Link></li>
                            <li className="text-slate-300"><i className="fas fa-chevron-right text-[10px]"></i></li>
                            <li><Link href="/berita" className="text-slate-400 hover:text-emerald-600 transition-colors">Berita</Link></li>
                            <li className="text-slate-300"><i className="fas fa-chevron-right text-[10px]"></i></li>
                            <li className="text-emerald-600 font-bold truncate">Detail Berita</li>
                        </ol>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-serif leading-tight mb-8"
                        >
                            {post.title}
                        </motion.h1>

                        <div className="flex items-center gap-6 pb-12 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Penulis</p>
                                    <p className="text-sm font-bold text-slate-800">Administrator</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-100"></div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Diterbitkan</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 mb-16"
                        >
                            <img
                                src={`/storage/${post.image}`}
                                className="w-full h-auto object-cover max-h-[600px]"
                                alt={post.title}
                            />
                        </motion.div>
                    )}

                    {/* Article Content */}
                    <article
                        className="prose prose-lg prose-emerald max-w-none text-slate-600 leading-relaxed mb-20 px-2 lg:px-0"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer / Social Share */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10 border-t border-slate-100">
                        <Link
                            href="/berita"
                            className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-2xl font-bold transition-all"
                        >
                            <i className="fas fa-arrow-left"></i>
                            Kembali ke Berita
                        </Link>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share:</span>
                            {shareSocials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    className={`w-12 h-12 rounded-2xl ${social.color} text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg`}
                                    title={`Bagikan ke ${social.name}`}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
