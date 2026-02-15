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
            <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full">
                {/* Image Wrapper */}
                <div
                    onClick={() => onClick(member)}
                    className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden mb-4 sm:mb-6 cursor-pointer shadow-lg active:scale-95 transition-transform ${isIPNU ? 'bg-gradient-to-br from-emerald-600 to-teal-500' : 'bg-gradient-to-br from-blue-600 to-emerald-500'
                        }`}
                >
                    {member.photo ? (
                        <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <i className={`fas ${isIPNU ? 'fa-user-tie' : 'fa-user-nurse'} text-4xl text-white opacity-40`}></i>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                        <i className="fas fa-search-plus text-white text-2xl scale-50 group-hover:scale-100 transition-transform duration-300"></i>
                    </div>
                </div>

                {/* Info */}
                <h5 className="text-sm sm:text-lg font-bold text-slate-800 font-serif mb-1 leading-tight group-hover:text-emerald-700 transition-all line-clamp-2">
                    {member.name}
                </h5>
                <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4 bg-slate-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all truncate w-full">
                    {member.position}
                </p>

                {member.instagram && (
                    <a
                        href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100/50 mt-auto"
                    >
                        <i className="fab fa-instagram"></i>
                        <span className="truncate max-w-[60px] sm:max-w-none">{member.instagram}</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
}
