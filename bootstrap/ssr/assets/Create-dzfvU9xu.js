import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-aeaPXddD.js";
import { ArrowLeft, Quote, User, CheckCircle2, XCircle, X, CloudUpload, Send } from "lucide-react";
function Create() {
  const { data, setData, post, processing, errors } = useForm({
    content: "",
    author: "",
    image: null,
    order: 0,
    is_active: true
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
    post(route("admin.quotes.store"));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Tambah Quote" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-2", children: "Tambah Quote Baru" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Buat konten inspiratif untuk memotivasi anggota dan pengunjung." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("admin.quotes.index"),
          className: "inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
            "Kembali ke Daftar"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "bg-white dark:bg-slate-900 p-10 rounded-lg border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-0", children: [
            /* @__PURE__ */ jsx(Quote, { size: 16, className: "text-emerald-500" }),
            "Isi Kutipan"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold uppercase tracking-widest ${data.content.length > 180 ? "text-red-500" : "text-slate-400"}`, children: [
            data.content.length,
            " / 200 Karakter"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.content,
            onChange: (e) => {
              if (e.target.value.length <= 200) {
                setData("content", e.target.value);
              }
            },
            rows: "5",
            className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-medium italic ${errors.content ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
            placeholder: "Tuliskan kata-kata inspiratif di sini (Maksimal 200 karakter)...",
            required: true
          }
        ),
        errors.content && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.content })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { size: 16, className: "text-slate-400" }),
            "Nama Penulis (Opsional)"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.author,
              onChange: (e) => setData("author", e.target.value),
              className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold",
              placeholder: "Contoh: K.H. Hasyim Asy'ari"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Urutan Tampilan" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: data.order,
              onChange: (e) => setData("order", e.target.value),
              className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm ${data.is_active ? "text-emerald-500" : "text-slate-400"}`, children: data.is_active ? /* @__PURE__ */ jsx(CheckCircle2, { size: 24 }) : /* @__PURE__ */ jsx(XCircle, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h6", { className: "font-bold text-slate-900 dark:text-white mb-0.5", children: "Status Aktif" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider", children: "Tampilkan di halaman depan" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setData("is_active", !data.is_active),
            className: `w-14 h-8 rounded-full p-1 transition-all duration-300 ${data.is_active ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`,
            children: /* @__PURE__ */ jsx("div", { className: `w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${data.is_active ? "translate-x-6" : "translate-x-0"}` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Background Quote (Opsional)" }),
        /* @__PURE__ */ jsxs("div", { className: `relative group border-2 border-dashed rounded-lg p-10 text-center transition-all ${imagePreview ? "border-emerald-500 bg-emerald-50/30" : "border-slate-100 dark:border-slate-800 hover:border-emerald-400"}`, children: [
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
            /* @__PURE__ */ jsx("img", { src: imagePreview, className: "w-full h-48 object-cover rounded-lg shadow-2xl ", alt: "Preview" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImagePreview(null);
                  setData("image", null);
                },
                className: "absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-20",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-200 dark:text-slate-700 mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(CloudUpload, { size: 32 }) }),
            /* @__PURE__ */ jsx("h5", { className: "font-bold text-slate-900 dark:text-white mb-2", children: "Unggah Background" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-bold uppercase tracking-widest", children: "Resolusi tinggi disarankan (1920x1080)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase",
          children: [
            /* @__PURE__ */ jsx(Send, { size: 18 }),
            "Simpan Quote"
          ]
        }
      ) })
    ] }) }) })
  ] });
}
export {
  Create as default
};
