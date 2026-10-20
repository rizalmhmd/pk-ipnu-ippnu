import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import {
    Menu,
    Moon,
    Sun,
    Bell,
    User,
    LogOut,
    ChevronDown,
    UserCheck,
    FileText,
    Newspaper,
    Calendar,
    Activity,
    CheckCheck,
    BellOff,
} from 'lucide-react';

export default function Navbar({ toggleSidebar, darkMode, toggleDarkMode }) {
    const { auth, adminNotifications = [] } = usePage().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Track unread notifications using last read timestamp in localStorage
    const [lastReadTime, setLastReadTime] = useState(() => {
        try {
            return parseInt(localStorage.getItem('admin_last_read_notifications') || '0', 10);
        } catch (e) {
            return 0;
        }
    });

    // Unread count: items whose timestamp in milliseconds > lastReadTime
    const unreadCount = adminNotifications.filter(
        (item) => (item.timestamp || 0) * 1000 > lastReadTime
    ).length;

    const markAllAsRead = (e) => {
        if (e) e.stopPropagation();
        const now = Date.now();
        setLastReadTime(now);
        try {
            localStorage.setItem('admin_last_read_notifications', String(now));
        } catch (err) {}
    };

    const handleNotificationClick = (item) => {
        setIsNotificationOpen(false);
        const itemTime = (item.timestamp || 0) * 1000;
        if (itemTime > lastReadTime) {
            const newRead = Math.max(lastReadTime, itemTime);
            setLastReadTime(newRead);
            try {
                localStorage.setItem('admin_last_read_notifications', String(newRead));
            } catch (err) {}
        }
    };

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
                        title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Notification Bell Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsNotificationOpen(!isNotificationOpen);
                                setIsProfileOpen(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all relative group ${
                                isNotificationOpen
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-slate-800 dark:text-emerald-400'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            aria-label="Pemberitahuan"
                            title="Notifikasi Sistem"
                        >
                            <Bell size={20} className={unreadCount > 0 ? 'text-emerald-600 dark:text-emerald-400' : ''} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white shadow-sm shadow-red-500/50 animate-pulse">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Popup Dropdown */}
                        {isNotificationOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40 cursor-default"
                                    onClick={() => setIsNotificationOpen(false)}
                                />
                                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* Header */}
                                    <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40">
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Notifikasi Penting</span>
                                            {unreadCount > 0 && (
                                                <span className="text-[10px] font-black bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                                                    {unreadCount} Baru
                                                </span>
                                            )}
                                        </div>
                                        {unreadCount > 0 ? (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                                                title="Tandai semua notifikasi telah dibaca"
                                            >
                                                <CheckCheck size={14} />
                                                Tandai dibaca
                                            </button>
                                        ) : (
                                            <span className="text-[11px] text-slate-400 font-medium">Semua beres</span>
                                        )}
                                    </div>

                                    {/* Items List */}
                                    <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50 custom-scrollbar">
                                        {adminNotifications.length > 0 ? (
                                            adminNotifications.map((item) => {
                                                const isUnread = (item.timestamp || 0) * 1000 > lastReadTime;
                                                let IconComp = Bell;
                                                if (item.icon === 'UserCheck') IconComp = UserCheck;
                                                if (item.icon === 'FileText') IconComp = FileText;
                                                if (item.icon === 'Newspaper') IconComp = Newspaper;
                                                if (item.icon === 'Calendar') IconComp = Calendar;
                                                if (item.icon === 'Activity') IconComp = Activity;

                                                const colorMap = {
                                                    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                                                    blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-500/20',
                                                    teal: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border-teal-500/20',
                                                    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-500/20',
                                                };

                                                return (
                                                    <Link
                                                        key={item.id}
                                                        href={item.url}
                                                        onClick={() => handleNotificationClick(item)}
                                                        className={`flex items-start gap-3.5 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group ${
                                                            isUnread ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                                                        }`}
                                                    >
                                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[item.color] || colorMap.emerald} group-hover:scale-105 transition-transform`}>
                                                            <IconComp size={16} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                                    {item.title}
                                                                </p>
                                                                {isUnread && (
                                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-500/50" />
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                                {item.message}
                                                            </p>
                                                            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 block">
                                                                {item.time}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <div className="py-10 text-center px-6">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                                                    <BellOff size={22} />
                                                </div>
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak Ada Notifikasi Penting</p>
                                                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                                    Pemberitahuan hanya akan muncul jika ada pendaftaran kegiatan baru atau hal penting yang butuh tindakan Anda.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    {auth?.user?.role !== 'departemen' && (
                                        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-center">
                                            <Link
                                                href="/admin/registrations"
                                                onClick={() => setIsNotificationOpen(false)}
                                                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
                                            >
                                                Lihat Data Pendaftar
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsProfileOpen(!isProfileOpen);
                                setIsNotificationOpen(false);
                            }}
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
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
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
