import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Rocket,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function HoistingVisualizer() {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 8) setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-3">
          JavaScript Hoisting Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Watch JavaScript move declarations before execution.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono mb-8 overflow-auto">
{`console.log(a);
console.log(b);
sayHello();

var a = 10;
let b = 20;

function sayHello() {
   return "Hello";
}`}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={next}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
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
        <div className="bg-indigo-50 rounded-2xl p-5 text-center text-lg mb-10">
          {step === 0 && "Click Next Step."}
          {step === 1 && "JavaScript enters Creation Phase."}
          {step === 2 && "var a is hoisted with undefined."}
          {step === 3 && "function sayHello is fully hoisted."}
          {step === 4 && "let b enters Temporal Dead Zone."}
          {step === 5 && "Execution phase begins."}
          {step === 6 && "console.log(a) prints undefined."}
          {step === 7 && "console.log(b) causes ReferenceError."}
          {step === 8 && "sayHello() executes successfully."}
        </div>

        {/* Two Phases */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Creation Phase */}
          <div className="bg-blue-50 rounded-3xl p-6 border-4 border-blue-400">

            <div className="flex items-center gap-3 mb-5">
              <Rocket className="text-blue-600" size={35} />
              <h2 className="text-3xl font-bold">
                Creation Phase
              </h2>
            </div>

            {step >= 2 && (
              <div className="bg-blue-500 text-white p-4 rounded-xl mb-4 animate-pulse">
                a = undefined
              </div>
            )}

            {step >= 3 && (
              <div className="bg-green-500 text-white p-4 rounded-xl mb-4 animate-pulse">
                sayHello() = function
              </div>
            )}

            {step >= 4 && (
              <div className="bg-yellow-400 p-4 rounded-xl">
                b = TDZ
              </div>
            )}
          </div>

          {/* Execution Phase */}
          <div className="bg-purple-50 rounded-3xl p-6 border-4 border-purple-400">

            <div className="flex items-center gap-3 mb-5">
              <MemoryStick
                className="text-purple-600"
                size={35}
              />
              <h2 className="text-3xl font-bold">
                Execution Phase
              </h2>
            </div>

            {step >= 6 && (
              <div className="bg-gray-100 p-4 rounded-xl mb-4">
                console.log(a)
                <div className="text-green-600 font-bold">
                  undefined
                </div>
              </div>
            )}

            {step >= 7 && (
              <div className="bg-red-100 p-4 rounded-xl mb-4">
                console.log(b)

                <div className="text-red-600 font-bold">
                  ReferenceError
                </div>
              </div>
            )}

            {step >= 8 && (
              <div className="bg-green-100 p-4 rounded-xl">
                sayHello()

                <div className="text-green-700 font-bold">
                  Hello
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Variable States */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Variable Status
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <h3 className="text-xl font-bold mb-3">
                var a
              </h3>

              {step < 2 && "Not created"}

              {step >= 2 && step < 6 && (
                <div className="text-yellow-600 text-xl">
                  undefined
                </div>
              )}

              {step >= 6 && (
                <div className="text-green-600 text-xl">
                  10
                </div>
              )}
            </div>

            <div className="bg-yellow-50 rounded-2xl p-5 text-center">
              <h3 className="text-xl font-bold mb-3">
                let b
              </h3>

              {step < 4 && "Not created"}

              {step >= 4 && step < 7 && (
                <div className="text-red-600">
                  TDZ
                </div>
              )}

              {step >= 7 && (
                <div className="text-green-600 text-xl">
                  20
                </div>
              )}
            </div>

            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <h3 className="text-xl font-bold mb-3">
                Function
              </h3>

              {step >= 3 ? (
                <CheckCircle
                  size={45}
                  className="mx-auto text-green-600"
                />
              ) : (
                "Not loaded"
              )}
            </div>

          </div>
        </div>

        {/* TDZ */}
        {step >= 4 && (
          <div className="mt-10 bg-red-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle
                className="text-red-600"
                size={35}
              />

              <h2 className="text-3xl font-bold">
                Temporal Dead Zone
              </h2>
            </div>

            <p className="text-lg leading-8">
              Variables declared with let and const exist in memory
              but cannot be accessed before their declaration line.
            </p>
          </div>
        )}

        {/* Explanation */}
        <div className="mt-12 space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              What is Hoisting?
            </h2>

            <p className="text-lg leading-8">
              Hoisting is JavaScript's behavior of processing declarations
              before executing code.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              var Hoisting
            </h2>

            <p className="text-lg">
              Variables declared with var are initialized with undefined.
            </p>

            <div className="bg-gray-900 text-green-400 p-4 rounded-xl mt-4 font-mono">
{`console.log(a);
var a = 10;

// becomes

var a;
console.log(a);
a = 10;`}
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              let and const
            </h2>

            <p className="text-lg">
              They are hoisted but remain inside the Temporal Dead Zone.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Function Hoisting
            </h2>

            <p className="text-lg">
              Function declarations are completely available before
              execution starts.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Important Rule
            </h2>

            <ul className="space-y-2 text-lg">
              <li>✅ var → undefined</li>
              <li>✅ function → fully available</li>
              <li>❌ let → TDZ</li>
              <li>❌ const → TDZ</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              Hoisting is JavaScript's behavior of processing variable and
              function declarations before code execution begins.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}