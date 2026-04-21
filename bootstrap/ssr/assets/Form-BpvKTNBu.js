import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-aeaPXddD.js";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";
function UserForm({ user, roles }) {
  const isEditing = !!user;
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    password_confirmation: "",
    role: user?.role || "departemen"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      put(`/admin/users/${user.id}`);
    } else {
      post("/admin/users");
    }
  };
  const roleBadge = {
    admin: { bg: "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800", text: "text-red-700 dark:text-red-400", desc: "Akses penuh ke seluruh fitur sistem" },
    ketua: { bg: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800", text: "text-blue-700 dark:text-blue-400", desc: "Mengelola agenda, galeri, anggota, statistik" },
    departemen: { bg: "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-400", desc: "Mengelola quotes, artikel, berita" }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit User" : "Tambah User" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/users",
          className: "w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm",
          children: /* @__PURE__ */ jsx(ArrowLeft, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white", children: [
          isEditing ? "Edit" : "Tambah",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: "User" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm font-medium", children: isEditing ? `Mengubah data ${user.name}` : "Buat akun baru untuk pengguna sistem" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "bg-white dark:bg-slate-900 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden",
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2", children: "Nama Lengkap" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  className: "w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium",
                  placeholder: "Masukkan nama lengkap"
                }
              ),
              errors.name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500 font-bold", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: data.email,
                  onChange: (e) => setData("email", e.target.value),
                  className: "w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium",
                  placeholder: "email@contoh.com"
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500 font-bold", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2", children: [
                  "Password ",
                  isEditing && /* @__PURE__ */ jsx("span", { className: "text-slate-300 dark:text-slate-600 normal-case tracking-normal", children: "(kosongkan jika tidak diubah)" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    value: data.password,
                    onChange: (e) => setData("password", e.target.value),
                    className: "w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium",
                    placeholder: "Min. 6 karakter"
                  }
                ),
                errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500 font-bold", children: errors.password })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2", children: "Konfirmasi Password" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "password",
                    value: data.password_confirmation,
                    onChange: (e) => setData("password_confirmation", e.target.value),
                    className: "w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium",
                    placeholder: "Ulangi password"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4", children: "Role / Hak Akses" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: roles.map((role) => {
                const badge = roleBadge[role.value] || roleBadge.departemen;
                const isSelected = data.role === role.value;
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("role", role.value),
                    className: `p-5 rounded-lg border-2 text-left transition-all duration-200 ${isSelected ? `${badge.bg} ${badge.text} border-current shadow-lg scale-[1.02]` : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                        /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-current" : "border-slate-300 dark:border-slate-600"}`, children: isSelected && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-current" }) }),
                        /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: role.label })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: `text-xs leading-relaxed ${isSelected ? "opacity-80" : "text-slate-400"}`, children: badge.desc })
                    ]
                  },
                  role.value
                );
              }) }),
              errors.role && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500 font-bold", children: errors.role })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "px-8 sm:px-10 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/admin/users",
                className: "px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx(Save, { size: 16 }),
                  processing ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah User"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  UserForm as default
};
