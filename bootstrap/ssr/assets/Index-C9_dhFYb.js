import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Link, Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection, a as PageHeaderCard } from "./PageHeaderCard-DT4379pO.js";
import { S as SectionTitle } from "./SectionTitle-6h1XHXt8.js";
import { motion } from "framer-motion";
import { P as Pagination } from "./Pagination-BK520O42.js";
function ArticleCard({ article, idx }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: idx * 0.05 },
      className: "bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-32 sm:h-56 overflow-hidden", children: [
          article.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: article.image_url,
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
              alt: article.title
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-emerald-800 to-blue-900 flex flex-col items-center justify-center text-white/20", children: /* @__PURE__ */ jsx("i", { className: "fas fa-file-alt text-4xl sm:text-6xl group-hover:scale-110 transition-transform duration-700" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-3 sm:bottom-4 sm:left-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 sm:px-4 sm:py-1.5 bg-white/90 backdrop-blur-md text-emerald-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg border border-white/20", children: "Artikel" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-8 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4", children: [
            /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
            new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-xl font-bold text-slate-800 mb-2 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: article.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3", children: [
            article.content.replace(/<[^>]*>?/gm, "").substring(0, 150),
            "..."
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/artikel/${article.slug}`,
              className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm group/btn mt-auto",
              children: [
                "Baca Selengkapnya",
                /* @__PURE__ */ jsx("div", { className: "w-4 h-0.5 sm:w-6 bg-emerald-600 group-hover/btn:w-8 sm:group-hover/btn:w-10 transition-all" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ArticlesIndex({ articles, pageSetting }) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Artikel & Opini" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url ? pageSetting.hero_image_url : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      }
    ),
    /* @__PURE__ */ jsx(
      PageHeaderCard,
      {
        title: "Artikel & Opini",
        subtitle: "Kumpulan pemikiran, gagasan, dan tulisan mendalam dari kader PKPT IPNU IPPNU",
        bgColor: pageSetting?.header_bg_color,
        textColor: pageSetting?.header_text_color,
        bgImage: pageSetting?.header_bg_image_url
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-3 sm:px-6 md:px-12 py-10 sm:py-20", children: [
      /* @__PURE__ */ jsx(SectionTitle, { centered: true, className: "mb-8 sm:mb-12", children: "Wawasan Kader" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10", children: articles.data.map((article, idx) => /* @__PURE__ */ jsx(ArticleCard, { article, idx }, article.id)) }),
      articles.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100", children: [
        /* @__PURE__ */ jsx("i", { className: "far fa-file-alt text-6xl text-slate-100 mb-6 block" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Belum ada artikel yang diterbitkan saat ini." })
      ] }),
      articles.data.length > 0 && /* @__PURE__ */ jsx(Pagination, { links: articles.links })
    ] })
  ] });
}
export {
  ArticlesIndex as default
};
