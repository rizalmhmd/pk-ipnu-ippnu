
import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ statistic, delay = 0 }) {
    const { title, subtitle, value, unit, description, icon, color } = statistic;

    // Map color names to Tailwind classes
    const colorClasses = {
        emerald: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        amber: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        red: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
        purple: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        pink: { text: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
        indigo: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        cyan: { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
        teal: { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
        orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    };

    const theme = colorClasses[color] || colorClasses.emerald;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 relative overflow-hidden group h-full"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${theme.bg} rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <h5 className={`font-bold text-xs tracking-wider uppercase ${theme.text}`}>
                        {title}
                    </h5>
                    {icon && (
                        <div className={`w-8 h-8 md:w-10 md:h-10 ${theme.bg} rounded-full flex items-center justify-center ${theme.text} mb-2 md:mb-4`}>
                            <i className={`fas ${icon} text-xs md:text-base`}></i>
                        </div>
                    )}
                </div>

                <div className="mb-1 md:mb-2">
                    <span className="text-xl md:text-5xl font-bold text-slate-800 tracking-tight block truncate">
                        {value}
                    </span>
                </div>

                {(subtitle || unit) && (
                    <div className="text-[10px] md:text-xl font-medium text-slate-600 mb-3 md:mb-6 line-clamp-1">
                        {subtitle} {unit && <span className="text-[8px] md:text-sm text-slate-400 ml-1">{unit}</span>}
                    </div>
                )}

                <div className="mt-auto pt-3 md:pt-6 border-t border-slate-50 hidden md:block">
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
