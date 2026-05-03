import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { usePage, useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-aeaPXddD.js";
import { User, CheckCircle2, Save, Mail, ShieldCheck, Fingerprint, Lock } from "lucide-react";
import { motion } from "framer-motion";
function Edit({ mustVerifyEmail, status, member }) {
  const user = usePage().props.auth.user;
  const profileForm = useForm({
    name: user.name,
    email: user.email,
    position: member?.position || "",
    instagram: member?.instagram || "",
    type: member?.type || "ipnu",
    photo: null,
    _method: "PATCH"
  });
  const [photoPreview, setPhotoPreview] = React.useState(member?.photo_url || null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      profileForm.setData("photo", file);
      const reader = new FileReader();
      reader.onload = (e2) => setPhotoPreview(e2.target.result);
      reader.readAsDataURL(file);
    }
  };
  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updateProfile = (e) => {
    e.preventDefault();
    profileForm.post(route("admin.profile.update"), {
      preserveScroll: true,
      forceFormData: true
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
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Informasi personal dan profil keanggotaan PKPT IPNU IPPNU." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-12 xl:col-span-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: updateProfile, className: "bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(User, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white leading-none", children: "Informasi Profil & Keanggotaan" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Update data publik dan riwayat organisasi Anda" })
          ] })
        ] }),
        status === "profile-updated" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-bold",
            children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 18 }),
              "Profil berhasil diperbarui."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 mb-4 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-32 h-32 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-xl border-4 border-white dark:border-slate-900 ring-4 ring-emerald-500/10", children: photoPreview ? /* @__PURE__ */ jsx("img", { src: photoPreview, alt: "Preview", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsx(User, { size: 48 }) }) }),
              /* @__PURE__ */ jsxs("label", { className: "absolute -bottom-2 -right-2 p-3 bg-emerald-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-emerald-700 transition-all hover:scale-110", children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", onChange: handlePhotoChange, accept: "image/*" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-slate-900 dark:text-white", children: "Foto Profil" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 font-medium mt-1", children: "Format JPG, PNG atau GIF (Maks. 5MB)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
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
                    className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold",
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
                    className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold",
                    required: true
                  }
                )
              ] }),
              profileForm.errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: profileForm.errors.email })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Tipe Organisasi" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["ipnu", "ippnu"].map((type) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => profileForm.setData("type", type),
                  className: `flex-1 py-4 rounded-lg border-2 font-bold uppercase tracking-widest text-xs transition-all ${profileForm.data.type === type ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:border-emerald-500/50"}`,
                  children: type
                },
                type
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Jabatan" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(ShieldCheck, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: profileForm.data.position,
                    onChange: (e) => profileForm.setData("position", e.target.value),
                    placeholder: "Contoh: Ketua Departemen Kaderisasi",
                    className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold text-sm"
                  }
                )
              ] }),
              profileForm.errors.position && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: profileForm.errors.position })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Username Instagram" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold", children: "@" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: profileForm.data.instagram,
                    onChange: (e) => profileForm.setData("instagram", e.target.value),
                    placeholder: "username",
                    className: "w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold text-sm"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: profileForm.processing,
              className: "inline-flex items-center gap-3 px-10 py-4 bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                "Simpan Perubahan"
              ]
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-12 xl:col-span-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(Fingerprint, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white leading-none", children: "Keamanan Akun" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest mt-1", children: "Perbarui kata sandi secara berkala" })
          ] })
        ] }),
        passwordForm.recentlySuccessful && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 10 },
            animate: { opacity: 1, x: 0 },
            className: "mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 flex items-center gap-3 text-sm font-bold",
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { size: 18 }),
              "Sandi berhasil diubah."
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3", children: "Sandi Saat Ini" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.current_password,
                  onChange: (e) => passwordForm.setData("current_password", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold text-slate-900 dark:text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.current_password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest", children: passwordForm.errors.current_password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3", children: "Sandi Baru" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.password,
                  onChange: (e) => passwordForm.setData("password", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold text-slate-900 dark:text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest", children: passwordForm.errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3", children: "Konfirmasi Sandi Baru" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { size: 14, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: passwordForm.data.password_confirmation,
                  onChange: (e) => passwordForm.setData("password_confirmation", e.target.value),
                  className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold text-slate-900 dark:text-white",
                  required: true
                }
              )
            ] }),
            passwordForm.errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest", children: passwordForm.errors.password_confirmation })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: passwordForm.processing,
              className: "w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-black shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 uppercase text-xs tracking-widest",
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
