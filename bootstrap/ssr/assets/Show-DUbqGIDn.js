import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B5TcHq-d.js";
import { motion } from "framer-motion";
function NewsDetail({ post }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = post.title;
  const shareSocials = [
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      color: "bg-green-500",
      link: `https://wa.me/?text=${encodeURIComponent(shareText + " - " + shareUrl)}`
    },
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "bg-blue-600",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      color: "bg-slate-900",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    }
  ];
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: post.title }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 py-32 lg:py-40", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-10", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center gap-3 text-sm font-medium", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "text-slate-400 hover:text-emerald-600 transition-colors", children: "Beranda" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-slate-300", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-right text-[10px]" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/berita", className: "text-slate-400 hover:text-emerald-600 transition-colors", children: "Berita" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-slate-300", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-right text-[10px]" }) }),
        /* @__PURE__ */ jsx("li", { className: "text-emerald-600 font-bold truncate", children: "Detail Berita" })
      ] }) }),
      /* @__PURE__ */ jsxs("header", { className: "mb-12", children: [
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 font-serif leading-tight mb-8",
            children: post.title
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 pb-12 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600", children: /* @__PURE__ */ jsx("i", { className: "fas fa-user" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-slate-400", children: "Penulis" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800", children: "Administrator" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-slate-100" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-slate-400", children: "Diterbitkan" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800", children: new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) })
          ] })
        ] })
      ] }),
      post.image && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          className: "rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 mb-16",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${post.image}`,
              className: "w-full h-auto object-cover max-h-[600px]",
              alt: post.title
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "article",
        {
          className: "prose prose-lg prose-emerald max-w-none text-slate-600 leading-relaxed mb-20 px-2 lg:px-0",
          dangerouslySetInnerHTML: { __html: post.content }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8 py-10 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/berita",
            className: "flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-2xl font-bold transition-all",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-left" }),
              "Kembali ke Berita"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-400 uppercase tracking-widest", children: "Share:" }),
          shareSocials.map((social) => /* @__PURE__ */ jsx(
            "a",
            {
              href: social.link,
              target: "_blank",
              className: `w-12 h-12 rounded-2xl ${social.color} text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg`,
              title: `Bagikan ke ${social.name}`,
              children: /* @__PURE__ */ jsx("i", { className: social.icon })
            },
            social.name
          ))
        ] })
      ] })
    ] }) })
  ] });
}
export {
  NewsDetail as default
};
