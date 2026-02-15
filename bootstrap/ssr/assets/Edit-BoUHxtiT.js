import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { ArrowLeft, History, CloudUpload, Save, Lightbulb, Image } from "lucide-react";
function Edit({ post }) {
  const { data, setData, processing, errors } = useForm({
    title: post.title || "",
    content: post.content || "",
    image: null,
    _method: "PUT"
    // Method spoofing for file uploads in PUT requests
  });
  const [imagePreview, setImagePreview] = useState(post.image_url);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(post.image_url);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    router.post(route("admin.posts.update", post.id), data, {
      onSuccess: () => {
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit - ${post.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.posts.index"),
              className: "p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-xl transition-colors",
              children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white leading-tight", children: "Edit Berita" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Perbarui konten dan informasi berita yang sudah dipublikasikan." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(History, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1", children: "Terakhir Diubah" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-slate-700 dark:text-slate-300", children: [
            new Date(post.updated_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            " WIB"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 space-y-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul Berita" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.title,
              onChange: (e) => setData("title", e.target.value),
              className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500 dark:focus:border-emerald-500"}`,
              placeholder: "Contoh: PKPT IPNU IPPNU Sukses Gelar Makesta 2026",
              required: true
            }
          ),
          errors.title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Gambar Utama" }),
          /* @__PURE__ */ jsxs("div", { className: `relative group border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all ${imagePreview ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10" : "border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600"}`, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                onChange: handleImageChange,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
                accept: "image/*"
              }
            ),
            imagePreview ? /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
              /* @__PURE__ */ jsx("img", { src: imagePreview, className: "max-h-80 rounded-3xl shadow-2xl ", alt: "Preview" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-3xl transition-all duration-300", children: [
                /* @__PURE__ */ jsx(CloudUpload, { size: 32, className: "text-white mb-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-xs", children: "Ganti Gambar" })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(CloudUpload, { size: 32 }) }),
              /* @__PURE__ */ jsx("h5", { className: "font-bold text-slate-900 dark:text-white mb-2 text-lg", children: "Ganti Foto Berita" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium", children: "Format: JPG, PNG, atau WEBP. Max: 5MB." })
            ] })
          ] }),
          errors.image && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.image })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Isi Berita Lengkap" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.content,
              onChange: (e) => setData("content", e.target.value),
              rows: "15",
              className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-[2rem] focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium leading-relaxed ${errors.content ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500 dark:focus:border-emerald-500"}`,
              placeholder: "Mulailah menulis narasi berita Anda di sini...",
              required: true
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.posts.index"),
              className: "px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors",
              children: "Batalkan Perubahan"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:translate-y-0 tracking-wider",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                "SIMPAN PERUBAHAN"
              ]
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/20 backdrop-blur-md rounded-2xl", children: /* @__PURE__ */ jsx(Lightbulb, { size: 24 }) }),
              /* @__PURE__ */ jsx("h5", { className: "text-xl font-bold", children: "Tips Mengedit" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Periksa kembali typo atau kesalahan data sebelum menyimpan perubahan." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Ganti gambar utama jika Anda menemukan visual yang lebih representatif." })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Update isi berita jika terdapat perkembangan informasi terbaru." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsxs("h5", { className: "text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Image, { size: 16, className: "text-emerald-500" }),
            "Preview Visual"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700", children: imagePreview ? /* @__PURE__ */ jsx("img", { src: imagePreview, className: "w-full h-full object-cover", alt: "Visual Preview" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col items-center justify-center text-slate-200 dark:text-slate-700 scale-150", children: /* @__PURE__ */ jsx(Image, { size: 48 }) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
