import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function PostCard({ post, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full"
        >
            <div className="relative h-32 sm:h-56 overflow-hidden">
                <img
                    src={post.image_url ? post.image_url : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={post.title}
                />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/90 backdrop-blur-md text-emerald-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg border border-white/20">
                        Berita
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4">
                    <i className="far fa-calendar-alt text-emerald-500"></i>
                    {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 mb-2 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                    {post.title}
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </p>
                <Link
                    href={`/berita/${post.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm group/btn mt-auto"
                >
                    Baca Selengkapnya
                    <div className="w-4 h-0.5 sm:w-6 bg-emerald-600 group-hover/btn:w-8 sm:group-hover/btn:w-10 transition-all"></div>
                </Link>
            </div>
        </motion.div>
    );
}
