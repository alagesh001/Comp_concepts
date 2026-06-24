import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Globe,
  Box,
  Layers,
  MemoryStick,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

export default function ExecutionContextVisualizer() {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-3">
          Execution Context Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand Global and Function Execution Contexts visually.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono mb-8 overflow-auto">
{`let a = 10;

function add() {
    let b = 20;
    return b;
}

add();`}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={next}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >
            <Play size={20} />
            Next Step
          </button>

          <button
            onClick={reset}
            className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        {/* Step Description */}
        <div className="bg-blue-50 p-5 rounded-2xl text-center text-lg mb-10">
          {step === 0 && "Click Next Step to begin."}
          {step === 1 && "Global Execution Context is created."}
          {step === 2 && "Memory is allocated inside Global Context."}
          {step === 3 && "Execution starts."}
          {step === 4 && "add() is called."}
          {step === 5 && "Function Execution Context is created."}
          {step === 6 && "Function executes and returns."}
          {step === 7 && "Function Context is removed."}
          {step === 8 && "Global Context remains until program ends."}
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Call Stack */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Layers className="text-purple-600" size={35} />
              <h2 className="text-3xl font-bold">
                Call Stack
              </h2>
            </div>

            <div className="bg-gray-100 rounded-3xl p-6 min-h-[400px] flex flex-col justify-end gap-4">

              {step >= 1 && (
                <div className="bg-blue-500 text-white p-5 rounded-xl text-center shadow-lg">
                  Global Execution Context
                </div>
              )}

              {step >= 5 && step <= 6 && (
                <div className="bg-green-500 text-white p-5 rounded-xl text-center shadow-lg animate-bounce">
                  Function Execution Context
                </div>
              )}
            </div>
          </div>

          {/* Memory */}
          <div>

            <div className="flex items-center gap-3 mb-5">
              <MemoryStick
                className="text-indigo-600"
                size={35}
              />
              <h2 className="text-3xl font-bold">
                Memory Space
              </h2>
            </div>

            <div className="bg-indigo-50 rounded-3xl p-6 min-h-[400px] space-y-4">

              {step >= 2 && (
                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  a = undefined
                </div>
              )}

              {step >= 2 && (
                <div className="bg-purple-500 text-white p-4 rounded-xl">
                  add() = function
                </div>
              )}

              {step >= 3 && (
                <div className="bg-green-500 text-white p-4 rounded-xl">
                  a = 10
                </div>
              )}

              {step >= 5 && step <= 6 && (
                <div className="bg-yellow-400 p-4 rounded-xl animate-pulse">
                  b = 20
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Context Flow */}
        {step >= 4 && (
          <div className="mt-10 bg-purple-50 rounded-3xl p-6">

            <h2 className="text-3xl font-bold text-center mb-6">
              Context Flow
            </h2>

            <div className="flex justify-center items-center gap-5 flex-wrap">

              <div className="bg-blue-500 text-white px-6 py-4 rounded-xl">
                Global Context
              </div>

              <ArrowDown className="text-gray-500" size={35} />

              <div className="bg-green-500 text-white px-6 py-4 rounded-xl">
                Function Context
              </div>

              {step >= 7 && (
                <>
                  <ArrowUp
                    className="text-red-500"
                    size={35}
                  />

                  <div className="bg-red-500 text-white px-6 py-4 rounded-xl">
                    Removed
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Execution Context Box */}
        {step >= 1 && (
          <div className="mt-10 bg-blue-50 rounded-3xl p-6">

            <h2 className="text-3xl font-bold mb-6">
              Global Execution Context
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-3">
                  Memory Phase
                </h3>

                <p>
                  Variables receive undefined and functions are stored.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-3">
                  Execution Phase
                </h3>

                <p>
                  Code executes line by line.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Function Context */}
        {step >= 5 && (
          <div className="mt-8 bg-green-50 rounded-3xl p-6">

            <h2 className="text-3xl font-bold mb-5">
              Function Execution Context
            </h2>

            <ul className="space-y-3 text-lg">
              <li>✅ Created when function is called.</li>
              <li>✅ Has its own memory.</li>
              <li>✅ Has its own variables.</li>
              <li>✅ Executes function code.</li>
              <li>✅ Removed after return.</li>
            </ul>
          </div>
        )}

        {/* Explanation */}
        <div className="mt-12 space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              What is an Execution Context?
            </h2>

            <p className="text-lg leading-8">
              An execution context is the environment in which JavaScript
              code executes.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Global Execution Context (GEC)
            </h2>

            <p className="text-lg">
              Created when the JavaScript program starts.
            </p>

            <ul className="mt-4 space-y-2">
              <li>🌍 Created once.</li>
              <li>🌍 Exists until program ends.</li>
              <li>🌍 Contains global variables.</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Function Execution Context (FEC)
            </h2>

            <p className="text-lg">
              Created every time a function is called.
            </p>

            <ul className="mt-4 space-y-2">
              <li>📦 Separate memory.</li>
              <li>📦 Local variables.</li>
              <li>📦 Removed after execution.</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Two Phases
            </h2>

            <ol className="list-decimal pl-6 space-y-2 text-lg">
              <li>Memory Creation Phase</li>
              <li>Code Execution Phase</li>
            </ol>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Important Rule
            </h2>

            <p className="text-lg">
              Every function call creates a brand new execution context.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              An execution context is the environment in which JavaScript
              code executes and manages variables, memory, and function calls.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}