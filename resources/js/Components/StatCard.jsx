import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ statistic, delay = 0 }) {
    const { title, subtitle, value, unit, description } = statistic;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full space-y-4 text-center items-center"
        >
            {/* Category / Eyebrow Title */}
            <div className="space-y-1">
                <h5 className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.3em]">
                    {title}
                </h5>
            </div>

            {/* Main Value & Subtitle Area */}
            <div className="space-y-1 flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter">
                        {value}
                    </span>
                </div>
                {(subtitle || unit) && (
                    <div className="text-lg md:text-2xl font-bold text-slate-800 leading-tight">
                        {subtitle} {unit && <span className="text-slate-500 font-medium ml-1">{unit}</span>}
                    </div>
                )}
            </div>

            {/* Description Paragraph */}
            {description && (
                <div className="pt-2 md:pt-4 border-t border-slate-100 max-w-xs mx-auto">
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            )}
        </motion.div>
    );
}
