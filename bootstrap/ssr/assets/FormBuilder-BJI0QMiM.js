import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { GripVertical, Trash2, Plus } from "lucide-react";
import { Reorder } from "framer-motion";
function FormBuilder({ schema, onChange }) {
  const addField = () => {
    const newField = {
      id: "field_" + Date.now(),
      label: "Pertanyaan Baru",
      type: "text",
      required: true,
      options: []
    };
    onChange([...schema, newField]);
  };
  const updateField = (id, key, value) => {
    onChange(schema.map((field) => field.id === id ? { ...field, [key]: value } : field));
  };
  const removeField = (id) => {
    onChange(schema.filter((field) => field.id !== id));
  };
  const addOption = (fieldId) => {
    onChange(schema.map((field) => {
      if (field.id === fieldId) {
        return { ...field, options: [...field.options || [], "Opsi Baru"] };
      }
      return field;
    }));
  };
  const updateOption = (fieldId, optionIndex, value) => {
    onChange(schema.map((field) => {
      if (field.id === fieldId) {
        const newOptions = [...field.options];
        newOptions[optionIndex] = value;
        return { ...field, options: newOptions };
      }
      return field;
    }));
  };
  const removeOption = (fieldId, optionIndex) => {
    onChange(schema.map((field) => {
      if (field.id === fieldId) {
        const newOptions = field.options.filter((_, idx) => idx !== optionIndex);
        return { ...field, options: newOptions };
      }
      return field;
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    schema.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center bg-slate-50 dark:bg-slate-800/50", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium mb-4", children: "Belum ada kolom pertanyaan. Tambahkan untuk membuat form pendaftaran." }) }) : /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: schema, onReorder: onChange, className: "space-y-4", children: schema.map((field, index) => /* @__PURE__ */ jsx(Reorder.Item, { value: field, className: "bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative group", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-slate-300 cursor-grab active:cursor-grabbing", children: /* @__PURE__ */ jsx(GripVertical, { size: 20 }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: field.label,
              onChange: (e) => updateField(field.id, "label", e.target.value),
              className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all",
              placeholder: "Pertanyaan / Label"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-48", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: field.type,
              onChange: (e) => updateField(field.id, "type", e.target.value),
              className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all",
              children: [
                /* @__PURE__ */ jsx("option", { value: "text", children: "Teks Pendek" }),
                /* @__PURE__ */ jsx("option", { value: "email", children: "Email" }),
                /* @__PURE__ */ jsx("option", { value: "number", children: "Angka / No HP" }),
                /* @__PURE__ */ jsx("option", { value: "textarea", children: "Teks Panjang" }),
                /* @__PURE__ */ jsx("option", { value: "select", children: "Dropdown / Pilihan" })
              ]
            }
          ) })
        ] }),
        field.type === "select" && /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2 mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider", children: "Opsi Pilihan" }),
          (field.options || []).map((opt, optIdx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: opt,
                onChange: (e) => updateOption(field.id, optIdx, e.target.value),
                className: "flex-1 px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md focus:border-emerald-500 outline-none",
                placeholder: `Opsi ${optIdx + 1}`
              }
            ),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeOption(field.id, optIdx), className: "text-red-400 hover:text-red-600 p-1", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
          ] }, optIdx)),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => addOption(field.id),
              className: "text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 12 }),
                " Tambah Opsi"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-700", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: field.required,
                onChange: (e) => updateField(field.id, "required", e.target.checked),
                className: "w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-600 dark:text-slate-300", children: "Wajib Diisi" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => removeField(field.id),
              className: "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold",
              children: [
                /* @__PURE__ */ jsx(Trash2, { size: 16 }),
                " Hapus"
              ]
            }
          )
        ] })
      ] })
    ] }) }, field.id)) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: addField,
        className: "w-full py-4 border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors",
        children: [
          /* @__PURE__ */ jsx(Plus, { size: 18 }),
          " Tambah Pertanyaan Baru"
        ]
      }
    )
  ] });
}
export {
  FormBuilder as F
};
