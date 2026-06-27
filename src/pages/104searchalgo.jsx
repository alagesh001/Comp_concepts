import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  RotateCcw,
  Route,
  Target,
  Layers,
  CheckCircle
} from "lucide-react";

const positions = {
  A: { x: 100, y: 200, h: 10 },

  B: { x: 250, y: 120, h: 8 },
  C: { x: 250, y: 280, h: 7 },

  D: { x: 420, y: 70, h: 7 },
  E: { x: 420, y: 170, h: 5 },
  F: { x: 420, y: 250, h: 6 },
  G: { x: 420, y: 340, h: 5 },

  H: { x: 600, y: 70, h: 6 },
  I: { x: 600, y: 170, h: 3 },
  J: { x: 600, y: 250, h: 4 },
  K: { x: 600, y: 340, h: 3 },

  L: { x: 800, y: 200, h: 1 },

  M: { x: 950, y: 200, h: 0 }
};

const edges = [
  ["A", "B"],
  ["A", "C"],

  ["B", "D"],
  ["B", "E"],

  ["C", "F"],
  ["C", "G"],

  ["D", "H"],
  ["E", "I"],

  ["F", "J"],
  ["G", "K"],

  ["H", "L"],
  ["I", "L"],
  ["J", "L"],
  ["K", "L"],

  ["L", "M"]
];

const steps = [
  {
    current: "A",
    open: ["A"],
    closed: [],
    g: { A: 0 }
  },

  {
    current: "B",
    open: ["B", "C"],
    closed: ["A"],
    g: {
      A: 0,
      B: 2,
      C: 3
    }
  },

  {
    current: "C",
    open: ["C", "E", "D"],
    closed: ["A", "B"],
    g: {
      A: 0,
      B: 2,
      C: 3,
      D: 5,
      E: 6
    }
  },

  {
    current: "E",
    open: ["E", "F", "D", "G"],
    closed: ["A", "B", "C"],
    g: {
      A: 0,
      B: 2,
      C: 3,
      D: 5,
      E: 6,
      F: 5,
      G: 7
    }
  },

  {
    current: "I",
    open: ["I", "F", "D", "G"],
    closed: ["A", "B", "C", "E"],
    g: {
      A: 0,
      B: 2,
      C: 3,
      D: 5,
      E: 6,
      F: 5,
      G: 7,
      I: 8
    }
  },

  {
    current: "L",
    open: ["L", "F", "D", "G"],
    closed: ["A", "B", "C", "E", "I"],
    g: {
      A: 0,
      B: 2,
      C: 3,
      D: 5,
      E: 6,
      F: 5,
      G: 7,
      I: 8,
      L: 10
    }
  },

  {
    current: "M",
    open: ["M"],
    closed: ["A", "B", "C", "E", "I", "L"],
    g: {
      A: 0,
      B: 2,
      C: 3,
      D: 5,
      E: 6,
      F: 5,
      G: 7,
      I: 8,
      L: 10,
      M: 11
    },
    path: ["A", "B", "E", "I", "L", "M"]
  }
];

export default function AStarVisualizer() {
  const [step, setStep] = useState(0);

  const data = steps[step];

  const getColor = (node) => {
    if (data.path?.includes(node))
      return "bg-purple-500";

    if (node === data.current)
      return "bg-yellow-400";

    if (data.closed.includes(node))
      return "bg-gray-500";

    if (data.open.includes(node))
      return "bg-blue-500";

    if (node === "A")
      return "bg-green-500";

    if (node === "M")
      return "bg-red-500";

    return "bg-slate-300";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-4xl font-bold flex gap-3 items-center">
          <Route className="text-indigo-600" />
          A* Search Visualization
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          A* chooses the node with the lowest:
        </p>

        <div className="text-4xl font-bold text-indigo-600 mt-4">
          f(n) = g(n) + h(n)
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400" />
            Current Node
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            Open Set
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500" />
            Closed Set
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            Final Path
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() =>
            setStep((s) =>
              Math.min(s + 1, steps.length - 1)
            )
          }
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white flex items-center gap-2"
        >
          <Play size={18} />
          Next Step
        </button>

        <button
          onClick={() => setStep(0)}
          className="px-5 py-3 rounded-xl bg-gray-200 flex items-center gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Graph */}
      <div className="bg-slate-50 rounded-3xl overflow-auto p-6">

        <svg width="1100" height="420">

          {edges.map(([a, b], i) => {
            const p1 = positions[a];
            const p2 = positions[b];

            const active =
              data.path &&
              data.path.includes(a) &&
              data.path.includes(b);

            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={active ? "#9333EA" : "#CBD5E1"}
                strokeWidth={active ? 6 : 4}
              />
            );
          })}

          {Object.entries(positions).map(([name, node]) => {
            const g = data.g[name];

            const h = node.h;

            const f =
              g !== undefined
                ? g + h
                : "-";

            return (
              <g key={name}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="34"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={getColor(name)
                    .replace("bg-", "fill-")}
                />

                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  className="fill-white font-bold text-lg"
                >
                  {name}
                </text>

                <text
                  x={node.x}
                  y={node.y + 58}
                  textAnchor="middle"
                  className="fill-gray-700 text-sm"
                >
                  g:{g ?? "-"} h:{h} f:{f}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Panels */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4 flex gap-2">
            <Target />
            Current Node
          </h2>

          <div className="text-5xl font-bold text-yellow-500">
            {data.current}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4 flex gap-2">
            <Layers />
            Open Set
          </h2>

          <div className="space-y-3">
            {data.open.map((n) => {
              const g = data.g[n];

              if (g === undefined) return null;

              const f =
                g + positions[n].h;

              return (
                <div
                  key={n}
                  className="bg-blue-100 p-3 rounded-xl flex justify-between"
                >
                  <span>{n}</span>
                  <span>f = {f}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-4 flex gap-2">
            <CheckCircle />
            Closed Set
          </h2>

          <div className="flex gap-2 flex-wrap">
            {data.closed.map((n) => (
              <div
                key={n}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Path */}
      {data.path && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-purple-100 p-6 rounded-3xl shadow"
        >
          <h2 className="text-2xl font-bold mb-4">
            Shortest Path Found
          </h2>

          <div className="text-3xl font-bold text-purple-700">
            {data.path.join(" → ")}
          </div>

          <div className="mt-3 text-lg text-purple-800">
            Total Cost = 11
          </div>
        </motion.div>
      )}
    </div>
  );
}