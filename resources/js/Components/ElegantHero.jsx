import React from 'react';
import { motion } from 'framer-motion';

export default function ElegantHero({ title, description, subtitle, bgImage }) {
    return (
        <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-slate-950">
            {/* Background Image with Darker Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={bgImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    {subtitle && (
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-8 h-[2px] bg-emerald-500"></div>
                            <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                                {subtitle}
                            </span>
                        </div>
                    )}
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-serif mb-6 leading-[1.1] tracking-tight">
                        {title}
                    </h1>
                    
                    <div className="w-20 h-1.5 bg-emerald-600 mb-8 rounded-full shadow-[0_0_20px_rgba(5,150,105,0.5)]"></div>
                    
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl border-l-4 border-emerald-500/20 pl-6 py-2">
                        {description}
                    </p>
                </motion.div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
        </section>
    );
}
