import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection } from "./HeroSection-bz1qWmGN.js";
import { motion } from "framer-motion";
import { S as SectionTitle } from "./SectionTitle-RfMm9Ud4.js";
import { A as ArticleCard } from "./ArticleCard-CJ7ppg10.js";
function HomeFeature({ subtitle, title, description, imageUrl, buttonText, buttonUrl }) {
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-16 md:py-20 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12 md:gap-20", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "lg:w-1/2 relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl || "https://images.unsplash.com/photo-1523240715639-9988d1ee9b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
              alt: "Feature",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        className: "lg:w-1/2",
        children: [
          subtitle && /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6", children: subtitle }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-black text-slate-900 font-serif mb-6 leading-tight tracking-tight uppercase", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm md:text-lg text-slate-600 leading-relaxed mb-8 font-medium", children: description }),
          buttonText && /* @__PURE__ */ jsxs(
            "a",
            {
              href: buttonUrl || "#",
              className: "inline-flex items-center gap-3 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:-translate-y-1 group",
              children: [
                buttonText,
                /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" })
              ]
            }
          )
        ]
      }
    )
  ] }) }) });
}
function ElegantHero({ title, description, subtitle, bgImage }) {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[50vh] flex items-center overflow-hidden bg-slate-950", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: bgImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
          alt: "Background",
          className: "w-full h-full object-cover opacity-40"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12 lg:px-24 relative z-10 py-16 md:py-24", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        className: "max-w-3xl",
        children: [
          subtitle && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-[2px] bg-emerald-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs", children: subtitle })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl lg:text-6xl font-black text-white font-serif mb-6 leading-[1.1] tracking-tight", children: title }),
          /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-emerald-600 mb-8 rounded-full shadow-[0_0_20px_rgba(5,150,105,0.5)]" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl border-l-4 border-emerald-500/20 pl-6 py-2", children: description })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent z-10" })
  ] });
}
function StatCard({ statistic, delay = 0 }) {
  const { title, subtitle, value, unit, description } = statistic;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] },
      className: "flex flex-col h-full space-y-4 text-center items-center",
      children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx("h5", { className: "text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.3em]", children: title }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter", children: value }) }),
          (subtitle || unit) && /* @__PURE__ */ jsxs("div", { className: "text-lg md:text-2xl font-bold text-slate-800 leading-tight", children: [
            subtitle,
            " ",
            unit && /* @__PURE__ */ jsx("span", { className: "text-slate-500 font-medium ml-1", children: unit })
          ] })
        ] }),
        description && /* @__PURE__ */ jsx("div", { className: "pt-2 md:pt-4 border-t border-slate-100 max-w-xs mx-auto", children: /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-slate-500 leading-relaxed font-medium", children: description }) })
      ]
    }
  );
}
function NewsCard({ post, idx }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: idx * 0.05 },
      className: "bg-white rounded-lg shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-40 sm:h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: post.image_url ? post.image_url : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
              alt: post.title
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 sm:top-4 sm:left-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-blue-600/90 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-md shadow-lg border border-white/20", children: "Berita" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 flex flex-col flex-grow", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3", children: [
            /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-emerald-500" }),
            new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 font-serif line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors", children: post.title }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/berita/${post.slug}`,
              className: "inline-flex items-center gap-2 text-emerald-600 font-bold text-[11px] sm:text-xs group/btn mt-auto",
              children: [
                "Baca Selengkapnya",
                /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group/btn:translate-x-1 transition-transform" })
              ]
            }
          )
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
    /* @__PURE__ */ jsx(
      HomeFeature,
      {
        subtitle: pageSetting?.feature_subtitle,
        title: pageSetting?.feature_title,
        description: pageSetting?.feature_description,
        imageUrl: pageSetting?.feature_image_url,
        buttonText: pageSetting?.feature_button_text,
        buttonUrl: pageSetting?.feature_button_url
      }
    ),
    statistics && statistics.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-white py-20 border-b border-slate-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 sm:px-10 md:px-24", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-16 md:gap-24", children: statistics.map((stat, index) => /* @__PURE__ */ jsx("div", { className: "w-full md:w-[calc(50%-4rem)] lg:w-[calc(33.333%-6rem)] min-w-[250px]", children: /* @__PURE__ */ jsx(StatCard, { statistic: stat, delay: index }) }, stat.id)) }) }) }),
    /* @__PURE__ */ jsx(
      ElegantHero,
      {
        title: `Selamat Datang di ${siteSetting?.site_name || "PKPT IPNU IPPNU"}`,
        description: "Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa",
        subtitle: "Portal Resmi",
        bgImage: pageSetting?.header_bg_image_url
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-12 md:py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row gap-12", children: /* @__PURE__ */ jsxs("div", { className: "lg:w-full", children: [
        posts && posts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-12 md:mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 text-center sm:text-left", children: [
            /* @__PURE__ */ jsx(SectionTitle, { className: "mb-0", children: siteSetting?.home_news_title || "Berita Terkini" }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/berita",
                className: "text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group text-sm",
                children: [
                  "Lihat Semua",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8", children: posts.map((post, idx) => /* @__PURE__ */ jsx(NewsCard, { post, idx }, post.id)) })
        ] }),
        articles && articles.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 text-center sm:text-left", children: [
            /* @__PURE__ */ jsx(SectionTitle, { className: "mb-0", children: "Artikel Terbaru" }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/artikel",
                className: "text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 group text-sm",
                children: [
                  "Lihat Semua",
                  /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8", children: articles.map((article, idx) => /* @__PURE__ */ jsx(ArticleCard, { article, idx }, article.id)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-12 sm:mt-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "bg-emerald-900 rounded-lg p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20 h-full flex items-center",
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
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-800 font-serif", children: siteSetting?.home_agenda_title || "Agenda Terdekat" }),
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shadow-inner", children: /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt text-lg" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6", children: [
            agendas.slice(0, 3).map((agenda) => {
              const date = new Date(agenda.event_date);
              return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group cursor-default items-start", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-14 h-16 bg-slate-50 rounded-lg flex flex-col items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300 shadow-sm group-hover:shadow-md shrink-0", children: [
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
              className: "mt-8 w-full py-4 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 rounded-lg text-center text-sm font-bold transition-all block shadow-sm hover:shadow-lg border border-slate-100 hover:border-emerald-500",
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
