import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection } from "./HeroSection-bz1qWmGN.js";
import { motion, AnimatePresence } from "framer-motion";
function NationalCalendar({ agendas = [], nationalHolidays = [] }) {
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const daysInMonth = (month2, year2) => new Date(year2, month2 + 1, 0).getDate();
  const firstDayOfMonth = (month2, year2) => new Date(year2, month2, 1).getDay();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(month, year);
  const firstDay = firstDayOfMonth(month, year);
  const getEventsForDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayAgendas = agendas.filter((a) => a.event_date === dateString);
    const dayHolidays = nationalHolidays.filter((h) => h.date === dateString);
    return [...dayAgendas.map((a) => ({ ...a, type: "agenda" })), ...dayHolidays.map((h) => ({ ...h, type: "holiday" }))];
  };
  const calendarDays = [];
  const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= days; d++) {
    calendarDays.push(d);
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative z-0 isolate", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        animate: { filter: selectedEvent ? "blur(10px) brightness(0.95)" : "blur(0px) brightness(1)" },
        className: "transition-all duration-500 relative h-full w-full overflow-hidden rounded-lg",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-8 border-b border-slate-100 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-slate-800 font-serif", children: [
              monthNames[month],
              " ",
              year
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("button", { onClick: prevMonth, className: "w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-left" }) }),
              /* @__PURE__ */ jsx("button", { onClick: nextMonth, className: "w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-right" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-px bg-slate-100 rounded-lg overflow-hidden border border-slate-100", children: [
            dayLabels.map((day, idx) => /* @__PURE__ */ jsx("div", { className: `bg-slate-50 p-4 text-center text-xs font-bold uppercase tracking-widest ${idx === 0 ? "text-red-500" : "text-slate-400"}`, children: day }, idx)),
            calendarDays.map((day, idx) => {
              const events = day ? getEventsForDay(day) : [];
              const isSunday = idx % 7 === 0;
              const hasHoliday = events.some((e) => e.type === "holiday");
              const isToday = day && (/* @__PURE__ */ new Date()).getDate() === day && (/* @__PURE__ */ new Date()).getMonth() === month && (/* @__PURE__ */ new Date()).getFullYear() === year;
              return /* @__PURE__ */ jsx("div", { className: `min-h-[100px] md:min-h-[140px] bg-white p-2 md:p-3 group transition-colors flex flex-col ${day ? "hover:bg-slate-50 relative" : ""}`, children: day && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-2", children: /* @__PURE__ */ jsx("span", { className: `text-sm font-bold ${isToday ? "w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center" : hasHoliday || isSunday ? "text-red-500" : "text-slate-400"}`, children: day }) }),
                /* @__PURE__ */ jsx("div", { className: "space-y-1 overflow-y-auto max-h-[80px] md:max-h-[100px] no-scrollbar", children: events.map((event, eIdx) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setSelectedEvent(event),
                    className: `w-full text-left text-[8px] md:text-[9px] p-2 rounded-lg font-bold leading-tight line-clamp-2 transition-all hover:brightness-95 active:scale-95 ${event.type === "holiday" ? event.cat === "nasional" ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`,
                    children: event.title
                  },
                  eIdx
                )) })
              ] }) }, idx);
            })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-slate-50 p-8 border-t border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 text-xs font-bold uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Libur Nasional" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Hari Besar Keagamaan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Agenda Organisasi" })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedEvent && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSelectedEvent(null),
          className: "absolute inset-0 z-[60] bg-slate-950/20"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 20 },
          className: "absolute inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none",
          children: /* @__PURE__ */ jsxs("div", { className: "w-[95%] max-w-md bg-white rounded-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-8 md:p-10 border border-white relative pointer-events-auto", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedEvent(null),
                className: "absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all",
                children: /* @__PURE__ */ jsx("i", { className: "fas fa-times" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
                /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-lg flex items-center justify-center text-xl ${selectedEvent.type === "holiday" ? selectedEvent.cat === "nasional" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500" : "bg-emerald-50 text-emerald-500"}`, children: /* @__PURE__ */ jsx("i", { className: `fas ${selectedEvent.type === "holiday" ? selectedEvent.cat === "nasional" ? "fa-flag" : "fa-mosque" : "fa-calendar-check"}` }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: `px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedEvent.type === "holiday" ? selectedEvent.cat === "nasional" ? "bg-red-500 text-white" : "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`, children: selectedEvent.type === "holiday" ? selectedEvent.cat === "nasional" ? "Libur Nasional" : "Hari Besar" : "Agenda IPNU" }),
                  /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-slate-800 font-serif mt-1", children: selectedEvent.title })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-500", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("i", { className: "far fa-calendar-alt text-slate-400" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: new Date(selectedEvent.date || selectedEvent.event_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) })
                ] }),
                selectedEvent.event_time && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-500", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("i", { className: "far fa-clock text-slate-400" }) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
                    selectedEvent.event_time.substring(0, 5),
                    " WIB"
                  ] })
                ] }),
                selectedEvent.location && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-slate-500", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt text-red-400" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: selectedEvent.location })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-50", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm leading-relaxed italic", children: selectedEvent.desc || selectedEvent.description || "Tidak ada deskripsi tambahan untuk agenda ini." }) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSelectedEvent(null),
                  className: "w-full py-4 rounded-lg bg-slate-900 text-white font-bold text-sm tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10",
                  children: "TUTUP"
                }
              )
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
function AgendaIndex({ agendas = [], todayAgendas = [], pageSetting, nationalHolidays = [] }) {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [viewMode, setViewMode] = useState("list");
  const categories = [
    { id: "semua", name: "Semua", icon: "fa-list" },
    { id: "organisasi", name: "Organisasi", icon: "fa-users", color: "bg-emerald-500" },
    { id: "nasional", name: "Nasional", icon: "fa-flag", color: "bg-red-500" },
    { id: "keagamaan", name: "Keagamaan", icon: "fa-mosque", color: "bg-blue-500" },
    { id: "khusus", name: "Khusus", icon: "fa-star", color: "bg-amber-500" }
  ];
  const filteredAgendas = agendas.filter((a) => {
    if (activeFilter === "semua") return true;
    if (activeFilter === "organisasi") return (a.category || "organisasi") === "organisasi";
    return a.category === activeFilter;
  });
  const filteredHolidays = nationalHolidays.filter((h) => {
    if (activeFilter === "semua") return true;
    if (activeFilter === "nasional") return h.cat === "nasional";
    if (activeFilter === "keagamaan") return h.cat === "keagamaan";
    return false;
  });
  const combinedList = [
    ...filteredAgendas.map((a) => ({ ...a, type: "agenda" })),
    ...filteredHolidays.map((h) => ({ ...h, type: "holiday", event_date: h.date }))
  ].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  const groupedAgendas = combinedList.reduce((groups, item) => {
    const month = new Date(item.event_date).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    if (!groups[month]) groups[month] = [];
    groups[month].push(item);
    return groups;
  }, {});
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Agenda & Kegiatan" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 p-2 rounded-lg flex gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setViewMode("list"),
            className: `px-8 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === "list" ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`,
            children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-list-ul mr-2" }),
              " List Agenda"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setViewMode("calendar"),
            className: `px-8 py-3 rounded-lg text-sm font-bold transition-all ${viewMode === "calendar" ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`,
            children: [
              /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-alt mr-2" }),
              " Kalender Nasional"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 xl:gap-20", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:w-[380px] shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-32 space-y-10", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              className: "bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 rounded-lg p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-950/20 group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-110" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 mb-10", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center text-emerald-400 shadow-inner", children: /* @__PURE__ */ jsx("i", { className: "fas fa-calendar-check text-2xl" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold font-serif text-lg tracking-tight", children: "Agenda Hari Ini" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-300 font-bold uppercase tracking-widest", children: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                    todayAgendas.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-auto bg-emerald-400 rounded-full shrink-0" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h5", { className: "font-bold text-sm leading-tight mb-1", children: item.title }),
                        /* @__PURE__ */ jsxs("p", { className: "text-emerald-100/60 text-[10px] font-medium uppercase tracking-wider", children: [
                          item.event_time ? item.event_time.substring(0, 5) : "00:00",
                          " WIB"
                        ] })
                      ] })
                    ] }, item.id)),
                    todayAgendas.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-4 px-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm", children: /* @__PURE__ */ jsx("p", { className: "text-emerald-100/40 text-sm italic font-medium", children: "✨ Menunggu agenda selanjutnya..." }) })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-8 md:p-10 shadow-2xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-emerald-600" }),
            /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold text-slate-800 font-serif mb-10", children: "Kategori" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: categories.map((cat) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveFilter(cat.id),
                className: `w-full flex items-center justify-between px-5 py-4 rounded-lg transition-all duration-300 font-bold text-sm group/btn ${activeFilter === cat.id ? "bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 -translate-y-1" : "bg-slate-50 text-slate-500 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 border border-transparent hover:border-slate-100"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeFilter === cat.id ? "bg-white/20" : "bg-slate-200/50 text-slate-400 group-hover/btn:bg-emerald-50 group-hover/btn:text-emerald-600"}`, children: /* @__PURE__ */ jsx("i", { className: `fas ${cat.icon}` }) }),
                    cat.name
                  ] }),
                  /* @__PURE__ */ jsx("i", { className: `fas fa-arrow-right text-[10px] transition-all ${activeFilter === cat.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}` })
                ]
              },
              cat.id
            )) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-grow", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: viewMode === "list" ? /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.98 },
            className: "space-y-16",
            children: Object.keys(groupedAgendas).length > 0 ? Object.entries(groupedAgendas).map(([month, items]) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-slate-800 font-serif mb-8 flex items-center gap-4", children: [
                month,
                /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-100 flex-grow" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-6", children: items.map((item, idx) => {
                const date = new Date(item.event_date);
                const isHoliday = item.type === "holiday";
                const category = isHoliday ? categories.find((c) => c.id === item.cat) : categories.find((c) => c.id === (item.category || "organisasi"));
                return /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: idx * 0.05 },
                    className: `flex flex-col md:flex-row gap-6 p-8 bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 group ${isHoliday ? "hover:shadow-blue-900/10" : "hover:shadow-emerald-900/10"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:flex-col md:w-24 md:h-24 md:bg-slate-50 md:rounded-lg md:justify-center md:border md:border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors shrink-0", children: [
                        /* @__PURE__ */ jsxs("div", { className: `${isHoliday ? item.cat === "nasional" ? "bg-red-600" : "bg-blue-600" : "bg-emerald-600"} text-white w-14 h-14 rounded-lg flex flex-col items-center justify-center md:bg-transparent ${isHoliday ? item.cat === "nasional" ? "md:text-red-600" : "md:text-blue-600" : "md:text-emerald-600"}`, children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase md:mb-1", children: date.toLocaleDateString("id-ID", { month: "short" }) }),
                          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold font-serif", children: date.getDate() })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-bold text-white ${category?.color || "bg-emerald-500"}`, children: category?.name }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
                        /* @__PURE__ */ jsx("div", { className: "hidden md:block mb-3", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm shadow-emerald-950/10 ${category?.color || "bg-emerald-500"}`, children: category?.name }) }),
                        /* @__PURE__ */ jsx("h4", { className: `text-xl font-bold text-slate-800 font-serif mb-4 transition-colors ${isHoliday ? item.cat === "nasional" ? "group-hover:text-red-700" : "group-hover:text-blue-700" : "group-hover:text-emerald-700"}`, children: item.title }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-6 text-sm text-slate-400 font-medium", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx("i", { className: `far fa-clock ${isHoliday ? "text-slate-300" : "text-emerald-500"}` }),
                            isHoliday ? "Sepanjang Hari" : item.event_time ? item.event_time.substring(0, 5) + " WIB" : "00:00 WIB"
                          ] }),
                          item.location && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx("i", { className: "fas fa-map-marker-alt text-red-500" }),
                            item.location
                          ] })
                        ] }),
                        (item.description || item.desc) && /* @__PURE__ */ jsx("p", { className: "mt-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-6 italic", children: item.description || item.desc })
                      ] })
                    ]
                  },
                  isHoliday ? `h-${item.date}-${idx}` : `a-${item.id}`
                );
              }) })
            ] }, month)) : /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100", children: [
              /* @__PURE__ */ jsx("i", { className: "far fa-calendar-times text-6xl text-slate-100 mb-6 block" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Tidak ada agenda untuk kategori ini." })
            ] })
          },
          "list-view"
        ) : /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.98 },
            children: /* @__PURE__ */ jsx(NationalCalendar, { agendas: filteredAgendas, nationalHolidays: filteredHolidays })
          },
          "calendar-view"
        ) }) })
      ] })
    ] })
  ] });
}
export {
  AgendaIndex as default
};
