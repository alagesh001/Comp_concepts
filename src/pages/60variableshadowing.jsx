import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Eye,
  Search,
  Globe,
  Box,
  Square,
  EyeOff,
} from "lucide-react";

export default function VariableShadowingVisualizer() {
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

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-3">
          Variable Shadowing Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Same variable names in different scopes.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono mb-8 overflow-auto">
{`let x = "Global";

function demo() {

    let x = "Function";

    if(true) {

        let x = "Block";

        console.log(x);
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

        {/* Step */}
        <div className="bg-blue-50 p-5 rounded-2xl text-center text-lg mb-10">
          {step === 0 && "Click Next Step."}
          {step === 1 && "Global variable x is created."}
          {step === 2 && "Function creates another x."}
          {step === 3 && "Block creates another x."}
          {step === 4 && "console.log(x) searches for x."}
          {step === 5 && "Nearest x is found in block scope."}
          {step === 6 && 'Output becomes "Block".'}
        </div>

        {/* Scope Visualization */}
        <div className="border-4 border-blue-500 rounded-3xl p-6 bg-blue-50">

          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-blue-600" size={35} />
            <h2 className="text-3xl font-bold">
              Global Scope
            </h2>
          </div>

          {step >= 1 && (
            <div
              className={`p-4 rounded-xl text-white text-xl font-bold ${
                step >= 5
                  ? "bg-gray-400"
                  : "bg-blue-500"
              }`}
            >
              x = "Global"
            </div>
          )}

          {step >= 2 && (
            <div className="mt-6 border-4 border-green-500 rounded-2xl p-5 bg-green-50">

              <div className="flex items-center gap-3 mb-4">
                <Box className="text-green-600" size={30} />
                <h3 className="text-2xl font-bold">
                  Function Scope
                </h3>
              </div>

              <div
                className={`p-4 rounded-xl text-white text-lg font-bold ${
                  step >= 5
                    ? "bg-gray-400"
                    : "bg-green-500"
                }`}
              >
                x = "Function"
              </div>

              {step >= 3 && (
                <div className="mt-5 border-4 border-yellow-500 rounded-xl p-5 bg-yellow-50">

                  <div className="flex items-center gap-3 mb-4">
                    <Square
                      className="text-yellow-600"
                      size={28}
                    />
                    <h4 className="text-xl font-bold">
                      Block Scope
                    </h4>
                  </div>

                  <div
                    className={`p-4 rounded-xl text-lg font-bold text-white ${
                      step >= 5
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-yellow-500"
                    }`}
                  >
                    x = "Block"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Variable Search */}
        {step >= 4 && (
          <div className="mt-10 bg-purple-50 rounded-2xl p-6">

            <h2 className="text-3xl font-bold text-center mb-6">
              Variable Lookup Process
            </h2>

            <div className="flex justify-center items-center gap-4 text-xl flex-wrap">

              <Search className="text-purple-600" size={35} />

              <span>console.log(x)</span>

              <span>→</span>

              <span>Block Scope</span>

              <span>→</span>

              <span className="font-bold text-green-600">
                Found x
              </span>
            </div>
          </div>
        )}

        {/* Shadow Effect */}
        {step >= 5 && (
          <div className="mt-10 grid md:grid-cols-3 gap-5">

            <div className="bg-gray-100 p-5 rounded-2xl text-center">
              <EyeOff
                className="mx-auto text-gray-500 mb-3"
                size={40}
              />
              <h3 className="font-bold text-xl">
                Global x
              </h3>
              <p>Hidden</p>
            </div>

            <div className="bg-gray-100 p-5 rounded-2xl text-center">
              <EyeOff
                className="mx-auto text-gray-500 mb-3"
                size={40}
              />
              <h3 className="font-bold text-xl">
                Function x
              </h3>
              <p>Hidden</p>
            </div>

            <div className="bg-green-100 p-5 rounded-2xl text-center">
              <Eye
                className="mx-auto text-green-600 mb-3"
                size={40}
              />
              <h3 className="font-bold text-xl">
                Block x
              </h3>
              <p>Visible</p>
            </div>
          </div>
        )}

        {/* Output */}
        {step === 6 && (
          <div className="mt-10 text-center">
            <div className="inline-block bg-green-500 text-white px-10 py-5 rounded-2xl text-3xl font-bold animate-bounce shadow-xl">
              Output: "Block"
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="mt-14 space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              What is Variable Shadowing?
            </h2>

            <p className="text-lg leading-8">
              Variable shadowing occurs when a variable declared in an inner
              scope has the same name as a variable in an outer scope.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              How JavaScript Searches Variables
            </h2>

            <ol className="list-decimal pl-6 space-y-2 text-lg">
              <li>Look inside current scope.</li>
              <li>If not found, move outward.</li>
              <li>Continue until global scope.</li>
              <li>If not found anywhere → ReferenceError.</li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Why is it called "Shadowing"?
            </h2>

            <p className="text-lg leading-8">
              The inner variable casts a shadow over the outer variable.
              The outer variable still exists, but it cannot be seen from
              the inner scope.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Example
            </h2>

            <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono">
{`let x = 10;

function test() {
    let x = 20;
    console.log(x);
}

test(); // 20`}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Important Rule
            </h2>

            <p className="text-lg">
              JavaScript always uses the nearest variable with that name.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              Variable shadowing occurs when an inner variable with the same
              name hides the outer variable inside that scope.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}