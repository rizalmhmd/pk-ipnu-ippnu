import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { usePage, useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { User, CheckCircle2, Mail, Save, Fingerprint, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
function Edit({ mustVerifyEmail, status }) {
  const user = usePage().props.auth.user;
  const profileForm = useForm({
    name: user.name,
    email: user.email
  });
  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updateProfile = (e) => {
    e.preventDefault();
    profileForm.patch(route("profile.update"), {
      preserveScroll: true
    });
  };
  const updatePassword = (e) => {
    e.preventDefault();
    passwordForm.put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
      onError: (errors) => {
        if (errors.password) {
          passwordForm.reset("password", "password_confirmation");
        }
        if (errors.current_password) {
          passwordForm.reset("current_password");
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profil Saya" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Pengaturan Akun" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Informasi personal dan keamanan akun administrator." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-12 xl:col-span-7", children: /* @__PURE__ */ jsxs("form", { onSubmit: updateProfile, className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl", children: /* @__PURE__ */ jsx(User, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white leading-none", children: "Informasi Profil" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Update data publik akun Anda" })
          ] })
        ] }),
        status === "profile-updated" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-bold",
            children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 18 }),
              "Profil berhasil diperbarui."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Nama Lengkap" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(User, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: profileForm.data.name,
                  onChange: (e) => profileForm.setData("name", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold",
                  required: true
                }
              )
            ] }),
            profileForm.errors.name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: profileForm.errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Alamat Email" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: profileForm.data.email,
                  onChange: (e) => profileForm.setData("email", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold",
                  required: true
                }
              )
            ] }),
            profileForm.errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: profileForm.errors.email })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: profileForm.processing,
              className: "inline-flex items-center gap-3 px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                "Simpan Profil"
              ]
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-12 xl:col-span-5", children: /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl shadow-emerald-900/10 text-white h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20", children: /* @__PURE__ */ jsx(Fingerprint, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white leading-none", children: "Keamanan Akun" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-bold uppercase tracking-widest mt-1", children: "Perbarui kata sandi secara berkala" })
          ] })
        ] }),
        passwordForm.recentlySuccessful && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 10 },
            animate: { opacity: 1, x: 0 },
            className: "mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 flex items-center gap-3 text-sm font-bold",
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { size: 18 }),
              "Sandi berhasil diubah."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3", children: "Sandi Saat Ini" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.current_password,
                  onChange: (e) => passwordForm.setData("current_password", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.current_password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest", children: passwordForm.errors.current_password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3", children: "Sandi Baru" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.password,
                  onChange: (e) => passwordForm.setData("password", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest", children: passwordForm.errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3", children: "Konfirmasi Sandi Baru" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.password_confirmation,
                  onChange: (e) => passwordForm.setData("password_confirmation", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-400 uppercase tracking-widest", children: passwordForm.errors.password_confirmation })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: passwordForm.processing,
              className: "w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 uppercase text-xs tracking-widest",
              children: [
                /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }),
                "Ganti Kata Sandi"
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
