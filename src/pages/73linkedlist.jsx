import React, { useState } from "react";
import {
  ArrowRight,
  Plus,
  Search,
  Database,
  GitBranch,
  RotateCcw,
} from "lucide-react";

export default function LinkedListVisualizer() {
  const initialNodes = [
    { value: 10, address: 1040 },
    { value: 20, address: 2080 },
    { value: 30, address: 4020 },
    { value: 40, address: 8010 },
  ];

  const [tab, setTab] = useState(0);

  const [nodes, setNodes] = useState(initialNodes);

  const [current, setCurrent] = useState(-1);

  const [message, setMessage] = useState("");

  const traverse = () => {
    let i = 0;

    setCurrent(-1);

    const timer = setInterval(() => {
      setCurrent(i);

      if (i === nodes.length - 1) {
        clearInterval(timer);
      }

      i++;
    }, 1000);
  };

  const insertFront = () => {
    const newNode = {
      value: 99,
      address: Math.floor(Math.random() * 9000) + 1000,
    };

    setNodes([newNode, ...nodes]);

    setMessage(
      "New node created. Head pointer changed."
    );
  };

  const reset = () => {
    setNodes(initialNodes);
    setCurrent(-1);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Linked List Visualization
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Nodes connected using pointers.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Memory
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Traversal
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Insert
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Array vs List
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Nodes in Memory
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {nodes.map((node, index) => (
                <React.Fragment key={index}>

                  <div
                    className="bg-blue-500 text-white rounded-2xl p-5 w-36 shadow-lg"
                  >
                    <div className="text-center text-3xl font-bold">
                      {node.value}
                    </div>

                    <div className="mt-3 text-sm">
                      Addr: {node.address}
                    </div>

                    <div className="text-sm">
                      Next:
                      {index === nodes.length - 1
                        ? " NULL"
                        : nodes[index + 1].address}
                    </div>
                  </div>

                  {index !== nodes.length - 1 && (
                    <ArrowRight
                      size={40}
                      className="text-blue-600"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-4">
                Important Point
              </h3>

              <p className="text-lg">
                Nodes can exist anywhere in memory.
                Pointers connect them together.
              </p>

            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <div className="text-center mb-8">

              <button
                onClick={traverse}
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                Traverse List
              </button>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {nodes.map((node, index) => (
                <React.Fragment key={index}>

                  <div
                    className={`w-36 p-5 rounded-2xl text-white text-center transition-all ${
                      current === index
                        ? "bg-green-500 scale-110"
                        : "bg-blue-500"
                    }`}
                  >
                    <div className="text-3xl font-bold">
                      {node.value}
                    </div>

                    <div>
                      {current === index
                        ? "HEAD HERE"
                        : ""}
                    </div>
                  </div>

                  {index !== nodes.length - 1 && (
                    <ArrowRight
                      size={40}
                      className="text-purple-600"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-2xl">

              <div className="text-xl">
                Head → Next → Next → Next → NULL
              </div>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={insertFront}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Plus size={20} />
                Insert Front
              </button>

              <button
                onClick={reset}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </button>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {nodes.map((node, index) => (
                <React.Fragment key={index}>

                  <div className="bg-purple-500 text-white p-5 rounded-2xl w-36 text-center">
                    <div className="text-3xl font-bold">
                      {node.value}
                    </div>

                    <div className="text-sm mt-2">
                      {node.address}
                    </div>
                  </div>

                  {index !== nodes.length - 1 && (
                    <ArrowRight
                      size={40}
                      className="text-purple-600"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-4">
                Insertion
              </h3>

              <p className="text-lg">
                Only the head pointer changes.
                Existing nodes do not move.
              </p>

              {message && (
                <div className="mt-4 text-xl">
                  {message}
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 4 */}

        {tab === 3 && (
          <div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-blue-50 p-6 rounded-3xl">

                <h2 className="text-3xl font-bold mb-4">
                  Array
                </h2>

                <div className="flex gap-2 mb-6">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded flex items-center justify-center">
                    10
                  </div>
                  <div className="w-16 h-16 bg-blue-500 text-white rounded flex items-center justify-center">
                    20
                  </div>
                  <div className="w-16 h-16 bg-blue-500 text-white rounded flex items-center justify-center">
                    30
                  </div>
                </div>

                <ul className="space-y-2 text-lg">
                  <li>✔ Fast access O(1)</li>
                  <li>✖ Slow insertion O(n)</li>
                  <li>✔ Less memory</li>
                </ul>

              </div>

              <div className="bg-purple-50 p-6 rounded-3xl">

                <h2 className="text-3xl font-bold mb-4">
                  Linked List
                </h2>

                <div className="flex items-center gap-2 mb-6">

                  <div className="w-16 h-16 bg-purple-500 text-white rounded flex items-center justify-center">
                    10
                  </div>

                  <ArrowRight size={25} />

                  <div className="w-16 h-16 bg-purple-500 text-white rounded flex items-center justify-center">
                    20
                  </div>

                  <ArrowRight size={25} />

                  <div className="w-16 h-16 bg-purple-500 text-white rounded flex items-center justify-center">
                    30
                  </div>

                </div>

                <ul className="space-y-2 text-lg">
                  <li>✖ Slow access O(n)</li>
                  <li>✔ Fast insertion O(1)</li>
                  <li>✖ Extra pointer memory</li>
                </ul>

              </div>

            </div>

          </div>
        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-4 gap-4">

          <div className="bg-green-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Insert Front
            </h3>
            <div className="text-3xl mt-2">
              O(1)
            </div>
          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Search
            </h3>
            <div className="text-3xl mt-2">
              O(n)
            </div>
          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Access
            </h3>
            <div className="text-3xl mt-2">
              O(n)
            </div>
          </div>

          <div className="bg-purple-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Memory
            </h3>
            <div className="text-3xl mt-2">
              Extra
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}