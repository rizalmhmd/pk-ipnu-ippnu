import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7b7eloc.js";
import { H as HeroSection } from "./HeroSection-wDuIIaSK.js";
import { S as SectionTitle } from "./SectionTitle-RfMm9Ud4.js";
import { A as ArticleCard } from "./ArticleCard-CJ7ppg10.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import "framer-motion";
function ArticlesIndex({ articles, pageSetting }) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Artikel & Opini" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url ? pageSetting.hero_image_url : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-12 md:py-20", children: [
      /* @__PURE__ */ jsx(SectionTitle, { centered: true, className: "mb-10 lg:mb-16", children: "Wawasan Kader" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10", children: articles.data.map((article, idx) => /* @__PURE__ */ jsx(ArticleCard, { article, idx }, article.id)) }),
      articles.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100", children: [
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
