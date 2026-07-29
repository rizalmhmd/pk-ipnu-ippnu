import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7b7eloc.js";
import { H as HeroSection } from "./HeroSection-wDuIIaSK.js";
import { motion, AnimatePresence } from "framer-motion";
function KegiatanIndex({ kegiatans = [], pageSetting }) {
  const [activeFilter, setActiveFilter] = useState("semua");
  const categories = [
    { id: "semua", name: "Semua Kegiatan", icon: "fa-list" },
    { id: "organisasi", name: "Organisasi", icon: "fa-users", color: "bg-emerald-500" },
    { id: "khusus", name: "Khusus", icon: "fa-star", color: "bg-amber-500" }
  ];
  const filteredKegiatans = kegiatans.filter((k) => {
    if (activeFilter === "semua") return true;
    return (k.category || "organisasi") === activeFilter;
  });
  const groupedKegiatans = filteredKegiatans.reduce((groups, item) => {
    const month = new Date(item.event_date).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    if (!groups[month]) groups[month] = [];
    groups[month].push(item);
    return groups;
  }, {});
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kegiatan Organisasi" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Kegiatan Organisasi",
        subtitle: "Dokumentasi dan jadwal program kerja PKPT IPNU IPPNU"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 xl:gap-20", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:w-[350px] shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-32 space-y-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            className: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20 group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-110" }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 mb-8", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner", children: /* @__PURE__ */ jsx("i", { className: "fas fa-tasks text-2xl" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-bold font-serif text-lg tracking-tight", children: "Program Kerja" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-300 font-bold uppercase tracking-widest", children: "Aktivitas Organisasi" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-emerald-50/80 text-sm leading-relaxed mb-6 italic", children: "Seluruh kegiatan dan program kerja yang diselenggarakan oleh pengurus untuk anggota dan masyarakat." }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex -space-x-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-600 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md", children: /* @__PURE__ */ jsx("i", { className: "fas fa-user" }) }),
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-500 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md", children: /* @__PURE__ */ jsx("i", { className: "fas fa-users" }) }),
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-400 border-2 border-emerald-900 flex items-center justify-center text-xs font-bold shadow-md text-emerald-900", children: /* @__PURE__ */ jsx("i", { className: "fas fa-plus" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-emerald-200 ml-2", children: [
                    kegiatans.length,
                    " Kegiatan Tercatat"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1.5 bg-emerald-600" }),
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-800 font-serif mb-8", children: "Filter Kategori" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: categories.map((cat) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveFilter(cat.id),
              className: `w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 font-bold text-sm group/btn ${activeFilter === cat.id ? "bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 -translate-y-1" : "bg-slate-50 text-slate-500 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 border border-transparent hover:border-slate-100"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeFilter === cat.id ? "bg-white/20" : "bg-slate-200/50 text-slate-400 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600"}`, children: /* @__PURE__ */ jsx("i", { className: `fas ${cat.icon}` }) }),
                  cat.name
                ] }),
                /* @__PURE__ */ jsx("i", { className: `fas fa-arrow-right text-[10px] transition-all ${activeFilter === cat.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}` })
              ]
            },
            cat.id
          )) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.3 },
          className: "space-y-16",
          children: Object.keys(groupedKegiatans).length > 0 ? Object.entries(groupedKegiatans).map(([month, items]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-slate-800 font-serif mb-8 flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-lg text-lg border border-emerald-100", children: month }),
              /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-200 flex-grow" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: items.map((item, idx) => {
              const date = new Date(item.event_date);
              const category = categories.find((c) => c.id === (item.category || "organisasi")) || categories[1];
              return /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: idx * 0.05 },
                  className: "flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 transition-all duration-500 hover:shadow-emerald-900/10 hover:border-emerald-100 group",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:flex-col md:w-28 md:h-28 md:bg-emerald-50 md:rounded-2xl md:justify-center md:border md:border-emerald-100/50 group-hover:bg-emerald-600 transition-colors shrink-0 overflow-hidden relative", children: [
                      /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-md" }),
                      /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute -bottom-4 -left-4 w-12 h-12 bg-black/5 rounded-full blur-md" }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-600 text-white w-16 h-16 rounded-xl flex flex-col items-center justify-center md:bg-transparent md:text-emerald-700 group-hover:md:text-white transition-colors relative z-10", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase md:mb-1 tracking-wider", children: date.toLocaleDateString("id-ID", { month: "short" }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-2xl font-black font-serif leading-none", children: date.getDate() })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-bold text-white ${category?.color}`, children: category?.name }) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col justify-center", children: [
                      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-3 mb-4", children: [
                        /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm shadow-emerald-950/10 ${category?.color}`, children: category?.name }),
                        /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-slate-300" }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: item.category })
                      ] }),
                      /* @__PURE__ */ jsx("h4", { className: "text-xl md:text-2xl font-bold text-slate-800 font-serif mb-4 group-hover:text-emerald-700 transition-colors leading-tight", children: item.title }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500 font-medium", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500", children: /* @__PURE__ */ jsx("i", { className: "far fa-clock" }) }),
                          item.event_time ? item.event_time.substring(0, 5) + " WIB" : "00:00 WIB"
                        ] }),
                        item.location && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500", children: /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt" }) }),
                          item.location
                        ] })
                      ] }),
                      item.description && /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-slate-100", children: /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm leading-relaxed", children: item.description }) }),
                      (item.is_registration_open || item.registration_fee) && /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
                        item.registration_fee && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-2 rounded-lg", children: [
                          /* @__PURE__ */ jsx("i", { className: "fas fa-ticket-alt" }),
                          "HTM: ",
                          item.registration_fee
                        ] }),
                        !item.registration_fee && /* @__PURE__ */ jsx("div", {}),
                        item.is_registration_open && /* @__PURE__ */ jsxs(
                          Link,
                          {
                            href: route("kegiatan.daftar", item.id),
                            className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest",
                            children: [
                              "Daftar Sekarang",
                              /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-xs" })
                            ]
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                `kegiatan-${item.id}`
              );
            }) })
          ] }, month)) : /* @__PURE__ */ jsxs("div", { className: "py-24 text-center bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx("i", { className: "fas fa-clipboard-list text-5xl text-slate-300" }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-700 font-serif mb-2", children: "Belum Ada Kegiatan" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium max-w-sm mx-auto", children: "Tidak ada catatan kegiatan untuk kategori ini. Coba pilih kategori lain." })
          ] })
        },
        `list-${activeFilter}`
      ) }) })
    ] }) })
  ] });
}
export {
  KegiatanIndex as default
};
