import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { LayoutDashboard, Newspaper, FileText, Quote, Image, Users, Calendar, BarChart, UserCog, Settings, User, Globe, LogOut, Menu, Sun, Moon, Bell, ChevronDown } from "lucide-react";
function Sidebar({ isOpen, setIsOpen }) {
  const { url } = usePage();
  const { auth } = usePage().props;
  const userRole = auth?.user?.role || "admin";
  const allMenuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["admin", "ketua", "departemen"] },
    { name: "Berita", href: "/admin/posts", icon: Newspaper, roles: ["admin", "departemen"] },
    { name: "Artikel", href: "/admin/articles", icon: FileText, roles: ["admin", "departemen"] },
    { name: "Quotes", href: "/admin/quotes", icon: Quote, roles: ["admin", "departemen"] },
    { name: "Galeri", href: "/admin/galleries", icon: Image, roles: ["admin", "ketua"] },
    { name: "Anggota", href: "/admin/members", icon: Users, roles: ["admin", "ketua"] },
    { name: "Agenda", href: "/admin/agendas", icon: Calendar, roles: ["admin", "ketua"] },
    { name: "Statistik", href: "/admin/statistics", icon: BarChart, roles: ["admin", "ketua"] }
  ];
  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));
  const allSettingItems = [
    { name: "Manajemen User", href: "/admin/users", icon: UserCog, roles: ["admin"] },
    { name: "Pengaturan", href: "/admin/site-settings", icon: Settings, roles: ["admin"] },
    { name: "Halaman", href: "/admin/page-settings", icon: FileText, roles: ["admin"] },
    { name: "Profil", href: "/admin/profile", icon: User, roles: ["admin", "ketua", "departemen"] }
  ];
  const settingItems = allSettingItems.filter((item) => item.roles.includes(userRole));
  const isActive = (path) => url.startsWith(path);
  const roleBadge = {
    admin: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", label: "Admin" },
    ketua: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", label: "Ketua" },
    departemen: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", label: "Dept" }
  };
  const badge = roleBadge[userRole] || roleBadge.admin;
  const NavLink = ({ item }) => /* @__PURE__ */ jsxs(
    Link,
    {
      href: item.href,
      onClick: () => {
        if (window.innerWidth < 1024) {
          setIsOpen(false);
        }
      },
      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive(item.href) ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800"}`,
      children: [
        /* @__PURE__ */ jsx(item.icon, { size: 20, strokeWidth: isActive(item.href) ? 2.5 : 2 }),
        /* @__PURE__ */ jsx("span", { className: `font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 lg:opacity-0 lg:w-0"}`, children: item.name }),
        !isOpen && /* @__PURE__ */ jsx("div", { className: "absolute left-16 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity lg:block hidden pointer-events-none whitespace-nowrap z-50", children: item.name })
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity",
        onClick: () => setIsOpen(false)
      }
    ),
    /* @__PURE__ */ jsx("aside", { className: `fixed top-0 left-0 z-40 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${isOpen ? "w-64" : "w-64 -translate-x-full lg:translate-x-0 lg:w-20"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-20 flex items-center justify-center border-b border-slate-100 dark:border-slate-800", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/20", children: "IP" }),
        /* @__PURE__ */ jsxs("div", { className: `ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-800 dark:text-white text-lg block leading-tight", children: "AdminPanel" }),
          /* @__PURE__ */ jsx("span", { className: `text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${badge.bg} ${badge.text}`, children: badge.label })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: `px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 text-center"}`, children: "Menu" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: menuItems.map((item) => /* @__PURE__ */ jsx(NavLink, { item }, item.name)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: `px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 text-center"}`, children: "System" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: settingItems.map((item) => /* @__PURE__ */ jsx(NavLink, { item }, item.name)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 border-t border-slate-100 dark:border-slate-800 space-y-1", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            target: "_blank",
            className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all`,
            children: [
              /* @__PURE__ */ jsx(Globe, { size: 20 }),
              /* @__PURE__ */ jsx("span", { className: `font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`, children: "Lihat Website" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/logout",
            method: "post",
            as: "button",
            className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all`,
            children: [
              /* @__PURE__ */ jsx(LogOut, { size: 20 }),
              /* @__PURE__ */ jsx("span", { className: `font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`, children: "Keluar" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function Navbar({ toggleSidebar, darkMode, toggleDarkMode }) {
  const { auth } = usePage().props;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return /* @__PURE__ */ jsx("nav", { className: "fixed top-0 right-0 left-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-30 transition-all duration-300 lg:pl-[inherit]", children: /* @__PURE__ */ jsxs("div", { className: "h-full px-6 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleSidebar,
          className: "p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
          children: /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-slate-800 dark:text-white hidden sm:block", children: "Dashboard" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleDarkMode,
          className: "p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
          children: darkMode ? /* @__PURE__ */ jsx(Sun, { size: 20 }) : /* @__PURE__ */ jsx(Moon, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxs("button", { className: "p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative", children: [
        /* @__PURE__ */ jsx(Bell, { size: 20 }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsProfileOpen(!isProfileOpen),
            className: "flex items-center gap-3 pl-3 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm", children: auth?.user?.name?.charAt(0) || "A" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block", children: auth?.user?.name || "Admin" }),
              /* @__PURE__ */ jsx(ChevronDown, { size: 16, className: "text-slate-400" })
            ]
          }
        ),
        isProfileOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 z-0 cursor-default",
              onClick: () => setIsProfileOpen(false)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-slate-100 dark:border-slate-800", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 uppercase tracking-wider font-bold", children: "Terdaftar sebagai" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: auth?.user?.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-1", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/profile",
                  className: "flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                  children: [
                    /* @__PURE__ */ jsx(User, { size: 16 }),
                    " Profil Saya"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/logout",
                  method: "post",
                  as: "button",
                  className: "w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { size: 16 }),
                    " Keluar"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function AdminLayout({ children }) {
  const { siteSetting } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx(Head, { children: siteSetting?.favicon_url && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: siteSetting.favicon_url }),
      /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: siteSetting.favicon_url }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", href: siteSetting.favicon_url })
    ] }) }),
    /* @__PURE__ */ jsx(Sidebar, { isOpen: sidebarOpen, setIsOpen: setSidebarOpen }),
    /* @__PURE__ */ jsxs("div", { className: `transition-all duration-300 min-h-screen flex flex-col ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`, children: [
      /* @__PURE__ */ jsx(
        Navbar,
        {
          toggleSidebar: () => setSidebarOpen(!sidebarOpen),
          darkMode,
          toggleDarkMode
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto w-full", children }) }),
      /* @__PURE__ */ jsxs("div", { className: "py-6 text-center text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest border-t border-slate-200 dark:border-slate-800", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " PKPT IPNU IPPNU. Premium System."
      ] })
    ] })
  ] });
}
export {
  AdminLayout as A
};
