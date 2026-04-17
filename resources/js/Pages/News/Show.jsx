import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
import PageHeaderCard from '@/Components/PageHeaderCard';
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

            <HeroSection
                bgImage={post.image_url ? post.image_url : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
            />

            <PageHeaderCard
                title="Detail Berita"
                subtitle={post.title}
            />

            <div className="container mx-auto px-6 md:px-12 py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Article Header Info */}
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-6 pb-12 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
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
                    {post.image_url && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-lg overflow-hidden shadow-2xl shadow-slate-200/50 mb-16"
                        >
                            <img
                                src={post.image_url}
                                className="w-full h-auto object-cover max-h-[600px]"
                                alt={post.title}
                            />
                        </motion.div>
                    )}

                    {/* Article Content */}
                    <article
                        className="prose prose-lg prose-emerald max-w-none text-slate-600 leading-relaxed mb-20 px-2 lg:px-0 text-justify"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer / Social Share */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10 border-t border-slate-100">
                        <Link
                            href="/berita"
                            className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg font-bold transition-all"
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
                                    className={`w-12 h-12 rounded-lg ${social.color} text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg`}
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
