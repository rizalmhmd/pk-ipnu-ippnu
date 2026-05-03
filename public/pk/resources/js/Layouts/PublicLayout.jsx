import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage, Head, router } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const { url, props } = usePage();
    const { siteSetting } = props;

    useEffect(() => {
        if (window.Echo) {
            console.log('Echo initialized, subscribing to public-content...');
            const channel = window.Echo.channel('public-content')
                .listen('.content.updated', (e) => {
                    console.log('Real-time content update received:', e);
                    router.reload({
                        preserveScroll: true,
                        preserveState: true
                    });
                });

            return () => {
                channel.stopListening('.content.updated');
            };
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900">
            <Head>
                {siteSetting?.favicon_url && (
                    <>
                        <link rel="icon" type="image/x-icon" href={siteSetting.favicon_url} />
                        <link rel="shortcut icon" href={siteSetting.favicon_url} />
                        <link rel="apple-touch-icon" href={siteSetting.favicon_url} />
                    </>
                )}
                <meta name="description" content={siteSetting?.site_description || 'Website Resmi PKPT IPNU IPPNU'} />
                <meta name="keywords" content={siteSetting?.meta_keywords || 'IPNU, IPPNU, PKPT, Pelajar NU, Organisasi'} />
                <meta property="og:title" content={siteSetting?.site_name || 'PKPT IPNU IPPNU'} />
                <meta property="og:description" content={siteSetting?.site_description || 'Portal Informasi Resmi PKPT IPNU IPPNU'} />
                <meta property="og:type" content="website" />
            </Head>
            <Navbar />

            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />

            {/* Scroll to Top Button or other global elements could go here */}
        </div>
    );
}
