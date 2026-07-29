import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7b7eloc.js";
import { motion } from "framer-motion";
function RegistrationForm({ agenda, pageSetting }) {
  const schema = agenda.form_schema || [];
  const initialData = {};
  schema.forEach((field) => {
    initialData[field.id] = "";
  });
  const { data, setData, post, processing, errors } = useForm({
    responses: initialData,
    payment_method: "cash",
    payment_proof: null
  });
  const handleChange = (fieldId, value) => {
    setData("responses", {
      ...data.responses,
      [fieldId]: value
    });
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("kegiatan.daftar.store", agenda.id), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Daftar Kegiatan - ${agenda.title}` }),
    /* @__PURE__ */ jsxs("div", { className: "bg-emerald-900 pt-32 pb-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-32 -mt-32" }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxs(Link, { href: route("kegiatan.index"), className: "inline-flex items-center gap-2 text-emerald-300 hover:text-white mb-6 transition-colors", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-left" }),
          " Kembali ke Kegiatan"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-extrabold text-white font-serif mb-4 leading-tight", children: "Pendaftaran Kegiatan" }),
        /* @__PURE__ */ jsx("p", { className: "text-emerald-100 text-lg", children: agenda.title })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 py-16 -mt-8 relative z-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "bg-white rounded-2xl shadow-xl shadow-emerald-900/10 p-8 md:p-12",
        children: [
          agenda.image && /* @__PURE__ */ jsx("div", { className: "mb-8 rounded-xl overflow-hidden shadow-lg shadow-emerald-900/10", children: /* @__PURE__ */ jsx("img", { src: `/${agenda.image}`, alt: "Pamflet Agenda", className: "w-full h-auto object-cover" }) }),
          agenda.registration_fee && /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-emerald-900", children: "Harga Tiket Masuk (HTM)" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-emerald-700", children: "Silakan pilih metode pembayaran di bawah ini." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xl font-black text-emerald-600 bg-white px-4 py-2 rounded-lg shadow-sm", children: agenda.registration_fee })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-slate-700", children: "Metode Pembayaran" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === "cash" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "payment_method", value: "cash", className: "w-4 h-4 text-emerald-600 focus:ring-emerald-500", checked: data.payment_method === "cash", onChange: () => setData("payment_method", "cash") }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-700", children: "Bayar Langsung (Cash)" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${data.payment_method === "transfer" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "payment_method", value: "transfer", className: "w-4 h-4 text-emerald-600 focus:ring-emerald-500", checked: data.payment_method === "transfer", onChange: () => setData("payment_method", "transfer") }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-700", children: "Transfer Bank / E-Wallet" })
                ] })
              ] }),
              errors.payment_method && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 font-medium", children: errors.payment_method })
            ] }),
            data.payment_method === "transfer" && /* @__PURE__ */ jsxs("div", { className: "p-6 border-2 border-emerald-100 rounded-xl bg-white space-y-4", children: [
              agenda.payment_account && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 rounded-lg border border-emerald-100", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1", children: "Informasi Rekening" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-slate-800 text-lg", children: agenda.payment_account })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: [
                  "Unggah Bukti Pembayaran ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/png, image/jpeg, image/jpg, image/webp",
                    onChange: (e) => setData("payment_proof", e.target.files[0]),
                    required: true,
                    className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 ${errors.payment_proof ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-emerald-500"}`
                  }
                ),
                errors.payment_proof && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 font-medium", children: errors.payment_proof })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            schema.map((field) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-slate-700 mb-2", children: [
                field.label,
                " ",
                field.required && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              field.type === "textarea" ? /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.responses[field.id],
                  onChange: (e) => handleChange(field.id, e.target.value),
                  required: field.required,
                  rows: "4",
                  className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-emerald-500"}`
                }
              ) : field.type === "select" ? /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.responses[field.id],
                  onChange: (e) => handleChange(field.id, e.target.value),
                  required: field.required,
                  className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-emerald-500"}`,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih --" }),
                    (field.options || []).map((opt, idx) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, idx))
                  ]
                }
              ) : /* @__PURE__ */ jsx(
                "input",
                {
                  type: field.type === "email" ? "email" : field.type === "number" ? "tel" : "text",
                  value: data.responses[field.id],
                  onChange: (e) => handleChange(field.id, e.target.value),
                  required: field.required,
                  className: `w-full px-4 py-3 bg-slate-50 border-2 rounded-lg focus:outline-none transition-all ${errors[`responses.${field.id}`] ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-emerald-500"}`
                }
              ),
              errors[`responses.${field.id}`] && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 font-medium", children: errors[`responses.${field.id}`] })
            ] }, field.id)),
            /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50",
                children: processing ? "Memproses..." : "Kirim Pendaftaran"
              }
            ) })
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  RegistrationForm as default
};
