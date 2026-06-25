import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Shuffle,
  Trophy,
} from "lucide-react";

export default function BubbleVsInsertionSort() {
  const initialArray = [5, 2, 4, 6, 1, 3];

  const [bubble, setBubble] = useState(initialArray);
  const [insertion, setInsertion] = useState(initialArray);

  const [bubbleCompare, setBubbleCompare] = useState([]);
  const [insertCompare, setInsertCompare] = useState(-1);
  const [insertKey, setInsertKey] = useState(-1);

  const [bubbleCount, setBubbleCount] = useState(0);
  const [insertCount, setInsertCount] = useState(0);

  const [bubbleMoves, setBubbleMoves] = useState(0);
  const [insertMoves, setInsertMoves] = useState(0);

  const [message, setMessage] = useState(
    "Press Start"
  );

  const [speed, setSpeed] = useState(700);
  const [running, setRunning] = useState(false);

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function reset() {
    setBubble(initialArray);
    setInsertion(initialArray);

    setBubbleCompare([]);
    setInsertCompare(-1);
    setInsertKey(-1);

    setBubbleCount(0);
    setInsertCount(0);

    setBubbleMoves(0);
    setInsertMoves(0);

    setRunning(false);
    setMessage("Press Start");
  }

  function randomArray() {
    if (running) return;

    const arr = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 90) + 10
    );

    setBubble(arr);
    setInsertion([...arr]);

    setBubbleCount(0);
    setInsertCount(0);

    setBubbleMoves(0);
    setInsertMoves(0);

    setMessage("New array generated.");
  }

  async function start() {
    if (running) return;

    setRunning(true);

    const b = [...bubble];
    const ins = [...insertion];

    // Bubble Sort
    for (let i = 0; i < b.length - 1; i++) {
      for (let j = 0; j < b.length - i - 1; j++) {
        setBubbleCompare([j, j + 1]);

        setBubbleCount((c) => c + 1);

        if (b[j] > b[j + 1]) {
          [b[j], b[j + 1]] = [b[j + 1], b[j]];

          setBubble([...b]);

          setBubbleMoves((m) => m + 1);

          setMessage(
            `Bubble: Swap ${b[j]} and ${b[j + 1]}`
          );

          await sleep(speed);
        }
      }
    }

    // Insertion Sort
    for (let i = 1; i < ins.length; i++) {
      let key = ins[i];
      let j = i - 1;

      setInsertKey(i);

      while (j >= 0 && ins[j] > key) {
        setInsertCompare(j);

        setInsertCount((c) => c + 1);

        ins[j + 1] = ins[j];

        setInsertion([...ins]);

        setInsertMoves((m) => m + 1);

        setMessage(
          `Insertion: Shift ${ins[j]}`
        );

        j--;

        await sleep(speed);
      }

      ins[j + 1] = key;

      setInsertion([...ins]);

      await sleep(speed);
    }

    setBubbleCompare([]);
    setInsertCompare(-1);
    setInsertKey(-1);

    setMessage("Sorting completed.");

    setRunning(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-2">
          Bubble Sort vs Insertion Sort
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Compare swapping versus shifting.
        </p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">

          <button
            onClick={start}
            disabled={running}
            className="bg-blue-500 text-white px-5 py-3 rounded-xl"
          >
            Start
          </button>

          <button
            onClick={reset}
            className="bg-red-500 text-white px-5 py-3 rounded-xl"
          >
            Reset
          </button>

          <button
            onClick={randomArray}
            disabled={running}
            className="bg-green-500 text-white px-5 py-3 rounded-xl"
          >
            Random
          </button>

        </div>

        <div className="mb-8">
          <label>Speed: {speed} ms</label>

          <input
            type="range"
            min="200"
            max="1500"
            step="100"
            value={speed}
            onChange={(e) =>
              setSpeed(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Bubble */}

          <div className="bg-blue-50 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Bubble Sort
            </h2>

            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {bubble.map((num, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all
                  ${
                    bubbleCompare.includes(index)
                      ? "bg-yellow-500 scale-125"
                      : "bg-blue-500"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p>
                Comparisons: {bubbleCount}
              </p>

              <p>
                Swaps: {bubbleMoves}
              </p>
            </div>

          </div>

          {/* Insertion */}

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Insertion Sort
            </h2>

            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {insertion.map((num, index) => {
                let color = "bg-green-500";

                if (index === insertCompare)
                  color = "bg-yellow-500";

                if (index === insertKey)
                  color = "bg-red-500";

                return (
                  <div
                    key={index}
                    className={`${color}
                    w-16 h-16 rounded-full
                    flex items-center justify-center
                    text-white font-bold text-xl
                    transition-all
                    ${
                      index === insertKey
                        ? "scale-125"
                        : ""
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <p>
                Comparisons: {insertCount}
              </p>

              <p>
                Shifts: {insertMoves}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 bg-slate-100 p-5 rounded-xl text-center text-xl font-semibold">
          {message}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-blue-100 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3">
              Bubble Sort
            </h3>

            <ul className="space-y-2">
              <li>Repeated swapping</li>
              <li>Many movements</li>
              <li>Largest bubbles right</li>
              <li>Good for teaching</li>
            </ul>
          </div>

          <div className="bg-green-100 p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-3">
              Insertion Sort
            </h3>

            <ul className="space-y-2">
              <li>Shifts elements</li>
              <li>Fewer movements</li>
              <li>Builds sorted portion</li>
              <li>Excellent for nearly sorted data</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 overflow-auto">
          <table className="w-full border">

            <thead className="bg-slate-200">
              <tr>
                <th className="p-3 border">Feature</th>
                <th className="p-3 border">
                  Bubble
                </th>
                <th className="p-3 border">
                  Insertion
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-3">
                  Best Case
                </td>
                <td className="border p-3">
                  O(n)
                </td>
                <td className="border p-3">
                  O(n)
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  Average
                </td>
                <td className="border p-3">
                  O(n²)
                </td>
                <td className="border p-3">
                  O(n²)
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  Swaps
                </td>
                <td className="border p-3">
                  Many
                </td>
                <td className="border p-3">
                  Few
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  Nearly Sorted Data
                </td>
                <td className="border p-3">
                  Poor
                </td>
                <td className="border p-3">
                  Excellent
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}