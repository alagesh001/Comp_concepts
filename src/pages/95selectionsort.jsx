import React, { useState } from "react";
import {
  Play,
 RotateCcw,
  Shuffle,
  Eye,
  Code,
  Briefcase,
} from "lucide-react";

export default function SelectionSortVisualizer() {
  const initialArray = [64, 25, 12, 22, 11];

  const [array, setArray] = useState(initialArray);
  const [current, setCurrent] = useState(-1);
  const [minimum, setMinimum] = useState(-1);
  const [comparing, setComparing] = useState(-1);
  const [sorted, setSorted] = useState([]);
  const [message, setMessage] = useState("Press Start");
  const [pass, setPass] = useState(0);
  const [speed, setSpeed] = useState(800);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("visual");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function reset() {
    setArray(initialArray);
    setCurrent(-1);
    setMinimum(-1);
    setComparing(-1);
    setSorted([]);
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
    setCurrent(-1);
    setMinimum(-1);
    setComparing(-1);
    setSorted([]);
    setPass(0);
    setMessage("New array generated.");
  }

  async function startSelectionSort() {
    if (running) return;

    setRunning(true);

    const arr = [...array];
    const sortedIndexes = [];

    for (let i = 0; i < arr.length - 1; i++) {
      setPass(i + 1);

      let minIndex = i;

      setCurrent(i);
      setMinimum(i);

      setMessage(
        `Searching minimum element for position ${i}`
      );

      await sleep(speed);

      for (let j = i + 1; j < arr.length; j++) {
        setComparing(j);

        setMessage(
          `Compare ${arr[j]} with minimum ${arr[minIndex]}`
        );

        await sleep(speed);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;

          setMinimum(minIndex);

          setMessage(
            `${arr[j]} becomes new minimum`
          );

          await sleep(speed);
        }
      }

      if (minIndex !== i) {
        setMessage(
          `Swap ${arr[i]} and ${arr[minIndex]}`
        );

        [arr[i], arr[minIndex]] = [
          arr[minIndex],
          arr[i],
        ];

        setArray([...arr]);

        await sleep(speed);
      }

      sortedIndexes.push(i);
      setSorted([...sortedIndexes]);
    }

    sorted.push(array.length - 1);

    setCurrent(-1);
    setMinimum(-1);
    setComparing(-1);

    setSorted(
      Array.from({ length: array.length }, (_, i) => i)
    );

    setMessage("Array Sorted Successfully!");
    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Selection Sort Visualizer
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Find the minimum element and place it in its correct position.
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
                onClick={startSelectionSort}
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

            <div className="flex justify-center flex-wrap gap-5 mb-8">
              {array.map((num, index) => {
                let color = "bg-blue-500";

                if (sorted.includes(index))
                  color = "bg-green-500";

                if (current === index)
                  color = "bg-purple-500";

                if (minimum === index)
                  color = "bg-red-500";

                if (comparing === index)
                  color = "bg-yellow-400";

                return (
                  <div key={index} className="text-center">
                    <div
                      className={`${color}
                      w-20 h-20 rounded-full
                      flex items-center justify-center
                      text-white text-2xl font-bold
                      shadow-lg transition-all duration-500
                      ${
                        minimum === index
                          ? "scale-125"
                          : ""
                      }`}
                    >
                      {num}
                    </div>

                    <div className="mt-2 text-sm">
                      {current === index && "i"}
                      {minimum === index && " min"}
                      {comparing === index && " j"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-100 rounded-xl p-5 text-center text-xl font-semibold">
              {message}
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-8">

              <div className="bg-purple-100 p-4 rounded-xl">
                i Position
              </div>

              <div className="bg-red-100 p-4 rounded-xl">
                Minimum Element
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl">
                Comparing Element
              </div>

              <div className="bg-green-100 p-4 rounded-xl">
                Sorted Position
              </div>

            </div>

            <div className="mt-8 bg-indigo-50 p-6 rounded-xl">
              <h2 className="font-bold text-2xl mb-4">
                Complexity
              </h2>

              <p>Best Case: O(n²)</p>
              <p>Average Case: O(n²)</p>
              <p>Worst Case: O(n²)</p>
              <p>Space: O(1)</p>
            </div>
          </>
        )}

        {/* CODE */}

        {activeTab === "code" && (
          <div className="bg-slate-900 text-green-400 p-6 rounded-2xl overflow-auto">
            <pre>
{`function selectionSort(arr) {

  for(let i = 0; i < arr.length - 1; i++) {

    let minIndex = i;

    for(let j = i + 1; j < arr.length; j++) {

      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }

    }

    [arr[i], arr[minIndex]] =
      [arr[minIndex], arr[i]];
  }

  return arr;
}`}
            </pre>
          </div>
        )}

        {/* USE CASES */}

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-100 p-6 rounded-xl">
              Small datasets.
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              Educational purposes.
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl">
              Memory-constrained systems.
            </div>

            <div className="bg-red-100 p-6 rounded-xl">
              Not suitable for large datasets.
            </div>

          </div>
        )}

      </div>
    </div>
  );
}