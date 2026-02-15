import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-Ba0vwqSJ.js";
import "framer-motion";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
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
              autoComplete: "username",
              onChange: (e) => setData("email", e.target.value)
            }
          )
        ] }),
        errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 ml-1 italic", children: errors.email })
      ] }),
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
              autoComplete: "current-password",
              onChange: (e) => setData("password", e.target.value)
            }
          )
        ] }),
        errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-bold text-red-500 ml-1 italic", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-1", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center group cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "remember",
              checked: data.remember,
              className: "w-4 h-4 rounded-lg bg-slate-100 border-none text-emerald-600 focus:ring-emerald-500/20 focus:ring-offset-0 transition-all cursor-pointer",
              onChange: (e) => setData("remember", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ms-3 text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors", children: "Ingat Saya" })
        ] }),
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors italic",
            children: "Lupa Password?"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: `w-full py-4 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
          children: [
            processing ? /* @__PURE__ */ jsx("i", { className: "fas fa-circle-notch animate-spin" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-sign-in-alt text-xs" }),
            "Masuk ke Dashboard"
          ]
        }
      )
    ] })
  ] });
}
export {
  Login as default
};
