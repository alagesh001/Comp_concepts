import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Network,
  Play
} from "lucide-react";

export default function GraphVisualizer() {
  const [tab, setTab] = useState("graph");
  const [selectedPerson, setSelectedPerson] =
    useState(null);

  const [visited, setVisited] = useState([]);

  const people = [
    { id: "Alice", x: 120, y: 80 },
    { id: "Bob", x: 300, y: 60 },
    { id: "Charlie", x: 500, y: 90 },

    { id: "David", x: 180, y: 220 },
    { id: "Emma", x: 360, y: 200 },
    { id: "Frank", x: 550, y: 220 },

    { id: "Grace", x: 100, y: 380 },
    { id: "Henry", x: 280, y: 380 },
    { id: "Ivy", x: 450, y: 380 },
    { id: "Jack", x: 620, y: 380 }
  ];

  const edges = [
    ["Alice", "Bob"],
    ["Alice", "David"],

    ["Bob", "Charlie"],
    ["Bob", "Emma"],

    ["Charlie", "Frank"],

    ["David", "Emma"],
    ["David", "Grace"],

    ["Emma", "Henry"],
    ["Emma", "Ivy"],

    ["Frank", "Ivy"],
    ["Frank", "Jack"],

    ["Grace", "Henry"],

    ["Henry", "Ivy"],

    ["Ivy", "Jack"]
  ];

  const graph = {};

  people.forEach(person => {
    graph[person.id] = [];
  });

  edges.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  useEffect(() => {
    setSelectedPerson(null);
    setVisited([]);
  }, [tab]);

  async function bfs(start) {
    setVisited([]);

    const queue = [start];
    const seen = new Set([start]);

    while (queue.length) {
      const current = queue.shift();

      setVisited(prev => [
        ...prev,
        current
      ]);

      await new Promise(r =>
        setTimeout(r, 1000)
      );

      for (const friend of graph[
        current
      ]) {
        if (!seen.has(friend)) {
          seen.add(friend);
          queue.push(friend);
        }
      }
    }
  }

  const friends =
    graph[selectedPerson] || [];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Graph Data Structure
        </h1>

        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8">
          A graph consists of nodes and edges.
          In this example, people are nodes
          and friendships are edges.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() => setTab("graph")}
            className={`px-6 py-3 rounded-xl ${
              tab === "graph"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Friends Graph
          </button>

          <button
            onClick={() =>
              setTab("traversal")
            }
            className={`px-6 py-3 rounded-xl ${
              tab === "traversal"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            BFS Search
          </button>

          <button
            onClick={() => setTab("uses")}
            className={`px-6 py-3 rounded-xl ${
              tab === "uses"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Why Graphs?
          </button>

        </div>

        {/* GRAPH TAB */}

        {tab === "graph" && (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Graph */}

            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <svg width="700" height="500">

                {edges.map(([a, b], i) => {
                  const p1 =
                    people.find(
                      p => p.id === a
                    );

                  const p2 =
                    people.find(
                      p => p.id === b
                    );

                  return (
                    <line
                      key={i}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#888"
                      strokeWidth="4"
                    />
                  );
                })}

                {people.map(person => {
                  const selected =
                    selectedPerson ===
                    person.id;

                  const friend =
                    friends.includes(
                      person.id
                    );

                  return (
                    <g
                      key={person.id}
                      onClick={() =>
                        setSelectedPerson(
                          person.id
                        )
                      }
                      style={{
                        cursor:
                          "pointer"
                      }}
                    >
                      <circle
                        cx={person.x}
                        cy={person.y}
                        r="35"
                        fill={
                          selected
                            ? "#3B82F6"
                            : friend
                            ? "#FACC15"
                            : "#ffffff"
                        }
                        stroke="#333"
                        strokeWidth="3"
                      />

                      <text
                        x={person.x}
                        y={person.y + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {person.id}
                      </text>
                    </g>
                  );
                })}

              </svg>

            </div>

            {/* Information */}

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Person Details
              </h2>

              {!selectedPerson && (
                <p>
                  Click a person.
                </p>
              )}

              {selectedPerson && (
                <>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedPerson}
                  </div>

                  <div className="mt-5 text-xl">
                    Friends:
                  </div>

                  <div className="text-4xl font-bold text-green-600 mt-2">
                    {friends.length}
                  </div>

                  <div className="mt-5 space-y-3">

                    {friends.map(friend => (
                      <div
                        key={friend}
                        className="bg-yellow-100 p-3 rounded-xl"
                      >
                        {friend}
                      </div>
                    ))}

                  </div>
                </>
              )}

            </div>

          </div>
        )}

        {/* BFS */}

        {tab === "traversal" && (
          <div className="space-y-8">

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <button
                onClick={() =>
                  bfs("Alice")
                }
                className="bg-green-600 text-white px-8 py-4 rounded-xl flex gap-3 items-center"
              >
                <Play />
                Start BFS From Alice
              </button>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Visit Order
              </h2>

              <div className="flex flex-wrap gap-4">

                {visited.map(
                  (person, i) => (
                    <div
                      key={i}
                      className="w-24 h-24 rounded-full bg-green-400 flex items-center justify-center font-bold"
                    >
                      {person}
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                BFS Traversal
              </h2>

              <div className="text-3xl">
                {visited.join(
                  " → "
                )}
              </div>

            </div>

          </div>
        )}

        {/* USES */}

        {tab === "uses" && (
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <Users size={40} />

              <h2 className="text-3xl font-bold my-4">
                Social Networks
              </h2>

              Facebook and LinkedIn use graphs.

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <Search size={40} />

              <h2 className="text-3xl font-bold my-4">
                Friend Suggestions
              </h2>

              Mutual friends can be discovered.

            </div>

            <div className="bg-yellow-100 rounded-3xl p-6">

              <Network size={40} />

              <h2 className="text-3xl font-bold my-4">
                Computer Networks
              </h2>

              Devices connected together.

            </div>

            <div className="bg-purple-100 rounded-3xl p-6">

              <Play size={40} />

              <h2 className="text-3xl font-bold my-4">
                Route Finding
              </h2>

              GPS systems use graphs.

            </div>

          </div>
        )}

        {/* Bottom */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Why Graphs Are Useful
          </h2>

          <p>
            Without a graph, finding someone's
            friends means searching through every
            relationship.
          </p>

          <p className="mt-3">
            With a graph, we directly know:
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Who are Alice's friends?</li>
            <li>How many friends does Emma have?</li>
            <li>Can Alice reach Jack?</li>
            <li>Who has the most connections?</li>
          </ul>

          <div className="text-green-600 text-2xl font-bold mt-5">
            Graph = People + Relationships
          </div>

        </div>

      </div>

    </div>
  );
}