import { jsx, jsxs } from "react/jsx-runtime";
import "react";
function SectionTitle({ children, centered = false, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mb-6 sm:mb-10 ${centered ? "text-center" : ""} ${className}`, children: /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-3xl font-bold text-slate-900 font-serif relative inline-block pb-3 sm:pb-4", children: [
    children,
    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 h-1 sm:h-1.5 bg-emerald-600 rounded-full w-12 sm:w-16 ${centered ? "left-1/2 -translate-x-1/2" : "left-0"} shadow-[0_2px_10px_rgba(5,150,105,0.4)]` })
  ] }) });
}
export {
  SectionTitle as S
};
