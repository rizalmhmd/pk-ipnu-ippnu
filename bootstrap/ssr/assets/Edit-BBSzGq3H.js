import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DqM_CwAN.js";
import { ArrowLeft, History, Tag, Clock, MapPin, FileText, Save } from "lucide-react";
function Edit({ agenda }) {
  const { data, setData, put, processing, errors } = useForm({
    title: agenda.title || "",
    category: agenda.category || "organisasi",
    event_date: agenda.event_date || "",
    event_time: agenda.event_time || "",
    location: agenda.location || "",
    description: agenda.description || ""
  });
  const categories = [
    { id: "organisasi", name: "Organisasi", color: "emerald" },
    { id: "nasional", name: "Nasional", color: "red" },
    { id: "keagamaan", name: "Keagamaan", color: "blue" },
    { id: "khusus", name: "Khusus", color: "amber" }
  ];
  const submit = (e) => {
    e.preventDefault();
    put(route("admin.agendas.update", agenda.id));
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
              className: "p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 rounded-xl transition-colors",
              children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 dark:text-white leading-tight", children: "Edit Agenda" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Perbarui detail dan informasi kegiatan yang sudah dijadwalkan." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg", children: /* @__PURE__ */ jsx(History, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1", children: "Dibuat Pada" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-700 dark:text-slate-300", children: new Date(agenda.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "max-w-4xl", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-900 dark:text-white mb-3", children: "Judul Agenda" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold ${errors.title ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
            placeholder: "Contoh: Rapat Pleno I Kepengurusan",
            required: true
          }
        ),
        errors.title && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 uppercase tracking-wider", children: errors.title })
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
            className: `p-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${data.category === cat.id ? `bg-${cat.color}-50 dark:bg-${cat.color}-900/20 border-${cat.color}-500 text-${cat.color}-600 dark:text-${cat.color}-400` : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400"}`,
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
              className: `w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:outline-none transition-all font-bold ${errors.event_date ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent focus:border-emerald-500"}`,
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
              className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all font-bold"
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
            className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 font-bold",
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
            className: "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-2xl focus:outline-none transition-all placeholder:text-slate-300 font-medium leading-relaxed",
            placeholder: "Berikan detail tambahan tentang agenda ini..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-8 border-t border-slate-50 dark:border-slate-800", children: [
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
            className: "inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50 tracking-widest uppercase",
            children: [
              /* @__PURE__ */ jsx(Save, { size: 18 }),
              "Simpan Perubahan"
            ]
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  Edit as default
};
