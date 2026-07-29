import React, { useState, useEffect } from 'react';
import { usePage, Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import Navbar from '@/Components/Admin/Navbar';

export default function AdminLayout({ children }) {
    const { siteSetting } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Head>
                {siteSetting?.favicon_url && (
                    <>
                        <link rel="icon" type="image/x-icon" href={siteSetting.favicon_url} />
                        <link rel="shortcut icon" href={siteSetting.favicon_url} />
                        <link rel="apple-touch-icon" href={siteSetting.favicon_url} />
                    </>
                )}
            </Head>

            {/* Light Mode Decorative Background */}
            <div className="fixed inset-0 z-0 pointer-events-none dark:hidden overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                {/* Top Left Emerald Glow */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]"></div>
                {/* Bottom Right Blue Glow */}
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"></div>
                {/* Center Top Subtle Glow */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[30rem] h-[20rem] bg-emerald-200/30 rounded-full blur-[120px]"></div>
            </div>

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
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <div className="py-6 text-center text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest border-t border-slate-200 dark:border-slate-800">
                    &copy; {new Date().getFullYear()} PKPT IPNU IPPNU. Premium System.
                </div>
                </div>
            </div>
        </div>
    );
}
