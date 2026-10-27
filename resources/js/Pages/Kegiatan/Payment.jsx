import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CreditCard, CheckCircle2, RefreshCw, AlertCircle, ArrowLeft, Wallet } from 'lucide-react';

export default function Payment({ registration, snapToken, pageSetting, clientKey, isProduction }) {
    const [isSnapLoaded, setIsSnapLoaded] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(registration.status === 'approved');
    const autoOpenAttempted = useRef(false);

    const verifyPaymentStatus = useCallback(async (orderId = null, showFeedback = false) => {
        setIsVerifying(true);
        try {
            const response = await axios.post(route('kegiatan.payment.verify', registration.id), {
                order_id: orderId || registration.midtrans_order_id,
            });

            if (response.data.success && response.data.status === 'approved') {
                setPaymentVerified(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Pembayaran Berhasil!',
                    text: 'Status pendaftaran Anda telah disetujui. Mengalihkan ke halaman kegiatan...',
                    timer: 2500,
                    showConfirmButton: false,
                }).then(() => {
                    window.location.href = response.data.redirect_url || (route('kegiatan.index') + '?status=success');
                });
                return true;
            } else {
                if (showFeedback) {
                    const statusDesc = response.data.transaction_status || response.data.status || 'pending';
                    if (statusDesc === 'pending') {
                        Swal.fire({
                            icon: 'info',
                            title: 'Pembayaran Sedang Diproses',
                            text: 'Transaksi Anda masih menunggu penyelesaian pembayaran. Jika sudah mentransfer, silakan tunggu 10-30 detik lalu klik tombol "Cek Status Pembayaran" lagi.',
                            confirmButtonColor: '#059669',
                        });
                    } else if (['deny', 'expire', 'cancel', 'rejected'].includes(statusDesc)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Pembayaran Tidak Berhasil',
                            text: `Status transaksi: ${statusDesc}. Silakan lakukan pendaftaran ulang jika diperlukan.`,
                            confirmButtonColor: '#ef4444',
                        });
                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Status Pembayaran',
                            text: `Status saat ini: ${statusDesc}.`,
                            confirmButtonColor: '#059669',
                        });
                    }
                }
                return false;
            }
        } catch (error) {
            console.error('Gagal memverifikasi status pembayaran:', error);
            if (showFeedback) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Pemeriksaan Tertunda',
                    text: 'Tidak dapat menghubungi server pembayaran. Silakan coba kembali sesaat lagi.',
                    confirmButtonColor: '#059669',
                });
            }
            return false;
        } finally {
            setIsVerifying(false);
        }
    }, [registration.id, registration.midtrans_order_id]);

    const handlePay = useCallback(() => {
        if (!window.snap || !snapToken) {
            Swal.fire({
                icon: 'warning',
                title: 'Menyiapkan Sistem',
                text: 'Sistem pembayaran sedang disiapkan, silakan tunggu sebentar...',
                confirmButtonColor: '#059669',
            });
            return;
        }

        window.snap.pay(snapToken, {
            onSuccess: function (result) {
                verifyPaymentStatus(result?.order_id, false);
            },
            onPending: function (result) {
                verifyPaymentStatus(result?.order_id, true);
            },
            onError: function (result) {
                Swal.fire({
                    icon: 'error',
                    title: 'Pembayaran Gagal',
                    text: result?.status_message || 'Terjadi kesalahan pada transaksi pembayaran.',
                    confirmButtonColor: '#ef4444',
                });
            },
            onClose: function () {
                // When modal closes, check if user completed payment
                verifyPaymentStatus(null, false);
            }
        });
    }, [snapToken, verifyPaymentStatus]);

    useEffect(() => {
        const midtransScriptUrl = isProduction 
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';
            
        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute('data-client-key', clientKey);
        
        scriptTag.onload = () => {
            setIsSnapLoaded(true);
            if (!autoOpenAttempted.current && snapToken && !paymentVerified) {
                autoOpenAttempted.current = true;
                setTimeout(() => {
                    handlePay();
                }, 400);
            }
        };
        
        document.body.appendChild(scriptTag);
        
        return () => {
            if (document.body.contains(scriptTag)) {
                document.body.removeChild(scriptTag);
            }
        };
    }, [clientKey, isProduction, snapToken, handlePay, paymentVerified]);

    // Auto-check payment status periodically and whenever user returns to this tab
    useEffect(() => {
        if (paymentVerified) return;

        let checkCount = 0;
        const maxChecks = 25; // checks every 6s for ~2.5 minutes

        const interval = setInterval(() => {
            if (checkCount < maxChecks && !paymentVerified) {
                checkCount++;
                verifyPaymentStatus(null, false);
            } else {
                clearInterval(interval);
            }
        }, 6000);

        const onFocus = () => {
            if (!paymentVerified) {
                verifyPaymentStatus(null, false);
            }
        };

        window.addEventListener('focus', onFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', onFocus);
        };
    }, [paymentVerified, verifyPaymentStatus]);

    return (
        <PublicLayout>
            <Head title={`Pembayaran - ${registration.agenda?.title}`} />
            
            <div className="bg-emerald-900 pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Link href={route('kegiatan.index')} className="inline-flex items-center gap-2 text-emerald-300 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={18} /> Kembali ke Kegiatan
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
                            {paymentVerified ? 'Pembayaran Berhasil' : 'Selesaikan Pembayaran'}
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
                        {paymentVerified ? (
                            <div>
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={44} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Pendaftaran Telah Disetujui!</h2>
                                <p className="text-slate-600 mb-8">
                                    Terima kasih! Pembayaran Anda telah kami terima dan diverifikasi secara otomatis.
                                </p>
                                <Link
                                    href={route('kegiatan.index')}
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all"
                                >
                                    Kembali ke Beranda Kegiatan
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Wallet size={36} />
                                </div>
                                
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Total Pembayaran</h2>
                                <div className="text-4xl font-black text-emerald-600 mb-8">
                                    {registration.agenda?.registration_fee}
                                </div>
                                
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left mb-8 space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">ID Pendaftaran</span>
                                        <span className="font-mono font-bold text-slate-800">REG-{registration.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Nama Peserta</span>
                                        <span className="font-semibold text-slate-800">{registration.responses?.field_name || 'Peserta'}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200/60">
                                        <span className="text-slate-500">Status Pembayaran</span>
                                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Menunggu Pembayaran
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handlePay}
                                        disabled={!isSnapLoaded || isVerifying}
                                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex justify-center items-center gap-3"
                                    >
                                        {!isSnapLoaded ? (
                                            <>
                                                <RefreshCw size={18} className="animate-spin" /> Menyiapkan Sistem...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={18} /> Bayar Sekarang (Buka Midtrans)
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => verifyPaymentStatus(null, true)}
                                        disabled={isVerifying}
                                        className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 border border-slate-200"
                                    >
                                        <RefreshCw size={16} className={isVerifying ? 'animate-spin text-emerald-600' : 'text-slate-500'} />
                                        {isVerifying ? 'Memeriksa ke Midtrans...' : 'Sudah Bayar? Cek Status Pembayaran'}
                                    </button>
                                </div>
                                
                                <p className="text-xs text-slate-500 mt-6 text-center">
                                    Pembayaran Anda diproses secara aman menggunakan payment gateway resmi Midtrans.
                                </p>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
}

