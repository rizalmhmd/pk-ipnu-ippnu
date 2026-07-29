import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-2Ze9ffSM.js";
import { ArrowLeft, History, FileText, ImagePlus, Tag, Clock, MapPin, Users, DollarSign, Save, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { F as FormBuilder } from "./FormBuilder-BJI0QMiM.js";
function Edit({ agenda }) {
  const { data, setData, post, processing, errors } = useForm({
    title: agenda.title || "",
    category: agenda.category || "organisasi",
    event_date: agenda.event_date || "",
    event_time: agenda.event_time || "",
    location: agenda.location || "",
    description: agenda.description || "",
    is_registration_open: agenda.is_registration_open || false,
    registration_fee: agenda.registration_fee || "",
    payment_account: agenda.payment_account || "",
    image: null,
    form_schema: agenda.form_schema || [
      { id: "field_name", label: "Nama Lengkap", type: "text", required: true, options: [] },
      { id: "field_email", label: "Email", type: "email", required: true, options: [] },
      { id: "field_phone", label: "No. WhatsApp", type: "number", required: true, options: [] }
    ]
  });
  const categories = [
    { id: "organisasi", name: "Organisasi", color: "emerald" },
    { id: "nasional", name: "Nasional", color: "red" },
    { id: "keagamaan", name: "Keagamaan", color: "blue" },
    { id: "khusus", name: "Khusus", color: "amber" }
  ];
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.agendas.update", agenda.id), {
      _method: "put",
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Agenda - ${agenda.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.agendas.index"),
              className: "p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-lg transition-colors",
              children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white leading-tight", children: "Edit Agenda" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Perbarui detail dan informasi kegiatan yang sudah dijadwalkan." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(History, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1", children: "Dibuat Pada" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-700 dark:text-slate-300", children: new Date(agenda.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "text-emerald-500" }),
            "Informasi Dasar"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul Agenda" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.title,
                  onChange: (e) => setData("title", e.target.value),
                  className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
                  placeholder: "Contoh: Rapat Pleno I Kepengurusan",
                  required: true
                }
              ),
              errors.title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ImagePlus, { size: 16, className: "text-slate-400" }),
                "Pamflet / Poster (Opsional)"
              ] }),
              agenda.image && /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("img", { src: `/${agenda.image}`, alt: "Pamflet", className: "h-32 object-contain rounded-lg bg-slate-100 dark:bg-slate-800" }) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  onChange: (e) => setData("image", e.target.files[0]),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold",
                  accept: "image/*"
                }
              ),
              errors.image && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.image })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Tag, { size: 16, className: "text-slate-400" }),
                "Kategori Agenda"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: categories.map((cat) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setData("category", cat.id),
                  className: `p-4 rounded-lg border-2 transition-all font-bold text-xs uppercase tracking-widest ${data.category === cat.id ? `bg-${cat.color}-50 dark:bg-${cat.color}-900/20 border-${cat.color}-500 text-${cat.color}-600 dark:text-${cat.color}-400` : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400"}`,
                  children: cat.name
                },
                cat.id
              )) }),
              errors.category && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.category })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clock, { size: 16, className: "text-slate-400" }),
                  "Tanggal Pelaksanaan"
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    value: data.event_date,
                    onChange: (e) => setData("event_date", e.target.value),
                    className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-lg focus:outline-none transition-all font-bold ${errors.event_date ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
                    required: true
                  }
                ),
                errors.event_date && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.event_date })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clock, { size: 16, className: "text-slate-400" }),
                  "Waktu (Opsional)"
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "time",
                    value: data.event_time,
                    onChange: (e) => setData("event_time", e.target.value),
                    className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all font-bold"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(MapPin, { size: 16, className: "text-slate-400" }),
                "Lokasi Kegiatan"
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.location,
                  onChange: (e) => setData("location", e.target.value),
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold",
                  placeholder: "Contoh: Gedung Serbaguna Kampus"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FileText, { size: 16, className: "text-slate-400" }),
                "Deskripsi Tambahan"
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.description,
                  onChange: (e) => setData("description", e.target.value),
                  rows: "5",
                  className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-medium leading-relaxed",
                  placeholder: "Berikan detail tambahan tentang agenda ini..."
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: `p-3 rounded-xl ${data.is_registration_open ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`, children: /* @__PURE__ */ jsx(Users, { size: 24 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: "Form Pendaftaran" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Aktifkan untuk menerima pendaftar secara online" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: data.is_registration_open,
                  onChange: (e) => setData("is_registration_open", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: data.is_registration_open && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "space-y-8 overflow-hidden pt-4 border-t border-slate-100 dark:border-slate-800",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(DollarSign, { size: 16, className: "text-slate-400" }),
                    "Harga Tiket Masuk (HTM)"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.registration_fee,
                      onChange: (e) => setData("registration_fee", e.target.value),
                      className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold",
                      placeholder: "Contoh: Gratis, Rp 50.000, Infaq Seikhlasnya"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500 font-medium", children: "Kosongkan jika tidak ada HTM." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(DollarSign, { size: 16, className: "text-slate-400" }),
                    "Informasi Rekening / Pembayaran"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.payment_account,
                      onChange: (e) => setData("payment_account", e.target.value),
                      className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-lg focus:outline-none transition-all placeholder:text-slate-300 font-bold",
                      placeholder: "Contoh: BCA 123456 a.n PKPT IPNU"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500 font-medium", children: "Isi jika pendaftar bisa membayar melalui transfer." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-slate-800 dark:text-white mb-4", children: "Desain Form (Custom Form Builder)" }),
                  /* @__PURE__ */ jsx(
                    FormBuilder,
                    {
                      schema: data.form_schema,
                      onChange: (newSchema) => setData("form_schema", newSchema)
                    }
                  )
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.agendas.index"),
              className: "px-6 py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors",
              children: "Batalkan"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase",
              children: [
                /* @__PURE__ */ jsx(Save, { size: 18 }),
                "Simpan Perubahan"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-emerald-600 p-10 rounded-lg text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/20 backdrop-blur-md rounded-lg", children: /* @__PURE__ */ jsx(Lightbulb, { size: 24 }) }),
            /* @__PURE__ */ jsx("h5", { className: "text-xl font-bold", children: "Tips Agenda" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Tulis judul agenda dengan jelas agar peserta dapat dengan mudah mengenali kegiatan." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Pastikan memilih kategori yang tepat untuk memudahkan pengelompokan di kalender." })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-emerald-300 rounded-full shrink-0 mt-1.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-emerald-50", children: "Aktifkan Form Pendaftaran jika agenda ini membutuhkan data partisipan dan tiket masuk." })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
