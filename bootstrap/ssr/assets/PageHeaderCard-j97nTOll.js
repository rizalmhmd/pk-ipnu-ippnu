import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
function Navbar() {
  const { siteSetting, auth } = usePage().props;
  const { url } = usePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Beranda", path: "/", icon: "home" },
    { name: "Profil", path: "/profil", icon: "landmark" },
    { name: "Berita", path: "/berita", icon: "newspaper" },
    { name: "Artikel", path: "/artikel", icon: "file-alt" },
    { name: "Galeri", path: "/galeri", icon: "images" },
    { name: "Agenda", path: "/agenda", icon: "calendar-alt" }
  ];
  const isActive = (path) => {
    if (path === "/") return url === "/";
    return url.startsWith(path);
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-emerald-900/95 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center lg:justify-center lg:gap-10", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex flex-row items-center gap-3 sm:gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: `fas fa-users text-emerald-600 text-xl lg:text-2xl` }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start text-left", children: [
              /* @__PURE__ */ jsx("span", { className: "text-base sm:text-xl lg:text-2xl font-black text-white font-serif tracking-tight leading-none", style: { textShadow: "0 4px 12px rgba(0,0,0,0.5)" }, children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] lg:text-[11px] text-emerald-200 font-bold uppercase tracking-[0.2em] mt-1 lg:mt-1.5 opacity-90 lg:block", style: { textShadow: "0 2px 4px rgba(0,0,0,0.5)" }, children: "Portal Resmi" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-2", children: [
            navLinks.map((link) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: link.path,
                className: `px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isActive(link.path) ? "bg-white/20 text-white border border-white/30" : "text-emerald-50 hover:text-white hover:bg-white/10"}`,
                children: [
                  /* @__PURE__ */ jsx("i", { className: `fas fa-${link.icon} opacity-70` }),
                  link.name
                ]
              },
              link.path
            )),
            auth?.user && /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/dashboard",
                className: "ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "fas fa-lock" }),
                  " Dashboard"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "lg:hidden w-10 h-10 flex items-center justify-center text-white text-xl bg-emerald-700/80 hover:bg-emerald-700 rounded-lg transition-colors shadow-lg",
              children: /* @__PURE__ */ jsx("i", { className: `fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}` })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.2 },
              className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden",
              onClick: () => setIsMobileMenuOpen(false)
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: { type: "spring", damping: 25, stiffness: 300 },
              className: "fixed top-0 left-0 right-0 z-50 lg:hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 shadow-2xl border-b border-emerald-700/50", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-white/10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-emerald-600 text-xl" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-base font-bold text-white font-serif leading-none", children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[9px] text-emerald-200 font-bold uppercase tracking-widest mt-1", children: "Portal Resmi" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setIsMobileMenuOpen(false),
                      className: "w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors",
                      children: /* @__PURE__ */ jsx("i", { className: "fas fa-times text-xl" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "px-4 py-6 space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto", children: [
                  navLinks.map((link, idx) => /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.05 },
                      children: /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: link.path,
                          onClick: () => setIsMobileMenuOpen(false),
                          className: `flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold transition-all relative overflow-hidden group ${isActive(link.path) ? "bg-white/15 text-white shadow-lg border border-white/20" : "text-emerald-50 hover:bg-white/10 border border-transparent"}`,
                          children: [
                            /* @__PURE__ */ jsx("i", { className: `fas fa-${link.icon} w-5 text-center ${isActive(link.path) ? "text-emerald-300" : "text-emerald-400"}` }),
                            /* @__PURE__ */ jsx("span", { className: "flex-1", children: link.name }),
                            isActive(link.path) && /* @__PURE__ */ jsx("i", { className: "fas fa-check-circle text-emerald-300 text-sm" }),
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" })
                          ]
                        }
                      )
                    },
                    link.path
                  )),
                  auth?.user && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: navLinks.length * 0.05 },
                      className: "pt-4 mt-4 border-t border-white/10",
                      children: /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: "/admin/dashboard",
                          onClick: () => setIsMobileMenuOpen(false),
                          className: "flex items-center gap-4 px-5 py-4 rounded-xl text-base font-bold bg-blue-600 text-white border border-blue-500/30 shadow-lg hover:shadow-xl transition-all",
                          children: [
                            /* @__PURE__ */ jsx("i", { className: "fas fa-lock w-5 text-center" }),
                            /* @__PURE__ */ jsx("span", { className: "flex-1", children: "Dashboard Admin" }),
                            /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-sm" })
                          ]
                        }
                      )
                    }
                  )
                ] })
              ] })
            }
          )
        ] }) })
      ]
    }
  );
}
function Footer() {
  const { siteSetting } = usePage().props;
  return /* @__PURE__ */ jsx("footer", { className: "bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-16 space-y-8", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex flex-col items-center gap-4 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-emerald-600 text-2xl" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-white font-serif tracking-tight leading-none uppercase", children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 font-bold uppercase tracking-[0.2em] mt-2", children: "Portal Resmi" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed max-w-2xl text-slate-400", children: siteSetting?.footer_description || "Wadah pengembangan kader pelajar terpadu yang berkomitmen membentuk generasi muda yang berkualitas dan berakhlak mulia." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [
        { icon: "facebook-f", link: siteSetting?.facebook },
        { icon: "instagram", link: siteSetting?.instagram },
        { icon: "twitter", link: siteSetting?.twitter },
        { icon: "youtube", link: siteSetting?.youtube }
      ].map((social, idx) => social.link && /* @__PURE__ */ jsx(
        "a",
        {
          href: social.link,
          target: "_blank",
          className: "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300",
          children: /* @__PURE__ */ jsx("i", { className: `fab fa-${social.icon}` })
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto border-t border-white/5 pt-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-6 relative inline-block", children: [
          "Tautan Cepat",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-4 text-sm", children: [
          { name: "Beranda", path: "/" },
          { name: "Profil", path: "/profil" },
          { name: "Berita", path: "/berita" },
          { name: "Galeri", path: "/galeri" },
          { name: "Agenda", path: "/agenda" }
        ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: link.path, className: "group flex items-center gap-2 hover:text-white transition-colors", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-right text-[10px] text-emerald-500 group-hover:translate-x-1 transition-transform" }),
          link.name
        ] }) }, link.path)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pl-0 md:pl-8", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-6 relative inline-block", children: [
          "Informasi",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Kebijakan Privasi" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Syarat & Ketentuan" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Bantuan / FAQ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/login", className: "hover:text-white transition-colors font-bold text-emerald-500", children: "Login Pengurus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1 border-t md:border-t-0 border-white/5 pt-12 md:pt-0", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-6 relative inline-block", children: [
          "Kontak Kami",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6", children: [
          { icon: "map-marker-alt", text: siteSetting?.address },
          { icon: "envelope", text: siteSetting?.email, href: `mailto:${siteSetting?.email}` },
          { icon: "phone", text: siteSetting?.phone, href: `tel:${siteSetting?.phone}` }
        ].map((contact, idx) => contact.text && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ jsx("i", { className: `fas fa-${contact.icon}` }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed group-hover:text-white transition-colors break-all", children: contact.text })
        ] }, idx)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        siteSetting?.site_name || "PKPT IPNU IPPNU",
        ".",
        siteSetting?.copyright_text || " Hak Cipta Dilindungi."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
        "Dibangun dengan ",
        /* @__PURE__ */ jsx("i", { className: "fas fa-heart text-emerald-500 animate-pulse" }),
        " untuk kemajuan generasi muda"
      ] })
    ] })
  ] }) });
}
function PublicLayout({ children }) {
  const { url, props } = usePage();
  const { siteSetting } = props;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      siteSetting?.favicon_url && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: siteSetting.favicon_url }),
        /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: siteSetting.favicon_url }),
        /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", href: siteSetting.favicon_url })
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: siteSetting?.site_description || "Website Resmi PKPT IPNU IPPNU" }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: siteSetting?.meta_keywords || "IPNU, IPPNU, PKPT, Pelajar NU, Organisasi" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: siteSetting?.site_description || "Portal Informasi Resmi PKPT IPNU IPPNU" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3, ease: "easeOut" },
        children
      },
      url
    ) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function HeroSection({ bgImage }) {
  const { activeQuotes } = usePage().props;
  const [currentQuote, setCurrentQuote] = useState(0);
  useEffect(() => {
    if (activeQuotes?.length > 1) {
      const timer = setInterval(() => {
        nextQuote();
      }, 8e3);
      return () => clearInterval(timer);
    }
  }, [activeQuotes]);
  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % activeQuotes.length);
  };
  const quotesToDisplay = activeQuotes?.length > 0 ? activeQuotes : null;
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[350px] md:h-[450px] w-full overflow-hidden flex flex-col items-center justify-center shadow-2xl group bg-neutral-950", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1 },
        className: "absolute inset-0 z-0",
        children: [
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { scale: 1.1 },
              animate: { scale: 1 },
              transition: { duration: 1.5, ease: "easeOut" },
              src: quotesToDisplay && quotesToDisplay[currentQuote]?.image_url ? quotesToDisplay[currentQuote].image_url : bgImage,
              className: "w-full h-full object-cover brightness-[0.4]",
              alt: "Hero BG"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10" })
        ]
      },
      quotesToDisplay && quotesToDisplay[currentQuote]?.image ? quotesToDisplay[currentQuote].image : "default-bg"
    ) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-20 flex flex-col items-center text-center", children: /* @__PURE__ */ jsx(AnimatePresence, { children: quotesToDisplay ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "max-w-3xl",
        children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center mb-8", children: /* @__PURE__ */ jsx("i", { className: "fas fa-quote-left text-white/40 text-4xl md:text-5xl" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-6 leading-relaxed font-serif tracking-wide drop-shadow-xl italic", children: quotesToDisplay[currentQuote].content }),
          quotesToDisplay[currentQuote].author && /* @__PURE__ */ jsxs("p", { className: "text-white/70 font-medium uppercase tracking-[0.3em] text-sm md:text-base", children: [
            "— ",
            quotesToDisplay[currentQuote].author
          ] })
        ]
      },
      `quote-${currentQuote}`
    ) : /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-white/20",
        children: /* @__PURE__ */ jsx("i", { className: "fas fa-quote-left text-9xl" })
      }
    ) }) }),
    quotesToDisplay?.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 md:bottom-10 left-0 right-0 z-30 px-6 md:px-12 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-6xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8", children: quotesToDisplay.map((quote, idx) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setCurrentQuote(idx),
        className: "group text-left transition-all",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: `w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-colors duration-300 ${idx === currentQuote ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-white/30 group-hover:bg-white/50"}` }),
            /* @__PURE__ */ jsx("span", { className: `text-[10px] md:text-xs font-bold uppercase tracking-widest truncate transition-colors duration-300 ${idx === currentQuote ? "text-white" : "text-white/40 group-hover:text-white/60"}`, children: quote.author || `Quote ${idx + 1}` })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative h-px md:h-0.5 bg-white/10 w-full overflow-hidden", children: idx === currentQuote && /* @__PURE__ */ jsx(
            motion.div,
            {
              layoutId: "hero-progress",
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 8, ease: "linear" },
              className: "absolute inset-0 bg-emerald-500 origin-left"
            }
          ) })
        ]
      },
      idx
    )) }) }) })
  ] });
}
function PageHeaderCard({ title, subtitle, bgColor, textColor, bgImage }) {
  const bgStyle = bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : bgColor ? { background: bgColor } : {};
  const hasCustomBg = !!(bgImage || bgColor);
  const textStyle = textColor ? { color: textColor } : {};
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-16 md:py-24 px-4 md:px-0", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.8 },
      className: `relative overflow-hidden shadow-2xl min-h-[400px] flex items-center justify-center text-center p-12 md:p-24 transition-all duration-500 ${!hasCustomBg ? "bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-950" : ""}`,
      style: bgStyle,
      children: [
        !bgImage && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: { backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-6", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { scale: 0.95 },
              animate: { scale: 1 },
              transition: { delay: 0.2, duration: 0.5 },
              className: "text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl",
              style: textStyle,
              children: title
            }
          ),
          subtitle && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              className: "flex flex-col items-center gap-6",
              children: [
                /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" }),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-white/80 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed",
                    style: textColor ? { color: textColor, opacity: 0.8 } : {},
                    children: subtitle
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  HeroSection as H,
  PublicLayout as P,
  PageHeaderCard as a
};
