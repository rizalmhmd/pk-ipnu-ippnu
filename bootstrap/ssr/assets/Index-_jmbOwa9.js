import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-2Ze9ffSM.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { Filter, FileImage, Eye, Check, X, Trash2, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
function RegistrationsIndex({ registrations, agendas, filters }) {
  const [selectedReg, setSelectedReg] = useState(null);
  const handleFilterChange = (key, value) => {
    router.get(route("admin.registrations.index"), { ...filters, [key]: value }, { preserveState: true, preserveScroll: true });
  };
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pendaftar ini?")) {
      router.delete(route("admin.registrations.destroy", id), { preserveScroll: true });
    }
  };
  const handleUpdateStatus = (id, status) => {
    router.put(route("admin.registrations.updateStatus", id), { status }, { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Semua Pendaftar" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2", children: "Data Pendaftar Global" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Kelola semua pendaftar dari berbagai agenda." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.agenda_id || "",
            onChange: (e) => handleFilterChange("agenda_id", e.target.value),
            className: "pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none min-w-[200px]",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Semua Agenda" }),
              agendas.map((a) => /* @__PURE__ */ jsx("option", { value: a.id, children: a.title }, a.id))
            ]
          }
        ),
        /* @__PURE__ */ jsx(Filter, { size: 16, className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50 dark:bg-slate-800/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap", children: "Waktu Daftar" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap", children: "Agenda" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center", children: "Metode" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-center", children: "Bukti Bayar" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-800", children: registrations.data.map((reg) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400", children: new Date(reg.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800 dark:text-white line-clamp-1", children: reg.agenda?.title }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reg.payment_method === "transfer" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`, children: reg.payment_method }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reg.status === "approved" ? "bg-emerald-100 text-emerald-700" : reg.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`, children: reg.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: reg.payment_proof ? /* @__PURE__ */ jsx("a", { href: `/${reg.payment_proof}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center p-2 bg-blue-50 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors", title: "Lihat Bukti Bayar", children: /* @__PURE__ */ jsx(FileImage, { size: 16 }) }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 italic", children: "-" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedReg(reg),
                className: "p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-500 rounded-lg transition-all",
                title: "Lihat Detail Form",
                children: /* @__PURE__ */ jsx(Eye, { size: 16 })
              }
            ),
            reg.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("button", { onClick: () => handleUpdateStatus(reg.id, "approved"), className: "p-2 bg-emerald-50 text-emerald-500 hover:bg-emerald-100 rounded-lg transition-all", title: "Setujui", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleUpdateStatus(reg.id, "rejected"), className: "p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all", title: "Tolak", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(reg.id), className: "p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all", title: "Hapus", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
          ] }) })
        ] }, reg.id)) })
      ] }) }),
      registrations.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx(Users, { size: 40, className: "mx-auto text-slate-300 mb-4" }),
        /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Tidak ada pendaftar" })
      ] })
    ] }),
    registrations.links && /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsx(Pagination, { links: registrations.links }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedReg && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setSelectedReg(null), className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" }),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Detail Jawaban Form" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedReg(null), className: "p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full transition-colors", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-1", children: "Agenda" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-800 dark:text-white", children: selectedReg.agenda?.title })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4", children: selectedReg.agenda?.form_schema?.map((field) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-1", children: field.label }),
            /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 whitespace-pre-wrap", children: selectedReg.responses[field.id] || "-" })
          ] }, field.id)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RegistrationsIndex as default
};
