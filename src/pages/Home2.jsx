import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { visualizers } from "../data/visualizers";

const CATEGORY_META = {
  "1 Programming Basics": {
    icon: "⌨️",
    color: "blue",
    desc: "Variables, functions, loops & core language concepts",
  },
  "2 Memory Management": {
    icon: "🧬",
    color: "violet",
    desc: "Stack, heap, garbage collection & memory layout",
  },
  "3 Object Oriented Programming": {
    icon: "🏛️",
    color: "indigo",
    desc: "Classes, inheritance, polymorphism & design patterns",
  },
  "4 SOLID Principles": {
    icon: "🧱",
    color: "sky",
    desc: "Five principles for clean, maintainable object-oriented code",
  },
  "5 Design Patterns": {
    icon: "🎨",
    color: "teal",
    desc: "Singleton, Factory, Observer & more reusable solutions",
  },
  "6 Concurrency & Async": {
    icon: "⚡",
    color: "amber",
    desc: "Threads, event loop, promises, debounce & throttle",
  },
  "7 DSA Fundamentals": {
    icon: "🔬",
    color: "orange",
    desc: "Complexity, recursion, call stack & core theory",
  },
  "8 Data Structures": {
    icon: "🌳",
    color: "emerald",
    desc: "Arrays, trees, graphs, heaps, tries & more",
  },
  "9 Algorithms": {
    icon: "🚀",
    color: "rose",
    desc: "Search, sort, DFS, BFS, greedy & dynamic programming",
  },
};

const COLOR_MAP = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700",   icon: "bg-blue-500",   accent: "text-blue-600",   hover: "hover:bg-blue-50",   ring: "group-hover:ring-blue-200"  },
  violet: { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700",icon: "bg-violet-500", accent: "text-violet-600", hover: "hover:bg-violet-50", ring: "group-hover:ring-violet-200"},
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700",icon: "bg-indigo-500", accent: "text-indigo-600", hover: "hover:bg-indigo-50", ring: "group-hover:ring-indigo-200"},
  sky:    { bg: "bg-sky-50",    border: "border-sky-200",    badge: "bg-sky-100 text-sky-700",      icon: "bg-sky-500",    accent: "text-sky-600",    hover: "hover:bg-sky-50",    ring: "group-hover:ring-sky-200"   },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700",    icon: "bg-teal-500",   accent: "text-teal-600",   hover: "hover:bg-teal-50",   ring: "group-hover:ring-teal-200"  },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-700",  icon: "bg-amber-500",  accent: "text-amber-600",  hover: "hover:bg-amber-50",  ring: "group-hover:ring-amber-200" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700",icon: "bg-orange-500", accent: "text-orange-600", hover: "hover:bg-orange-50", ring: "group-hover:ring-orange-200"},
  emerald:{ bg: "bg-emerald-50",border: "border-emerald-200",badge: "bg-emerald-100 text-emerald-700",icon:"bg-emerald-500",accent:"text-emerald-600",hover:"hover:bg-emerald-50",ring:"group-hover:ring-emerald-200"},
  rose:   { bg: "bg-rose-50",   border: "border-rose-200",   badge: "bg-rose-100 text-rose-700",    icon: "bg-rose-500",   accent: "text-rose-600",   hover: "hover:bg-rose-50",   ring: "group-hover:ring-rose-200"  },
};

export default function Home2() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const total = useMemo(
    () => visualizers.reduce((sum, cat) => sum + cat.items.length, 0),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return visualizers
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(([label]) => label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search]);

  const isSearching = search.length > 0;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 pt-14 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">🧭</span>
            <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
              All in 1 Programming Concepts
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Solidify {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Foundation.
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mb-10">
            Interactive visualizers for programming concepts, data structures,
            and algorithms — from first principles to advanced patterns.
          </p>

          {/* Stats row */}
          <div className="flex gap-4 flex-wrap">
            {[
              { value: total, label: "Visualizers", emoji: "🎬" },
              { value: visualizers.length, label: "Categories", emoji: "📂" },
              { value: "100%", label: "Interactive", emoji: "✨" },
            ].map(({ value, label, emoji }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className="text-white font-bold text-xl leading-none">{value}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search ───────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-6 mb-10 relative z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search any topic — e.g. 'heap', 'closure', 'BFS'…"
            className="w-full bg-white rounded-2xl shadow-lg px-5 pl-12 py-4 text-base outline-none focus:ring-2 focus:ring-blue-300 transition placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>

        {isSearching && (
          <p className="text-slate-500 text-sm mt-2 pl-1">
            {filtered.reduce((s, c) => s + c.items.length, 0)} results across{" "}
            {filtered.length} categories
          </p>
        )}
      </div>

      {/* ── Category grid ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-4">
        {filtered.map((category, index) => {
          const meta = CATEGORY_META[category.category] || { icon: "📚", color: "blue", desc: "" };
          const c = COLOR_MAP[meta.color];
          const isOpen = openIndex === index || isSearching;

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-3xl shadow-sm border ${c.border} overflow-hidden`}
            >
              {/* Category header */}
              <button
                onClick={() => !isSearching && setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`${c.icon} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                    {meta.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-slate-800">
                        {category.category}
                      </h2>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                        {category.items.length} topics
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-0.5 hidden sm:block">
                      {meta.desc}
                    </p>
                  </div>
                </div>

                {!isSearching && (
                  <ChevronDown
                    size={20}
                    className={`text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* Topic grid */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="grid"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`${c.bg} border-t ${c.border} px-5 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2`}>
                      {category.items.map(([label, path]) => (
                        <Link
                          key={path}
                          to={path}
                          className={`group bg-white rounded-xl px-4 py-3 flex items-center justify-between gap-2 border border-transparent ring-1 ring-slate-100 ${c.hover} hover:border-transparent hover:ring-2 ${c.ring} transition-all duration-150`}
                        >
                          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                            {label}
                          </span>
                          <ArrowRight
                            size={14}
                            className={`flex-shrink-0 ${c.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`}
                          />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium text-slate-600">No results for "{search}"</p>
            <p className="text-sm mt-1">Try a different keyword — e.g. "sort", "stack", or "OOP"</p>
          </div>
        )}
      </div>
    </div>
  );
}
