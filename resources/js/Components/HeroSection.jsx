import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function HeroSection({ bgImage, hideIndicators = false }) {
    const { activeQuotes } = usePage().props;
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        if (activeQuotes?.length > 1) {
            const timer = setInterval(() => {
                nextQuote();
            }, 8000);
            return () => clearInterval(timer);
        }
    }, [activeQuotes, currentQuote]);

    const nextQuote = () => {
        setCurrentQuote((prev) => (prev + 1) % activeQuotes.length);
    };

    const prevQuote = () => {
        setCurrentQuote((prev) => (prev - 1 + activeQuotes.length) % activeQuotes.length);
    };

    const quotesToDisplay = activeQuotes?.length > 0 ? activeQuotes : null;

    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center shadow-2xl group bg-neutral-950">
            {/* Background Image with Cross-fade Effect */}
            <AnimatePresence>
                <motion.div
                    key={quotesToDisplay && quotesToDisplay[currentQuote]?.image ? quotesToDisplay[currentQuote].image : 'default-bg'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src={quotesToDisplay && quotesToDisplay[currentQuote]?.image_url ? quotesToDisplay[currentQuote].image_url : bgImage}
                        className="w-full h-full object-cover brightness-[0.4]"
                        alt="Hero BG"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10" />
                </motion.div>
            </AnimatePresence>

            {/* Centered Content Area — vertically & horizontally centered */}
            <div className="container mx-auto px-6 sm:px-10 relative z-20 flex flex-col items-center justify-center text-center flex-1 w-full">
                <AnimatePresence mode="wait">
                    {quotesToDisplay ? (
                        <motion.div
                            key={`quote-${currentQuote}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="max-w-4xl px-4"
                        >
                            {/* Quote Icon Centered */}
                            <div className="inline-flex items-center justify-center mb-6">
                                <i className="fas fa-quote-left text-white/40 text-3xl md:text-5xl"></i>
                            </div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white mb-6 sm:mb-8 leading-relaxed font-serif tracking-wide drop-shadow-xl italic">
                                {quotesToDisplay[currentQuote].content}
                            </h1>

                            {quotesToDisplay[currentQuote].author && (
                                <p className="text-white/70 font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base mt-2">
                                    — {quotesToDisplay[currentQuote].author}
                                </p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/20"
                        >
                            <i className="fas fa-quote-left text-9xl"></i>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>



            {/* Tabbed Progress Indicators at Bottom */}
            {quotesToDisplay?.length > 1 && !hideIndicators && (
                <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-30 px-6 md:px-12 flex justify-center">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
                            {quotesToDisplay.map((quote, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuote(idx)}
                                    className="group text-left transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-colors duration-300 ${idx === currentQuote ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-white/30 group-hover:bg-white/50'}`} />
                                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest truncate transition-colors duration-300 ${idx === currentQuote ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                                            {quote.author || `Quote ${idx + 1}`}
                                        </span>
                                    </div>
                                    <div className="relative h-px md:h-0.5 bg-white/10 w-full overflow-hidden">
                                        {idx === currentQuote && (
                                            <motion.div
                                                key={`hero-progress-${currentQuote}`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 8, ease: "linear" }}
                                                className="absolute inset-0 bg-emerald-500 origin-left"
                                            />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
