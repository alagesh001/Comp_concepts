import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  PauseCircle,
  CheckCircle,
  RefreshCw,
  ArrowRight,
  Clock,
} from "lucide-react";

export default function AsyncAwaitInternals() {
  const [tab, setTab] = useState(0);

  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}

        <h1 className="text-4xl font-bold text-center mb-3">
          Async / Await Internals
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Learn what actually happens behind await.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => {
              setTab(0);
              reset();
            }}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            async Function
          </button>

          <button
            onClick={() => {
              setTab(1);
              reset();
            }}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            await Internals
          </button>

          <button
            onClick={() => {
              setTab(2);
              reset();
            }}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Runtime
          </button>

        </div>

        {/* Controls */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={next}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Play size={18} />
            Next Step
          </button>

          <button
            onClick={reset}
            className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

        {/* ---------------- TAB 1 ---------------- */}

        {tab === 0 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`async function load() {

   console.log("A");

   await fetchData();

   console.log("B");
}

load();`}
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl mb-8 text-center text-lg">

              {step === 0 && "Click Next Step."}
              {step === 1 && "load() enters call stack."}
              {step === 2 && "console.log('A') executes."}
              {step === 3 && "await fetchData() reached."}
              {step === 4 && "Function pauses."}
              {step === 5 && "Promise resolves."}
              {step === 6 && "Function resumes."}
              {step === 7 && "console.log('B') executes."}

            </div>

            <div className="bg-purple-50 rounded-3xl p-6">

              <h2 className="text-3xl font-bold mb-6">
                Call Stack
              </h2>

              <div className="min-h-[220px] flex flex-col justify-end gap-4">

                {(step >= 1 && step <= 3) && (
                  <div className="bg-blue-500 text-white p-4 rounded-xl">
                    load()
                  </div>
                )}

                {step === 4 && (
                  <div className="bg-yellow-500 text-white p-4 rounded-xl">
                    Paused at await
                  </div>
                )}

                {(step >= 6 && step <= 7) && (
                  <div className="bg-green-500 text-white p-4 rounded-xl animate-bounce">
                    load() resumed
                  </div>
                )}

              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl mt-8">

              {step >= 2 && <div>A</div>}
              {step >= 7 && <div>B</div>}

            </div>

          </div>
        )}

        {/* ---------------- TAB 2 ---------------- */}

        {tab === 1 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`await fetchData();`}
            </div>

            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-blue-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Call Stack
                </h3>

                {(step === 1 || step === 2) && (
                  <div className="bg-blue-500 text-white p-3 rounded-xl">
                    load()
                  </div>
                )}

              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Promise
                </h3>

                {step >= 3 && (
                  <div className="bg-yellow-500 p-3 rounded-xl animate-pulse">
                    Pending
                  </div>
                )}

                {step >= 5 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl mt-3">
                    Resolved
                  </div>
                )}

              </div>

              <div className="bg-green-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Microtask Queue
                </h3>

                {step >= 6 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    Continue load()
                  </div>
                )}

              </div>

              <div className="bg-purple-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Event Loop
                </h3>

                {step >= 6 && (
                  <RefreshCw
                    size={50}
                    className="animate-spin mx-auto text-purple-600"
                  />
                )}

              </div>

            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-2xl">

              <h2 className="text-2xl font-bold mb-4">
                What await Actually Does
              </h2>

              <ol className="space-y-3 text-lg">
                <li>1. Waits for Promise.</li>
                <li>2. Removes current function from stack.</li>
                <li>3. Promise continues running.</li>
                <li>4. Remaining code enters microtask queue.</li>
                <li>5. Event loop resumes the function.</li>
              </ol>

            </div>

          </div>
        )}

        {/* ---------------- TAB 3 ---------------- */}

        {tab === 2 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`async function load() {

   console.log("Start");

   await fetch();

   console.log("Done");
}

load();

console.log("End");`}
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-8">

              <div className="bg-blue-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Call Stack
                </h3>

                {(step === 1 || step === 2) && (
                  <div className="bg-blue-500 text-white p-3 rounded-xl">
                    load()
                  </div>
                )}

                {step >= 6 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    Resume load()
                  </div>
                )}

              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Web API
                </h3>

                {(step >= 3 && step <= 5) && (
                  <Clock
                    size={50}
                    className="mx-auto animate-spin"
                  />
                )}

              </div>

              <div className="bg-green-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Microtask Queue
                </h3>

                {step >= 5 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    Continue load()
                  </div>
                )}

              </div>

              <div className="bg-purple-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Event Loop
                </h3>

                {step >= 5 && (
                  <RefreshCw
                    size={50}
                    className="animate-spin mx-auto text-purple-600"
                  />
                )}

              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl">

              {step >= 2 && <div>Start</div>}

              {step >= 4 && <div>End</div>}

              {step >= 7 && <div>Done</div>}

            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl">

              <h2 className="text-2xl font-bold mb-4">
                Important Rule
              </h2>

              <p className="text-lg leading-8">
                <strong>await does not block JavaScript.</strong>
                It only pauses the current async function.
                The call stack becomes free, other code runs,
                and the function resumes later through the
                Microtask Queue.
              </p>

            </div>

          </div>
        )}

        {/* Final Summary */}

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 text-center">

          <h2 className="text-3xl font-bold mb-4">
            Internal Flow
          </h2>

          <div className="text-2xl leading-10">

            async function()

            <br />

            ↓

            <br />

            await Promise

            <br />

            ↓

            <br />

            Pause Function

            <br />

            ↓

            <br />

            Promise Resolves

            <br />

            ↓

            <br />

            Microtask Queue

            <br />

            ↓

            <br />

            Event Loop

            <br />

            ↓

            <br />

            Resume Function

          </div>

        </div>

      </div>
    </div>
  );
}