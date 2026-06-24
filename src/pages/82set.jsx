import React, { useState } from "react";
import {
  Plus,
  RotateCcw,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";

export default function SetVisualizer() {
  const [value, setValue] = useState("");

  const [setData, setSetData] = useState([]);

  const [checkingIndex, setCheckingIndex] =
    useState(null);

  const [foundIndex, setFoundIndex] =
    useState(null);

  const [message, setMessage] = useState("");

  const [duplicate, setDuplicate] =
    useState(false);

  async function insert() {
    if (!value) return;

    setCheckingIndex(null);
    setFoundIndex(null);
    setDuplicate(false);

    for (let i = 0; i < setData.length; i++) {
      setCheckingIndex(i);

      await new Promise((r) =>
        setTimeout(r, 700)
      );

      if (setData[i] === value) {
        setFoundIndex(i);
        setDuplicate(true);

        setMessage(
          `"${value}" already exists`
        );

        return;
      }
    }

    setSetData((prev) => [...prev, value]);

    setMessage(
      `"${value}" added successfully`
    );

    setValue("");
  }

  function reset() {
    setSetData([]);
    setCheckingIndex(null);
    setFoundIndex(null);
    setDuplicate(false);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-2">
          Set Visualizer
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Duplicate Prevention
        </p>

        {/* Controls */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="flex gap-4">

            <input
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              placeholder="Enter value"
              className="flex-1 border p-3 rounded-xl"
            />

            <button
              onClick={insert}
              className="bg-blue-600 text-white px-6 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>

            <button
              onClick={reset}
              className="bg-red-500 text-white px-6 rounded-xl flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Reset
            </button>

          </div>
        </div>

        {/* Duplicate Warning */}

        {duplicate && (
          <div className="bg-red-100 border-2 border-red-400 rounded-3xl p-6 mb-8 animate-pulse">

            <div className="flex items-center gap-3 text-red-700 text-2xl font-bold">
              <XCircle />
              Duplicate Found!
            </div>

            <p className="mt-2">
              Sets do not allow duplicate values.
            </p>

          </div>
        )}

        {/* Search Animation */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Duplicate Check
          </h2>

          <div className="flex flex-wrap gap-4">

            {setData.map((item, i) => (
              <div
                key={i}
                className={`w-24 h-24 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-500 ${
                  foundIndex === i
                    ? "bg-red-400 text-white scale-125"
                    : checkingIndex === i
                    ? "bg-yellow-300 scale-110"
                    : "bg-blue-100"
                }`}
              >
                {item}
              </div>
            ))}

          </div>

        </div>

        {/* Final Set */}

        <div className="bg-green-100 rounded-3xl shadow-xl p-6">

          <h2 className="text-3xl font-bold text-green-700 mb-5">
            Final Set
          </h2>

          <div className="flex flex-wrap gap-4">

            {setData.map((item, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-green-400 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg animate-pulse"
              >
                {item}
              </div>
            ))}

          </div>

          <div className="mt-6 text-xl font-bold text-green-700">
            Every value is unique.
          </div>

          <div className="text-3xl mt-4 font-bold">
            Size = {setData.length}
          </div>

        </div>

        {/* Explanation */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            How Set Prevents Duplicates
          </h2>

          <p>
            Before inserting a value,
            the Set checks whether it
            already exists.
          </p>

          <div className="bg-gray-100 rounded-xl p-4 mt-4">

            apple ✓
            <br />
            banana ✓
            <br />
            apple ❌
          </div>

          <p className="mt-4">
            If the value already exists,
            insertion is rejected.
          </p>

          <p className="mt-4 text-green-600 font-bold">
            Sets guarantee unique values.
          </p>

        </div>

        {/* Real Example */}

        <div className="bg-blue-100 rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Real Life Example
          </h2>

          <div className="text-lg">

            Student IDs:
            <br />
            101 ✓
            <br />
            102 ✓
            <br />
            101 ❌
          </div>

          <p className="mt-4">
            A student ID should appear only once.
          </p>

        </div>

        <div className="text-center text-2xl text-blue-600 font-bold mt-8">
          {message}
        </div>

      </div>
    </div>
  );
}