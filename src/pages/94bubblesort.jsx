import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Shuffle,
  Eye,
  Code,
  Briefcase,
} from "lucide-react";

export default function BubbleSortVisualizer() {
  const initialArray = [45, 23, 78, 12, 56, 9, 34];

  const [array, setArray] = useState(initialArray);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("Press Start");
  const [pass, setPass] = useState(0);
  const [speed, setSpeed] = useState(700);
  const [activeTab, setActiveTab] = useState("visual");

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function reset() {
    setArray(initialArray);
    setComparing([]);
    setSorted([]);
    setPass(0);
    setRunning(false);
    setMessage("Press Start");
  }

  function randomArray() {
    if (running) return;

    const arr = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 90) + 10
    );

    setArray(arr);
    setComparing([]);
    setSorted([]);
    setPass(0);
    setMessage("New array generated.");
  }

  async function startBubbleSort() {
    if (running) return;

    setRunning(true);

    const arr = [...array];
    const sortedIndexes = [];

    for (let i = 0; i < arr.length - 1; i++) {
      setPass(i + 1);

      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);

        setMessage(
          `Comparing ${arr[j]} and ${arr[j + 1]}`
        );

        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setMessage(
            `${arr[j]} > ${arr[j + 1]} → Swapping`
          );

          [arr[j], arr[j + 1]] = [
            arr[j + 1],
            arr[j],
          ];

          setArray([...arr]);

          await sleep(speed);
        } else {
          setMessage("No swap needed.");
          await sleep(speed / 1.5);
        }
      }

      sortedIndexes.push(arr.length - i - 1);

      setSorted([...sortedIndexes]);

      setMessage(
        `${arr[arr.length - i - 1]} reached its correct position`
      );

      await sleep(speed);
    }

    sortedIndexes.push(0);
    setSorted([...sortedIndexes]);

    setComparing([]);
    setRunning(false);
    setMessage("Array Sorted Successfully!");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Bubble Sort Visualizer
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Largest element bubbles to the end after every pass.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8 flex-wrap">

          <button
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              activeTab === "visual"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Eye size={18} />
            Visualization
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              activeTab === "code"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Code size={18} />
            Code
          </button>

          <button
            onClick={() => setActiveTab("use")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              activeTab === "use"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Briefcase size={18} />
            Use Cases
          </button>

        </div>

        {/* VISUALIZATION */}

        {activeTab === "visual" && (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <button
                onClick={startBubbleSort}
                disabled={running}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
              >
                <Play size={20} />
                Start
              </button>

              <button
                onClick={reset}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
              >
                <RotateCcw size={20} />
                Reset
              </button>

              <button
                onClick={randomArray}
                disabled={running}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl"
              >
                <Shuffle size={20} />
                Random
              </button>

            </div>

            {/* Speed */}

            <div className="mb-8">
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

            {/* Pass */}

            <div className="text-center mb-6">
              <span className="bg-purple-100 px-6 py-3 rounded-xl text-lg font-bold">
                Pass: {pass}
              </span>
            </div>

            {/* Array */}

            <div className="flex justify-center flex-wrap gap-5 mb-10">
              {array.map((num, index) => {
                let color = "bg-blue-500";

                if (sorted.includes(index))
                  color = "bg-green-500";

                if (comparing.includes(index))
                  color = "bg-yellow-400";

                return (
                  <div
                    key={index}
                    className={`${color}
                    w-20 h-20 rounded-full
                    flex items-center justify-center
                    text-white text-2xl font-bold
                    shadow-lg transition-all duration-500
                    ${
                      comparing.includes(index)
                        ? "scale-125"
                        : ""
                    }
                    `}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

            {/* Message */}

            <div className="bg-slate-100 rounded-2xl p-5 text-center text-xl font-semibold mb-8">
              {message}
            </div>

            {/* Explanation */}

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-yellow-100 p-5 rounded-xl">
                <h3 className="font-bold mb-2">
                  Compare
                </h3>
                <p>
                  Two adjacent elements are compared.
                </p>
              </div>

              <div className="bg-red-100 p-5 rounded-xl">
                <h3 className="font-bold mb-2">
                  Swap
                </h3>
                <p>
                  Larger element moves to the right.
                </p>
              </div>

              <div className="bg-green-100 p-5 rounded-xl">
                <h3 className="font-bold mb-2">
                  Sorted
                </h3>
                <p>
                  Largest element reaches its final position.
                </p>
              </div>

            </div>

            {/* Complexity */}

            <div className="mt-8 bg-indigo-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Time Complexity
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
          <div>

            <div className="bg-slate-900 text-green-400 rounded-2xl p-6 overflow-auto">
              <pre>
{`function bubbleSort(arr) {

  for(let i = 0; i < arr.length - 1; i++) {

    for(let j = 0; j < arr.length - i - 1; j++) {

      if(arr[j] > arr[j + 1]) {

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

      }

    }

  }

  return arr;
}

const arr = [45, 23, 78, 12, 56];

console.log(bubbleSort(arr));`}
              </pre>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Dry Run
              </h2>

              <p className="mb-2">
                Array: [5, 3, 8]
              </p>

              <p>Compare 5 and 3 → Swap</p>
              <p>Compare 5 and 8 → No Swap</p>
              <p>Result: [3, 5, 8]</p>
            </div>

          </div>
        )}

        {/* USE CASES */}

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Educational Purposes
              </h2>

              <p>
                Bubble Sort is widely used for teaching
                sorting algorithms because it clearly shows
                comparisons and swaps.
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Small Arrays
              </h2>

              <p>
                Works reasonably well when only a few
                elements need to be sorted.
              </p>
            </div>

            <div className="bg-purple-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Nearly Sorted Data
              </h2>

              <p>
                Optimized Bubble Sort can stop early if
                no swaps occur.
              </p>
            </div>

            <div className="bg-red-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Not Suitable for Large Data
              </h2>

              <p>
                O(n²) complexity makes Bubble Sort very
                slow for thousands or millions of items.
              </p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Interview Learning
              </h2>

              <p>
                Often used to teach loops, swapping,
                and algorithm complexity.
              </p>
            </div>

            <div className="bg-indigo-100 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-3">
                Memory Efficient
              </h2>

              <p>
                Bubble Sort uses only constant extra
                memory O(1).
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}