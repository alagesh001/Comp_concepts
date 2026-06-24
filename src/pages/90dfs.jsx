import React, { useState } from "react";
import {
  Play,
  Layers,
  Map,
  Puzzle,
  Search,
  Undo2,
  Flag
} from "lucide-react";

export default function DFSMazeVisualizer() {
  const [tab, setTab] = useState("maze");

  const [visited, setVisited] = useState([]);
  const [stack, setStack] = useState([]);
  const [current, setCurrent] = useState(null);

  const [path, setPath] = useState([]);

  const [deadEnds, setDeadEnds] =
    useState([]);

  const [backtracking, setBacktracking] =
    useState([]);

  const [message, setMessage] =
    useState(
      "Click Start DFS"
    );

  // 0 = open path
  // 1 = wall

  const maze = [
    [0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  const rows = maze.length;
  const cols = maze[0].length;

  const start = [0, 0];
  const end = [5, 5];

  // Right first to intentionally
  // create a dead end before the solution.

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

  function key(r, c) {
    return `${r}-${c}`;
  }

  function sleep(ms) {
    return new Promise(resolve =>
      setTimeout(resolve, ms)
    );
  }

  async function startDFS() {
    setVisited([]);
    setStack([]);
    setCurrent(null);
    setPath([]);
    setDeadEnds([]);
    setBacktracking([]);

    const seen = new Set();

    async function dfs(
      row,
      col,
      currentPath
    ) {
      if (
        row < 0 ||
        col < 0 ||
        row >= rows ||
        col >= cols
      )
        return false;

      if (maze[row][col] === 1)
        return false;

      const cell = key(row, col);

      if (seen.has(cell))
        return false;

      seen.add(cell);

      const newPath = [
        ...currentPath,
        cell
      ];

      setCurrent(cell);

      setVisited(prev => [
        ...prev,
        cell
      ]);

      setStack(newPath);

      setMessage(
        `Exploring ${cell}`
      );

      await sleep(700);

      if (
        row === end[0] &&
        col === end[1]
      ) {
        setPath(newPath);

        setMessage(
          "Goal reached!"
        );

        return true;
      }

      for (const [
        dr,
        dc
      ] of directions) {
        const found = await dfs(
          row + dr,
          col + dc,
          newPath
        );

        if (found) {
          return true;
        }
      }

      // DEAD END

      setDeadEnds(prev => [
        ...prev,
        cell
      ]);

      setCurrent(cell);

      setMessage(
        `Dead end at ${cell}`
      );

      await sleep(900);

      // BACKTRACK

      setBacktracking(prev => [
        ...prev,
        cell
      ]);

      setMessage(
        `Backtracking from ${cell}`
      );

      await sleep(700);

      setStack(currentPath);

      return false;
    }

    await dfs(
      start[0],
      start[1],
      []
    );

    setCurrent(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Title */}

        <h1 className="text-5xl font-bold text-center mb-3">
          Depth First Search (DFS)
        </h1>

        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8">
          DFS explores one path as deeply
          as possible before returning and
          trying another path. It uses a
          stack to remember previous
          positions.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("maze")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "maze"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Maze
          </button>

          <button
            onClick={() =>
              setTab("stack")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "stack"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Stack
          </button>

          <button
            onClick={() =>
              setTab("paths")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "paths"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Multiple Paths
          </button>

          <button
            onClick={() =>
              setTab("uses")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "uses"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Use Cases
          </button>

        </div>

        {/* Button */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-center">

          <button
            onClick={startDFS}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl flex gap-3 items-center"
          >
            <Play />
            Start DFS
          </button>

        </div>

        {/* MAZE TAB */}

        {tab === "maze" && (

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Maze */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Maze
              </h2>

              <div className="grid grid-cols-6 gap-2">

                {maze.map((row, r) =>
                  row.map((cell, c) => {

                    const cellKey =
                      key(r, c);

                    const isCurrent =
                      current ===
                      cellKey;

                    const isVisited =
                      visited.includes(
                        cellKey
                      );

                    const isPath =
                      path.includes(
                        cellKey
                      );

                    const isDead =
                      deadEnds.includes(
                        cellKey
                      );

                    const isBacktrack =
                      backtracking.includes(
                        cellKey
                      );

                    const isStart =
                      r === start[0] &&
                      c === start[1];

                    const isEnd =
                      r === end[0] &&
                      c === end[1];

                    return (
                      <div
                        key={cellKey}
                        className={`
                        w-16 h-16 rounded-xl flex items-center justify-center font-bold transition-all duration-500

                        ${
                          cell === 1
                            ? "bg-black"
                            : isCurrent
                            ? "bg-blue-500 text-white scale-110"
                            : isPath
                            ? "bg-green-500 text-white"
                            : isBacktrack
                            ? "bg-purple-500 text-white"
                            : isDead
                            ? "bg-red-500 text-white"
                            : isVisited
                            ? "bg-yellow-300"
                            : "bg-white border"
                        }
                      `}
                      >
                        {isStart &&
                          "S"}

                        {isEnd &&
                          "E"}
                      </div>
                    );
                  })
                )}

              </div>

            </div>

            {/* Status */}

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-5">
                DFS Status
              </h2>

              <div className="bg-blue-100 p-5 rounded-xl text-xl font-semibold">
                {message}
              </div>

              <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                  Legend
                </h3>

                <div className="space-y-3">

                  <div>
                    🟦 Current Cell
                  </div>

                  <div>
                    🟨 Visited Cell
                  </div>

                  {/* <div>
                    🟥 Dead End
                  </div>

                  <div>
                    🟪 Backtracking
                  </div> */}

                  <div>
                    🟩 Final Path
                  </div>

                  <div>
                    ⬛ Wall
                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* STACK TAB */}

        {tab === "stack" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold flex gap-3 mb-5">
                <Layers />
                DFS Stack
              </h2>

              <div className="flex flex-col-reverse gap-3">

                {stack.map(
                  (cell, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 text-white p-4 rounded-xl text-center font-bold"
                    >
                      {cell}
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Visited Order
              </h2>

              <div className="space-y-3">

                {visited.map(
                  (cell, i) => (
                    <div
                      key={i}
                      className="bg-green-100 p-3 rounded-xl"
                    >
                      {i + 1}. {cell}
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        )}

        {/* PATHS TAB */}

        {tab === "paths" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <h2 className="text-3xl font-bold mb-4">
                First Attempt
              </h2>

              <p>
                DFS first goes deep
                into one route.
              </p>

              <div className="text-2xl mt-5">
                S → → ↓ ↓
              </div>

              <div className="mt-4 text-red-600 font-bold">
                Dead End
              </div>

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <h2 className="text-3xl font-bold mb-4">
                Second Attempt
              </h2>

              <p>
                DFS backtracks and
                finds another route.
              </p>

              <div className="text-2xl mt-5">
                ↓ ↓ → → → E
              </div>

              <div className="mt-4 text-green-600 font-bold">
                Goal Found
              </div>

            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Why DFS Backtracks
              </h2>

              <p>
                DFS only explores one
                path at a time.
              </p>

              <p className="mt-3">
                When there are no
                unvisited cells, it
                returns to the previous
                position.
              </p>

              <div className="text-green-600 text-2xl font-bold mt-5">
                Explore → Dead End →
                Backtrack → New Path
              </div>

            </div>

          </div>

        )}

        {/* USES */}

        {tab === "uses" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <Map size={40} />

              <h2 className="text-3xl font-bold my-4">
                Maze Solving
              </h2>

              Explore paths until a
              solution is found.

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <Puzzle size={40} />

              <h2 className="text-3xl font-bold my-4">
                Sudoku Solver
              </h2>

              Try values and backtrack.

            </div>

            <div className="bg-yellow-100 rounded-3xl p-6">

              <Undo2 size={40} />

              <h2 className="text-3xl font-bold my-4">
                Backtracking Problems
              </h2>

              N-Queens and permutations.

            </div>

            <div className="bg-purple-100 rounded-3xl p-6">

              <Search size={40} />

              <h2 className="text-3xl font-bold my-4">
                File Systems
              </h2>

              Explore folders deeply.

            </div>

          </div>

        )}

        {/* Bottom */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            DFS Algorithm
          </h2>

          <div className="text-3xl text-blue-600">
            Go Deep → Dead End →
            Backtrack → New Path
          </div>

          <p className="mt-4">
            DFS does not guarantee the
            shortest path. It simply
            explores one route fully
            before trying another.
          </p>

          <div className="mt-5 text-green-600 text-2xl font-bold">
            DFS = Depth + Stack +
            Backtracking
          </div>

        </div>

      </div>

    </div>
  );
}