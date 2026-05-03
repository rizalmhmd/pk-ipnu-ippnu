import React from 'react';
import { motion } from 'framer-motion';

export default function HomeFeature({ subtitle, title, description, imageUrl, buttonText, buttonUrl }) {
    return (
        <section className="bg-white py-16 md:py-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                    {/* Visual Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100">
                            <img 
                                src={imageUrl || 'https://images.unsplash.com/photo-1523240715639-9988d1ee9b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
                                alt="Feature" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative background shape */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        {subtitle && (
                            <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6">
                                {subtitle}
                            </div>
                        )}
                        
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-serif mb-6 leading-tight tracking-tight uppercase">
                            {title}
                        </h2>
                        
                        <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                            {description}
                        </p>

                        {buttonText && (
                            <a 
                                href={buttonUrl || '#'}
                                className="inline-flex items-center gap-3 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:-translate-y-1 group"
                            >
                                {buttonText}
                                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                            </a>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
