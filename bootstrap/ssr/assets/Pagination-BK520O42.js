import { jsx } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
function Pagination({ links }) {
  if (links.length <= 3) return null;
  return /* @__PURE__ */ jsx("div", { className: "mt-20 flex justify-center gap-2", children: links.map((link, idx) => {
    if (link.url === null) {
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100",
          dangerouslySetInnerHTML: { __html: link.label }
        },
        idx
      );
    }
    return /* @__PURE__ */ jsx(
      Link,
      {
        href: link.url,
        className: `w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 font-bold text-sm ${link.active ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20 scale-110" : "bg-white border-slate-100 text-slate-500 hover:border-emerald-200 hover:text-emerald-600"}`,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      idx
    );
  }) });
}
export {
  Pagination as P
};
