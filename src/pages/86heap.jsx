import React, { useState } from "react";
import {
  Crown,
  Hospital,
  Cpu,
  ArrowUpCircle
} from "lucide-react";

export default function HeapVisualizer() {
  const [tab, setTab] = useState("heap");

  const [task, setTask] = useState("");
  const [priority, setPriority] =
    useState("");

  const [heap, setHeap] = useState([
    { task: "Critical", priority: 100 },
    { task: "Urgent", priority: 80 },
    { task: "Normal", priority: 60 },
    { task: "Task A", priority: 50 },
    { task: "Task B", priority: 40 },
    { task: "Low", priority: 20 },
    { task: "Idle", priority: 10 }
  ]);

  const [bubbleNodes, setBubbleNodes] =
    useState([]);

  async function insertTask() {
    if (!task || !priority) return;

    let arr = [
      ...heap,
      {
        task,
        priority: Number(priority)
      }
    ];

    setHeap([...arr]);

    let i = arr.length - 1;

    while (i > 0) {
      let parent =
        Math.floor((i - 1) / 2);

      setBubbleNodes([i, parent]);

      await new Promise((r) =>
        setTimeout(r, 1000)
      );

      if (
        arr[i].priority >
        arr[parent].priority
      ) {
        [arr[i], arr[parent]] = [
          arr[parent],
          arr[i]
        ];

        setHeap([...arr]);

        i = parent;
      } else {
        break;
      }
    }

    setBubbleNodes([]);

    setTask("");
    setPriority("");
  }

  function Node({ index }) {
    if (index >= heap.length)
      return null;

    const node = heap[index];

    const isRoot = index === 0;

    const isBubble =
      bubbleNodes.includes(index);

    return (
      <div className="flex flex-col items-center">

        <button
          className={`w-24 h-24 rounded-full shadow-xl flex flex-col items-center justify-center transition-all duration-500 ${
            isRoot
              ? "bg-yellow-400 scale-110"
              : isBubble
              ? "bg-green-400 scale-125"
              : "bg-white"
          }`}
        >
          <div className="text-2xl font-bold">
            {node.priority}
          </div>

          <div className="text-xs font-medium px-2 text-center">
            {node.task}
          </div>
        </button>

        {(2 * index + 1 <
          heap.length ||
          2 * index + 2 <
            heap.length) && (
          <>
            <div className="h-8 border-l-4 border-gray-400"></div>

            <div className="flex gap-16">

              <Node
                index={2 * index + 1}
              />

              <Node
                index={2 * index + 2}
              />

            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Max Heap Visualizer
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Highest Priority Always Stays On Top
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("heap")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "heap"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Heap
          </button>

          <button
            onClick={() =>
              setTab("priority")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "priority"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Priority Uses
          </button>

          <button
            onClick={() =>
              setTab("insert")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "insert"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Insert Task
          </button>

        </div>

        {/* TAB 1 */}

        {tab === "heap" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="flex justify-center">
                <Node index={0} />
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div className="bg-yellow-100 rounded-2xl p-6">

                <div className="flex gap-2 items-center mb-3">
                  <Crown />
                  Highest Priority
                </div>

                <div className="text-4xl font-bold">
                  {heap[0].priority}
                </div>

                <div className="mt-2">
                  {heap[0].task}
                </div>

              </div>

              <div className="bg-blue-100 rounded-2xl p-6">

                <div className="font-bold mb-3">
                  Heap Rule
                </div>

                Parent Priority ≥ Child Priority

              </div>

              <div className="bg-green-100 rounded-2xl p-6">

                <div className="font-bold mb-3">
                  Complexity
                </div>

                Insert: O(log n)

              </div>

            </div>
          </>
        )}

        {/* TAB 2 */}

        {tab === "priority" && (
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-red-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 items-center mb-4">
                <Hospital />
                <h2 className="text-3xl font-bold">
                  Hospital Queue
                </h2>
              </div>

              <div className="space-y-3">

                <div className="bg-red-500 text-white p-4 rounded-xl">
                  Priority 100 — Critical Patient
                </div>

                <div className="bg-orange-400 p-4 rounded-xl">
                  Priority 80 — Serious Patient
                </div>

                <div className="bg-yellow-300 p-4 rounded-xl">
                  Priority 20 — Minor Injury
                </div>

              </div>

            </div>

            <div className="bg-blue-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 items-center mb-4">
                <Cpu />
                <h2 className="text-3xl font-bold">
                  CPU Scheduler
                </h2>
              </div>

              <div className="space-y-3">

                <div className="bg-green-500 text-white p-4 rounded-xl">
                  Priority 95 — System Task
                </div>

                <div className="bg-yellow-400 p-4 rounded-xl">
                  Priority 60 — User Task
                </div>

                <div className="bg-gray-300 p-4 rounded-xl">
                  Priority 10 — Background Task
                </div>

              </div>

            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Why Heaps Exist
              </h2>

              <p>
                The highest-priority task is always
                available at the root.
              </p>

              <p className="mt-3">
                Removing or inserting tasks remains fast.
              </p>

              <p className="mt-3 text-green-600 font-bold">
                Heaps power priority queues.
              </p>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === "insert" && (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Controls */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

                <h2 className="text-2xl font-bold mb-5">
                  Add Task
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                  <input
                    value={task}
                    onChange={(e) =>
                      setTask(
                        e.target.value
                      )
                    }
                    placeholder="Task Name"
                    className="border p-3 rounded-xl"
                  />

                  <input
                    type="number"
                    value={priority}
                    onChange={(e) =>
                      setPriority(
                        e.target.value
                      )
                    }
                    placeholder="Priority"
                    className="border p-3 rounded-xl"
                  />

                  <button
                    onClick={insertTask}
                    className="bg-purple-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <ArrowUpCircle />
                    Insert
                  </button>

                </div>

              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex justify-center">
                  <Node index={0} />
                </div>

              </div>

              <div className="bg-purple-100 rounded-3xl p-6 mt-8">

                <h2 className="text-2xl font-bold mb-4">
                  Heapify Up
                </h2>

                <p>
                  New nodes are inserted at the bottom.
                </p>

                <p className="mt-2">
                  If a child has higher priority than its parent,
                  they swap places.
                </p>

                <p className="mt-4 text-purple-700 font-bold">
                  Higher priorities move upward.
                </p>

              </div>

            </div>

            {/* Execution Order */}

            <div className="bg-yellow-100 rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Execution Order
              </h2>

              <div className="space-y-3">

                {heap
                  .slice()
                  .sort(
                    (a, b) =>
                      b.priority -
                      a.priority
                  )
                  .map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl shadow flex justify-between"
                    >
                      <span>
                        {item.task}
                      </span>

                      <span className="font-bold">
                        {item.priority}
                      </span>
                    </div>
                  ))}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}