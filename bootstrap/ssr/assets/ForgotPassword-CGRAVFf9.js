import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-CywurByQ.js";
import "framer-motion";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Lupa Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 text-sm text-slate-500 leading-relaxed font-medium", children: "Lupa kata sandi? Jangan khawatir. Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-6 font-bold text-sm text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 italic", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1", children: "Alamat Email" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              name: "email",
              value: data.email,
              className: "block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium",
              isFocused: true,
              onChange: (e) => setData("email", e.target.value)
            }
          )
        ] }),
        errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 ml-1 italic", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: `w-full py-4 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
          children: [
            processing ? /* @__PURE__ */ jsx("i", { className: "fas fa-circle-notch animate-spin" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-paper-plane text-xs" }),
            "Kirim Tautan Reset"
          ]
        }
      )
    ] })
  ] });
}
export {
  ForgotPassword as default
};
