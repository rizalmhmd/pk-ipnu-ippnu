import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';

export default function Payment({ registration, snapToken, pageSetting, clientKey, isProduction }) {
    const [isSnapLoaded, setIsSnapLoaded] = useState(false);

    useEffect(() => {
        // Load Midtrans Snap script dynamically
        const midtransScriptUrl = isProduction 
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';
            
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', clientKey);
        
        scriptTag.onload = () => {
            setIsSnapLoaded(true);
        };
        
        document.body.appendChild(scriptTag);
        
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [clientKey, isProduction]);

    const handlePay = () => {
        if (!isSnapLoaded) {
            alert('Sistem pembayaran sedang disiapkan, silakan coba beberapa saat lagi.');
            return;
        }

        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                // Payment success
                window.location.href = route('kegiatan.index') + '?status=success';
            },
            onPending: function (result) {
                // Payment pending
                window.location.href = route('kegiatan.index') + '?status=pending';
            },
            onError: function (result) {
                // Payment error
                alert('Terjadi kesalahan pada pembayaran');
            },
            onClose: function () {
                // User closed the popup
                console.log('User closed the popup without finishing the payment');
            }
        });
    };

    return (
        <PublicLayout>
            <Head title={`Pembayaran - ${registration.agenda?.title}`} />
            
            <div className="bg-emerald-900 pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link href={route('kegiatan.index')} className="inline-flex items-center gap-2 text-emerald-300 hover:text-white mb-6 transition-colors">
                            <i className="fas fa-arrow-left"></i> Kembali ke Kegiatan
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
                            Selesaikan Pembayaran
                        </h1>
                        <p className="text-emerald-100 text-lg">
                            {registration.agenda?.title}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 -mt-8 relative z-20">
                <div className="max-w-xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-8 md:p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                            <i className="fas fa-wallet"></i>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Total Pembayaran</h2>
                        <div className="text-4xl font-black text-emerald-600 mb-8">
                            {registration.agenda?.registration_fee}
                        </div>
                        
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left mb-8 space-y-2">
                            <p className="text-sm text-slate-500">ID Pendaftaran</p>
                            <p className="font-bold text-slate-800">REG-{registration.id}</p>
                            
                            <p className="text-sm text-slate-500 mt-4">Status</p>
                            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                Menunggu Pembayaran
                            </span>
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={!isSnapLoaded}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
                        >
                            {!isSnapLoaded ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Menyiapkan Sistem...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-credit-card"></i> Bayar Sekarang
                                </>
                            )}
                        </button>
                        
                        <p className="text-xs text-slate-500 mt-6 text-center">
                            Pembayaran Anda diproses secara aman oleh Midtrans
                        </p>
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}
