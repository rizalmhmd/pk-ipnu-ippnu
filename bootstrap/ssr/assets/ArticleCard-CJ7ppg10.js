import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
function ArticleCard({ article, idx }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: idx * 0.05 },
      className: "bg-white rounded-lg shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-40 sm:h-56 overflow-hidden", children: [
          article.image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: article.image_url,
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
              alt: article.title
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-emerald-800 to-blue-900 flex flex-col items-center justify-center text-white/20", children: /* @__PURE__ */ jsx("i", { className: "fas fa-file-alt text-4xl sm:text-6xl group-hover:scale-110 transition-transform duration-700" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 sm:top-4 sm:left-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg border border-white/20", children: "Artikel" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
              new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-slate-200 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("i", { className: "far fa-user text-emerald-500" }),
              article.author || "Admin"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: article.title }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/artikel/${article.slug}`,
              className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-[11px] sm:text-xs group/btn mt-auto",
              children: [
                "Baca Selengkapnya",
                /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ArticleCard as A
};
