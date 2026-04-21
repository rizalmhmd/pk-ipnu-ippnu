import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function NewsCard({ post, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-lg shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full"
        >
            <div className="relative h-40 sm:h-56 overflow-hidden">
                <img
                    src={post.image_url ? post.image_url : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={post.title}
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg border border-white/20">
                        Berita
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3">
                    <i className="far fa-calendar-alt text-emerald-500"></i>
                    {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                    {post.title}
                </h3>
                <Link
                    href={`/berita/${post.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[11px] sm:text-xs group/btn mt-auto"
                >
                    Baca Selengkapnya
                    <i className="fas fa-arrow-right text-[10px] group/btn:translate-x-1 transition-transform"></i>
                </Link>
            </div>
        </motion.div>
    );
}
