import React, { useState } from "react";
import {
  Database,
  Search,
  ArrowRight,
  Trash2,
  Plus,
} from "lucide-react";

export default function ArrayMemoryVisualizer() {
  const [tab, setTab] = useState(0);

  const [array, setArray] = useState([10, 20, 30, 40, 50]);

  const [selected, setSelected] = useState(null);

  const [message, setMessage] = useState("");

  const accessElement = (index) => {
    setSelected(index);
    setMessage(
      `Address = Base Address + (${index} × Size)`
    );
  };

  const insertFront = () => {
    setArray([99, ...array]);
    setMessage(
      "All elements shifted right."
    );
  };

  const insertEnd = () => {
    setArray([...array, 99]);
    setMessage(
      "Inserted at end."
    );
  };

  const removeFront = () => {
    setArray(array.slice(1));
    setMessage(
      "Remaining elements shifted left."
    );
  };

  const reset = () => {
    setArray([10, 20, 30, 40, 50]);
    setSelected(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Arrays & Memory Blocks
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Arrays store elements in contiguous memory locations.
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
            Memory Blocks
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Index Access
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Insert/Delete
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Contiguous Memory
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-6">

              {array.map((value, index) => (
                <div key={index} className="text-center">

                  <div className="text-sm mb-2">
                    {1000 + index * 4}
                  </div>

                  <div className="w-24 h-24 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    {value}
                  </div>

                  <div className="mt-2 text-gray-600">
                    index {index}
                  </div>

                </div>
              ))}

            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-4">
                Why Arrays Are Fast
              </h3>

              <p className="text-lg">
                Elements are stored one after another in memory.
              </p>

              <div className="mt-4 text-xl">
                1000 → 1004 → 1008 → 1012 → 1016
              </div>

            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Access By Index
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              {array.map((value, index) => (
                <button
                  key={index}
                  onClick={() => accessElement(index)}
                  className={`w-24 h-24 rounded-2xl text-2xl font-bold transition-all ${
                    selected === index
                      ? "bg-green-500 text-white scale-110"
                      : "bg-blue-100"
                  }`}
                >
                  {value}

                  <div className="text-sm">
                    [{index}]
                  </div>

                </button>
              ))}

            </div>

            {selected !== null && (

              <div className="bg-green-50 p-6 rounded-2xl">

                <h3 className="text-2xl font-bold mb-4">
                  Accessing Index {selected}
                </h3>

                <div className="text-xl mb-3">
                  Value = {array[selected]}
                </div>

                <div className="text-lg">
                  {message}
                </div>

              </div>

            )}

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <button
                onClick={insertFront}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Plus size={20} />
                Insert Front
              </button>

              <button
                onClick={insertEnd}
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Plus size={20} />
                Insert End
              </button>

              <button
                onClick={removeFront}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Trash2 size={20} />
                Remove Front
              </button>

              <button
                onClick={reset}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl"
              >
                Reset
              </button>

            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              {array.map((value, index) => (
                <div
                  key={index}
                  className="w-24 h-24 bg-purple-500 text-white rounded-2xl flex flex-col items-center justify-center text-2xl font-bold"
                >
                  {value}

                  <div className="text-sm">
                    {index}
                  </div>
                </div>
              ))}

            </div>

            <div className="bg-yellow-50 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold mb-4">
                Operation Result
              </h3>

              <div className="text-lg">
                {message}
              </div>

            </div>

          </div>
        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-4 gap-4">

          <div className="bg-green-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Access
            </h3>

            <div className="text-3xl mt-3">
              O(1)
            </div>
          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Update
            </h3>

            <div className="text-3xl mt-3">
              O(1)
            </div>
          </div>

          <div className="bg-yellow-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Insert End
            </h3>

            <div className="text-3xl mt-3">
              O(1)
            </div>
          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Insert Front
            </h3>

            <div className="text-3xl mt-3">
              O(n)
            </div>
          </div>

        </div>

        {/* Summary */}

        <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-4">
            Array Memory Concept
          </h2>

          <p className="text-xl leading-10">
            Arrays store data in contiguous memory blocks.
            This allows direct access using indexes, making
            retrieval extremely fast.
          </p>

        </div>

      </div>
    </div>
  );
}