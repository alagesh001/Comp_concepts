import React, { useState } from "react";
import {
  ArrowRight,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react";

export default function QueueVsCircularQueue() {
  const SIZE = 5;

  const [tab, setTab] = useState(0);

  // Normal Queue
  const [normal, setNormal] = useState([
    "A",
    "B",
    "C",
    null,
    null,
  ]);

  const [normalFront, setNormalFront] = useState(0);
  const [normalRear, setNormalRear] = useState(2);

  // Circular Queue
  const [circular, setCircular] = useState([
    "A",
    "B",
    "C",
    null,
    null,
  ]);

  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(2);

  const [nextChar, setNextChar] = useState(68);

  const dequeue = () => {
    // Normal Queue
    if (normalFront <= normalRear) {
      const temp = [...normal];
      temp[normalFront] = null;
      setNormal(temp);
      setNormalFront(normalFront + 1);
    }

    // Circular Queue
    if (circular[front] !== null) {
      const temp = [...circular];
      temp[front] = null;
      setCircular(temp);
      setFront((front + 1) % SIZE);
    }
  };

  const enqueue = () => {
    const value = String.fromCharCode(nextChar);

    // Normal Queue
    if (normalRear < SIZE - 1) {
      const temp = [...normal];
      temp[normalRear + 1] = value;
      setNormal(temp);
      setNormalRear(normalRear + 1);
    }

    // Circular Queue
    const nextRear = (rear + 1) % SIZE;

    if (!(nextRear === front && circular[front])) {
      const temp = [...circular];
      temp[nextRear] = value;
      setCircular(temp);
      setRear(nextRear);
    }

    setNextChar(nextChar + 1);
  };

  const reset = () => {
    setNormal(["A", "B", "C", null, null]);
    setNormalFront(0);
    setNormalRear(2);

    setCircular(["A", "B", "C", null, null]);
    setFront(0);
    setRear(2);

    setNextChar(68);
  };

  const positions = [
    { x: 170, y: 20 },
    { x: 290, y: 100 },
    { x: 240, y: 240 },
    { x: 100, y: 240 },
    { x: 50, y: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Circular Queue
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Why Circular Queue Exists
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Problem
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Solution
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Compare
          </button>
        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Normal Queue Problem
            </h2>

            <div className="flex justify-center gap-4">

              <div className="w-24 h-24 bg-gray-300 rounded-xl" />

              <div className="w-24 h-24 bg-gray-300 rounded-xl" />

              <div className="w-24 h-24 bg-blue-500 text-white rounded-xl flex items-center justify-center text-2xl">
                C
              </div>

              <div className="w-24 h-24 bg-blue-500 text-white rounded-xl flex items-center justify-center text-2xl">
                D
              </div>

              <div className="w-24 h-24 bg-gray-300 rounded-xl" />

            </div>

            <div className="mt-8 bg-red-50 p-6 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3">
                Wasted Space
              </h3>

              <p className="text-lg">
                Front moved, but empty positions cannot
                be reused.
              </p>
            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <h2 className="text-3xl text-center font-bold mb-8">
              Circular Queue
            </h2>

            <div className="relative w-[380px] h-[350px] mx-auto">

              {positions.map((pos, index) => (
                <div
                  key={index}
                  className="absolute w-20 h-20 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold"
                  style={{
                    left: pos.x,
                    top: pos.y,
                  }}
                >
                  {index}
                </div>
              ))}

            </div>

            <div className="text-center text-2xl mt-4">
              4 → 0 (wrap around)
            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={enqueue}
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
              >
                <Plus />
                Enqueue
              </button>

              <button
                onClick={dequeue}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
              >
                <Minus />
                Dequeue
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-10">

              {/* Normal Queue */}

              <div className="bg-red-50 p-6 rounded-3xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                  Normal Queue
                </h2>

                <div className="flex justify-center gap-3">

                  {normal.map((item, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold ${
                        item
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {item || "-"}
                    </div>
                  ))}

                </div>

                <div className="mt-6 text-center text-lg">
                  Empty spaces cannot be reused.
                </div>

              </div>

              {/* Circular */}

              <div className="bg-green-50 p-6 rounded-3xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                  Circular Queue
                </h2>

                <div className="flex justify-center gap-3">

                  {circular.map((item, index) => (
                    <div
                      key={index}
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold ${
                        index === front
                          ? "bg-green-600"
                          : index === rear
                          ? "bg-blue-600"
                          : item
                          ? "bg-cyan-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {item || "-"}
                    </div>
                  ))}

                </div>

                <div className="mt-6 text-center text-lg">
                  Rear wraps around and uses empty cells.
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Summary */}

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-red-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Queue
            </h2>

            <ul className="space-y-2 text-lg">
              <li>❌ Wastes space</li>
              <li>❌ Rear reaches end</li>
              <li>❌ May appear full</li>
            </ul>

          </div>

          <div className="bg-green-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Circular Queue
            </h2>

            <ul className="space-y-2 text-lg">
              <li>✔ Reuses space</li>
              <li>✔ Rear wraps around</li>
              <li>✔ Efficient memory usage</li>
            </ul>

          </div>

        </div>

        <div className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-3xl text-center">

          <RefreshCw size={60} className="mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-4">
            Key Idea
          </h2>

          <div className="text-2xl">
            Circular Queue = Queue + Reusing Empty Space
          </div>

        </div>

        <div className="text-center mt-8">
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl"
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}