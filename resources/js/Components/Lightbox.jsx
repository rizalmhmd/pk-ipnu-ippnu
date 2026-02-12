import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ isOpen, onClose, member }) {
    if (!member) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative max-w-lg w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-800 transition-colors z-10"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="relative aspect-[4/5] overflow-hidden">
                            {member.photo ? (
                                <img
                                    src={`/storage/${member.photo}`}
                                    className="w-full h-full object-cover"
                                    alt={member.name}
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center ${member.type === 'ipnu' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                                    <i className={`fas ${member.type === 'ipnu' ? 'fa-user-tie' : 'fa-user-nurse'} text-9xl text-white/20`}></i>
                                </div>
                            )}
                        </div>

                        <div className="p-8 text-center bg-white">
                            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">{member.name}</h3>
                            <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">{member.position}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
