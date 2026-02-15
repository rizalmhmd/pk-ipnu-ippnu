import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-dMISE7I6.js";
import { ArrowLeft, X, CloudUpload, Send } from "lucide-react";
function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
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
      setImagePreview(null);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.galleries.store"), {
      onSuccess: () => reset()
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Foto Galeri" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Tambah Koleksi Foto" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Unggah dokumentasi momen terbaik PKPT IPNU IPPNU." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.galleries.index"),
          className: "inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
            "Kembali ke Galeri"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul/Deskripsi Foto" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500 dark:focus:border-emerald-500"}`,
            placeholder: "Contoh: Rapat Koordinasi Wilayah 2026",
            required: true
          }
        ),
        errors.title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Pilih Foto" }),
        /* @__PURE__ */ jsxs("div", { className: `relative group border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all ${imagePreview ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10" : "border-slate-100 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600"}`, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              onChange: handleImageChange,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
              accept: "image/*",
              required: true
            }
          ),
          imagePreview ? /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
            /* @__PURE__ */ jsx("img", { src: imagePreview, className: "max-h-80 rounded-3xl shadow-2xl ", alt: "Preview" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImagePreview(null);
                  setData("image", null);
                },
                className: "absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-20",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(CloudUpload, { size: 32 }) }),
            /* @__PURE__ */ jsx("h5", { className: "font-bold text-slate-900 dark:text-white mb-2 text-lg", children: "Unggah Foto Momen" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 font-medium", children: "JPEG, PNG, atau WEBP. Rekomendasi 4:3 atau 1:1." })
          ] })
        ] }),
        errors.image && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.image })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 disabled:translate-y-0 tracking-widest uppercase",
          children: [
            /* @__PURE__ */ jsx(Send, { size: 18 }),
            "Tambah ke Galeri"
          ]
        }
      ) })
    ] }) }) })
  ] });
}
export {
  Create as default
};
