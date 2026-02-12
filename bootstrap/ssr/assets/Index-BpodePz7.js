import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DqM_CwAN.js";
import { Plus, CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
function Index({ statistics }) {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data statistik akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("admin.statistics.destroy", id), {
          onSuccess: () => {
            Swal.fire("Terhapus!", "Data statistik berhasil dihapus.", "success");
          }
        });
      }
    });
  };
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    indigo: "bg-indigo-100 text-indigo-800",
    cyan: "bg-cyan-100 text-cyan-800",
    teal: "bg-teal-100 text-teal-800",
    orange: "bg-orange-100 text-orange-800"
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manajemen Statistik" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: "Statistik" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm mt-1", children: "Kelola data statistik yang ditampilkan di beranda." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.statistics.create"),
          className: "inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-emerald-600/20",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            /* @__PURE__ */ jsx("span", { children: "Tambah Statistik" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-slate-600 dark:text-slate-400", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-bold border-b border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Urutan" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Judul" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Nilai" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Warna" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Aksi" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: statistics.length > 0 ? statistics.map((stat) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 font-bold", children: [
          "#",
          stat.order
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800 dark:text-slate-200", children: stat.title }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: stat.subtitle })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: "font-mono font-bold text-slate-700 dark:text-slate-300", children: [
          stat.value,
          " ",
          stat.unit
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-md text-xs font-bold uppercase ${colorClasses[stat.color] || "bg-slate-100 text-slate-800"}`, children: stat.color }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: stat.is_active ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 14 }),
          " Aktif"
        ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-bold", children: [
          /* @__PURE__ */ jsx(XCircle, { size: 14 }),
          " Nonaktif"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.statistics.edit", stat.id),
              className: "w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors",
              title: "Edit",
              children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(stat.id),
              className: "w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 transition-colors",
              title: "Hapus",
              children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
            }
          )
        ] }) })
      ] }, stat.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "6", className: "px-6 py-12 text-center text-slate-400 dark:text-slate-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-chart-bar text-4xl mb-2 opacity-20" }),
        /* @__PURE__ */ jsx("p", { children: "Belum ada data statistik." })
      ] }) }) }) })
    ] }) }) })
  ] });
}
export {
  Index as default
};
