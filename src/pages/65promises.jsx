import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowRight,
  Play,
  RotateCcw,
} from "lucide-react";

export default function PromiseVisualizer() {
  const [tab, setTab] = useState(0);

  const [promiseState, setPromiseState] = useState("pending");

  const [runtimeStep, setRuntimeStep] = useState(0);

  const [method, setMethod] = useState("all");

  const resetRuntime = () => {
    setRuntimeStep(0);
  };

  const nextRuntime = () => {
    if (runtimeStep < 5) {
      setRuntimeStep(runtimeStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Promise Explorer
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Learn Promises interactively.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Promise States
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Event Loop
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl font-semibold ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Promise Methods
          </button>
        </div>

        {/* ---------------- TAB 1 ---------------- */}

        {tab === 0 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`const promise = new Promise((resolve, reject) => {

   setTimeout(() => {
      resolve("Success");
   }, 2000);

});`}
            </div>

            <div className="flex justify-center mb-10">

              <div
                className={`w-80 p-8 rounded-3xl text-center text-white shadow-xl transition-all duration-500
                ${
                  promiseState === "pending"
                    ? "bg-blue-500"
                    : promiseState === "fulfilled"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {promiseState === "pending" && (
                  <Clock size={60} className="mx-auto animate-spin mb-4" />
                )}

                {promiseState === "fulfilled" && (
                  <CheckCircle size={60} className="mx-auto mb-4" />
                )}

                {promiseState === "rejected" && (
                  <XCircle size={60} className="mx-auto mb-4" />
                )}

                <h2 className="text-3xl font-bold capitalize">
                  {promiseState}
                </h2>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={() => setPromiseState("pending")}
                className="bg-blue-500 text-white px-5 py-3 rounded-xl"
              >
                Pending
              </button>

              <button
                onClick={() => setPromiseState("fulfilled")}
                className="bg-green-500 text-white px-5 py-3 rounded-xl"
              >
                Resolve
              </button>

              <button
                onClick={() => setPromiseState("rejected")}
                className="bg-red-500 text-white px-5 py-3 rounded-xl"
              >
                Reject
              </button>

            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Promise Lifecycle
              </h2>

              <div className="flex justify-center items-center gap-5 text-xl">

                <div className="bg-blue-500 text-white px-6 py-4 rounded-xl">
                  Pending
                </div>

                <ArrowRight />

                <div className="bg-green-500 text-white px-6 py-4 rounded-xl">
                  Fulfilled
                </div>

                <span>or</span>

                <div className="bg-red-500 text-white px-6 py-4 rounded-xl">
                  Rejected
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ---------------- TAB 2 ---------------- */}

        {tab === 1 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`console.log("A");

Promise.resolve().then(() => {
   console.log("C");
});

setTimeout(() => {
   console.log("B");
});

console.log("D");`}
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={nextRuntime}
                className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
              >
                <Play size={18} />
                Next Step
              </button>

              <button
                onClick={resetRuntime}
                className="bg-red-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">

              <div className="bg-blue-50 p-5 rounded-2xl">
                <h3 className="font-bold text-xl mb-4">
                  Call Stack
                </h3>

                {runtimeStep === 1 && (
                  <div className="bg-blue-500 text-white p-3 rounded-xl">
                    console.log()
                  </div>
                )}

                {runtimeStep === 4 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    Promise Callback
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl">
                <h3 className="font-bold text-xl mb-4">
                  Microtask Queue
                </h3>

                {runtimeStep >= 2 && (
                  <div className="bg-yellow-500 p-3 rounded-xl animate-pulse">
                    then()
                  </div>
                )}
              </div>

              <div className="bg-green-50 p-5 rounded-2xl">
                <h3 className="font-bold text-xl mb-4">
                  Macrotask/Callback Queue
                </h3>

                {runtimeStep >= 3 && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    setTimeout()
                  </div>
                )}
              </div>

              <div className="bg-purple-50 p-5 rounded-2xl">
                <h3 className="font-bold text-xl mb-4">
                  Event Loop
                </h3>

                {runtimeStep >= 4 && (
                  <RefreshCw
                    size={50}
                    className="animate-spin mx-auto text-purple-600"
                  />
                )}
              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl">

              <div>A</div>

              {runtimeStep >= 1 && <div>D</div>}

              {runtimeStep >= 4 && <div>C</div>}

              {runtimeStep >= 5 && <div>B</div>}

            </div>

            <div className="mt-6 bg-blue-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3">
                Why does C come before B?
              </h2>

              <p className="text-lg">
                Promise callbacks go into the Microtask Queue.
                Microtasks always execute before the Callback Queue.
              </p>
            </div>

          </div>
        )}

        {/* ---------------- TAB 3 ---------------- */}

        {tab === 2 && (
          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={() => setMethod("all")}
                className="bg-blue-500 text-white px-5 py-3 rounded-xl"
              >
                Promise.all
              </button>

              <button
                onClick={() => setMethod("race")}
                className="bg-green-500 text-white px-5 py-3 rounded-xl"
              >
                Promise.race
              </button>

              <button
                onClick={() => setMethod("any")}
                className="bg-purple-500 text-white px-5 py-3 rounded-xl"
              >
                Promise.any
              </button>

              <button
                onClick={() => setMethod("await")}
                className="bg-orange-500 text-white px-5 py-3 rounded-xl"
              >
                async/await
              </button>

            </div>

            {method === "all" && (
              <div className="text-center">

                <h2 className="text-3xl font-bold mb-8">
                  Promise.all()
                </h2>

                <div className="flex justify-center gap-5">

                  <div className="bg-green-500 text-white p-5 rounded-xl">
                    P1 ✔
                  </div>

                  <div className="bg-green-500 text-white p-5 rounded-xl">
                    P2 ✔
                  </div>

                  <div className="bg-green-500 text-white p-5 rounded-xl">
                    P3 ✔
                  </div>

                </div>

                <div className="mt-8 bg-blue-500 text-white p-5 rounded-xl inline-block">
                  All Completed
                </div>

              </div>
            )}

            {method === "race" && (
              <div className="space-y-5">

                <h2 className="text-3xl font-bold text-center">
                  Promise.race()
                </h2>

                <div className="bg-blue-500 text-white p-4 rounded-xl w-1/2">
                  Promise 1
                </div>

                <div className="bg-green-500 text-white p-4 rounded-xl w-1/3">
                  Winner 🏆
                </div>

                <div className="bg-red-500 text-white p-4 rounded-xl w-3/4">
                  Promise 3
                </div>

              </div>
            )}

            {method === "any" && (
              <div className="text-center">

                <h2 className="text-3xl font-bold mb-8">
                  Promise.any()
                </h2>

                <div className="flex justify-center gap-4">

                  <div className="bg-red-500 text-white p-5 rounded-xl">
                    Failed
                  </div>

                  <div className="bg-red-500 text-white p-5 rounded-xl">
                    Failed
                  </div>

                  <div className="bg-green-500 text-white p-5 rounded-xl">
                    Success
                  </div>

                </div>

              </div>
            )}

            {method === "await" && (
              <div className="text-center">

                <h2 className="text-3xl font-bold mb-8">
                  async / await
                </h2>

                <div className="space-y-4 max-w-md mx-auto">

                  <div className="bg-blue-500 text-white p-4 rounded-xl">
                    async function()
                  </div>

                  <ArrowRight className="mx-auto" />

                  <div className="bg-yellow-500 text-white p-4 rounded-xl">
                    await fetch()
                  </div>

                  <ArrowRight className="mx-auto" />

                  <div className="bg-green-500 text-white p-4 rounded-xl">
                    Continue Execution
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* Bottom Explanation */}

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Final Definition
          </h2>

          <p className="text-2xl leading-10">
            A Promise is an object representing the future result of an
            asynchronous operation. It can be Pending, Fulfilled, or
            Rejected and works together with the Event Loop and
            Microtask Queue.
          </p>

        </div>

      </div>
    </div>
  );
}