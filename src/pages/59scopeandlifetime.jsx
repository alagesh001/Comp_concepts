import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Globe,
  Box,
  Square,
  Trash2,
} from "lucide-react";

export default function ScopeLifetimeVisualizer() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Scope & Lifetime Visualizer
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Understand Global, Local and Block Scope visually.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono mb-8 overflow-auto">
{`let globalVar = "I live everywhere";

function demo() {
    let localVar = "I live in function";

    if(true) {
        let blockVar = "I live in block";
    }
}

demo();`}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={nextStep}
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
          {step === 1 && "globalVar is created globally."}
          {step === 2 && "demo() function starts."}
          {step === 3 && "localVar is created inside function."}
          {step === 4 && "blockVar exists inside the if block."}
          {step === 5 && "if block ends and blockVar is destroyed."}
          {step === 6 &&
            "demo() ends. localVar disappears. globalVar survives."}
        </div>

        {/* Scope Areas */}
        <div className="space-y-8">

          {/* Global Scope */}
          <div className="border-4 border-blue-500 rounded-3xl p-6 bg-blue-50">

            <div className="flex items-center gap-3 mb-4">
              <Globe size={35} className="text-blue-600" />
              <h2 className="text-3xl font-bold">
                Global Scope
              </h2>
            </div>

            {step >= 1 && (
              <div className="bg-blue-500 text-white p-4 rounded-xl text-xl animate-pulse">
                globalVar = "I live everywhere"
              </div>
            )}

            {/* Function Scope */}
            {step >= 2 && (
              <div className="mt-6 border-4 border-green-500 rounded-2xl p-5 bg-green-50">

                <div className="flex items-center gap-3 mb-4">
                  <Box size={32} className="text-green-600" />
                  <h3 className="text-2xl font-bold">
                    Function Scope (demo)
                  </h3>
                </div>

                {step >= 3 && step <= 5 && (
                  <div className="bg-green-500 text-white p-4 rounded-xl text-lg animate-bounce">
                    localVar = "I live in function"
                  </div>
                )}

                {step === 6 && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-xl flex items-center gap-2">
                    <Trash2 />
                    localVar destroyed
                  </div>
                )}

                {/* Block Scope */}
                {step >= 4 && (
                  <div className="mt-5 border-4 border-yellow-500 rounded-xl p-5 bg-yellow-50">

                    <div className="flex items-center gap-3 mb-3">
                      <Square
                        size={28}
                        className="text-yellow-600"
                      />
                      <h4 className="text-xl font-bold">
                        Block Scope (if)
                      </h4>
                    </div>

                    {step === 4 && (
                      <div className="bg-yellow-400 p-4 rounded-xl font-semibold animate-pulse">
                        blockVar = "I live in block"
                      </div>
                    )}

                    {step >= 5 && (
                      <div className="bg-red-100 text-red-700 p-4 rounded-xl flex items-center gap-2">
                        <Trash2 />
                        blockVar destroyed
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lifetime Bar */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-5 text-center">
            Variable Lifetime
          </h2>

          <div className="space-y-4">

            <div>
              <div className="font-semibold mb-1">
                globalVar
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-500 h-6 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {step >= 3 && (
              <div>
                <div className="font-semibold mb-1">
                  localVar
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className={`h-6 rounded-full ${
                      step === 6
                        ? "bg-red-500 w-0"
                        : "bg-green-500 w-3/4"
                    }`}
                  />
                </div>
              </div>
            )}

            {step >= 4 && (
              <div>
                <div className="font-semibold mb-1">
                  blockVar
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className={`h-6 rounded-full ${
                      step >= 5
                        ? "bg-red-500 w-0"
                        : "bg-yellow-500 w-1/2"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-12 space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Global Scope
            </h2>

            <p className="text-lg leading-8">
              Variables declared outside functions belong to the global scope.
              They remain alive until the application or page closes.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Local (Function) Scope
            </h2>

            <p className="text-lg leading-8">
              Variables declared inside a function only exist while the
              function is executing.
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Block Scope
            </h2>

            <p className="text-lg leading-8">
              Variables declared using let or const inside a block
              exist only inside that block.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Lifetime
            </h2>

            <p className="text-lg leading-8">
              Lifetime means how long a variable stays in memory.
            </p>

            <ul className="mt-4 space-y-2 text-lg">
              <li>🌍 Global → entire program</li>
              <li>📦 Function → while function runs</li>
              <li>🟨 Block → while block executes</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Garbage Collection
            </h2>

            <p className="text-lg leading-8">
              When variables go out of scope and nothing references them,
              JavaScript removes them from memory automatically.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl">
              Scope determines where a variable can be accessed.
              Lifetime determines how long the variable stays in memory.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}