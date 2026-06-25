import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Shuffle,
  Layers,
  GitBranch,
  Merge,
} from "lucide-react";

export default function MergeSortVisualizer() {
  const initialArray = [38, 27, 43, 3, 9, 82, 10];

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [message, setMessage] = useState("Press Start");
  const [speed, setSpeed] = useState(1000);
  const [running, setRunning] = useState(false);

  const [calls, setCalls] = useState(0);
  const [merges, setMerges] = useState(0);
  const [depth, setDepth] = useState(0);
  const [progress, setProgress] = useState(0);

  function sleep(ms) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }

  function randomArray() {
    if (running) return;

    const arr = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 90) + 10
    );

    reset();
    buildInitial(arr);
  }

  function buildInitial(arr) {
    setSteps([
      {
        type: "start",
        data: arr,
        level: 0,
      },
    ]);
  }

  function reset() {
    setSteps([]);
    setCurrentStep(-1);
    setCalls(0);
    setMerges(0);
    setDepth(0);
    setProgress(0);
    setRunning(false);
    setMessage("Press Start");
  }

  function generateSteps(arr, level = 0, result = []) {
    setDepth((d) => Math.max(d, level));

    if (arr.length === 1) {
      result.push({
        type: "single",
        data: [...arr],
        level,
      });

      return arr;
    }

    result.push({
      type: "split",
      data: [...arr],
      level,
    });

    const mid = Math.floor(arr.length / 2);

    const left = generateSteps(
      arr.slice(0, mid),
      level + 1,
      result
    );

    const right = generateSteps(
      arr.slice(mid),
      level + 1,
      result
    );

    let merged = [];

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        merged.push(left[i++]);
      } else {
        merged.push(right[j++]);
      }
    }

    while (i < left.length)
      merged.push(left[i++]);

    while (j < right.length)
      merged.push(right[j++]);

    result.push({
      type: "merge",
      data: merged,
      level,
    });

    return merged;
  }

  async function start() {
    if (running) return;

    setRunning(true);

    const arr =
      steps.length > 0
        ? steps[0].data
        : initialArray;

    const result = [];

    generateSteps(arr, 0, result);

    setSteps(result);

    let splitCount = 0;
    let mergeCount = 0;
    let maxDepth = 0;

    for (let i = 0; i < result.length; i++) {
      const step = result[i];

      setCurrentStep(i);

      maxDepth = Math.max(maxDepth, step.level);
      setDepth(maxDepth);

      if (step.type === "split") {
        splitCount++;
        setCalls(splitCount);
        setMessage(
          `Splitting [${step.data.join(", ")}]`
        );
      }

      if (step.type === "single") {
        setMessage(
          `Base case reached: ${step.data[0]}`
        );
      }

      if (step.type === "merge") {
        mergeCount++;
        setMerges(mergeCount);

        setMessage(
          `Merging [${step.data.join(", ")}]`
        );
      }

      setProgress(
        Math.floor(
          ((i + 1) / result.length) * 100
        )
      );

      await sleep(speed);
    }

    setMessage("Merge Sort Completed 🎉");
    setRunning(false);
  }

  React.useEffect(() => {
    buildInitial(initialArray);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2">
          Merge Sort Visualizer
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Divide → Conquer → Merge
        </p>

        {/* Controls */}

        <div className="flex justify-center gap-4 mb-8 flex-wrap">

          <button
            onClick={start}
            disabled={running}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            <Play className="inline mr-2" />
            Start
          </button>

          <button
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            <RotateCcw className="inline mr-2" />
            Reset
          </button>

          <button
            onClick={randomArray}
            disabled={running}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            <Shuffle className="inline mr-2" />
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
            min="300"
            max="2000"
            step="100"
            value={speed}
            disabled={running}
            onChange={(e) =>
              setSpeed(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        {/* Progress */}

        <div className="mb-8">

          <div className="flex justify-between mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-blue-100 rounded-2xl p-6 text-center">
            <GitBranch
              size={40}
              className="mx-auto mb-3 text-blue-600"
            />

            <div className="text-3xl font-bold">
              {calls}
            </div>

            <div>Recursive Calls</div>
          </div>

          <div className="bg-purple-100 rounded-2xl p-6 text-center">
            <Layers
              size={40}
              className="mx-auto mb-3 text-purple-600"
            />

            <div className="text-3xl font-bold">
              {depth}
            </div>

            <div>Maximum Depth</div>
          </div>

          <div className="bg-green-100 rounded-2xl p-6 text-center">
            <Merge
              size={40}
              className="mx-auto mb-3 text-green-600"
            />

            <div className="text-3xl font-bold">
              {merges}
            </div>

            <div>Merges</div>
          </div>

        </div>

        {/* Message */}

        <div className="bg-slate-100 p-5 rounded-2xl text-center text-xl font-semibold mb-8">
          {message}
        </div>

        {/* Tree */}

        <div className="space-y-5 mb-10">

          {steps
            .slice(0, currentStep + 1)
            .map((step, index) => {

              const active =
                index === currentStep;

              let color =
                "bg-blue-500";

              if (step.type === "single")
                color = "bg-purple-500";

              if (step.type === "merge")
                color = "bg-green-500";

              return (
                <div
                  key={index}
                  className="flex items-center transition-all duration-500"
                  style={{
                    marginLeft:
                      step.level * 60,
                  }}
                >
                  {step.level > 0 && (
                    <div className="mr-4 text-2xl">
                      ↓
                    </div>
                  )}

                  <div
                    className={`${color}
                    text-white
                    px-6
                    py-4
                    rounded-2xl
                    shadow-xl
                    transition-all
                    duration-500
                    ${
                      active
                        ? "scale-110 ring-4 ring-blue-200"
                        : ""
                    }
                    `}
                  >
                    <div className="font-bold mb-3">

                      {step.type ===
                        "split" &&
                        "✂ Split"}

                      {step.type ===
                        "single" &&
                        "⚫ Base"}

                      {step.type ===
                        "merge" &&
                        "🔗 Merge"}

                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {step.data.map(
                        (num, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold"
                          >
                            {num}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

        </div>

        {/* Call Stack */}

        <div className="bg-slate-900 text-green-400 rounded-2xl p-6 mb-8">

          <h2 className="text-white text-2xl font-bold mb-4">
            Call Stack
          </h2>

          {steps
            .slice(0, currentStep + 1)
            .filter(
              (step) =>
                step.type === "split"
            )
            .map((step, index) => (
              <div
                key={index}
                className="border-l-4 border-green-500 pl-4 py-2"
              >
                mergeSort([
                {step.data.join(", ")}
                ])
              </div>
            ))}

        </div>

        {/* Complexity */}

        <div className="bg-indigo-50 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Complexity
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-lg">

            <div>
              Best Case:
              <strong> O(n log n)</strong>
            </div>

            <div>
              Average Case:
              <strong> O(n log n)</strong>
            </div>

            <div>
              Worst Case:
              <strong> O(n log n)</strong>
            </div>

            <div>
              Space:
              <strong> O(n)</strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}