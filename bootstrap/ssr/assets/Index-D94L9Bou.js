import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Link, Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection, a as PageHeaderCard } from "./PageHeaderCard-GxA7id8Q.js";
import { S as SectionTitle } from "./SectionTitle-6h1XHXt8.js";
import { motion } from "framer-motion";
import { P as Pagination } from "./Pagination-BK520O42.js";
function PostCard({ post, idx }) {
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
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.image_url ? post.image_url : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
              alt: post.title
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-3 sm:bottom-4 sm:left-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 sm:px-4 sm:py-1.5 bg-white/90 backdrop-blur-md text-emerald-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg border border-white/20", children: "Berita" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-8 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4", children: [
            /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
            new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-xl font-bold text-slate-800 mb-2 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: post.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3", children: [
            post.content.replace(/<[^>]*>?/gm, "").substring(0, 150),
            "..."
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/berita/${post.slug}`,
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
function NewsIndex({ posts, pageSetting }) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Berita Terbaru" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url ? pageSetting.hero_image_url : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      }
    ),
    /* @__PURE__ */ jsx(
      PageHeaderCard,
      {
        title: "Warta Berita",
        subtitle: "Informasi, agenda, dan kegiatan terkini dari PKPT IPNU IPPNU",
        bgColor: pageSetting?.header_bg_color,
        textColor: pageSetting?.header_text_color,
        bgImage: pageSetting?.header_bg_image_url
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-3 sm:px-6 md:px-12 py-10 sm:py-20", children: [
      /* @__PURE__ */ jsx(SectionTitle, { centered: true, className: "mb-8 sm:mb-12", children: "Warta Organisasi" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10", children: posts.data.map((post, idx) => /* @__PURE__ */ jsx(PostCard, { post, idx }, post.id)) }),
      posts.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100", children: [
        /* @__PURE__ */ jsx("i", { className: "far fa-newspaper text-6xl text-slate-100 mb-6 block" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Belum ada berita yang diterbitkan saat ini." })
      ] }),
      posts.data.length > 0 && /* @__PURE__ */ jsx(Pagination, { links: posts.links })
    ] })
  ] });
}
export {
  NewsIndex as default
};
