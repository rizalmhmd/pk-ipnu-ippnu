import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Newspaper,
    Image,
    Users,
    Calendar,
    Quote,
    Settings,
    FileText,
    User,
    LogOut,
    Globe,
    BarChart,
    UserCog
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'admin';

    // ─── Build menu based on role ──────────────────────────────────────────

    const allMenuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['admin', 'ketua', 'departemen'] },
        { name: 'Berita', href: '/admin/posts', icon: Newspaper, roles: ['admin', 'departemen'] },
        { name: 'Artikel', href: '/admin/articles', icon: FileText, roles: ['admin', 'departemen'] },
        { name: 'Quotes', href: '/admin/quotes', icon: Quote, roles: ['admin', 'departemen'] },
        { name: 'Galeri', href: '/admin/galleries', icon: Image, roles: ['admin', 'ketua'] },
        { name: 'Anggota', href: '/admin/members', icon: Users, roles: ['admin', 'ketua'] },
        { name: 'Agenda', href: '/admin/agendas', icon: Calendar, roles: ['admin', 'ketua'] },
        { name: 'Statistik', href: '/admin/statistics', icon: BarChart, roles: ['admin', 'ketua'] },
    ];

    const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

    const allSettingItems = [
        { name: 'Manajemen User', href: '/admin/users', icon: UserCog, roles: ['admin'] },
        { name: 'Pengaturan', href: '/admin/site-settings', icon: Settings, roles: ['admin'] },
        { name: 'Halaman', href: '/admin/page-settings', icon: FileText, roles: ['admin'] },
        { name: 'Profil', href: '/admin/profile', icon: User, roles: ['admin', 'ketua', 'departemen'] },
    ];

    const settingItems = allSettingItems.filter(item => item.roles.includes(userRole));

    const isActive = (path) => url.startsWith(path);

    // ─── Role badge colors ─────────────────────────────────────────────────
    const roleBadge = {
        admin:      { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', label: 'Admin' },
        ketua:      { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', label: 'Ketua' },
        departemen: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', label: 'Dept' },
    };

    const badge = roleBadge[userRole] || roleBadge.admin;

    const NavLink = ({ item }) => (
        <Link
            href={item.href}
            onClick={() => {
                // Auto-close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                    setIsOpen(false);
                }
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive(item.href)
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
        >
            <item.icon size={20} strokeWidth={isActive(item.href) ? 2.5 : 2} />
            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 lg:opacity-0 lg:w-0'}`}>
                {item.name}
            </span>

            {/* Tooltip for collapsed state */}
            {!isOpen && (
                <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity lg:block hidden pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                </div>
            )}
        </Link>
    );

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo + Role Badge */}
                    <div className="h-20 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/20">
                            IP
                        </div>
                        <div className={`ml-3 transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                            <span className="font-bold text-slate-800 dark:text-white text-lg block leading-tight">
                                AdminPanel
                            </span>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${badge.bg} ${badge.text}`}>
                                {badge.label}
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
                        <div>
                            <p className={`px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 text-center'}`}>
                                Menu
                            </p>
                            <div className="space-y-1">
                                {menuItems.map((item) => (
                                    <NavLink key={item.name} item={item} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className={`px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 text-center'}`}>
                                System
                            </p>
                            <div className="space-y-1">
                                {settingItems.map((item) => (
                                    <NavLink key={item.name} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <a
                            href="/"
                            target="_blank"
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all`}
                        >
                            <Globe size={20} />
                            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                Lihat Website
                            </span>
                        </a>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`}
                        >
                            <LogOut size={20} />
                            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                Keluar
                            </span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
