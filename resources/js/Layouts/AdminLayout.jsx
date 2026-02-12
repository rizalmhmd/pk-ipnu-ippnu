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
                {siteSetting?.favicon && (
                    <>
                        <link rel="icon" type="image/x-icon" href={`/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`} />
                        <link rel="shortcut icon" href={`/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`} />
                        <link rel="apple-touch-icon" href={`/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`} />
                    </>
                )}
            </Head>
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
    );
}
