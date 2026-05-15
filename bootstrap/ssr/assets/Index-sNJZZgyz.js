import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-aeaPXddD.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { Plus, Image, Calendar, Eye, Edit, Trash2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { u as useRealtimeUpdates } from "./useRealtimeUpdates-CAqg7-RS.js";
function Index({ posts }) {
  useRealtimeUpdates("Post", "posts");
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      router.delete(route("admin.posts.destroy", id), {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Berita" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Kelola Berita" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Manajemen seluruh konten berita dan informasi organisasi." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.posts.create"),
          className: "inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18 }),
            "Tambah Berita"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50 dark:bg-slate-800/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Informasi Berita" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell", children: "Statistik" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-800", children: posts.data.map((post) => /* @__PURE__ */ jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm", children: post.image ? /* @__PURE__ */ jsx("img", { src: post.image_url, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500", alt: "" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600", children: /* @__PURE__ */ jsx(Image, { size: 24 }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-slate-900 dark:text-white text-base truncate mb-1 group-hover:text-emerald-600 transition-colors", children: post.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs font-bold text-slate-400", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px]", children: [
                      /* @__PURE__ */ jsx(Calendar, { size: 12, className: "text-emerald-500" }),
                      new Date(post.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "truncate max-w-[150px]", children: "Oleh: Admin" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6 hidden md:table-cell", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-600/60 uppercase tracking-wider", children: "Status" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-600 dark:text-slate-300", children: "Published" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("news.show", post.slug),
                    target: "_blank",
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all",
                    title: "Lihat",
                    children: /* @__PURE__ */ jsx(Eye, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.posts.edit", post.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all",
                    title: "Edit",
                    children: /* @__PURE__ */ jsx(Edit, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(post.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all",
                    title: "Hapus",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
                  }
                )
              ] }) })
            ]
          },
          post.id
        )) })
      ] }) }),
      posts.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6", children: /* @__PURE__ */ jsx(FileText, { size: 40 }) }),
        /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Belum Ada Berita" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 dark:text-slate-600 text-sm italic", children: "Mulai dengan menambahkan berita pertama Anda." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "scale-90 -mt-10", children: /* @__PURE__ */ jsx(Pagination, { links: posts.links }) })
  ] });
}
export {
  Index as default
};
