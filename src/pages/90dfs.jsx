import React, { useState, useRef } from "react";
import {
  Play,
  Layers,
  Map,
  Puzzle,
  Search,
  Undo2,
} from "lucide-react";

export default function DFSMazeVisualizer() {
  const [tab, setTab] = useState("maze");
  const [visited, setVisited] = useState(new Set());
  const [stack, setStack] = useState([]);
  const [current, setCurrent] = useState(null);
  const [path, setPath] = useState(new Set());
  const [deadEnds, setDeadEnds] = useState(new Set());
  const [backtracking, setBacktracking] = useState(new Set());
  const [message, setMessage] = useState("Click Start DFS");
  const [phase, setPhase] = useState(null); // 'explore' | 'dead' | 'backtrack' | 'goal'
  const [running, setRunning] = useState(false);
  const [visitedOrder, setVisitedOrder] = useState([]);

  // Maze designed so DFS goes RIGHT first (wrong path → dead end),
  // then backtracks and goes DOWN (correct path to E).
  // 0 = open, 1 = wall
  const maze = [
    [0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 0],
  ];

  const rows = maze.length;
  const cols = maze[0].length;
  const start = [0, 0];
  const end = [5, 5];

  // Right first → forces a dead end before the correct path
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
  ];

  function key(r, c) {
    return `${r}-${c}`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function startDFS() {
    if (running) return;
    setRunning(true);

    // Reset all state
    const seen = new Set();
    const visitedSet = new Set();
    const deadSet = new Set();
    const backtrackSet = new Set();
    const pathSet = new Set();
    const visitedArr = [];

    setVisited(new Set());
    setStack([]);
    setCurrent(null);
    setPath(new Set());
    setDeadEnds(new Set());
    setBacktracking(new Set());
    setVisitedOrder([]);
    setMessage("Starting DFS from (0, 0)…");
    setPhase("explore");

    async function dfs(r, c, currentPath) {
      if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
      if (maze[r][c] === 1) return false;
      const k = key(r, c);
      if (seen.has(k)) return false;

      seen.add(k);
      visitedSet.add(k);
      visitedArr.push(k);
      const newPath = [...currentPath, k];

      setCurrent(k);
      setVisited(new Set(visitedSet));
      setStack(newPath);
      setVisitedOrder([...visitedArr]);
      setMessage(`Exploring (${r}, ${c})`);
      setPhase("explore");
      await sleep(600);

      if (r === end[0] && c === end[1]) {
        newPath.forEach((x) => pathSet.add(x));
        setPath(new Set(pathSet));
        setCurrent(null);
        setStack([]);
        setMessage(`Goal reached! Path length: ${newPath.length}`);
        setPhase("goal");
        return true;
      }

      for (const [dr, dc] of directions) {
        const found = await dfs(r + dr, c + dc, newPath);
        if (found) return true;
      }

      // Dead end
      deadSet.add(k);
      setDeadEnds(new Set(deadSet));
      setCurrent(k);
      setMessage(`Dead end at (${r}, ${c}) — no more moves`);
      setPhase("dead");
      await sleep(900);

      // Backtrack
      backtrackSet.add(k);
      setBacktracking(new Set(backtrackSet));
      setCurrent(k);
      setMessage(`Backtracking from (${r}, ${c})…`);
      setPhase("backtrack");
      setStack(currentPath);
      await sleep(700);
      setCurrent(null);
      return false;
    }

    await dfs(start[0], start[1], []);
    setRunning(false);
  }

  function getCellStyle(r, c) {
    const k = key(r, c);
    if (maze[r][c] === 1) return "bg-black";
    if (k === current)
      return "bg-blue-500 text-white scale-110 shadow-lg";
    if (path.has(k)) return "bg-green-600 text-white";
    if (backtracking.has(k)) return "bg-purple-500 text-white";
    if (deadEnds.has(k)) return "bg-red-500 text-white";
    if (visited.has(k)) return "bg-yellow-300";
    return "bg-white border border-gray-200";
  }

  const phaseColors = {
    explore: "bg-blue-100 text-blue-800 border-blue-200",
    dead: "bg-red-100 text-red-800 border-red-200",
    backtrack: "bg-purple-100 text-purple-800 border-purple-200",
    goal: "bg-green-100 text-green-800 border-green-200",
  };
  const phaseLabels = {
    explore: "Exploring",
    dead: "Dead end",
    backtrack: "Backtracking",
    goal: "Goal reached!",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-3">
          Depth First Search (DFS)
        </h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          DFS dives deep down one path. When it hits a dead end, it backtracks
          and tries a different route — using a stack to remember where it's been.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: "maze", label: "Maze", active: "bg-blue-600" },
            { id: "stack", label: "Stack", active: "bg-green-600" },
            { id: "paths", label: "Multiple Paths", active: "bg-purple-600" },
            { id: "uses", label: "Use Cases", active: "bg-orange-600" },
          ].map(({ id, label, active }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                tab === id ? `${active} text-white` : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Start Button */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-center">
          <button
            onClick={startDFS}
            disabled={running}
            className={`px-8 py-4 rounded-xl flex gap-3 items-center font-semibold text-lg transition-colors ${
              running
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Play size={22} />
            {running ? "Running…" : "Start DFS"}
          </button>
        </div>

        {/* ─── MAZE TAB ─── */}
        {tab === "maze" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Grid */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Maze</h2>
              <div className="grid grid-cols-6 gap-2">
                {maze.map((row, r) =>
                  row.map((_, c) => {
                    const isStart = r === start[0] && c === start[1];
                    const isEnd = r === end[0] && c === end[1];
                    return (
                      <div
                        key={key(r, c)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-400 ${getCellStyle(r, c)}`}
                      >
                        {isStart && "S"}
                        {isEnd && "E"}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-5">DFS status</h2>

              {/* Phase badge */}
              {phase && (
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border mb-3 ${phaseColors[phase]}`}>
                  {phaseLabels[phase]}
                </div>
              )}

              {/* Message */}
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-xl text-base font-medium mb-6">
                {message}
              </div>

              {/* Legend */}
              <h3 className="text-lg font-bold mb-4">Legend</h3>
              <div className="space-y-3 text-sm">
                {[
                  { color: "bg-blue-500", label: "Current cell" },
                  { color: "bg-yellow-300 border border-gray-300", label: "Visited" },
                  { color: "bg-red-500", label: "Dead end" },
                  { color: "bg-purple-500", label: "Backtracking" },
                  { color: "bg-green-600", label: "Final path" },
                  { color: "bg-black", label: "Wall" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded ${color}`} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── STACK TAB ─── */}
        {tab === "stack" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-5">
                <Layers size={24} /> DFS Stack
              </h2>
              <p className="text-sm text-gray-500 mb-4">Top of stack = current position</p>
              <div className="flex flex-col-reverse gap-2 max-h-96 overflow-y-auto">
                {stack.map((cell, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-center font-bold text-sm ${
                      i === stack.length - 1
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    ({cell.replace("-", ", ")})
                    {i === stack.length - 1 && " ← top"}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-5">Visited order</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {visitedOrder.map((cell, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-sm ${
                      deadEnds.has(cell)
                        ? "bg-red-100 text-red-700"
                        : backtracking.has(cell)
                        ? "bg-purple-100 text-purple-700"
                        : path.has(cell)
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {i + 1}. ({cell.replace("-", ", ")})
                    {deadEnds.has(cell) && " — dead end"}
                    {path.has(cell) && !deadEnds.has(cell) && " ✓"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── PATHS TAB ─── */}
        {tab === "paths" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-red-800">First attempt — wrong path</h2>
              <p className="text-red-700">DFS goes right first, reaches a dead end with no unvisited neighbours.</p>
              <div className="text-3xl mt-5 text-red-700 font-mono">S → → → ↓ ✗</div>
              <div className="mt-4 text-red-700 font-bold">Dead end — backtrack!</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-green-800">Second attempt — correct path</h2>
              <p className="text-green-700">After backtracking, DFS tries going down and finds a route to the goal.</p>
              <div className="text-3xl mt-5 text-green-700 font-mono">S ↓ ↓ → → ↓ E</div>
              <div className="mt-4 text-green-700 font-bold">Goal reached!</div>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Why DFS backtracks</h2>
              <p className="text-gray-600">
                DFS can only explore one path at a time. When it reaches a cell with no
                unvisited neighbours, there's nowhere to go — so it pops the stack and
                returns to the previous cell to try a different direction.
              </p>
              <div className="text-purple-700 text-xl font-bold mt-5">
                Explore → Dead end → Backtrack → New path
              </div>
            </div>
          </div>
        )}

        {/* ─── USES TAB ─── */}
        {tab === "uses" && (
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { Icon: Map, bg: "bg-blue-50", title: "Maze solving", body: "Explore paths until a solution is found, backtracking at every dead end." },
              { Icon: Puzzle, bg: "bg-green-50", title: "Sudoku solver", body: "Try a digit, recurse deeper; backtrack when a conflict is detected." },
              { Icon: Undo2, bg: "bg-yellow-50", title: "Backtracking problems", body: "N-Queens and permutations rely on DFS + backtrack to try all combinations." },
              { Icon: Search, bg: "bg-purple-50", title: "File systems", body: "Crawl directory trees by going deep into each sub-folder before the next sibling." },
            ].map(({ Icon, bg, title, body }) => (
              <div key={title} className={`${bg} rounded-3xl p-6`}>
                <Icon size={36} />
                <h2 className="text-2xl font-bold my-4">{title}</h2>
                <p>{body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom summary */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">DFS algorithm</h2>
          <div className="text-2xl text-blue-600 font-semibold">
            Go deep → Dead end → Backtrack → New path
          </div>
          <p className="mt-4 text-gray-600">
            DFS does not guarantee the shortest path. It explores one route fully
            before trying another.
          </p>
          <div className="mt-5 text-green-700 text-xl font-bold">
            DFS = depth + stack + backtracking
          </div>
        </div>

      </div>
    </div>
  );
}
