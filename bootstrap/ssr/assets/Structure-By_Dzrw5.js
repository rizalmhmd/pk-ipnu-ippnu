import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { P as PublicLayout, H as HeroSection } from "./HeroSection-BRcrzTIg.js";
import { AnimatePresence, motion } from "framer-motion";
import { Users, Instagram } from "lucide-react";
function Structure({ organizations, pageSetting }) {
  const [selectedOrg, setSelectedOrg] = useState("ipnu");
  const [selectedMember, setSelectedMember] = useState(null);
  const filteredMembers = (organizations || []).filter((m) => m.type === selectedOrg);
  const level1 = filteredMembers.filter((m) => parseInt(m.level) === 1);
  const level2Raw = filteredMembers.filter((m) => parseInt(m.level) === 2);
  const level3Raw = filteredMembers.filter((m) => parseInt(m.level) === 3);
  const departments = Array.from(new Set(filteredMembers.map((m) => m.department))).filter(Boolean);
  const groupedStructure = departments.map((dept) => {
    const deptMembers = filteredMembers.filter((m) => m.department === dept);
    const leaders = deptMembers.filter((m) => parseInt(m.level) === 2).sort((a, b) => {
      const posA = a.position?.toLowerCase() || "";
      const posB = b.position?.toLowerCase() || "";
      if (posA.includes("ketua") && !posB.includes("ketua")) return -1;
      if (!posA.includes("ketua") && posB.includes("ketua")) return 1;
      return 0;
    });
    const staff = deptMembers.filter((m) => parseInt(m.level) === 3);
    return {
      name: dept,
      leaders,
      staff
    };
  });
  const ungroupedLevel2 = level2Raw.filter((m) => !m.department);
  const ungroupedLevel3 = level3Raw.filter((m) => !m.department);
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Struktur Pengurus - PKPT IPNU IPPNU" }),
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        bgImage: pageSetting?.hero_image_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3",
        title: "Struktur Pengurus",
        subtitle: "Sinergi dan Kolaborasi Pengabdian"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-serif mb-6 leading-tight uppercase tracking-tight", children: "Struktur Pengurus" }),
        /* @__PURE__ */ jsx("div", { className: "w-20 h-1.5 bg-emerald-600 mx-auto rounded-full mb-12" }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-inner", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedOrg("ipnu"),
              className: `px-10 py-3 rounded-lg text-sm font-black transition-all duration-500 uppercase tracking-widest ${selectedOrg === "ipnu" ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-md scale-105 outline-none" : "text-slate-400 hover:text-slate-600"}`,
              children: "IPNU"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedOrg("ippnu"),
              className: `px-10 py-3 rounded-lg text-sm font-black transition-all duration-500 uppercase tracking-widest ${selectedOrg === "ippnu" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-md scale-105 outline-none" : "text-slate-400 hover:text-slate-600"}`,
              children: "IPPNU"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto pb-20 no-scrollbar", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          className: "min-w-[1000px] lg:min-w-0 py-10",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center relative mb-24", children: level1.map((m) => /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-56 md:w-64", children: [
              /* @__PURE__ */ jsx(StructureCard, { member: m, isTop: true, themeColor: selectedOrg === "ipnu" ? "emerald" : "blue", onClick: setSelectedMember }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-[102%] left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-full" }) })
            ] }, m.id)) }),
            groupedStructure.length > 1 && /* @__PURE__ */ jsx("div", { className: "relative h-px mb-20", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[3px] bg-slate-300 dark:bg-slate-700 rounded-full" }) }),
            /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap justify-center gap-y-24 ${groupedStructure.length > 4 ? "gap-x-12" : "gap-x-20"}`, children: [
              groupedStructure.map((group, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center relative group/dept", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -top-20 left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2" }),
                /* @__PURE__ */ jsx("div", { className: "mb-8 px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border-2 border-slate-200 dark:border-slate-700 z-10", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500", children: group.name }) }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-6 mb-12 relative z-10 w-full", children: group.leaders.map((leader) => /* @__PURE__ */ jsx("div", { className: "w-48 md:w-56", children: /* @__PURE__ */ jsx(StructureCard, { member: leader, isDept: true, themeColor: selectedOrg === "ipnu" ? "emerald" : "blue", onClick: setSelectedMember }) }, leader.id)) }),
                group.staff.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-10 w-[3px] h-12 bg-slate-200 dark:bg-slate-800 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-200 dark:bg-slate-800 rounded-full" }) }),
                /* @__PURE__ */ jsx("div", { className: `grid gap-4 px-4 ${group.staff.length <= 2 ? "grid-cols-2" : group.staff.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`, children: group.staff.map((s) => /* @__PURE__ */ jsx("div", { className: "w-40 md:w-44 lg:w-48", children: /* @__PURE__ */ jsx(StructureCard, { member: s, isStaff: true, themeColor: selectedOrg === "ipnu" ? "emerald" : "blue", onClick: setSelectedMember }) }, s.id)) })
              ] }, idx)),
              ungroupedLevel2.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -top-20 left-1/2 w-[3px] h-20 bg-slate-300 dark:bg-slate-700 -translate-x-1/2" }),
                /* @__PURE__ */ jsx("div", { className: "w-56", children: /* @__PURE__ */ jsx(StructureCard, { member: m, isDept: true, themeColor: selectedOrg === "ipnu" ? "emerald" : "blue", onClick: setSelectedMember }) })
              ] }, m.id))
            ] }),
            ungroupedLevel3.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-32 pt-16 border-t border-slate-100 dark:border-slate-800", children: [
              /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-[0.3em] text-slate-300", children: "Staff & Anggota Lainnya" }) }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4", children: ungroupedLevel3.map((m) => /* @__PURE__ */ jsx(StructureCard, { member: m, isStaff: true, themeColor: selectedOrg === "ipnu" ? "emerald" : "blue", onClick: setSelectedMember }, m.id)) })
            ] })
          ]
        },
        selectedOrg
      ) }) }),
      filteredMembers.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-slate-200 mx-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium tracking-wide italic", children: "Data pengurus belum tersedia dalam sistem." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedMember && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-6", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSelectedMember(null),
          className: "absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 20 },
          className: "relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl max-w-sm w-full border border-white/20",
          children: [
            /* @__PURE__ */ jsx("img", { src: selectedMember.photo_url, className: "w-full aspect-[4/5] object-cover" }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 text-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black text-slate-900 dark:text-white font-serif mb-2 tracking-tight", children: selectedMember.name }),
              /* @__PURE__ */ jsx("p", { className: "text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-6", children: selectedMember.position }),
              selectedMember.instagram && /* @__PURE__ */ jsxs(
                "a",
                {
                  href: `https://instagram.com/${selectedMember.instagram.replace("@", "")}`,
                  target: "_blank",
                  className: "inline-flex items-center gap-3 px-8 py-3 bg-black text-white rounded-lg text-sm font-black hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/10",
                  children: [
                    /* @__PURE__ */ jsx(Instagram, { size: 18 }),
                    "@",
                    selectedMember.instagram.replace("@", "")
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
function StructureCard({ member, isTop, isDept, isStaff, themeColor, onClick }) {
  const isEmerald = themeColor === "emerald";
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      Layout: true,
      onClick: () => onClick(member),
      className: `relative group cursor-pointer transition-all duration-500 ${isTop ? "w-full" : "w-full"} 
            ${isStaff ? "scale-[0.85] hover:scale-95" : isDept ? "scale-[0.95] hover:scale-105" : "hover:scale-105"}`,
      children: /* @__PURE__ */ jsxs("div", { className: `bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-none border-2 transition-all duration-500 hover:shadow-2xl overflow-hidden ${isTop ? "ring-8 ring-emerald-500/5 dark:ring-emerald-500/10" : ""} ${isEmerald ? "border-emerald-50 hover:border-emerald-400" : "border-blue-50 hover:border-blue-400"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square rounded-lg overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 group/img", children: [
          member.photo_url ? /* @__PURE__ */ jsx("img", { src: member.photo_url, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000", alt: member.name }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: `w-12 h-12 ${isEmerald ? "text-emerald-100 dark:text-emerald-900/40" : "text-blue-100 dark:text-blue-900/40"}` }) }),
          /* @__PURE__ */ jsx("div", { className: `absolute inset-0 opacity-0 group-hover/img:opacity-20 transition-opacity duration-700 ${isEmerald ? "bg-emerald-400" : "bg-blue-400"}` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center px-1", children: [
          /* @__PURE__ */ jsx("h5", { className: `font-black tracking-tight leading-tight mb-1 line-clamp-2 min-h-[2.5rem] flex items-center justify-center text-slate-900 dark:text-white ${isTop ? "text-xl md:text-2xl" : isDept ? "text-base md:text-lg" : "text-sm"}`, children: member.name }),
          /* @__PURE__ */ jsx("div", { className: `w-8 h-1 mx-auto mb-3 rounded-full opacity-30 ${isEmerald ? "bg-emerald-600" : "bg-blue-600"}` }),
          /* @__PURE__ */ jsx("p", { className: `font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md inline-block ${isEmerald ? "text-emerald-600 bg-emerald-50/50" : "text-blue-600 bg-blue-50/50"} ${isTop ? "text-[10px] md:text-xs" : "text-[8px] md:text-[10px]"}`, children: member.position })
        ] })
      ] })
    }
  );
}
export {
  Structure as default
};
