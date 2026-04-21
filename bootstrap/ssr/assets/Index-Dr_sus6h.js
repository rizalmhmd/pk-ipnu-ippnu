import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-aeaPXddD.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { Plus, Clock, MapPin, Edit, Trash2, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
function Index({ agendas }) {
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus agenda ini?")) {
      router.delete(route("admin.agendas.destroy", id), {
        preserveScroll: true
      });
    }
  };
  const categoryStyles = {
    nasional: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800",
    organisasi: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
    keagamaan: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    khusus: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800"
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Agenda" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Agenda & Kegiatan" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Manajemen jadwal program kerja dan kegiatan organisasi." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.agendas.create"),
          className: "inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            "Tambah Agenda"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50 dark:bg-slate-800/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Waktu & Agenda" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell", children: "Kategori" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-800", children: agendas.data.map((agenda) => /* @__PURE__ */ jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-14 h-14 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-800/50", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-black leading-none", children: new Date(agenda.event_date).getDate() }),
                  /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold uppercase tracking-tighter", children: new Date(agenda.event_date).toLocaleDateString("id-ID", { month: "short" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-slate-900 dark:text-white text-base truncate mb-2 group-hover:text-emerald-600 transition-colors", children: agenda.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400 tracking-wide", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(Clock, { size: 12, className: "text-emerald-500" }),
                      agenda.event_time ? agenda.event_time.substring(0, 5) : "--:--",
                      " WIB"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(MapPin, { size: 12, className: "text-emerald-500" }),
                      agenda.location || "Lokasi Belum Ditentukan"
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6 hidden md:table-cell", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border ${categoryStyles[agenda.category] || categoryStyles.organisasi}`, children: agenda.category }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.agendas.edit", agenda.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all",
                    title: "Edit",
                    children: /* @__PURE__ */ jsx(Edit, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(agenda.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all",
                    title: "Hapus",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
                  }
                )
              ] }) })
            ]
          },
          agenda.id
        )) })
      ] }) }),
      agendas.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6", children: /* @__PURE__ */ jsx(ClipboardList, { size: 40 }) }),
        /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Belum Ada Agenda" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 dark:text-slate-600 text-sm italic", children: "Mulai rencanakan kegiatan organisasi kedepan." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "scale-90 -mt-10", children: /* @__PURE__ */ jsx(Pagination, { links: agendas.links }) })
  ] });
}
export {
  Index as default
};
