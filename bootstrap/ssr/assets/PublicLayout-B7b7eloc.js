import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
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
    {
      name: "Profil",
      path: "/profil",
      icon: "landmark",
      dropdown: [
        { name: "Visi & Misi", path: "/profil/visi-misi", icon: "bullseye" },
        { name: "Sejarah", path: "/profil/sejarah", icon: "history" },
        { name: "Struktur Organisasi", path: "/profil/struktur-organisasi", icon: "sitemap" }
      ]
    },
    { name: "Berita", path: "/berita", icon: "newspaper" },
    { name: "Artikel", path: "/artikel", icon: "file-alt" },
    { name: "Galeri", path: "/galeri", icon: "images" },
    { name: "Agenda", path: "/agenda", icon: "calendar-alt" },
    { name: "Kegiatan", path: "/kegiatan", icon: "tasks" }
  ];
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
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
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-lg flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: `fas fa-users text-emerald-600 text-xl lg:text-2xl` }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start text-left", children: [
              /* @__PURE__ */ jsx("span", { className: "text-base sm:text-xl lg:text-2xl font-black text-white font-serif tracking-tight leading-none", style: { textShadow: "0 4px 12px rgba(0,0,0,0.5)" }, children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] lg:text-[11px] text-emerald-200 font-bold uppercase tracking-[0.2em] mt-1 lg:mt-1.5 opacity-90 lg:block", style: { textShadow: "0 2px 4px rgba(0,0,0,0.5)" }, children: "Portal Resmi" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-2", children: [
            navLinks.map((link) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group",
                onMouseEnter: () => link.dropdown && setActiveDropdown(link.name),
                onMouseLeave: () => link.dropdown && setActiveDropdown(null),
                children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: link.path,
                      className: `px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isActive(link.path) ? "bg-white/20 text-white border border-white/30" : "text-emerald-50 hover:text-white hover:bg-white/10"}`,
                      children: [
                        /* @__PURE__ */ jsx("i", { className: `fas fa-${link.icon} opacity-70` }),
                        link.name,
                        link.dropdown && /* @__PURE__ */ jsx("i", { className: `fas fa-chevron-down text-[10px] transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}` })
                      ]
                    }
                  ),
                  link.dropdown && /* @__PURE__ */ jsx(AnimatePresence, { children: activeDropdown === link.name && /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: 10, scale: 0.95 },
                      transition: { duration: 0.2 },
                      className: "absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-emerald-50 overflow-hidden z-[60]",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "p-2", children: link.dropdown.map((subItem) => /* @__PURE__ */ jsxs(
                          Link,
                          {
                            href: subItem.path,
                            className: `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${isActive(subItem.path) ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-600"}`,
                            children: [
                              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${isActive(subItem.path) ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400"}`, children: /* @__PURE__ */ jsx("i", { className: `fas fa-${subItem.icon} text-xs` }) }),
                              subItem.name
                            ]
                          },
                          subItem.path
                        )) }),
                        /* @__PURE__ */ jsx("div", { className: "bg-slate-50 px-4 py-2 border-t border-slate-100", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider", children: "Mengenal Lebih Dekat" }) })
                      ]
                    }
                  ) })
                ]
              },
              link.path
            )),
            auth?.user && /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/dashboard",
                className: "ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2",
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
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isMobileMenuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              className: "fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[55] lg:hidden",
              onClick: () => setIsMobileMenuOpen(false)
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { x: "100%" },
              animate: { x: 0 },
              exit: { x: "100%" },
              transition: { type: "spring", damping: 30, stiffness: 350 },
              className: "fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] z-[60] lg:hidden h-screen bg-emerald-900/90 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.5)] flex flex-col",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 pb-6 border-b border-white/5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden ring-4 ring-white/10", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-emerald-600 text-xl" }) }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setIsMobileMenuOpen(false),
                        className: "w-10 h-10 flex items-center justify-center text-emerald-100 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all",
                        children: /* @__PURE__ */ jsx("i", { className: "fas fa-times text-lg" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white font-serif leading-tight", children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "h-[1px] w-4 bg-emerald-400" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-emerald-300 font-bold uppercase tracking-[0.2em]", children: "Official Portal" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 py-8 overflow-y-auto space-y-1 custom-scrollbar", children: [
                  navLinks.map((link, idx) => /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 20 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.05 + 0.1 },
                      children: link.dropdown ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => setIsMobileProfileOpen(!isMobileProfileOpen),
                            className: `flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group ${isActive(link.path) ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-xl shadow-emerald-950/20 ring-1 ring-white/20" : "text-emerald-50/70 hover:text-white hover:bg-white/5"}`,
                            children: [
                              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive(link.path) ? "bg-emerald-500 text-white" : "bg-white/5 text-emerald-400 group-hover:text-emerald-300"}`, children: /* @__PURE__ */ jsx("i", { className: `fas fa-${link.icon} text-xs` }) }),
                              /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: link.name }),
                              /* @__PURE__ */ jsx("i", { className: `fas fa-chevron-down text-[10px] transition-transform duration-300 ${isMobileProfileOpen ? "rotate-180" : ""}` })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileProfileOpen && /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            initial: { height: 0, opacity: 0 },
                            animate: { height: "auto", opacity: 1 },
                            exit: { height: 0, opacity: 0 },
                            className: "overflow-hidden bg-white/5 rounded-2xl mt-1 ml-4",
                            children: link.dropdown.map((subItem) => /* @__PURE__ */ jsxs(
                              Link,
                              {
                                href: subItem.path,
                                onClick: () => setIsMobileMenuOpen(false),
                                className: `flex items-center gap-4 px-6 py-3 text-xs font-bold transition-all ${isActive(subItem.path) ? "text-emerald-400" : "text-emerald-50/50 hover:text-emerald-200"}`,
                                children: [
                                  /* @__PURE__ */ jsx("i", { className: `fas fa-${subItem.icon} text-[10px] w-4 text-center` }),
                                  subItem.name
                                ]
                              },
                              subItem.path
                            ))
                          }
                        ) })
                      ] }) : /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: link.path,
                          onClick: () => setIsMobileMenuOpen(false),
                          className: `flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group ${isActive(link.path) ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-xl shadow-emerald-950/20 ring-1 ring-white/20" : "text-emerald-50/70 hover:text-white hover:bg-white/5"}`,
                          children: [
                            /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive(link.path) ? "bg-emerald-500 text-white" : "bg-white/5 text-emerald-400 group-hover:text-emerald-300"}`, children: /* @__PURE__ */ jsx("i", { className: `fas fa-${link.icon} text-xs` }) }),
                            /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: link.name }),
                            isActive(link.path) && /* @__PURE__ */ jsx(
                              motion.div,
                              {
                                layoutId: "activeIndicator",
                                className: "w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                              }
                            )
                          ]
                        }
                      )
                    },
                    link.path
                  )),
                  auth?.user && /* @__PURE__ */ jsx("div", { className: "pt-6 mt-6 border-t border-white/5 px-2", children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/admin/dashboard",
                      onClick: () => setIsMobileMenuOpen(false),
                      className: "w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]",
                      children: [
                        /* @__PURE__ */ jsx("i", { className: "fas fa-lock" }),
                        "Dashboard Admin"
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-t border-white/5 bg-black/10", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-500/50 font-bold uppercase tracking-[0.2em] mb-4", children: "Get in Touch" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["instagram", "whatsapp", "envelope"].map((social) => /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: social === "whatsapp" ? siteSetting?.youtube : social === "instagram" ? siteSetting?.instagram : `mailto:${siteSetting?.email}`,
                      target: "_blank",
                      className: "w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer",
                      children: /* @__PURE__ */ jsx("i", { className: `fab fa-${social === "envelope" ? "" : social}${social === "envelope" ? "fas fa-envelope" : ""} text-sm` })
                    },
                    social
                  )) })
                ] })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function Footer() {
  const { siteSetting } = usePage().props;
  return /* @__PURE__ */ jsx("footer", { className: "bg-slate-950 text-slate-400 pt-12 pb-8 border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-10 space-y-6", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex flex-col items-center gap-4 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: siteSetting.site_logo_url, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-emerald-600 text-2xl" }) }),
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
        { icon: "whatsapp", link: siteSetting?.youtube }
      ].map((social, idx) => social.link && /* @__PURE__ */ jsx(
        "a",
        {
          href: social.link,
          target: "_blank",
          className: "w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300",
          children: /* @__PURE__ */ jsx("i", { className: `fab fa-${social.icon}` })
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 max-w-5xl mx-auto border-t border-white/5 pt-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-4 relative inline-block text-sm uppercase tracking-wider", children: [
          "Tautan Cepat",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1.5 left-0 w-8 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 text-xs", children: [
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
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-4 relative inline-block text-sm uppercase tracking-wider", children: [
          "Informasi",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1.5 left-0 w-8 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Kebijakan Privasi" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Syarat & Ketentuan" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Bantuan / FAQ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/login", className: "hover:text-white transition-colors font-bold text-emerald-500", children: "Login Pengurus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1 border-t md:border-t-0 border-white/5 pt-12 md:pt-0", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-4 relative inline-block text-sm uppercase tracking-wider", children: [
          "Kontak Kami",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1.5 left-0 w-8 h-1 bg-emerald-600 rounded-full" })
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
    /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs", children: [
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
  useEffect(() => {
    if (window.Echo) {
      console.log("Echo initialized, subscribing to public-content...");
      const channel = window.Echo.channel("public-content").listen(".content.updated", (e) => {
        console.log("Real-time content update received:", e);
        router.reload({
          preserveScroll: true,
          preserveState: true
        });
      });
      return () => {
        channel.stopListening(".content.updated");
      };
    }
  }, []);
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
export {
  PublicLayout as P
};
