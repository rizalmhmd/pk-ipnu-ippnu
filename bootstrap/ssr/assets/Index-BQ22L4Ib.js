import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-2Ze9ffSM.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { Plus, Trash2, FileImage } from "lucide-react";
import { motion } from "framer-motion";
import { u as useRealtimeUpdates } from "./useRealtimeUpdates-CAqg7-RS.js";
function Index({ galleries }) {
  useRealtimeUpdates("Gallery", "galleries");
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini dari galeri?")) {
      router.delete(route("admin.galleries.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Galeri" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Galeri Foto" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Manajemen dokumentasi visual kegiatan organisasi." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.galleries.create"),
          className: "inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            "Tambah Foto"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: galleries.data.map((item, idx) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: idx * 0.05 },
        className: "group bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-square relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image_url,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                alt: item.title
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(item.id),
                className: "w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-all shadow-lg",
                title: "Hapus",
                children: /* @__PURE__ */ jsx(Trash2, { size: 20 })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2 leading-relaxed", children: item.title }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: new Date(item.created_at).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) }),
              /* @__PURE__ */ jsx("div", { className: "p-1 px-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[8px] font-bold uppercase tracking-widest", children: "JPEG/PNG" })
            ] })
          ] })
        ]
      },
      item.id
    )) }),
    galleries.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 p-20 text-center shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6", children: /* @__PURE__ */ jsx(FileImage, { size: 40 }) }),
      /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Belum Ada Foto" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 dark:text-slate-600 text-sm italic", children: "Gallery foto masih kosong, upload dokumentasi pertama Anda." })
    ] }),
    galleries.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "scale-90 -mt-10", children: /* @__PURE__ */ jsx(Pagination, { links: galleries.links }) })
  ] });
}
export {
  Index as default
};
