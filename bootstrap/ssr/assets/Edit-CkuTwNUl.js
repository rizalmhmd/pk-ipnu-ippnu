import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-DqM_CwAN.js";
import { ArrowLeft, Loader2, Save } from "lucide-react";
function Edit({ statistic }) {
  const { data, setData, put, processing, errors } = useForm({
    title: statistic.title || "",
    subtitle: statistic.subtitle || "",
    value: statistic.value || "",
    unit: statistic.unit || "",
    description: statistic.description || "",
    icon: statistic.icon || "fa-chart-line",
    color: statistic.color || "emerald",
    order: statistic.order || 0,
    is_active: statistic.is_active
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.statistics.update", statistic.id));
  };
  const colors = [
    { id: "emerald", name: "Emerald (Hijau)", bg: "bg-emerald-500" },
    { id: "blue", name: "Blue (Biru)", bg: "bg-blue-500" },
    { id: "amber", name: "Amber (Kuning)", bg: "bg-amber-500" },
    { id: "red", name: "Red (Merah)", bg: "bg-red-500" },
    { id: "purple", name: "Purple (Ungu)", bg: "bg-purple-500" },
    { id: "pink", name: "Pink (Merah Muda)", bg: "bg-pink-500" },
    { id: "indigo", name: "Indigo", bg: "bg-indigo-500" },
    { id: "cyan", name: "Cyan", bg: "bg-cyan-500" },
    { id: "teal", name: "Teal", bg: "bg-teal-500" },
    { id: "orange", name: "Orange", bg: "bg-orange-500" }
  ];
  const icons = [
    "fa-chart-line",
    "fa-chart-pie",
    "fa-chart-bar",
    "fa-users",
    "fa-user-graduate",
    "fa-hand-holding-heart",
    "fa-money-bill-wave",
    "fa-money-bill-trend-up",
    "fa-leaf",
    "fa-trophy",
    "fa-star",
    "fa-globe",
    "fa-building",
    "fa-school"
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Edit Statistik" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.statistics.index"),
            className: "w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-800 dark:text-white", children: "Edit Statistik" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "Perbarui data statistik yang ditampilkan." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: [
              "Judul Statistik ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors",
                placeholder: "Contoh: PENDAPATAN (2024)"
              }
            ),
            errors.title && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: [
              "Subjudul ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal", children: "(Opsional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.subtitle,
                onChange: (e) => setData("subtitle", e.target.value),
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors",
                placeholder: "Contoh: Miliar"
              }
            ),
            errors.subtitle && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.subtitle })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: [
              "Nilai ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.value,
                onChange: (e) => setData("value", e.target.value),
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors font-mono",
                placeholder: "Contoh: 75,33"
              }
            ),
            errors.value && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.value })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: [
              "Satuan ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal", children: "(Opsional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.unit,
                onChange: (e) => setData("unit", e.target.value),
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors",
                placeholder: "Contoh: USD, %, Jiwa"
              }
            ),
            errors.unit && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.unit })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: [
              "Deskripsi ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal", children: "(Opsional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                rows: "3",
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors",
                placeholder: "Penjelasan singkat tentang statistik ini..."
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3", children: "Ikon" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: icons.map((icon) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setData("icon", icon),
                className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all ${data.icon === icon ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-110" : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`,
                children: /* @__PURE__ */ jsx("i", { className: `fas ${icon} text-lg` })
              },
              icon
            )) }),
            errors.icon && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.icon })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3", children: "Warna Tema" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-3", children: colors.map((color) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setData("color", color.id),
                className: `flex items-center gap-3 p-2 rounded-xl border transition-all ${data.color === color.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 ring-1 ring-emerald-500" : "border-slate-200 dark:border-slate-700 hover:border-slate-300"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full ${color.bg}` }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-700 dark:text-slate-300", children: color.name })
                ]
              },
              color.id
            )) }),
            errors.color && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: errors.color })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: "Urutan Tampil" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.order,
                onChange: (e) => setData("order", e.target.value),
                className: "w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2", children: "Status" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "is_active",
                    checked: data.is_active === true,
                    onChange: () => setData("is_active", true),
                    className: "text-emerald-600 focus:ring-emerald-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Aktif" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "is_active",
                    checked: data.is_active === false,
                    onChange: () => setData("is_active", false),
                    className: "text-emerald-600 focus:ring-emerald-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Nonaktif" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed font-medium",
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
              "Menyimpan..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { size: 18 }),
              "Simpan Perubahan"
            ] })
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  Edit as default
};
