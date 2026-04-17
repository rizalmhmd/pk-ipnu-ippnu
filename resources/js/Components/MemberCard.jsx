import React from 'react';
import { motion } from 'framer-motion';

export default function MemberCard({ member, idx, onClick }) {
    const isIPNU = member.type === 'ipnu';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative"
        >
            <div className="bg-white rounded-lg sm:rounded-lg p-5 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden group/card">
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 blur-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-700 ${isIPNU ? 'bg-emerald-400' : 'bg-blue-400'}`}></div>

                {/* Image Wrapper */}
                <div
                    onClick={() => onClick(member)}
                    className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg sm:rounded-lg overflow-hidden mb-6 cursor-pointer shadow-xl active:scale-95 transition-all duration-500 ring-4 ring-white dark:ring-slate-900 ${isIPNU ? 'bg-emerald-50' : 'bg-blue-50'
                        }`}
                >
                    {member.photo_url ? (
                        <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <i className={`fas ${isIPNU ? 'fa-user-tie' : 'fa-user-nurse'} text-4xl sm:text-5xl ${isIPNU ? 'text-emerald-200' : 'text-blue-200'}`}></i>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 flex items-center justify-center transition-all duration-500">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-50 group-hover/card:scale-100 transition-all duration-500">
                            <i className="fas fa-search-plus"></i>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <h5 className="text-base sm:text-xl font-bold text-slate-800 font-serif mb-2 leading-tight group-hover/card:text-emerald-700 transition-all line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center px-2">
                    {member.name}
                </h5>
                <div className="w-10 h-1 bg-slate-100 mb-4 rounded-full group-hover/card:w-16 group-hover/card:bg-emerald-200 transition-all duration-500"></div>
                <p className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.15em] text-slate-400 mb-6 bg-slate-50 px-4 py-1.5 rounded-lg group-hover/card:bg-emerald-50 group-hover/card:text-emerald-600 transition-all truncate w-full">
                    {member.position}
                </p>

                {member.instagram && (
                    <a
                        href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] sm:text-xs font-bold hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-900/20 transition-all mt-auto group/ig"
                    >
                        <i className="fab fa-instagram text-sm group-hover/ig:rotate-12 transition-transform"></i>
                        <span className="truncate max-w-[100px] sm:max-w-none">@{member.instagram.replace('@', '')}</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}
