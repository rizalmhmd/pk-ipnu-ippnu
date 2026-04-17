import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function ArticleCard({ article, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-lg sm:rounded-lg shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full"
        >
            <div className="relative h-32 sm:h-56 overflow-hidden">
                {article.image ? (
                    <img
                        src={article.image_url}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={article.title}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-blue-900 flex flex-col items-center justify-center text-white/20">
                        <i className="fas fa-file-alt text-4xl sm:text-6xl group-hover:scale-110 transition-transform duration-700"></i>
                    </div>
                )}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/90 backdrop-blur-md text-emerald-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg sm:rounded-lg shadow-lg border border-white/20">
                        Artikel
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4">
                    <i className="far fa-calendar-alt text-emerald-500"></i>
                    {new Date(article.published_at || article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-slate-800 mb-2 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                    {article.title}
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {article.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </p>
                <Link
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm group/btn mt-auto"
                >
                    Baca Selengkapnya
                    <div className="w-4 h-0.5 sm:w-6 bg-emerald-600 group-hover/btn:w-8 sm:group-hover/btn:w-10 transition-all"></div>
                </Link>
            </div>
        </motion.div>
    );
}
