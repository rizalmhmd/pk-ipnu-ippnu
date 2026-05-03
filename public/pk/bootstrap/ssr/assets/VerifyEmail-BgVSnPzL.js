import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as GuestLayout } from "./GuestLayout-BghQ2Vh7.js";
import "framer-motion";
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Verifikasi Email" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 text-sm text-slate-500 font-medium leading-relaxed", children: "Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan ke email Anda. Jika Anda tidak menerima email tersebut, kami akan mengirimkan yang lain dengan senang hati." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-6 font-bold text-sm text-emerald-600 bg-emerald-50 p-4 rounded-lg border border-emerald-100 italic", children: "Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: `w-full py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${processing ? "opacity-50 cursor-not-allowed" : ""}`,
          children: [
            processing ? /* @__PURE__ */ jsx("i", { className: "fas fa-circle-notch animate-spin" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-envelope-open-text text-xs" }),
            "Kirim Ulang Email Verifikasi"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest",
          children: "Log Out"
        }
      ) })
    ] })
  ] });
}
export {
  VerifyEmail as default
};
