import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  ArrowRight,
  Phone,
  Box,
  Layers,
} from "lucide-react";

export default function CallbackVisualizer() {
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
          Callback Function Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand how functions can be passed as arguments.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 rounded-2xl p-6 font-mono mb-8 overflow-auto">
{`function greet(name, callback) {
    console.log("Hello " + name);

    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("John", sayBye);`}
        </div>

        {/* Controls */}
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
 {/* Console */}
        <div className="bg-gray-900 text-green-400 rounded-2xl p-6 mb-10">

          <h2 className="text-white text-2xl font-bold mb-4">
            Console Output
          </h2>

          {step >= 3 && <div>Hello John</div>}
          {step >= 6 && <div>Goodbye!</div>}
        </div>
        {/* Step Explanation */}
        <div className="bg-blue-50 p-5 rounded-2xl text-center text-lg mb-10">
          {step === 0 && "Click Next Step."}
          {step === 1 && "greet() is called."}
          {step === 2 && "sayBye function is passed as an argument."}
          {step === 3 && 'greet prints "Hello John".'}
          {step === 4 && "callback() executes."}
          {step === 5 && "sayBye enters the stack."}
          {step === 6 && 'sayBye prints "Goodbye!".'}
          {step === 7 && "Execution completes."}
        </div>

        {/* Function Flow */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* Main Function */}
          <div className="bg-blue-50 border-4 border-blue-400 rounded-3xl p-6 text-center">

            <Box className="mx-auto text-blue-600 mb-4" size={50} />

            <h2 className="text-2xl font-bold mb-3">
              greet()
            </h2>

            {step >= 1 && (
              <div className="bg-blue-500 text-white p-3 rounded-xl">
                Running
              </div>
            )}
          </div>

          {/* Passing */}
          <div className="flex justify-center items-center">

            {step >= 2 && (
              <ArrowRight
                size={60}
                className="text-purple-600 animate-pulse"
              />
            )}

          </div>

          {/* Callback */}
          <div className="bg-green-50 border-4 border-green-400 rounded-3xl p-6 text-center">

            <Phone className="mx-auto text-green-600 mb-4" size={50} />

            <h2 className="text-2xl font-bold mb-3">
              sayBye()
            </h2>

            {step >= 2 && (
              <div className="bg-green-500 text-white p-3 rounded-xl">
                Passed as Callback
              </div>
            )}
          </div>
        </div>

        {/* Call Stack */}
        <div className="bg-purple-50 rounded-3xl p-6 mb-10">

          <div className="flex items-center gap-3 mb-5">
            <Layers className="text-purple-600" size={35} />
            <h2 className="text-3xl font-bold">
              Call Stack
            </h2>
          </div>

          <div className="min-h-[220px] flex flex-col justify-end gap-4">

            {(step >= 1 && step <= 4) && (
              <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
                greet()
              </div>
            )}

            {(step >= 5 && step <= 6) && (
              <>
                <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
                  greet()
                </div>

                <div className="bg-green-500 text-white p-4 rounded-xl text-center animate-bounce">
                  sayBye()
                </div>
              </>
            )}
          </div>
        </div>

       

        {/* Callback Flow */}
        {step >= 4 && (
          <div className="bg-yellow-50 rounded-3xl p-6 mb-10">

            <h2 className="text-3xl font-bold text-center mb-6">
              Callback Flow
            </h2>

            <div className="flex justify-center items-center gap-5 flex-wrap text-xl">

              <span>greet()</span>

              <ArrowRight />

              <span>callback()</span>

              <ArrowRight />

              <span>sayBye()</span>

            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              What is a Callback Function?
            </h2>

            <p className="text-lg leading-8">
              A callback function is a function passed as an argument to
              another function and executed later.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Functions Are Values
            </h2>

            <p className="text-lg leading-8">
              In JavaScript, functions can be stored in variables,
              passed to other functions, and returned from functions.
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Why Use Callbacks?
            </h2>

            <ul className="space-y-2 text-lg">
              <li>✅ Event handlers</li>
              <li>✅ setTimeout</li>
              <li>✅ Array methods</li>
              <li>✅ Asynchronous operations</li>
              <li>✅ Custom behavior</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Real Examples
            </h2>

            <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono">
{`button.addEventListener(
    "click",
    handleClick
);

setTimeout(
    callback,
    1000
);

numbers.map(
    multiply
);`}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Important Rule
            </h2>

            <p className="text-lg">
              Passing <strong>sayBye</strong> passes the function itself.
              Passing <strong>sayBye()</strong> executes the function immediately.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              A callback function is a function passed to another function
              to be executed later.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}