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
      className: `fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-emerald-900/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-2 sm:gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: `/storage/${siteSetting.site_logo}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: `fas fa-users text-emerald-600 text-xl` }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-base sm:text-xl font-bold text-white font-serif tracking-tight leading-none", style: { textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)" }, children: siteSetting?.site_name || "PKPT IPNU IPPNU" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] text-emerald-200 font-bold uppercase tracking-widest mt-0.5 sm:mt-1", style: { textShadow: "0 1px 4px rgba(0,0,0,0.5)" }, children: "Portal Resmi" })
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
        ] }),
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
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: `/storage/${siteSetting.site_logo}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-emerald-600 text-xl" }) }),
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
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 overflow-hidden", children: siteSetting?.site_logo ? /* @__PURE__ */ jsx("img", { src: `/storage/${siteSetting.site_logo}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}`, alt: "Logo", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("i", { className: "fas fa-users text-white text-xl" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-white font-serif", children: siteSetting?.site_name || "PKPT IPNU IPPNU" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed max-w-xs", children: siteSetting?.footer_description || "Wadah pengembangan kader pelajar terpadu yang berkomitmen membentuk generasi muda yang berkualitas dan berakhlak mulia." }),
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
            className: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all",
            children: /* @__PURE__ */ jsx("i", { className: `fab fa-${social.icon}` })
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-8 relative inline-block", children: [
          "Tautan Cepat",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
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
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-8 relative inline-block", children: [
          "Informasi",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Kebijakan Privasi" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Syarat & Ketentuan" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Bantuan / FAQ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/login", className: "hover:text-white transition-colors", children: "Login Pengurus" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-white font-bold mb-8 relative inline-block", children: [
          "Kontak Kami",
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [
          { icon: "map-marker-alt", text: siteSetting?.address },
          { icon: "envelope", text: siteSetting?.email, href: `mailto:${siteSetting?.email}` },
          { icon: "phone", text: siteSetting?.phone, href: `tel:${siteSetting?.phone}` }
        ].map((contact, idx) => contact.text && /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ jsx("i", { className: `fas fa-${contact.icon}` }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed group-hover:text-white transition-colors", children: contact.text })
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
      siteSetting?.favicon && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/x-icon", href: `/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}` }),
        /* @__PURE__ */ jsx("link", { rel: "shortcut icon", href: `/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}` }),
        /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", href: `/storage/${siteSetting.favicon}?v=${siteSetting.updated_at ? new Date(siteSetting.updated_at).getTime() : Date.now()}` })
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
