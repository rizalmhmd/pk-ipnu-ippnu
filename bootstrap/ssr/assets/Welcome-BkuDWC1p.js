import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { usePage, Head, Link } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection, a as PageHeaderCard } from "./PageHeaderCard-GxA7id8Q.js";
import { S as SectionTitle } from "./SectionTitle-6h1XHXt8.js";
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
      className: "bg-white rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 relative overflow-hidden group h-full",
      children: [
        /* @__PURE__ */ jsx("div", { className: `absolute top-0 right-0 w-24 h-24 ${theme.bg} rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-500` }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsx("h5", { className: `font-bold text-[10px] md:text-xs tracking-wider uppercase ${theme.text}`, children: title }),
            icon && /* @__PURE__ */ jsx("div", { className: `w-7 h-7 md:w-9 md:h-9 ${theme.bg} rounded-xl flex items-center justify-center ${theme.text} mb-2`, children: /* @__PURE__ */ jsx("i", { className: `fas ${icon} text-[10px] md:text-sm` }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight block truncate", children: value }) }),
          (subtitle || unit) && /* @__PURE__ */ jsxs("div", { className: "text-[10px] md:text-sm font-bold text-slate-600 mb-2 md:mb-4 line-clamp-1", children: [
            subtitle,
            " ",
            unit && /* @__PURE__ */ jsx("span", { className: "text-[8px] md:text-xs text-slate-400 ml-1 font-medium", children: unit })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-3 md:pt-4 border-t border-slate-50 hidden md:block", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed font-medium", children: description }) })
        ] })
      ]
    }
  );
}
function Home({ posts, articles, pageSetting, greeting, agendas, statistics }) {
  const { siteSetting } = usePage().props;
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Beranda" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: siteSetting?.default_hero_image_url ? siteSetting.default_hero_image_url : "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        hideIndicators: true
      }
    ),
    statistics && statistics.length > 0 && /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 md:px-12 -mt-12 relative z-40 mb-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4", children: statistics.map((stat, index) => /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(StatCard, { statistic: stat, delay: index }) }, stat.id)) }) }),
    /* @__PURE__ */ jsx(
      PageHeaderCard,
      {
        title: `Selamat Datang di ${siteSetting?.site_name || "PKPT IPNU IPPNU"}`,
        subtitle: "Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa",
        bgColor: pageSetting?.header_bg_color,
        textColor: pageSetting?.header_text_color,
        bgImage: pageSetting?.header_bg_image_url
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8", children: [
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
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8", children: posts.map((post, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.05 },
              className: "bg-white rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500",
              children: [
                /* @__PURE__ */ jsx("div", { className: "relative h-40 sm:h-56 overflow-hidden", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: post.image_url ? post.image_url : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                    alt: post.title
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2", children: [
                    /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
                    new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-lg font-bold text-slate-800 mb-3 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: post.title }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: `/berita/${post.slug}`,
                      className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-xs",
                      children: [
                        "Baca Selengkapnya",
                        /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" })
                      ]
                    }
                  )
                ] })
              ]
            },
            post.id
          )) })
        ] }),
        articles && articles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8", children: [
            /* @__PURE__ */ jsx(SectionTitle, { className: "mb-0", children: "Artikel Terbaru" }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/artikel",
                className: "text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group",
                children: [
                  "Lihat Semua",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8", children: articles.map((article, idx) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: idx * 0.05 },
              className: "bg-white rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 h-full",
              children: [
                /* @__PURE__ */ jsx("div", { className: "relative h-40 sm:h-56 overflow-hidden", children: article.image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: article.image_url,
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                    alt: article.title
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-emerald-800 to-blue-900 flex flex-col items-center justify-center text-white/20", children: /* @__PURE__ */ jsx("i", { className: "fas fa-file-alt text-4xl group-hover:scale-110 transition-transform duration-700" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2", children: [
                    /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
                    new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-lg font-bold text-slate-800 mb-3 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: article.title }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: `/artikel/${article.slug}`,
                      className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-xs",
                      children: [
                        "Baca Selengkapnya",
                        /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ) }, article.id)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-12 sm:mt-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "bg-emerald-900 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20 h-full flex items-center",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full -ml-12 -mb-12 blur-xl" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full", children: [
                /* @__PURE__ */ jsx("div", { className: "w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-emerald-400/30 p-1 shrink-0", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: greeting?.hero_image_url ? greeting.hero_image_url : "https://ui-avatars.com/api/?name=Ketua&background=059669&color=fff",
                    className: "w-full h-full object-cover rounded-full shadow-xl",
                    alt: "Ketua"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-xl sm:text-2xl font-bold mb-3 font-serif", children: greeting?.hero_title || "Sambutan Ketua" }),
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-1 bg-emerald-400 rounded-full mb-6 mx-auto md:mx-0" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-emerald-100/90 text-sm sm:text-base italic leading-relaxed relative", children: [
                    /* @__PURE__ */ jsx("i", { className: "fas fa-quote-left absolute -left-6 -top-2 opacity-20 text-3xl" }),
                    greeting?.hero_description || "Selamat datang di website resmi PKPT IPNU IPPNU. Semoga bermanfaat untuk kita semua.",
                    /* @__PURE__ */ jsx("i", { className: "fas fa-quote-right ml-2 opacity-20" })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[40px] p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-800 font-serif", children: siteSetting?.home_agenda_title || "Agenda Terdekat" }),
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner", children: /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt text-lg" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6", children: [
            agendas.slice(0, 3).map((agenda) => {
              const date = new Date(agenda.event_date);
              return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group cursor-default items-start", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-14 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300 shadow-sm group-hover:shadow-md shrink-0", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase text-slate-400 group-hover:text-emerald-500", children: date.toLocaleDateString("id-ID", { month: "short" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-slate-700 group-hover:text-emerald-700", children: date.getDate() })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-grow pt-1", children: [
                  /* @__PURE__ */ jsx("h5", { className: "font-bold text-slate-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors line-clamp-1", children: agenda.title }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1 text-[11px] sm:text-xs text-slate-400 font-medium", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("i", { className: "far fa-clock text-emerald-500" }),
                      " ",
                      agenda.event_time ? agenda.event_time.substring(0, 5) : "00:00",
                      " WIB"
                    ] }),
                    agenda.location && /* @__PURE__ */ jsxs("span", { className: "truncate flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt text-emerald-500" }),
                      " ",
                      agenda.location
                    ] })
                  ] })
                ] })
              ] }, agenda.id);
            }),
            agendas.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-10 col-span-full", children: [
              /* @__PURE__ */ jsx("i", { className: "far fa-calendar-check text-5xl text-slate-100 mb-4 block" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: "Belum ada agenda terdekat." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/agenda",
              className: "mt-8 w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-2xl text-center text-sm font-bold transition-all block shadow-sm hover:shadow-lg border border-slate-100 hover:border-emerald-500",
              children: "Lihat Semua Agenda"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  Home as default
};
