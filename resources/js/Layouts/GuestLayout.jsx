import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react'; // Import usePage
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    const { siteSetting } = usePage().props; // Get siteSetting from Inertia props

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900 px-4">
            <Head>
                {siteSetting?.favicon_url && (
                    <>
                        <link rel="icon" type="image/x-icon" href={siteSetting.favicon_url} />
                        <link rel="shortcut icon" href={siteSetting.favicon_url} />
                        <link rel="apple-touch-icon" href={siteSetting.favicon_url} />
                    </>
                )}
            </Head>
            <div className="mb-6 sm:mb-10">
                <Link href="/" className="flex flex-col items-center gap-3 sm:gap-4 group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                        {siteSetting?.site_logo ? (
                            <img src={siteSetting.site_logo_url} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <i className="fas fa-users text-white text-3xl sm:text-4xl"></i>
                        )}
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                            {siteSetting?.site_name || 'PKPT IPNU IPPNU'}
                        </h1>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mt-1">Portal Administrasi</p>
                    </div>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full sm:max-w-md mt-6 px-6 sm:px-10 py-8 sm:py-12 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-slate-100"
            >
                {children}
            </motion.div>

            <div className="mt-8 sm:mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest">
                © {new Date().getFullYear()} PKPT IPNU IPPNU
            </div>
        </div>
    );
}
