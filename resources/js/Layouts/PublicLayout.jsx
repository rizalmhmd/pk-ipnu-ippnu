import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import { usePage, Head } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const { url, props } = usePage();
    const { siteSetting } = props;

    useEffect(() => {
        // Ensure admin dark mode class never leaks onto public pages
        document.documentElement.classList.remove('dark');
    }, [url]);

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
                <meta name="description" content={siteSetting?.meta_description || 'Website Resmi PKPT IPNU IPPNU'} />
                <meta name="keywords" content="IPNU, IPPNU, PKPT, Pelajar NU, Organisasi" />
                <meta property="og:title" content={siteSetting?.site_name || 'PKPT IPNU IPPNU'} />
                <meta property="og:description" content={siteSetting?.meta_description || 'Portal Informasi Resmi PKPT IPNU IPPNU'} />
                <meta property="og:type" content="website" />
            </Head>
            <Navbar />

            <main className="flex-grow">
                <motion.div
                    key={url}
                    initial={{ opacity: 0.92 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </main>

            <Footer />

            {/* Scroll to Top Button or other global elements could go here */}
        </div>
    );
}
