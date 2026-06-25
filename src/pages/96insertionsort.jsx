import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Shuffle,
  Eye,
  Code,
  Briefcase,
} from "lucide-react";

export default function InsertionSortVisualizer() {
  const initialArray = [5, 2, 4, 6, 1, 3];

  const [array, setArray] = useState(initialArray);
  const [keyIndex, setKeyIndex] = useState(-1);
  const [compareIndex, setCompareIndex] = useState(-1);
  const [sorted, setSorted] = useState([0]);
  const [message, setMessage] = useState("Press Start");
  const [pass, setPass] = useState(0);
  const [speed, setSpeed] = useState(800);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("visual");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function reset() {
    setArray(initialArray);
    setKeyIndex(-1);
    setCompareIndex(-1);
    setSorted([0]);
    setPass(0);
    setMessage("Press Start");
    setRunning(false);
  }

  function randomArray() {
    if (running) return;

    const arr = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 90) + 10
    );

    setArray(arr);
    setSorted([0]);
    setKeyIndex(-1);
    setCompareIndex(-1);
    setPass(0);
    setMessage("New array generated.");
  }

  async function startInsertionSort() {
    if (running) return;

    setRunning(true);

    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      setPass(i);

      let key = arr[i];
      let j = i - 1;

      setKeyIndex(i);

      setMessage(`Key = ${key}`);

      await sleep(speed);

      while (j >= 0 && arr[j] > key) {
        setCompareIndex(j);

        setMessage(
          `${arr[j]} > ${key}, shift right`
        );

        await sleep(speed);

        arr[j + 1] = arr[j];

        setArray([...arr]);

        j--;

        await sleep(speed);
      }

      arr[j + 1] = key;

      setArray([...arr]);

      setSorted(
        Array.from({ length: i + 1 }, (_, k) => k)
      );

      setMessage(
        `${key} inserted into correct position`
      );

      await sleep(speed);

      setCompareIndex(-1);
    }

    setKeyIndex(-1);
    setCompareIndex(-1);

    setMessage("Array Sorted Successfully!");

    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Insertion Sort Visualizer
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Build the sorted array one element at a time.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8 flex-wrap">

          <button
            onClick={() => setActiveTab("visual")}
            className={`px-5 py-3 rounded-xl ${
              activeTab === "visual"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Eye size={18} className="inline mr-2" />
            Visualization
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`px-5 py-3 rounded-xl ${
              activeTab === "code"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Code size={18} className="inline mr-2" />
            Code
          </button>

          <button
            onClick={() => setActiveTab("use")}
            className={`px-5 py-3 rounded-xl ${
              activeTab === "use"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Briefcase size={18} className="inline mr-2" />
            Use Cases
          </button>

        </div>

        {/* VISUALIZATION */}

        {activeTab === "visual" && (
          <>
            <div className="flex justify-center gap-4 mb-6 flex-wrap">

              <button
                onClick={startInsertionSort}
                disabled={running}
                className="bg-blue-500 text-white px-5 py-3 rounded-xl"
              >
                <Play className="inline mr-2" />
                Start
              </button>

              <button
                onClick={reset}
                className="bg-red-500 text-white px-5 py-3 rounded-xl"
              >
                <RotateCcw className="inline mr-2" />
                Reset
              </button>

              <button
                onClick={randomArray}
                disabled={running}
                className="bg-green-500 text-white px-5 py-3 rounded-xl"
              >
                <Shuffle className="inline mr-2" />
                Random
              </button>

            </div>

            <div className="mb-6">
              <label className="font-semibold">
                Speed: {speed} ms
              </label>

              <input
                type="range"
                min="200"
                max="1500"
                step="100"
                value={speed}
                disabled={running}
                onChange={(e) =>
                  setSpeed(Number(e.target.value))
                }
                className="w-full"
              />
            </div>

            <div className="text-center mb-6">
              <span className="bg-purple-100 px-6 py-3 rounded-xl font-bold">
                Pass {pass}
              </span>
            </div>

            <div className="flex justify-center flex-wrap gap-5 mb-10">
              {array.map((num, index) => {
                let color = "bg-blue-500";

                if (sorted.includes(index))
                  color = "bg-green-500";

                if (compareIndex === index)
                  color = "bg-yellow-400";

                if (keyIndex === index)
                  color = "bg-red-500";

                return (
                  <div key={index} className="text-center">
                    <div
                      className={`${color}
                      w-20 h-20 rounded-full
                      flex items-center justify-center
                      text-white text-2xl font-bold
                      shadow-lg transition-all duration-500
                      ${
                        keyIndex === index
                          ? "scale-125"
                          : ""
                      }`}
                    >
                      {num}
                    </div>

                    <div className="mt-2 text-sm">
                      {keyIndex === index && "KEY"}
                      {compareIndex === index && "CHECK"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-100 rounded-xl p-5 text-center text-xl font-semibold">
              {message}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">

              <div className="bg-green-100 p-5 rounded-xl">
                Sorted Portion
              </div>

              <div className="bg-red-100 p-5 rounded-xl">
                Key Element
              </div>

              <div className="bg-yellow-100 p-5 rounded-xl">
                Elements Being Compared
              </div>

            </div>

            <div className="mt-8 bg-indigo-50 p-6 rounded-xl">
              <h2 className="font-bold text-2xl mb-4">
                Complexity
              </h2>

              <p>Best Case: O(n)</p>
              <p>Average Case: O(n²)</p>
              <p>Worst Case: O(n²)</p>
              <p>Space Complexity: O(1)</p>
            </div>
          </>
        )}

        {/* CODE TAB */}

        {activeTab === "code" && (
          <div className="bg-slate-900 text-green-400 p-6 rounded-2xl overflow-auto">
            <pre>{`function insertionSort(arr) {

  for(let i = 1; i < arr.length; i++) {

    let key = arr[i];
    let j = i - 1;

    while(j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}`}</pre>
          </div>
        )}

        {/* USE CASES */}

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-100 p-6 rounded-xl">
              <h3 className="font-bold mb-2">
                Small Datasets
              </h3>
              Very efficient for small arrays.
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              <h3 className="font-bold mb-2">
                Nearly Sorted Data
              </h3>
              Runs almost in O(n) time.
            </div>

            <div className="bg-purple-100 p-6 rounded-xl">
              <h3 className="font-bold mb-2">
                Card Sorting Analogy
              </h3>
              Similar to arranging playing cards.
            </div>

            <div className="bg-red-100 p-6 rounded-xl">
              <h3 className="font-bold mb-2">
                Large Datasets
              </h3>
              Inefficient because of O(n²).
            </div>

          </div>
        )}

      </div>
    </div>
  );
}