import React, { useState } from "react";
import {
  Users,
  ArrowRight,
  GitBranch,
  Globe
} from "lucide-react";

export default function DirectedVsUndirected() {
  const [tab, setTab] = useState("undirected");
  const [selected, setSelected] = useState(null);

  // Common node positions
  const people = [
    { id: "Alice", x: 120, y: 120 },
    { id: "Bob", x: 320, y: 80 },
    { id: "Charlie", x: 520, y: 120 },
    { id: "David", x: 180, y: 280 },
    { id: "Emma", x: 420, y: 280 }
  ];

  // Facebook friendship
  const undirected = [
    ["Alice", "Bob"],
    ["Alice", "David"],
    ["Bob", "Charlie"],
    ["Bob", "Emma"],
    ["David", "Emma"]
  ];

  // Instagram follows
  const directed = [
    ["Alice", "Bob"],
    ["Bob", "Charlie"],
    ["Charlie", "Emma"],
    ["David", "Alice"],
    ["Emma", "Bob"]
  ];

  const friends = {};
  people.forEach(p => {
    friends[p.id] = [];
  });

  undirected.forEach(([a, b]) => {
    friends[a].push(b);
    friends[b].push(a);
  });

  const follows = {};
  people.forEach(p => {
    follows[p.id] = [];
  });

  directed.forEach(([a, b]) => {
    follows[a].push(b);
  });

  const selectedConnections =
    tab === "undirected"
      ? friends[selected] || []
      : follows[selected] || [];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Directed vs Undirected Graph
        </h1>

        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8">
          Undirected graphs represent two-way relationships,
          while directed graphs represent one-way relationships.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() => {
              setTab("undirected");
              setSelected(null);
            }}
            className={`px-6 py-3 rounded-xl ${
              tab === "undirected"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Friendship
          </button>

          <button
            onClick={() => {
              setTab("directed");
              setSelected(null);
            }}
            className={`px-6 py-3 rounded-xl ${
              tab === "directed"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Followers
          </button>

          <button
            onClick={() => {
              setTab("compare");
              setSelected(null);
            }}
            className={`px-6 py-3 rounded-xl ${
              tab === "compare"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Compare
          </button>

          <button
            onClick={() => {
              setTab("uses");
              setSelected(null);
            }}
            className={`px-6 py-3 rounded-xl ${
              tab === "uses"
                ? "bg-orange-600 text-white"
                : "bg-white"
            }`}
          >
            Uses
          </button>

        </div>

        {/* Undirected */}

        {(tab === "undirected" ||
          tab === "directed") && (

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <svg width="650" height="400">

                {(tab === "undirected"
                  ? undirected
                  : directed).map(([a, b], i) => {

                  const p1 = people.find(
                    p => p.id === a
                  );

                  const p2 = people.find(
                    p => p.id === b
                  );

                  return (
                    <g key={i}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#666"
                        strokeWidth="4"
                      />

                      {tab === "directed" && (
                        <text
                          x={(p1.x + p2.x) / 2}
                          y={(p1.y + p2.y) / 2}
                          fontSize="26"
                          fill="red"
                        >
                          →
                        </text>
                      )}
                    </g>
                  );
                })}

                {people.map(person => {

                  const active =
                    selected === person.id;

                  const connected =
                    selectedConnections.includes(
                      person.id
                    );

                  return (
                    <g
                      key={person.id}
                      onClick={() =>
                        setSelected(person.id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={person.x}
                        cy={person.y}
                        r="35"
                        fill={
                          active
                            ? "#3B82F6"
                            : connected
                            ? "#FACC15"
                            : "white"
                        }
                        stroke="#333"
                        strokeWidth="3"
                      />

                      <text
                        x={person.x}
                        y={person.y + 5}
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {person.id}
                      </text>
                    </g>
                  );
                })}

              </svg>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Person
              </h2>

              {!selected && (
                <p>Click a person.</p>
              )}

              {selected && (
                <>
                  <div className="text-3xl text-blue-600 font-bold">
                    {selected}
                  </div>

                  <div className="mt-5 text-xl">
                    {tab === "undirected"
                      ? "Friends"
                      : "Follows"}
                  </div>

                  <div className="mt-4 space-y-3">

                    {selectedConnections.map(
                      item => (
                        <div
                          key={item}
                          className="bg-yellow-100 p-3 rounded-xl"
                        >
                          {item}
                        </div>
                      )
                    )}

                  </div>
                </>
              )}

            </div>

          </div>

        )}

        {/* Compare */}

        {tab === "compare" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <h2 className="text-3xl font-bold mb-5">
                Undirected Graph
              </h2>

              <div className="text-2xl mb-4">
                Alice — Bob
              </div>

              <p>
                Alice is Bob's friend.
              </p>

              <p>
                Bob is Alice's friend.
              </p>

              <div className="text-green-600 text-2xl font-bold mt-5">
                Two-way relationship
              </div>

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <h2 className="text-3xl font-bold mb-5">
                Directed Graph
              </h2>

              <div className="text-2xl mb-4">
                Alice → Bob
              </div>

              <p>
                Alice follows Bob.
              </p>

              <p>
                Bob may not follow Alice.
              </p>

              <div className="text-red-600 text-2xl font-bold mt-5">
                One-way relationship
              </div>

            </div>

          </div>

        )}

        {/* Uses */}

        {tab === "uses" && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <Users size={40} />

              <h2 className="text-3xl font-bold my-4">
                Facebook
              </h2>

              Friendships are undirected.

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <ArrowRight size={40} />

              <h2 className="text-3xl font-bold my-4">
                Instagram
              </h2>

              Followers are directed.

            </div>

            <div className="bg-purple-100 rounded-3xl p-6">

              <GitBranch size={40} />

              <h2 className="text-3xl font-bold my-4">
                Dependency Graphs
              </h2>

              Package dependencies are directed.

            </div>

            <div className="bg-orange-100 rounded-3xl p-6">

              <Globe size={40} />

              <h2 className="text-3xl font-bold my-4">
                Web Links
              </h2>

              One website links to another.

            </div>

          </div>

        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Key Difference
          </h2>

          <div className="text-xl">
            Undirected:
          </div>

          <div className="text-3xl text-blue-600 mb-5">
            A — B
          </div>

          <div className="text-xl">
            Directed:
          </div>

          <div className="text-3xl text-green-600">
            A → B
          </div>

        </div>

      </div>
    </div>
  );
}