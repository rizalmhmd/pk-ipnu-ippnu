import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DqM_CwAN.js";
import { ArrowLeft, History, Instagram, Save, User, CloudUpload } from "lucide-react";
function Edit({ member }) {
  const { data, setData, processing, errors } = useForm({
    name: member.name || "",
    position: member.position || "",
    photo: null,
    instagram: member.instagram || "",
    type: member.type || "ipnu",
    order: member.order || 0,
    _method: "PUT"
  });
  const [photoPreview, setPhotoPreview] = useState(member.photo ? `/storage/${member.photo}` : null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setData("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(member.photo ? `/storage/${member.photo}` : null);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    router.post(route("admin.members.update", member.id), data);
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit - ${member.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.members.index"),
              className: "p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-xl transition-colors",
              children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white leading-tight", children: "Edit Data Anggota" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Perbarui profil dan informasi kepengurusan anggota." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(History, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1", children: "Terdaftar Sejak" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-700 dark:text-slate-300", children: new Date(member.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Nama Lengkap" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.name ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
                placeholder: "Contoh: Ahmad Rizki",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Jabatan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.position,
                onChange: (e) => setData("position", e.target.value),
                className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.position ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
                placeholder: "Contoh: Ketua PKPT",
                required: true
              }
            ),
            errors.position && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.position })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Instagram, { size: 14, className: "text-slate-400" }),
              "Instagram Username"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold", children: "@" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.instagram,
                  onChange: (e) => setData("instagram", e.target.value),
                  className: "w-full pl-11 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 font-bold",
                  placeholder: "username"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Urutan Tampilan" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.order,
                onChange: (e) => setData("order", e.target.value),
                className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-4", children: "Pilih Organisasi" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setData("type", "ipnu"),
                  className: `flex items-center justify-center gap-3 p-5 rounded-3xl border-2 transition-all font-bold ${data.type === "ipnu" ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-600 dark:text-emerald-400" : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${data.type === "ipnu" ? "bg-emerald-500 animate-pulse" : "bg-slate-200 dark:bg-slate-700"}` }),
                    "Kader IPNU"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setData("type", "ippnu"),
                  className: `flex items-center justify-center gap-3 p-5 rounded-3xl border-2 transition-all font-bold ${data.type === "ippnu" ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400" : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${data.type === "ippnu" ? "bg-blue-500 animate-pulse" : "bg-slate-200 dark:bg-slate-700"}` }),
                    "Kader IPPNU"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-10 mt-10 border-t border-slate-50 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.members.index"),
              className: "px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors",
              children: "Batalkan"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                "Simpan Perubahan"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsxs("h5", { className: "text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { size: 16, className: "text-emerald-500" }),
            "Foto Anggota"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `relative group aspect-[3/4] border-2 border-dashed rounded-[2rem] overflow-hidden flex items-center justify-center transition-all ${photoPreview ? "border-emerald-500" : "border-slate-100 dark:border-slate-800 hover:border-emerald-400"}`, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                onChange: handlePhotoChange,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
                accept: "image/*"
              }
            ),
            photoPreview ? /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative", children: [
              /* @__PURE__ */ jsx("img", { src: photoPreview, className: "w-full h-full object-cover", alt: "Preview" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300", children: [
                /* @__PURE__ */ jsx(CloudUpload, { size: 32, className: "text-white mb-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-xs uppercase tracking-widest", children: "Ganti Foto" })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-200 dark:text-slate-700 mx-auto mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(User, { size: 32 }) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest", children: "Klik untuk unggah" })
            ] })
          ] }),
          errors.photo && /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs font-bold text-red-500 uppercase tracking-wider text-center", children: errors.photo })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/40 relative overflow-hidden h-[300px]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-20 -mb-20 blur-3xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center h-full text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/30 rounded-full mb-6 flex items-center justify-center overflow-hidden", children: photoPreview ? /* @__PURE__ */ jsx("img", { src: photoPreview, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(User, { size: 40, className: "text-emerald-500" }) }),
            /* @__PURE__ */ jsx("h6", { className: "font-bold text-lg leading-tight mb-1", children: data.name || "Nama Lengkap" }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4", children: data.position || "Jabatan" }),
            /* @__PURE__ */ jsx("div", { className: `px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border ${data.type === "ipnu" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-blue-500/10 border-blue-500/30 text-blue-400"}`, children: data.type })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
