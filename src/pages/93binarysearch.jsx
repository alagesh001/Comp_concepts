import React, { useState, useRef } from "react";
import {
  Search,
  Code,
  Briefcase,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function BinarySearchVisualizer() {
  const array = [3, 7, 12, 18, 23, 34, 45, 56, 67, 78, 89];

  const [tab, setTab] = useState("visual");
  const [target, setTarget] = useState(45);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [mid, setMid] = useState(null);

  const [removed, setRemoved] = useState([]);
  const [found, setFound] = useState(null);

  const [step, setStep] = useState(0);
  const [comparison, setComparison] = useState("");
  const [decision, setDecision] = useState("");

  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  function reset() {
    clearInterval(timerRef.current);

    setLeft(0);
    setRight(array.length - 1);
    setMid(null);

    setRemoved([]);
    setFound(null);

    setStep(0);
    setComparison("");
    setDecision("");

    setMessage("");
  }

  function startSearch() {
    reset();

    let l = 0;
    let r = array.length - 1;
    let currentStep = 0;

    timerRef.current = setInterval(() => {
      if (l > r) {
        setMessage(`${target} not found`);
        clearInterval(timerRef.current);
        return;
      }

      currentStep++;
      setStep(currentStep);

      const m = Math.floor((l + r) / 2);

      setLeft(l);
      setRight(r);
      setMid(m);

      if (array[m] === Number(target)) {
        setComparison(`${array[m]} = ${target}`);
        setDecision("Target found.");
        setFound(m);
        setMessage(
          `Found ${target} at index ${m}`
        );
        clearInterval(timerRef.current);
      } else if (array[m] < Number(target)) {
        setComparison(
          `${array[m]} < ${target}`
        );

        setDecision(
          "Discard left half."
        );

        const temp = [];

        for (let i = l; i <= m; i++) {
          temp.push(i);
        }

        setRemoved((prev) => [
          ...prev,
          ...temp,
        ]);

        l = m + 1;
      } else {
        setComparison(
          `${array[m]} > ${target}`
        );

        setDecision(
          "Discard right half."
        );

        const temp = [];

        for (let i = m; i <= r; i++) {
          temp.push(i);
        }

        setRemoved((prev) => [
          ...prev,
          ...temp,
        ]);

        r = m - 1;
      }
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">
          Binary Search Visualizer
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Binary Search works only on sorted arrays.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setTab("visual")}
            className={`px-5 py-3 rounded-xl ${
              tab === "visual"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Visualization
          </button>

          <button
            onClick={() => setTab("code")}
            className={`px-5 py-3 rounded-xl ${
              tab === "code"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Code
          </button>

          <button
            onClick={() => setTab("use")}
            className={`px-5 py-3 rounded-xl ${
              tab === "use"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Use Cases
          </button>

          <button
            onClick={() => setTab("complex")}
            className={`px-5 py-3 rounded-xl ${
              tab === "complex"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Complexity
          </button>
        </div>

        {/* VISUALIZATION */}

        {tab === "visual" && (
          <>
            <div className="bg-white rounded-2xl shadow p-6 mb-6 flex gap-4 justify-center">
              <input
                type="number"
                value={target}
                onChange={(e) =>
                  setTarget(e.target.value)
                }
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

            {/* Step Card */}

            {mid !== null && (
              <div className="bg-white rounded-2xl shadow p-6 mb-6">

                <h2 className="text-2xl font-bold mb-4">
                  Step {step}
                </h2>

                <div className="text-3xl font-bold text-yellow-600 mb-3">
                  Compare:
                </div>

                <div className="text-4xl mb-4">
                  {comparison}
                </div>

                <div className="text-2xl text-blue-700">
                  {decision}
                </div>

              </div>
            )}

            {/* Search Space */}

            <div className="bg-white rounded-2xl shadow p-8 mb-6">

              <h2 className="text-2xl font-bold mb-6 text-center">
                Search Space
              </h2>

              <div className="flex flex-wrap justify-center gap-4">

                {array.map((num, index) => {
                  let color =
                    "bg-white border-2";

                  if (
                    removed.includes(index)
                  ) {
                    color =
                      "bg-gray-300 opacity-40";
                  }

                  if (
                    index >= left &&
                    index <= right
                  ) {
                    color =
                      "bg-blue-100 border-blue-400";
                  }

                  if (index === mid) {
                    color =
                      "bg-yellow-300 border-yellow-600 animate-pulse";
                  }

                  if (index === found) {
                    color =
                      "bg-green-500 text-white scale-110";
                  }

                  return (
                    <div
                      key={index}
                      className="text-center"
                    >
                      {index === mid && (
                        <div className="font-bold text-yellow-700 mb-2">
                          MID
                        </div>
                      )}

                      <div
                        className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-700 ${color}`}
                      >
                        {num}
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        {index}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Range */}

            <div className="grid md:grid-cols-4 gap-6 mb-6">

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="font-bold mb-3">
                  Left
                </h3>
                <div className="text-5xl text-blue-600 font-bold">
                  {left}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="font-bold mb-3">
                  Mid
                </h3>
                <div className="text-5xl text-yellow-600 font-bold">
                  {mid ?? "-"}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="font-bold mb-3">
                  Right
                </h3>
                <div className="text-5xl text-red-600 font-bold">
                  {right}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="font-bold mb-3">
                  Search Size
                </h3>
                <div className="text-5xl text-purple-600 font-bold">
                  {right - left + 1 > 0
                    ? right - left + 1
                    : 0}
                </div>
              </div>

            </div>

            {message && (
              <div
                className={`p-6 rounded-2xl text-center text-2xl font-bold shadow ${
                  found !== null
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {found !== null ? (
                  <CheckCircle
                    size={50}
                    className="mx-auto mb-3"
                  />
                ) : (
                  <XCircle
                    size={50}
                    className="mx-auto mb-3"
                  />
                )}

                {message}
              </div>
            )}
          </>
        )}

        {/* CODE */}

        {tab === "code" && (
          <div className="bg-gray-900 rounded-2xl p-8">
            <pre className="text-green-400 font-mono leading-7 text-sm">
{`function binarySearch(arr, target) {

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {

        let mid = Math.floor(
            (left + right) / 2
        );

        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }

    return -1;
}

const arr =
[3,7,12,18,23,34,45,56,67];

console.log(
    binarySearch(arr, 45)
);`}
            </pre>
          </div>
        )}

        {/* USE CASES */}

        {tab === "use" && (
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-3">
                Dictionary Search
              </h2>
              <p>
                Words are sorted alphabetically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-3">
                Database Indexes
              </h2>
              <p>
                Quickly find records.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-3">
                Library Systems
              </h2>
              <p>
                Search sorted book IDs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-3">
                Contact Lists
              </h2>
              <p>
                Names stored alphabetically.
              </p>
            </div>

          </div>
        )}

        {/* COMPLEXITY */}

        {tab === "complex" && (
          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-green-100 p-6 rounded-xl">
              <h2 className="font-bold mb-3">
                Best Case
              </h2>
              <div className="text-4xl font-bold">
                O(1)
              </div>
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="font-bold mb-3">
                Average
              </h2>
              <div className="text-4xl font-bold">
                O(log n)
              </div>
            </div>

            <div className="bg-red-100 p-6 rounded-xl">
              <h2 className="font-bold mb-3">
                Worst
              </h2>
              <div className="text-4xl font-bold">
                O(log n)
              </div>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              <h2 className="font-bold mb-3">
                Space
              </h2>
              <div className="text-4xl font-bold">
                O(1)
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}