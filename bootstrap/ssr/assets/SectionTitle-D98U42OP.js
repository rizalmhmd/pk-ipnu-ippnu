import { jsx, jsxs } from "react/jsx-runtime";
import "react";
function SectionTitle({ children, centered = false, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `mb-10 ${centered ? "text-center" : ""} ${className}`, children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-slate-900 font-serif relative inline-block pb-4", children: [
    children,
    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 h-1.5 bg-emerald-600 rounded-full w-16 ${centered ? "left-1/2 -translate-x-1/2" : "left-0"}` })
  ] }) });
}
export {
  SectionTitle as S
};
