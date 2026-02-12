import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DqM_CwAN.js";
import { Calendar, Home, Image, Info, Layout, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
function Index({ settings }) {
  const pageIcons = {
    home: Home,
    about: Info,
    gallery: Image,
    agenda: Calendar,
    home_greeting: Home,
    home_agenda: Calendar
  };
  const getPageName = (slug) => {
    switch (slug) {
      case "home":
        return "Beranda";
      case "about":
        return "Profil / Tentang";
      case "gallery":
        return "Galeri Foto";
      case "agenda":
        return "Agenda & Kegiatan";
      case "home_greeting":
        return "Beranda: Sambutan";
      case "home_agenda":
        return "Beranda: Agenda";
      default:
        return slug;
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pengaturan Halaman" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Manajemen Halaman" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Atur konten dinamis, hero section, dan metadata tiap halaman." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8", children: settings.map((page, idx) => {
      const Icon = pageIcons[page.page_name] || Layout;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.1 },
          className: "bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-10 relative group overflow-hidden flex flex-col h-full",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-3xl w-fit group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsx(Icon, { size: 28 }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight leading-tight", children: getPageName(page.page_name) }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 italic", children: [
                "/",
                page.page_name
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-auto pb-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "Hero Title" }),
                  /* @__PURE__ */ jsx("span", { className: page.hero_title ? "text-emerald-500" : "text-slate-200", children: page.hero_title ? "Set" : "Not Set" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400", children: [
                  /* @__PURE__ */ jsx("span", { children: "Banner" }),
                  /* @__PURE__ */ jsx("span", { className: page.hero_image ? "text-emerald-500" : "text-slate-200", children: page.hero_image ? "Exist" : "Empty" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.page-settings.edit", page.id),
                  className: "w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-[2rem] font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-900/20 transition-all",
                  children: [
                    "Konfigurasi",
                    /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
                  ]
                }
              )
            ] })
          ]
        },
        page.id
      );
    }) })
  ] });
}
export {
  Index as default
};
