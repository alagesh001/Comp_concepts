import React, { useState, useRef } from "react";
import {
  Search,
  Code,
  Briefcase,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function LinearSearchVisualizer() {
  const array = [12, 45, 7, 23, 89, 34, 56, 91];

  const [tab, setTab] = useState("visual");
  const [target, setTarget] = useState(34);

  const [current, setCurrent] = useState(-1);
  const [visited, setVisited] = useState([]);
  const [found, setFound] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  function reset() {
    clearInterval(timerRef.current);
    setCurrent(-1);
    setVisited([]);
    setFound(null);
    setComparisons(0);
    setMessage("");
  }

  function startSearch() {
    reset();

    let i = 0;

    timerRef.current = setInterval(() => {
      setCurrent(i);
      setVisited((prev) => [...prev, i]);
      setComparisons(i + 1);

      if (array[i] === Number(target)) {
        setFound(i);
        setMessage(
          `Found ${target} at index ${i}`
        );
        clearInterval(timerRef.current);
        return;
      }

      i++;

      if (i >= array.length) {
        setMessage(`${target} not found`);
        clearInterval(timerRef.current);
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8">
          Linear Search
        </h1>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab("visual")}
            className={`px-5 py-3 rounded-xl flex gap-2 ${
              tab === "visual"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            <Search size={20} />
            Visualization
          </button>

          <button
            onClick={() => setTab("code")}
            className={`px-5 py-3 rounded-xl flex gap-2 ${
              tab === "code"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            <Code size={20} />
            Code
          </button>

          <button
            onClick={() => setTab("usecases")}
            className={`px-5 py-3 rounded-xl flex gap-2 ${
              tab === "usecases"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            <Briefcase size={20} />
            Use Cases
          </button>

          <button
            onClick={() => setTab("complexity")}
            className={`px-5 py-3 rounded-xl flex gap-2 ${
              tab === "complexity"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            <BarChart3 size={20} />
            Complexity
          </button>

        </div>

        {/* VISUALIZATION */}

        {tab === "visual" && (
          <div>

            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex gap-4 justify-center">
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="border rounded-lg px-4 py-2"
              />

              <button
                onClick={startSearch}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Start Search
              </button>

              <button
                onClick={reset}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Reset
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow p-8">

              <div className="flex flex-wrap justify-center gap-5">

                {array.map((num, index) => {
                  let color = "bg-gray-100";

                  if (visited.includes(index))
                    color = "bg-red-200";

                  if (current === index)
                    color = "bg-yellow-300 animate-pulse";

                  if (found === index)
                    color = "bg-green-400 text-white";

                  return (
                    <div key={index} className="text-center">

                      {current === index && (
                        <div className="text-3xl mb-2">
                          ↓
                        </div>
                      )}

                      <div
                        className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all ${color}`}
                      >
                        {num}
                      </div>

                      <div className="mt-2 text-gray-500">
                        {index}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">

              <div className="bg-white p-6 rounded-xl text-center">
                <h3 className="font-bold">Current Index</h3>
                <div className="text-5xl text-blue-600">
                  {current >= 0 ? current : "-"}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl text-center">
                <h3 className="font-bold">Comparisons</h3>
                <div className="text-5xl text-purple-600">
                  {comparisons}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl text-center">
                <h3 className="font-bold">Target</h3>
                <div className="text-5xl text-red-600">
                  {target}
                </div>
              </div>

            </div>

            {message && (
              <div className="bg-white mt-6 p-6 rounded-xl text-center text-2xl font-bold">
                {found !== null ? (
                  <CheckCircle
                    className="mx-auto mb-3 text-green-600"
                    size={40}
                  />
                ) : (
                  <XCircle
                    className="mx-auto mb-3 text-red-600"
                    size={40}
                  />
                )}

                {message}
              </div>
            )}
          </div>
        )}

        {/* CODE TAB */}

  {tab === "code" && (
  <div className="bg-gray-900 text-green-400 rounded-2xl p-8 overflow-auto">
    <pre className="whitespace-pre-wrap font-mono text-sm leading-7">
{`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === target) {
            return i;
        }

    }

    return -1;
}

const arr = [12, 45, 7, 23, 89, 34, 56, 91];

let result = linearSearch(arr, 34);

console.log(result); // 5`}
    </pre>
  </div>
)}

        {/* USE CASES */}

        {tab === "usecases" && (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-3">
                Attendance Register
              </h2>

              <p>
                Teacher checks every student name one by one.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-3">
                Finding a Song
              </h2>

              <p>
                Music player scans songs sequentially.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-3">
                Small Lists
              </h2>

              <p>
                Works efficiently for small datasets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-bold mb-3">
                Unsorted Data
              </h2>

              <p>
                No sorting required before searching.
              </p>
            </div>

          </div>
        )}

        {/* COMPLEXITY */}

        {tab === "complexity" && (
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-green-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-3">
                Best Case
              </h2>
              <div className="text-4xl font-bold">
                O(1)
              </div>
              <p className="mt-3">
                Found at first position.
              </p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-3">
                Average Case
              </h2>
              <div className="text-4xl font-bold">
                O(n)
              </div>
              <p className="mt-3">
                Found somewhere in middle.
              </p>
            </div>

            <div className="bg-red-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-3">
                Worst Case
              </h2>
              <div className="text-4xl font-bold">
                O(n)
              </div>
              <p className="mt-3">
                Last element or not found.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}