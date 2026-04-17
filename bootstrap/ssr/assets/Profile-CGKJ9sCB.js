import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection, a as PageHeaderCard } from "./PageHeaderCard-DT4379pO.js";
import { motion, AnimatePresence } from "framer-motion";
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
      children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden group/card", children: [
        /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 w-20 h-20 blur-3xl opacity-0 group-hover/card:opacity-20 transition-opacity duration-700 ${isIPNU ? "bg-emerald-400" : "bg-blue-400"}` }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => onClick(member),
            className: `relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden mb-6 cursor-pointer shadow-xl active:scale-95 transition-all duration-500 ring-4 ring-white dark:ring-slate-900 ${isIPNU ? "bg-emerald-50" : "bg-blue-50"}`,
            children: [
              member.photo_url ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: member.photo_url,
                  alt: member.name,
                  className: "w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("i", { className: `fas ${isIPNU ? "fa-user-tie" : "fa-user-nurse"} text-4xl sm:text-5xl ${isIPNU ? "text-emerald-200" : "text-blue-200"}` }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 flex items-center justify-center transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-50 group-hover/card:scale-100 transition-all duration-500", children: /* @__PURE__ */ jsx("i", { className: "fas fa-search-plus" }) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("h5", { className: "text-base sm:text-xl font-bold text-slate-800 font-serif mb-2 leading-tight group-hover/card:text-emerald-700 transition-all line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center px-2", children: member.name }),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-1 bg-slate-100 mb-4 rounded-full group-hover/card:w-16 group-hover/card:bg-emerald-200 transition-all duration-500" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.15em] text-slate-400 mb-6 bg-slate-50 px-4 py-1.5 rounded-xl group-hover/card:bg-emerald-50 group-hover/card:text-emerald-600 transition-all truncate w-full", children: member.position }),
        member.instagram && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `https://instagram.com/${member.instagram.replace("@", "")}`,
            target: "_blank",
            className: "inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] sm:text-xs font-bold hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-900/20 transition-all mt-auto group/ig",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fab fa-instagram text-sm group-hover/ig:rotate-12 transition-transform" }),
              /* @__PURE__ */ jsxs("span", { className: "truncate max-w-[100px] sm:max-w-none", children: [
                "@",
                member.instagram.replace("@", "")
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function Lightbox({ isOpen, onClose, member }) {
  if (!member) return null;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-6", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
        className: "relative max-w-lg w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-800 transition-colors z-10",
              children: /* @__PURE__ */ jsx("i", { className: "fas fa-times" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden", children: member.photo ? /* @__PURE__ */ jsx(
            "img",
            {
              src: member.photo_url,
              className: "w-full h-full object-cover",
              alt: member.name
            }
          ) : /* @__PURE__ */ jsx("div", { className: `w-full h-full flex items-center justify-center ${member.type === "ipnu" ? "bg-emerald-600" : "bg-blue-600"}`, children: /* @__PURE__ */ jsx("i", { className: `fas ${member.type === "ipnu" ? "fa-user-tie" : "fa-user-nurse"} text-9xl text-white/20` }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 text-center bg-white", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-slate-900 font-serif mb-2", children: member.name }),
            /* @__PURE__ */ jsx("p", { className: "text-emerald-600 font-bold uppercase tracking-widest text-xs", children: member.position })
          ] })
        ]
      }
    )
  ] }) });
}
function Profile({ siteSetting, sections, organizations, pageSetting }) {
  const [selectedTab, setSelectedTab] = useState("visi-misi");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
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
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 sm:px-12 py-10 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "space-y-24 sm:space-y-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
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
                  className: "relative z-10 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl border-4 sm:border-8 border-white",
                  alt: "Organization"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 sm:space-y-10", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 sm:gap-4", children: ["visi-misi", "sejarah"].map((tab) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTab(tab),
              className: `px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${selectedTab === tab ? "bg-emerald-600 text-white shadow-xl shadow-emerald-900/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`,
              children: tab.replace("-", " ")
            },
            tab
          )) }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-50",
              children: selectedTab === "visi-misi" ? /* @__PURE__ */ jsxs("div", { className: "space-y-8 sm:space-y-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "group", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-4 flex items-center gap-4 group-hover:text-emerald-700 transition-colors", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-bold", children: "01" }),
                    "Visi Kami"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-lg text-slate-500 leading-relaxed italic border-l-4 border-emerald-100 pl-6", children: `"Mewujudkan organisasi pelajar yang kompeten, progresif, dan berlandaskan nilai-nilai Ahlussunnah wal Jama'ah di lingkungan perguruan tinggi."` })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-100" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-6 flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-bold", children: "02" }),
                    "Misi Kami"
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-4 sm:space-y-5 text-slate-500", children: ["Membangun kemandirian organisasi melalui pemberdayaan kader.", "Memperkuat jaringan internal dan eksternal lintas organisasi.", "Aktif dalam kegiatan sosial keagamaan dan kemanusiaan."].map((misi, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 items-start group", children: [
                    /* @__PURE__ */ jsx("div", { className: "mt-1 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx("i", { className: "fas fa-check text-[10px]" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base leading-relaxed group-hover:text-slate-800 transition-colors", children: misi })
                  ] }, i)) })
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6 sm:space-y-8", children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-xl sm:text-2xl font-bold text-slate-800 font-serif flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 text-emerald-600 rounded-xl", children: /* @__PURE__ */ jsx("i", { className: "fas fa-history text-sm sm:text-base" }) }),
                  "Sejarah Singkat"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-lg text-slate-500 leading-relaxed text-justify sm:text-left", children: "PKPT IPNU IPPNU didirikan sebagai wadah bagi Pelajar Nahdlatul Ulama yang menempuh pendidikan di perguruan tinggi. Berawal dari diskusi-diskusi kecil lintas fakultas, organisasi ini tumbuh menjadi pilar penting dakwah dan pengembangan diri mahasiswa." })
              ] })
            },
            selectedTab
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 sm:mb-20", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl sm:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight", children: "Struktur Organisasi" }),
          /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-emerald-600 mx-auto rounded-full mb-8" }),
          /* @__PURE__ */ jsx("p", { className: "text-base sm:text-xl text-slate-500 font-medium", children: "Sinergi kepemimpinan untuk mewujudkan program kerja yang berdampak dan berkelanjutan." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10", children: organizations?.length > 0 ? organizations.map((member, i) => /* @__PURE__ */ jsx(MemberCard, { member, idx: i, onClick: handleMemberClick }, i)) : /* @__PURE__ */ jsx("div", { className: "col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-sm italic", children: "Data pengurus belum tersedia." }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        isOpen: isLightboxOpen,
        onClose: closeLightbox,
        member: selectedMember
      }
    )
  ] });
}
export {
  Profile as default
};
