import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection, a as PageHeaderCard } from "./PageHeaderCard-j97nTOll.js";
import { motion } from "framer-motion";
function MemberCard({ member, idx, onClick }) {
  const isIPNU = member.type === "ipnu";
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { delay: idx * 0.05 },
      className: "group relative",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => onClick(member),
            className: `relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden mb-4 sm:mb-6 cursor-pointer shadow-lg active:scale-95 transition-transform ${isIPNU ? "bg-gradient-to-br from-emerald-600 to-teal-500" : "bg-gradient-to-br from-blue-600 to-emerald-500"}`,
            children: [
              member.photo ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: member.photo_url,
                  alt: member.name,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-sm", children: /* @__PURE__ */ jsx("i", { className: `fas ${isIPNU ? "fa-user-tie" : "fa-user-nurse"} text-4xl text-white opacity-40` }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300", children: /* @__PURE__ */ jsx("i", { className: "fas fa-search-plus text-white text-2xl scale-50 group-hover:scale-100 transition-transform duration-300" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("h5", { className: "text-sm sm:text-lg font-bold text-slate-800 font-serif mb-1 leading-tight group-hover:text-emerald-700 transition-all line-clamp-2", children: member.name }),
        /* @__PURE__ */ jsx("p", { className: "text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4 bg-slate-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all truncate w-full", children: member.position }),
        member.instagram && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://instagram.com/${member.instagram.replace("@", "")}`,
            target: "_blank",
            className: "inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100/50 mt-auto",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fab fa-instagram" }),
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-[60px] sm:max-w-none", children: member.instagram })
            ]
          }
        )
      ] })
    }
  );
}
function Profile({ siteSetting, sections, organizations, pageSetting }) {
  const [selectedTab, setSelectedTab] = useState("visi-misi");
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profil Organisasi" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3"
      }
    ),
    /* @__PURE__ */ jsx(
      PageHeaderCard,
      {
        title: "Profil Organisasi",
        subtitle: "Sejarah, Visi, Misi, dan Struktur Organisasi PKPT IPNU IPPNU",
        bgColor: pageSetting?.header_bg_color,
        textColor: pageSetting?.header_text_color,
        bgImage: pageSetting?.header_bg_image_url
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "space-y-16 sm:space-y-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-20 items-center", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1522202176988-66273c2ea55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                  className: "relative z-10 rounded-[3rem] shadow-2xl border-8 border-white",
                  alt: "Organization"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["visi-misi", "sejarah"].map((tab) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTab(tab),
              className: `px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${selectedTab === tab ? "bg-emerald-600 text-white shadow-xl shadow-emerald-900/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`,
              children: tab.replace("-", " ")
            },
            tab
          )) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100",
              children: selectedTab === "visi-misi" ? /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs", children: "01" }),
                    "Visi Kami"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-500 leading-relaxed italic", children: `"Mewujudkan organisasi pelajar yang kompeten, progresif, dan berlandaskan nilai-nilai Ahlussunnah wal Jama'ah di lingkungan perguruan tinggi."` })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-100" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xs", children: "02" }),
                    "Misi Kami"
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-slate-500", children: ["Membangun kemandirian organisasi melalui pemberdayaan kader.", "Memperkuat jaringan internal dan eksternal lintas organisasi.", "Aktif dalam kegiatan sosial keagamaan dan kemanusiaan."].map((misi, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-check-circle text-emerald-500 mt-1" }),
                    /* @__PURE__ */ jsx("span", { children: misi })
                  ] }, i)) })
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-bold text-slate-800 font-serif flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("i", { className: "fas fa-history text-emerald-500" }),
                  "Sejarah Singkat"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-500 leading-relaxed", children: "PKPT IPNU IPPNU didirikan sebagai wadah bagi Pelajar Nahdlatul Ulama yang menempuh pendidikan di perguruan tinggi. Berawal dari diskusi-diskusi kecil lintas fakultas, organisasi ini tumbuh menjadi pilar penting dakwah dan pengembangan diri mahasiswa." })
              ] })
            },
            selectedTab
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-4xl font-bold text-slate-800 font-serif mb-6", children: "Struktur Organisasi" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Sinergi kepemimpinan untuk mewujudkan program kerja yang berdampak dan berkelanjutan." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8", children: organizations?.length > 0 ? organizations.map((member, i) => /* @__PURE__ */ jsx(MemberCard, { member, idx: i }, i)) : /* @__PURE__ */ jsx("p", { className: "col-span-full text-center text-slate-400 italic", children: "Data pengurus belum tersedia." }) })
      ] })
    ] }) })
  ] });
}
export {
  Profile as default
};
