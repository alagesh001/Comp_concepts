import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Plus,
  RotateCcw,
} from "lucide-react";

export default function DoublyLinkedListVisualizer() {
  const initialPages = [
    "Google",
    "YouTube",
    "GitHub",
    "ChatGPT",
  ];

  const [tab, setTab] = useState(0);

  const [current, setCurrent] = useState(0);

  const [nodes, setNodes] = useState(initialPages);

  const [traverseIndex, setTraverseIndex] = useState(-1);

  const timerRef = useRef(null);

  const forwardTraversal = () => {
    clearInterval(timerRef.current);

    let i = 0;

    timerRef.current = setInterval(() => {
      setTraverseIndex(i);

      if (i === nodes.length - 1) {
        clearInterval(timerRef.current);
      }

      i++;
    }, 1000);
  };

  const backwardTraversal = () => {
    clearInterval(timerRef.current);

    let i = nodes.length - 1;

    timerRef.current = setInterval(() => {
      setTraverseIndex(i);

      if (i === 0) {
        clearInterval(timerRef.current);
      }

      i--;
    }, 1000);
  };

  const goNext = () => {
    if (current < nodes.length - 1) {
      setCurrent(current + 1);
    }
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const insertMiddle = () => {
    const newNodes = [...nodes];

    newNodes.splice(2, 0, "Instagram");

    setNodes(newNodes);
  };

  const reset = () => {
    clearInterval(timerRef.current);

    setNodes(initialPages);
    setCurrent(0);
    setTraverseIndex(-1);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Doubly Linked List
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Each node stores both Previous and Next pointers.
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
            One Way vs Two Way
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Browser History
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Traversal
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Insert
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-blue-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Singly Linked List
                </h2>

                <div className="flex items-center gap-3">

                  <div className="w-20 h-20 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                    A
                  </div>

                  <ArrowRight />

                  <div className="w-20 h-20 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                    B
                  </div>

                  <ArrowRight />

                  <div className="w-20 h-20 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                    C
                  </div>

                </div>

                <p className="mt-6 text-lg">
                  Can move only forward.
                </p>

              </div>

              <div className="bg-purple-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Doubly Linked List
                </h2>

                <div className="flex items-center gap-3">

                  <div className="w-20 h-20 bg-purple-500 text-white rounded-xl flex items-center justify-center">
                    A
                  </div>

                  <ArrowLeft />

                  <ArrowRight />

                  <div className="w-20 h-20 bg-purple-500 text-white rounded-xl flex items-center justify-center">
                    B
                  </div>

                  <ArrowLeft />

                  <ArrowRight />

                  <div className="w-20 h-20 bg-purple-500 text-white rounded-xl flex items-center justify-center">
                    C
                  </div>

                </div>

                <p className="mt-6 text-lg">
                  Can move forward and backward.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <div className="text-center mb-8">

              <Globe
                size={60}
                className="mx-auto text-blue-600 mb-4"
              />

              <h2 className="text-3xl font-bold">
                Browser History
              </h2>

              <p className="text-gray-600 mt-3">
                Previous and Next buttons use a doubly linked list.
              </p>

            </div>

            <div className="bg-blue-50 p-10 rounded-3xl text-center">

              <div className="text-4xl font-bold mb-8">
                {nodes[current]}
              </div>

              <div className="flex justify-center gap-6">

                <button
                  onClick={goBack}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <ArrowLeft />
                  Back
                </button>

                <button
                  onClick={goNext}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  Next
                  <ArrowRight />
                </button>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={forwardTraversal}
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                Traverse Forward
              </button>

              <button
                onClick={backwardTraversal}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl"
              >
                Traverse Backward
              </button>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {nodes.map((node, index) => (
                <React.Fragment key={index}>

                  <div
                    className={`w-28 h-28 rounded-2xl text-white flex flex-col justify-center items-center transition-all ${
                      traverseIndex === index
                        ? "bg-green-500 scale-110"
                        : "bg-blue-500"
                    }`}
                  >
                    <div className="text-xl font-bold">
                      {node}
                    </div>

                    {traverseIndex === index && (
                      <div className="text-sm mt-2">
                        Current
                      </div>
                    )}
                  </div>

                  {index !== nodes.length - 1 && (
                    <div className="flex items-center gap-2">
                      <ArrowRight />
                      <ArrowLeft />
                    </div>
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>
        )}

        {/* TAB 4 */}

        {tab === 3 && (
          <div>

            <div className="text-center mb-8">

              <button
                onClick={insertMiddle}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
              >
                <Plus />
                Insert Instagram
              </button>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {nodes.map((node, index) => (
                <React.Fragment key={index}>

                  <div className="w-28 h-28 bg-purple-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                    {node}
                  </div>

                  {index !== nodes.length - 1 && (
                    <div className="flex gap-1">
                      <ArrowRight />
                      <ArrowLeft />
                    </div>
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-3">
                What Changed?
              </h3>

              <p className="text-lg">
                The new node updates both:
              </p>

              <ul className="mt-4 text-lg space-y-2">
                <li>Previous pointer</li>
                <li>Next pointer</li>
              </ul>

            </div>

          </div>
        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-4 gap-4">

          <div className="bg-green-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Forward
            </h3>
            <div className="text-3xl mt-2">
              O(n)
            </div>
          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Backward
            </h3>
            <div className="text-3xl mt-2">
              O(n)
            </div>
          </div>

          <div className="bg-purple-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Insert
            </h3>
            <div className="text-3xl mt-2">
              O(1)
            </div>
          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold">
              Extra Memory
            </h3>
            <div className="text-3xl mt-2">
              Prev
            </div>
          </div>

        </div>

        {/* Summary */}

        <div className="mt-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-4">
            Easy Memory Rule
          </h2>

          <div className="text-2xl leading-10">
            Singly Linked List = One-way road
            <br />
            Doubly Linked List = Two-way road
          </div>

        </div>

      </div>
    </div>
  );
}