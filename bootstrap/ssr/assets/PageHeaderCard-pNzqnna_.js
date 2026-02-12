import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePage } from "@inertiajs/react";
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
              src: quotesToDisplay && quotesToDisplay[currentQuote]?.image ? `/storage/${quotesToDisplay[currentQuote].image}` : bgImage,
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
  const bgStyle = bgImage ? { backgroundImage: `url(/storage/${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : bgColor ? { background: bgColor } : {};
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
  PageHeaderCard as P
};
