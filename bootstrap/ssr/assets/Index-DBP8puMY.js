import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-2Ze9ffSM.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { UserPlus, User, Instagram, Edit, Trash2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { u as useRealtimeUpdates } from "./useRealtimeUpdates-CAqg7-RS.js";
function Index({ members }) {
  useRealtimeUpdates("Member", "members");
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data anggota ini?")) {
      router.delete(route("admin.members.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Anggota" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Kelola Anggota" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Manajemen data personalia kepengurusan PKPT IPNU IPPNU." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.members.create"),
          className: "inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm",
          children: [
            /* @__PURE__ */ jsx(UserPlus, { size: 18 }),
            "Tambah Anggota"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50 dark:bg-slate-800/50", children: [
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Profil & Jabatan" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell text-center", children: "Organisasi" }),
          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-800", children: members.data.map((member) => /* @__PURE__ */ jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm relative group/photo", children: [
                  member.photo ? /* @__PURE__ */ jsx("img", { src: member.photo_url, className: "w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-500", alt: "" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600", children: /* @__PURE__ */ jsx(User, { size: 24 }) }),
                  member.instagram && /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `https://instagram.com/${member.instagram}`,
                      target: "_blank",
                      className: "absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white scale-0 group-hover/photo:scale-100 transition-transform duration-300",
                      children: /* @__PURE__ */ jsx(Instagram, { size: 10 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-slate-900 dark:text-white text-base truncate mb-1", children: member.name }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400", children: member.position }),
                    /* @__PURE__ */ jsx("span", { className: "text-slate-200 dark:text-slate-700", children: "|" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-400", children: [
                      "Order: ",
                      member.order || 0
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6 hidden md:table-cell text-center", children: /* @__PURE__ */ jsx("span", { className: `inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${member.type === "ipnu" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"}`, children: member.type }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.members.edit", member.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all",
                    title: "Edit",
                    children: /* @__PURE__ */ jsx(Edit, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(member.id),
                    className: "p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all",
                    title: "Hapus",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
                  }
                )
              ] }) })
            ]
          },
          member.id
        )) })
      ] }) }),
      members.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-6", children: /* @__PURE__ */ jsx(Users, { size: 40 }) }),
        /* @__PURE__ */ jsx("h5", { className: "text-lg font-bold text-slate-400", children: "Belum Ada Anggota" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 dark:text-slate-600 text-sm italic", children: "Input data kepengurusan pertama Anda sekarang." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "scale-90 -mt-10", children: /* @__PURE__ */ jsx(Pagination, { links: members.links }) })
  ] });
}
export {
  Index as default
};
