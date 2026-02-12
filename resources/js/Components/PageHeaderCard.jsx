import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeaderCard({ title, subtitle, bgColor, textColor, bgImage }) {
    // Determine background style
    const bgStyle = bgImage
        ? { backgroundImage: `url(/storage/${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : bgColor
            ? { background: bgColor } // Can be hex or linear-gradient
            : {}; // Fallback to default CSS classes if nothing provided

    const hasCustomBg = !!(bgImage || bgColor);
    const textStyle = textColor ? { color: textColor } : {};

    return (
        <section className="bg-white py-16 md:py-24 px-4 md:px-0">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`relative overflow-hidden shadow-2xl min-h-[400px] flex items-center justify-center text-center p-12 md:p-24 transition-all duration-500 ${!hasCustomBg ? 'bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-950' : ''
                        }`}
                    style={bgStyle}
                >
                    {/* Background Patterns (only show if image is not set) */}
                    {!bgImage && (
                        <div className="absolute inset-0 z-0">
                            {/* Decorative Overlay Shapes */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                            {/* Subtle Grid Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                        <motion.h2
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl"
                            style={textStyle}
                        >
                            {title}
                        </motion.h2>

                        {subtitle && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <div className="h-1.5 w-24 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                <p
                                    className="text-white/80 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed"
                                    style={textColor ? { color: textColor, opacity: 0.8 } : {}}
                                >
                                    {subtitle}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
