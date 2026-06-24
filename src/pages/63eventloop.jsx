import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Clock,
  RefreshCw,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function EventLoopVisualizer() {
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
          JavaScript Event Loop Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand Call Stack, Web APIs, Callback Queue and Event Loop.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 rounded-2xl p-6 font-mono mb-8 overflow-auto">
{`console.log("Start");

setTimeout(() => {
    console.log("Timer Done");
}, 2000);

console.log("End");`}
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
     {/* Console Output */}
        <div className="mt-10 bg-gray-900 text-green-400 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4 text-white">
            Console Output
          </h2>

          {step >= 1 && <div>Start</div>}
          {step >= 3 && <div>End</div>}
          {step >= 8 && <div>Timer Done</div>}
        </div>
        {/* Step Description */}
        <div className="bg-blue-50 rounded-2xl p-5 text-center text-lg mb-10">
          {step === 0 && "Click Next Step to begin."}
          {step === 1 && 'console.log("Start") enters the stack.'}
          {step === 2 && "setTimeout enters Web APIs."}
          {step === 3 && 'console.log("End") executes.'}
          {step === 4 && "Timer starts counting."}
          {step === 5 && "Timer completes."}
          {step === 6 && "Callback moves to Callback Queue."}
          {step === 7 && "Event Loop checks Call Stack."}
          {step === 8 && "Callback executes."}
        </div>

        {/* Main Areas */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Call Stack */}
          <div className="bg-blue-50 border-4 border-blue-400 rounded-3xl p-5">

            <div className="flex items-center gap-2 mb-4">
              <Layers className="text-blue-600" />
              <h2 className="text-2xl font-bold">
                Call Stack
              </h2>
            </div>

            <div className="min-h-[250px] flex flex-col justify-end gap-3">

              {step === 1 && (
                <div className="bg-blue-500 text-white p-3 rounded-xl animate-bounce">
                  console.log("Start")
                </div>
              )}

              {step === 3 && (
                <div className="bg-blue-500 text-white p-3 rounded-xl animate-bounce">
                  console.log("End")
                </div>
              )}

              {step === 8 && (
                <div className="bg-green-500 text-white p-3 rounded-xl animate-bounce">
                  Timer Callback
                </div>
              )}
            </div>
          </div>

          {/* Web APIs */}
          <div className="bg-yellow-50 border-4 border-yellow-400 rounded-3xl p-5">

            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-yellow-600" />
              <h2 className="text-2xl font-bold">
                Web APIs
              </h2>
            </div>

            {(step >= 2 && step <= 5) && (
              <div className="bg-yellow-400 p-4 rounded-xl text-center font-bold animate-pulse">
                setTimeout()
              </div>
            )}

            {step === 4 && (
              <div className="mt-4 text-center text-xl">
                ⏳ 2 sec
              </div>
            )}
          </div>

          {/* Event Loop */}
          <div className="bg-purple-50 border-4 border-purple-400 rounded-3xl p-5">

            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="text-purple-600" />
              <h2 className="text-2xl font-bold">
                Event Loop
              </h2>
            </div>

            {step >= 7 && (
              <div className="flex justify-center mt-12">
                <RefreshCw
                  size={70}
                  className="animate-spin text-purple-600"
                />
              </div>
            )}
          </div>

          {/* Queue */}
          <div className="bg-green-50 border-4 border-green-400 rounded-3xl p-5">

            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="text-green-600" />
              <h2 className="text-2xl font-bold">
                Callback Queue
              </h2>
            </div>

            {step === 6 && (
              <div className="bg-green-500 text-white p-3 rounded-xl animate-pulse">
                Timer Callback
              </div>
            )}
          </div>
        </div>

        {/* Flow */}
        {step >= 6 && (
          <div className="mt-10 bg-purple-50 rounded-3xl p-6">

            <h2 className="text-3xl font-bold text-center mb-5">
              Event Flow
            </h2>

            <div className="flex justify-center items-center gap-4 flex-wrap text-lg">

              <span>Web APIs / Background Thread</span>

              <ArrowRight />

              <span>Callback Queue</span>

              <ArrowRight />

              <span>Event Loop</span>

              <ArrowRight />

              <span>Call Stack</span>

            </div>
          </div>
        )}

   

        {/* Explanation */}
        <div className="mt-12 space-y-6">

          <div className="bg-blue-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Call Stack
            </h2>

            <p className="text-lg leading-8">
              JavaScript executes functions one at a time using the call stack.
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Web APIs / Background Thread
            </h2>

            <p className="text-lg leading-8">
              Browser features like setTimeout, fetch and DOM events run outside
              the JavaScript engine.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Callback Queue
            </h2>

            <p className="text-lg leading-8">
              Completed callbacks wait here until the call stack becomes empty.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Event Loop
            </h2>

            <p className="text-lg leading-8">
              The event loop continuously checks:
            </p>

            <ol className="list-decimal pl-6 mt-4 space-y-2 text-lg">
              <li>Is the call stack empty?</li>
              <li>Is there something in the callback queue?</li>
              <li>Move callback to the stack.</li>
            </ol>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">
              Important Rule
            </h2>

            <p className="text-lg">
              A callback can execute only when the call stack becomes empty.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              The Event Loop continuously checks the call stack and moves
              completed callbacks from the callback queue to the stack when the
              stack becomes empty.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}