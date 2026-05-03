import { jsx, jsxs } from "react/jsx-runtime";
import "react";
function SectionTitle({ children, centered = false, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mb-5 sm:mb-8 ${centered ? "text-center" : ""} ${className}`, children: /* @__PURE__ */ jsxs("h2", { className: "text-lg sm:text-2xl font-black text-slate-900 font-serif relative inline-block pb-2 sm:pb-3 uppercase tracking-tight", children: [
    children,
    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 h-1 bg-emerald-600 rounded-full w-10 sm:w-12 ${centered ? "left-1/2 -translate-x-1/2" : "left-0"} shadow-[0_2px_8px_rgba(5,150,105,0.3)]` })
  ] }) });
}
export {
  SectionTitle as S
};
