import React, { useState } from "react";
import {
  Plus,
  RefreshCw,
  ArrowRight,
  Database,
  Copy,
} from "lucide-react";

export default function DynamicArrayVisualizer() {
  const INITIAL_CAPACITY = 4;

  const [capacity, setCapacity] = useState(4);

  const [array, setArray] = useState([10, 20]);

  const [message, setMessage] = useState("");

  const [copied, setCopied] = useState([]);

  const addElement = () => {
    const value = (array.length + 1) * 10;

    // Resize required
    if (array.length === capacity) {
      const newCapacity = capacity * 2;

      setCopied([...array]);

      setCapacity(newCapacity);

      setMessage(
        `Array full! Creating new array with capacity ${newCapacity}.`
      );
    } else {
      setMessage("Element added.");
    }

    setArray((prev) => [...prev, value]);
  };

  const reset = () => {
    setCapacity(INITIAL_CAPACITY);
    setArray([10, 20]);
    setCopied([]);
    setMessage("");
  };

  const emptyBlocks = capacity - array.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Dynamic Array Visualization
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand how arrays grow when capacity becomes full.
        </p>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-50 p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold">
              Size
            </h3>

            <div className="text-5xl mt-3 text-blue-600">
              {array.length}
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold">
              Capacity
            </h3>

            <div className="text-5xl mt-3 text-green-600">
              {capacity}
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold">
              Free Space
            </h3>

            <div className="text-5xl mt-3 text-yellow-600">
              {emptyBlocks}
            </div>
          </div>

        </div>

        {/* Controls */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={addElement}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >
            <Plus size={20} />
            Push Element
          </button>

          <button
            onClick={reset}
            className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <RefreshCw size={20} />
            Reset
          </button>

        </div>

        {/* Current Array */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Memory Blocks
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {array.map((value, index) => (
              <div
                key={index}
                className="w-24 h-24 bg-blue-500 text-white rounded-2xl flex flex-col items-center justify-center text-2xl font-bold shadow-lg"
              >
                {value}

                <div className="text-sm">
                  {index}
                </div>
              </div>
            ))}

            {Array(emptyBlocks)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-24 border-4 border-dashed border-gray-400 rounded-2xl flex items-center justify-center text-gray-500 text-xl"
                >
                  Empty
                </div>
              ))}

          </div>

        </div>

        {/* Resize */}

        {copied.length > 0 && array.length === copied.length + 1 && (

          <div className="bg-purple-50 rounded-3xl p-8 mb-8">

            <h2 className="text-2xl font-bold text-center mb-6">
              Resize Operation
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {copied.map((value, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-red-500 text-white rounded-xl flex items-center justify-center text-xl"
                >
                  {value}
                </div>
              ))}

              <ArrowRight
                size={40}
                className="text-purple-600"
              />

              <Copy
                size={40}
                className="text-green-600"
              />

              <ArrowRight
                size={40}
                className="text-purple-600"
              />

              {array.map((value, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-green-500 text-white rounded-xl flex items-center justify-center text-xl"
                >
                  {value}
                </div>
              ))}

            </div>

          </div>

        )}

        {/* Message */}

        {message && (
          <div className="bg-yellow-50 p-6 rounded-2xl mb-8">

            <h3 className="text-2xl font-bold mb-3">
              What Happened?
            </h3>

            <p className="text-lg">
              {message}
            </p>

          </div>
        )}

        {/* Complexity */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-green-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Normal Push
            </h3>

            <div className="text-3xl mt-3">
              O(1)
            </div>
          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Resize
            </h3>

            <div className="text-3xl mt-3">
              O(n)
            </div>
          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">
            <h3 className="font-bold text-xl">
              Average Push
            </h3>

            <div className="text-3xl mt-3">
              O(1)
            </div>
          </div>

        </div>

        {/* Explanation */}

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-4">
            Dynamic Array Internals
          </h2>

          <div className="space-y-3 text-xl">

            <p>
              1. Array starts with some capacity.
            </p>

            <p>
              2. Elements are inserted.
            </p>

            <p>
              3. Capacity becomes full.
            </p>

            <p>
              4. New larger array is created.
            </p>

            <p>
              5. Old elements are copied.
            </p>

            <p>
              6. Old array is discarded.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}