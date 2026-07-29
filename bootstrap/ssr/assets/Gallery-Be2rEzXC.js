import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { H as HeroSection } from "./HeroSection-wDuIIaSK.js";
import { S as SectionTitle } from "./SectionTitle-RfMm9Ud4.js";
import { P as Pagination } from "./Pagination-CXuchKWL.js";
import { P as PublicLayout } from "./PublicLayout-B7b7eloc.js";
import { motion, AnimatePresence } from "framer-motion";
function Gallery({ galleries, pageSetting }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Galeri Foto" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-12 md:py-20", children: [
      /* @__PURE__ */ jsx(SectionTitle, { centered: true, children: "Koleksi Dokumentasi" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8", children: galleries.data.map((item, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: idx * 0.05 },
          onClick: () => setSelectedImage(item),
          className: "group relative aspect-square md:aspect-[4/5] bg-white rounded-lg overflow-hidden shadow-xl shadow-slate-200/50 cursor-pointer hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 border border-slate-100",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image_url,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                alt: item.title
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-emerald-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center transition-all duration-500", children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-search-plus text-white text-3xl mb-4 transform scale-50 group-hover:scale-100 transition-transform duration-500" }),
              /* @__PURE__ */ jsx("h6", { className: "text-white font-bold text-sm leading-tight line-clamp-2", children: item.title })
            ] })
          ]
        },
        item.id
      )) }),
      galleries.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100", children: [
        /* @__PURE__ */ jsx("i", { className: "far fa-images text-6xl text-slate-100 mb-6 block" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Galeri foto belum memiliki koleksi saat ini." })
      ] }),
      galleries.data.length > 0 && /* @__PURE__ */ jsx(Pagination, { links: galleries.links })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedImage && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSelectedImage(null),
          className: "absolute inset-0 bg-slate-950/95 backdrop-blur-md"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 20 },
          className: "relative max-w-6xl w-full h-full flex flex-col items-center justify-center pointer-events-none",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedImage(null),
                className: "absolute top-0 right-0 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all pointer-events-auto z-10",
                children: /* @__PURE__ */ jsx("i", { className: "fas fa-times text-xl" })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: selectedImage.image_url,
                className: "max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-auto",
                alt: selectedImage.title
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-8 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white text-center pointer-events-auto", children: /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold font-serif", children: selectedImage.title }) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  Gallery as default
};
