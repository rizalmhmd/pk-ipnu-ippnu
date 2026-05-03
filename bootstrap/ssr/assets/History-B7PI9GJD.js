import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection } from "./HeroSection-BRcrzTIg.js";
import { motion } from "framer-motion";
function History({ pageSetting }) {
  const milestones = [
    { year: "2015", title: "Inisiasi Pembentukan", desc: "Pertemuan pertama tokoh pelajar untuk mendirikan PKPT di kampus.", icon: "🌱" },
    { year: "2017", title: "Deklarasi Resmi", desc: "Pelantikan kepengurusan pertama dan peresmian oleh PC IPNU IPPNU.", icon: "📜" },
    { year: "2020", title: "Ekspansi Program", desc: "Peluncuran program unggulan literasi dan pengabdian masyarakat.", icon: "🚀" },
    { year: "2024", title: "Era Digitalisasi", desc: "Transformasi organisasi menuju sistem informasi terpadu.", icon: "💻" }
  ];
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Sejarah - PKPT IPNU IPPNU" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1464695110811-47a0584c9c61?ixlib=rb-4.0.3",
        title: "Sejarah Kami",
        subtitle: "Jejak Langkah Perjuangan dan Pengabdian"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto mb-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-slate-200" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.4em] text-slate-400", children: "Narasi Sejarah" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-slate-200" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "prose prose-slate lg:prose-xl mx-auto dark:prose-invert", children: /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed text-justify whitespace-pre-line", children: pageSetting?.content_sejarah || "Sejarah belum dikonfigurasi di panel admin. Narasi perjalanan organisasi akan ditampilkan di sini setelah diinputkan." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-serif uppercase tracking-tight", children: "Milestone Perjalanan" }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-emerald-600 mx-auto rounded-full mt-4" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-16", children: milestones.map((milestone, idx) => /* @__PURE__ */ jsxs("div", { className: `relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: "md:w-1/2" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 flex items-center justify-center w-12 h-12 bg-white border-4 border-emerald-500 rounded-lg shadow-xl", children: /* @__PURE__ */ jsx("span", { className: "text-emerald-600 font-black text-sm italic", children: milestone.year }) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: `md:w-1/2 p-8 bg-white dark:bg-slate-900 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 ${idx % 2 === 0 ? "md:mr-8" : "md:ml-8"}`,
              children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-black text-slate-900 dark:text-white font-serif mb-3 tracking-tight", children: milestone.title }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm leading-relaxed", children: milestone.desc })
              ]
            }
          )
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-32 p-12 bg-slate-900 rounded-lg text-center text-white relative overflow-hidden shadow-2xl",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold font-serif mb-6 italic tracking-tight", children: '"Menolak Lupa, Merawat Tradisi, Menatap Masa Depan"' }),
              /* @__PURE__ */ jsx("p", { className: "text-emerald-400 uppercase tracking-[0.4em] text-[10px] font-black", children: "Khidmah Tanpa Batas" })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  History as default
};
