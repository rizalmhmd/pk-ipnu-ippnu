import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { Globe, Settings, Layout, Image, ImageIcon, Mail, Phone, Instagram, Youtube, Save } from "lucide-react";
function Site({ setting }) {
  const { data, setData, processing, errors } = useForm({
    site_name: setting.site_name || "",
    meta_description: setting.meta_description || "",
    footer_description: setting.footer_description || "",
    address: setting.address || "",
    email: setting.email || "",
    phone: setting.phone || "",
    instagram: setting.instagram || "",
    facebook: setting.facebook || "",
    twitter: setting.twitter || "",
    youtube: setting.youtube || "",
    copyright_text: setting.copyright_text || "",
    home_news_title: setting.home_news_title || "",
    home_agenda_title: setting.home_agenda_title || "",
    default_hero_title: setting.default_hero_title || "",
    default_hero_subtitle: setting.default_hero_subtitle || "",
    site_logo: null,
    favicon: null,
    default_hero_image: null,
    _method: "PUT"
  });
  const [previews, setPreviews] = useState({
    site_logo: setting.site_logo_url,
    favicon: setting.favicon_url,
    default_hero_image: setting.default_hero_image_url
  });
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setData(field, file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    router.post(route("admin.site-settings.update"), data);
  };
  const SectionHeader = ({ icon: Icon, title, subtitle }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl", children: /* @__PURE__ */ jsx(Icon, { size: 20 }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white leading-none mb-1", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-medium", children: subtitle })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Pengaturan Situs" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Konfigurasi Situs" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Kelola identitas, kontak, dan pengaturan global platform." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: Globe, title: "Identitas Utama", subtitle: "Informasi publik yang muncul di seluruh bagian situs." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Nama Situs" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.site_name,
                  onChange: (e) => setData("site_name", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold placeholder:text-slate-300",
                  placeholder: "Contoh: PKPT IPNU IPPNU UNEJ",
                  required: true
                }
              ),
              errors.site_name && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest", children: errors.site_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Meta Deskripsi (SEO)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.meta_description,
                  onChange: (e) => setData("meta_description", e.target.value),
                  rows: "3",
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-medium leading-relaxed",
                  placeholder: "Deskripsi singkat untuk mesin pencari..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Teks Copyright" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.copyright_text,
                  onChange: (e) => setData("copyright_text", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold",
                  placeholder: "© 2026 IPNU IPPNU"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: Settings, title: "Pengaturan Beranda", subtitle: "Judul seksi yang ditampilkan di halaman depan." }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul Seksi Berita" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.home_news_title,
                  onChange: (e) => setData("home_news_title", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul Seksi Agenda" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.home_agenda_title,
                  onChange: (e) => setData("home_agenda_title", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold",
                  required: true
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: Layout, title: "Default Hero Header", subtitle: "Digunakan untuk halaman yang tidak memiliki pengaturan hero khusus." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Hero Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.default_hero_title,
                  onChange: (e) => setData("default_hero_title", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:row-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Hero Image" }),
              /* @__PURE__ */ jsxs("div", { className: `relative group aspect-video border-2 border-dashed rounded-3xl overflow-hidden flex items-center justify-center transition-all ${previews.default_hero_image ? "border-emerald-500" : "border-slate-100 dark:border-slate-800"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "file", onChange: (e) => handleFileChange(e, "default_hero_image"), className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10", accept: "image/*" }),
                previews.default_hero_image ? /* @__PURE__ */ jsx("img", { src: previews.default_hero_image, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx(Image, { size: 32, className: "text-slate-200 mx-auto mb-2" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Select Image" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Hero Subtitle" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.default_hero_subtitle,
                  onChange: (e) => setData("default_hero_subtitle", e.target.value),
                  rows: "3",
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-medium leading-relaxed"
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: Image, title: "Aset Visual", subtitle: "Logo & Favicon" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4", children: "Logo Situs" }),
              /* @__PURE__ */ jsxs("div", { className: `relative group p-6 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all ${previews.site_logo ? "border-emerald-500 bg-emerald-50/20" : "border-slate-50 dark:border-slate-800"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "file", onChange: (e) => handleFileChange(e, "site_logo"), className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" }),
                previews.site_logo ? /* @__PURE__ */ jsx("img", { src: previews.site_logo, className: "max-h-20 object-contain" }) : /* @__PURE__ */ jsx(ImageIcon, { size: 24, className: "text-slate-200" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4", children: "Favicon (32x32)" }),
              /* @__PURE__ */ jsxs("div", { className: `relative group p-6 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all ${previews.favicon ? "border-emerald-500 bg-emerald-50/20" : "border-slate-50 dark:border-slate-800"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "file", onChange: (e) => handleFileChange(e, "favicon"), className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" }),
                previews.favicon ? /* @__PURE__ */ jsx("img", { src: previews.favicon, className: "w-10 h-10 object-contain shadow-lg" }) : /* @__PURE__ */ jsx(ImageIcon, { size: 20, className: "text-slate-200" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsx(SectionHeader, { icon: Mail, title: "Kontak & Sosial", subtitle: "Update cara audiens menemukan Anda." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { type: "email", value: data.email, onChange: (e) => setData("email", e.target.value), className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm", placeholder: "Email Organisasi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Phone, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.phone, onChange: (e) => setData("phone", e.target.value), className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm", placeholder: "Nomor Telepon/WA" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Instagram, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.instagram, onChange: (e) => setData("instagram", e.target.value), className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm", placeholder: "Instagram Username" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Youtube, { size: 16, className: "absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: data.youtube, onChange: (e) => setData("youtube", e.target.value), className: "w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold text-sm", placeholder: "URL Channel Youtube" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 tracking-[0.2em] uppercase text-sm",
            children: [
              /* @__PURE__ */ jsx(Save, { size: 20 }),
              "Simpan Perubahan"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Site as default
};
