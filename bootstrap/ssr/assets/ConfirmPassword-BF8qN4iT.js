import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-Ba0vwqSJ.js";
import "framer-motion";
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Konfirmasi Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 text-sm text-slate-500 font-medium leading-relaxed", children: "Ini adalah area aplikasi yang aman. Harap konfirmasi kata sandi Anda sebelum melanjutkan." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1", children: "Password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-emerald-500 transition-colors", children: /* @__PURE__ */ jsx("i", { className: "fas fa-lock" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "password",
              type: "password",
              name: "password",
              value: data.password,
              className: "block w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none font-medium",
              isFocused: true,
              onChange: (e) => setData("password", e.target.value)
            }
          )
        ] }),
        errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 ml-1 italic", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: `w-full py-4 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
          children: [
            processing ? /* @__PURE__ */ jsx("i", { className: "fas fa-circle-notch animate-spin" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-shield-check text-xs" }),
            "Konfirmasi Password"
          ]
        }
      )
    ] })
  ] });
}
export {
  ConfirmPassword as default
};
