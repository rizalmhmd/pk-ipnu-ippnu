// VerifyEmail.jsx
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="mb-6 text-sm text-slate-500 font-medium leading-relaxed">
                Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan ke email Anda. Jika Anda tidak menerima email tersebut, kami akan mengirimkan yang lain dengan senang hati.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 font-bold text-sm text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 italic">
                    Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <button
                    disabled={processing}
                    className={`w-full py-4 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {processing ? (
                        <i className="fas fa-circle-notch animate-spin"></i>
                    ) : (
                        <i className="fas fa-envelope-open-text text-xs"></i>
                    )}
                    Kirim Ulang Email Verifikasi
                </button>

                <div className="flex items-center justify-between">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
