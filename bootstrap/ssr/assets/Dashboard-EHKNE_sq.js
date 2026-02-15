import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { Newspaper, Image, Users, Calendar, ArrowRight } from "lucide-react";
function Dashboard({ stats, activities }) {
  const statCards = [
    { title: "Berita", count: stats?.posts || 0, icon: Newspaper, color: "bg-emerald-500", href: "/admin/posts" },
    { title: "Galeri", count: stats?.galleries || 0, icon: Image, color: "bg-blue-500", href: "/admin/galleries" },
    { title: "Anggota", count: stats?.members || 0, icon: Users, color: "bg-indigo-500", href: "/admin/members" },
    { title: "Agenda", count: stats?.agendas || 0, icon: Calendar, color: "bg-amber-500", href: "/admin/agendas" }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Dashboard Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "Selamat datang kembali di panel administrasi." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: statCards.map((card, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: card.title }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-slate-800 dark:text-white mt-2", children: card.count })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `p-3 rounded-xl ${card.color} text-white shadow-lg shadow-emerald-500/20`, children: /* @__PURE__ */ jsx(card.icon, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-slate-50 dark:border-slate-700", children: /* @__PURE__ */ jsxs(Link, { href: card.href, className: "text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 group", children: [
        "Kelola Data ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "group-hover:translate-x-1 transition-transform" })
      ] }) })
    ] }, index)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-800 dark:text-white", children: "Aktivitas Terbaru" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded", children: "Real-time" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: activities && activities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-6", children: activities.map((activity, idx) => {
        const IconComponent = activity.icon === "Newspaper" ? Newspaper : Calendar;
        return /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(IconComponent, { size: 18, className: "text-slate-400" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800 dark:text-white", children: activity.title }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
              activity.time,
              " • oleh ",
              activity.user
            ] })
          ] })
        ] }, idx);
      }) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-10 text-slate-400", children: /* @__PURE__ */ jsx("p", { children: "Belum ada aktivitas terbaru." }) }) })
    ] })
  ] });
}
export {
  Dashboard as default
};
