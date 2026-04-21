import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "react";
import { usePage, Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
function GuestLayout({ children }) {
  const { siteSetting } = usePage().props;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900 px-4", children: [
    /* @__PURE__ */ jsx(Head, { children: siteSetting?.favicon_url && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: siteSetting.favicon_url }),
      /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: siteSetting.favicon_url }),
      /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", href: siteSetting.favicon_url })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-10", children: /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex flex-col items-center gap-3 sm:gap-4 group", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-lg sm:rounded-lg flex items-center justify-center shadow-2xl shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-500 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-white text-3xl sm:text-4xl" }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-slate-900 font-serif", children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mt-1", children: "Portal Administrasi" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "w-full sm:max-w-md mt-6 px-6 sm:px-10 py-8 sm:py-12 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden rounded-lg sm:rounded-lg border border-slate-100",
        children
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " PKPT IPNU IPPNU"
    ] })
  ] });
}
export {
  GuestLayout as G
};
