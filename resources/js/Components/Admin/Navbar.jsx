import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import {
    Menu,
    Moon,
    Sun,
    Bell,
    User,
    LogOut,
    ChevronDown
} from 'lucide-react';

export default function Navbar({ toggleSidebar, darkMode, toggleDarkMode }) {
    const { auth } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="fixed top-0 right-0 left-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-30 transition-all duration-300 lg:pl-[inherit]">
            <div className="h-full px-6 flex items-center justify-between">

                {/* Left: Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
                        Dashboard
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Notifications (Static for now) */}
                    <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                {auth?.user?.name?.charAt(0) || 'A'}
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block">
                                {auth?.user?.name || 'Admin'}
                            </span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </button>

                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-0 cursor-default"
                                    onClick={() => setIsProfileOpen(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Terdaftar sebagai</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                            {auth?.user?.email}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href="/admin/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        >
                                            <User size={16} /> Profil Saya
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <LogOut size={16} /> Keluar
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
