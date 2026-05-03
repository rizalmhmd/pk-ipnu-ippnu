import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Alamat Email</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-xs font-bold text-red-500 ml-1 italic">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Password Baru</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                            <i className="fas fa-lock"></i>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-xs font-bold text-red-500 ml-1 italic">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Konfirmasi Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                    {errors.password_confirmation && (
                        <p className="mt-2 text-xs font-bold text-red-500 ml-1 italic">{errors.password_confirmation}</p>
                    )}
                </div>

                <button
                    disabled={processing}
                    className={`w-full py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {processing ? (
                        <i className="fas fa-circle-notch animate-spin"></i>
                    ) : (
                        <i className="fas fa-key text-xs"></i>
                    )}
                    Atur Ulang Password
                </button>
            </form>
        </GuestLayout>
    );
}
