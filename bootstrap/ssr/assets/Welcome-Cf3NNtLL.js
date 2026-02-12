import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { usePage, Head, Link } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B5TcHq-d.js";
import { H as HeroSection, P as PageHeaderCard } from "./PageHeaderCard-pNzqnna_.js";
import { S as SectionTitle } from "./SectionTitle-D98U42OP.js";
import { motion } from "framer-motion";
function StatCard({ statistic, delay = 0 }) {
  const { title, subtitle, value, unit, description, icon, color } = statistic;
  const colorClasses = {
    emerald: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    amber: { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    red: { text: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    pink: { text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
    indigo: { text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
    cyan: { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
    teal: { text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
    orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" }
  };
  const theme = colorClasses[color] || colorClasses.emerald;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: delay * 0.1 },
      className: "bg-white rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 relative overflow-hidden group h-full",
      children: [
        /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 w-32 h-32 ${theme.bg} rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500` }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
            /* @__PURE__ */ jsx("h5", { className: `font-bold text-xs tracking-wider uppercase ${theme.text}`, children: title }),
            icon && /* @__PURE__ */ jsx("div", { className: `w-10 h-10 ${theme.bg} rounded-full flex items-center justify-center ${theme.text} mb-4`, children: /* @__PURE__ */ jsx("i", { className: `fas ${icon}` }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-bold text-slate-800 tracking-tight block", children: value }) }),
          (subtitle || unit) && /* @__PURE__ */ jsxs("div", { className: "text-xl font-medium text-slate-600 mb-6", children: [
            subtitle,
            " ",
            unit && /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-400 ml-1", children: unit })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 border-t border-slate-50", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 leading-relaxed", children: description }) })
        ] })
      ]
    }
  );
}
function Home({ posts, pageSetting, greeting, agendas, statistics }) {
  const { siteSetting } = usePage().props;
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Beranda" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: siteSetting?.site_hero ? `/storage/${siteSetting.site_hero}` : "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      }
    ),
    statistics && statistics.length > 0 && /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 md:px-12 -mt-20 relative z-40 mb-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: statistics.map((stat, index) => /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(StatCard, { statistic: stat, delay: index }) }, stat.id)) }) }),
    /* @__PURE__ */ jsx(
      PageHeaderCard,
      {
        title: `Selamat Datang di ${siteSetting?.site_name || "PKPT IPNU IPPNU"}`,
        subtitle: "Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa",
        bgColor: pageSetting?.header_bg_color,
        textColor: pageSetting?.header_text_color,
        bgImage: pageSetting?.header_bg_image
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsx(SectionTitle, { className: "mb-0", children: siteSetting?.home_news_title || "Berita Terkini" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/berita",
              className: "text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group",
              children: [
                "Lihat Semua",
                /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8", children: [
          posts.map((post, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.05 },
              className: "bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: post.image ? `/storage/${post.image}?v=${new Date(post.updated_at).getTime()}` : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                      alt: post.title
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg", children: "News" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4", children: [
                    /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
                    new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-800 mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: post.title }),
                  /* @__PURE__ */ jsxs("p", { className: "text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3", children: [
                    post.content.replace(/<[^>]*>?/gm, "").substring(0, 120),
                    "..."
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: `/berita/${post.slug}`,
                      className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group/btn",
                      children: [
                        "Baca Selengkapnya",
                        /* @__PURE__ */ jsx("div", { className: "w-6 h-0.5 bg-emerald-600 group-hover/btn:w-10 transition-all" })
                      ]
                    }
                  )
                ] })
              ]
            },
            post.id
          )),
          posts.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium", children: "Belum ada berita terbaru saat ini." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/3 space-y-8 sm:space-y-10 lg:space-y-12", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "bg-emerald-900 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full border-4 border-emerald-400/30 p-1 mb-6", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: greeting?.hero_image ? `/storage/${greeting.hero_image}` : "https://ui-avatars.com/api/?name=Ketua&background=059669&color=fff",
                    className: "w-full h-full object-cover rounded-full",
                    alt: "Ketua"
                  }
                ) }),
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-2 font-serif", children: greeting?.hero_title || "Sambutan Ketua" }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-1 bg-emerald-400 rounded-full mb-6" }),
                /* @__PURE__ */ jsxs("p", { className: "text-emerald-100/80 text-sm italic leading-relaxed", children: [
                  /* @__PURE__ */ jsx("i", { className: "fas fa-quote-left mr-2 opacity-40" }),
                  greeting?.hero_description || "Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua.",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-quote-right ml-2 opacity-40" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-800 font-serif", children: siteSetting?.home_agenda_title || "Agenda Terdekat" }),
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600", children: /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            agendas.map((agenda) => {
              const date = new Date(agenda.event_date);
              return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group cursor-default", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-14 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-400", children: date.toLocaleDateString("id-ID", { month: "short" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-slate-700 group-hover:text-emerald-700", children: date.getDate() })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-grow pt-1", children: [
                  /* @__PURE__ */ jsx("h5", { className: "font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors", children: agenda.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-medium", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      /* @__PURE__ */ jsx("i", { className: "far fa-clock mr-1" }),
                      " ",
                      agenda.event_time ? agenda.event_time.substring(0, 5) : "00:00",
                      " WIB"
                    ] }),
                    agenda.location && /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                      /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt mr-1" }),
                      " ",
                      agenda.location
                    ] })
                  ] })
                ] })
              ] }, agenda.id);
            }),
            agendas.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-10", children: [
              /* @__PURE__ */ jsx("i", { className: "far fa-calendar-check text-4xl text-slate-100 mb-4 block" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: "Belum ada agenda terdekat." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/agenda",
              className: "mt-10 w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-2xl text-center text-sm font-bold transition-all block",
              children: "Lihat Semua Agenda"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Home as default
};
