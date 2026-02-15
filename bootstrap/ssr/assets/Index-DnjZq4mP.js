import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { Plus, CheckCircle2, XCircle, Quote, User, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
function Index({ quotes }) {
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kutipan ini?")) {
      router.delete(route("admin.quotes.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Kutipan" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Quote & Inspirasi" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Manajemen kutipan untuk ditampilkan di halaman depan." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.quotes.create"),
          className: "inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            "Tambah Quote"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8", children: quotes.map((quote, idx) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: idx * 0.1 },
        className: "bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-10 relative group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-8 right-8", children: quote.is_active ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 text-[8px] font-black uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { size: 10 }),
            " Active"
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full border border-slate-100 dark:border-slate-700 text-[8px] font-black uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx(XCircle, { size: 10 }),
            " Inactive"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-8 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl w-fit text-emerald-600 dark:text-emerald-400", children: /* @__PURE__ */ jsx(Quote, { size: 24 }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic mb-8 relative z-10", children: [
            '"',
            quote.content,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden border border-slate-50 dark:border-slate-700", children: quote.image ? /* @__PURE__ */ jsx("img", { src: quote.image_url, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(User, { size: 18, className: "text-slate-300" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider", children: quote.author || "Anonymous" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-400", children: [
                  "Order: ",
                  quote.order
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.quotes.edit", quote.id),
                  className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all",
                  children: /* @__PURE__ */ jsx(Edit, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(quote.id),
                  className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all",
                  children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                }
              )
            ] })
          ] })
        ]
      },
      quote.id
    )) }),
    quotes.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-20 text-center shadow-xl shadow-slate-200/50 dark:shadow-none mt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6", children: /* @__PURE__ */ jsx(Quote, { size: 40 }) }),
      /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Belum Ada Quote" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 dark:text-slate-600 text-sm italic", children: "Simpan kata-kata inspiratif untuk penyemangat organisasi." })
    ] })
  ] });
}
export {
  Index as default
};
