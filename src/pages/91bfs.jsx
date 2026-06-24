import React, { useState } from "react";
import {
  Play,
  Flag,
  Layers,
  Map,
  Route
} from "lucide-react";

export default function BFSMazeVisualizer() {
  const [tab, setTab] = useState("maze");

  const [visited, setVisited] = useState([]);
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [path, setPath] = useState([]);
  const [message, setMessage] =
    useState("Click Start BFS");

  const maze = [
    [0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  const start = [0, 0];
  const end = [5, 5];

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

  async function startBFS() {
    setVisited([]);
    setQueue([]);
    setCurrent(null);
    setPath([]);

    const seen = new Set();

    const q = [];

    const parent = {};

    q.push(start);

    seen.add(key(...start));

    while (q.length > 0) {
      setQueue([...q]);

      const [r, c] = q.shift();

      const cell = key(r, c);

      setCurrent(cell);

      setVisited(prev => [
        ...prev,
        cell
      ]);

      setMessage(
        `Exploring ${cell}`
      );

      await sleep(600);

      if (
        r === end[0] &&
        c === end[1]
      ) {
        let cur = cell;

        const finalPath = [];

        while (cur) {
          finalPath.unshift(cur);
          cur = parent[cur];
        }

        setPath(finalPath);

        setMessage(
          "Shortest path found!"
        );

        break;
      }

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr < 0 ||
          nc < 0 ||
          nr >= maze.length ||
          nc >= maze[0].length
        )
          continue;

        if (maze[nr][nc] === 1)
          continue;

        const next = key(
          nr,
          nc
        );

        if (!seen.has(next)) {
          seen.add(next);

          parent[next] =
            cell;

          q.push([nr, nc]);
        }
      }
    }

    setCurrent(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Breadth First Search
        </h1>

        <p className="text-center text-gray-600 mb-8">
          BFS explores nearby cells first.
          It uses a queue and finds the shortest path.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

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
              setTab("queue")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "queue"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Queue
          </button>

          <button
            onClick={() =>
              setTab("uses")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "uses"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Uses
          </button>

        </div>

        {/* Start */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-center">

          <button
            onClick={startBFS}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl flex gap-3"
          >
            <Play />
            Start BFS
          </button>

        </div>

        {/* Maze */}

        {tab === "maze" && (

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="grid grid-cols-6 gap-2">

                {maze.map((row, r) =>
                  row.map((cell, c) => {

                    const k =
                      key(r, c);

                    const isCurrent =
                      current === k;

                    const isVisited =
                      visited.includes(
                        k
                      );

                    const isPath =
                      path.includes(
                        k
                      );

                    const isStart =
                      r === start[0] &&
                      c === start[1];

                    const isEnd =
                      r === end[0] &&
                      c === end[1];

                    return (
                      <div
                        key={k}
                        className={`
                        w-16 h-16 rounded-xl flex items-center justify-center font-bold transition-all duration-500

                        ${
                          cell === 1
                            ? "bg-black"
                            : isCurrent
                            ? "bg-blue-500 text-white scale-110"
                            : isPath
                            ? "bg-green-500 text-white"
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

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-4">
                Status
              </h2>

              <div className="bg-blue-100 p-4 rounded-xl text-xl">
                {message}
              </div>

              <div className="mt-8 space-y-3">

                <div>
                  🟦 Current Cell
                </div>

                <div>
                  🟨 Visited
                </div>

                <div>
                  🟩 Shortest Path
                </div>

                <div>
                  ⬛ Wall
                </div>

              </div>

            </div>

          </div>

        )}

        {/* Queue */}

        {tab === "queue" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5 flex gap-2">

                <Layers />

                Queue

              </h2>

              <div className="flex flex-wrap gap-3">

                {queue.map(
                  (cell, i) => (
                    <div
                      key={i}
                      className="bg-green-500 text-white px-5 py-3 rounded-xl"
                    >
                      {cell[0]},{cell[1]}
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                BFS Order
              </h2>

              <div className="space-y-3">

                {visited.map(
                  (v, i) => (
                    <div
                      key={i}
                      className="bg-blue-100 p-3 rounded-xl"
                    >
                      {i + 1}. {v}
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        )}

        {/* Uses */}

        {tab === "uses" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 p-6 rounded-3xl">
              <Map size={40} />

              <h2 className="text-3xl font-bold my-4">
                GPS Navigation
              </h2>

              Finds shortest routes.
            </div>

            <div className="bg-green-100 p-6 rounded-3xl">
              <Route size={40} />

              <h2 className="text-3xl font-bold my-4">
                Shortest Path
              </h2>

              Minimum number of moves.
            </div>

            <div className="bg-purple-100 p-6 rounded-3xl">
              <Layers size={40} />

              <h2 className="text-3xl font-bold my-4">
                Network Routing
              </h2>

              Discover nearby nodes.
            </div>

            <div className="bg-yellow-100 p-6 rounded-3xl">
              <Flag size={40} />

              <h2 className="text-3xl font-bold my-4">
                Social Networks
              </h2>

              Friends within 1, 2, or 3 levels.
            </div>

          </div>

        )}

        {/* Bottom */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            BFS Strategy
          </h2>

          <div className="text-3xl text-blue-600">
            Nearby First → Level by Level
          </div>

          <p className="mt-4">
            BFS explores all nearby nodes
            before going deeper.
          </p>

          <div className="mt-5 text-green-600 text-2xl font-bold">
            BFS = Queue + Shortest Path
          </div>

        </div>

      </div>
    </div>
  );
}