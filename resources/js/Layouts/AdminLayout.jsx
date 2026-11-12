import React, { useState, useEffect } from 'react';
import { usePage, Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Navbar from '@/Components/Admin/Navbar';
import WaveBackground from '@/Components/Admin/WaveBackground';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function AdminLayout({ children }) {
    const { siteSetting, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [dismissedFlash, setDismissedFlash] = useState(null);

    useEffect(() => {
        setDismissedFlash(null);
    }, [flash?.success, flash?.error]);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
            <Head>
                {siteSetting?.favicon_url && (
                    <>
                        <link rel="icon" type="image/x-icon" href={siteSetting.favicon_url} />
                        <link rel="shortcut icon" href={siteSetting.favicon_url} />
                        <link rel="apple-touch-icon" href={siteSetting.favicon_url} />
                    </>
                )}
            </Head>

            {/* Dynamic Wave & Glow Background */}
            <WaveBackground />

            <div className="relative z-10">
                {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 min-h-screen flex flex-col ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
                {/* Navbar */}
                <Navbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                {/* Page Content */}
                <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
                    <div className="max-w-7xl mx-auto w-full">
                        {flash?.success && dismissedFlash !== flash.success && (
                            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                    <span>{flash.success}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setDismissedFlash(flash.success)}
                                    className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-800/40 transition-colors"
                                    aria-label="Tutup"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        {flash?.error && dismissedFlash !== flash.error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <span>{flash.error}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setDismissedFlash(flash.error)}
                                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors"
                                    aria-label="Tutup"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <div className="py-6 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-slate-200 dark:border-slate-800/70">
                    &copy; {new Date().getFullYear()} PKPT IPNU IPPNU. Premium System.
                </div>
                </div>
            </div>
        </div>
    );
}
