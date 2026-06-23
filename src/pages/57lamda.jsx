import React, { useState } from "react";
import { ArrowRight, Zap, Play } from "lucide-react";

export default function LambdaVisualizer() {
  const [step, setStep] = useState(0);
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(20);

  const result = num1 + num2;

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Lambda Expressions
      </h1>

      <p className="text-center text-gray-600">
        Anonymous Functions Visualization
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl"
        >
          Next Step
        </button>

        <button
          onClick={reset}
          className="bg-red-500 text-white px-6 py-3 rounded-xl"
        >
          Reset
        </button>
      </div>

      {/* INPUTS */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="font-bold text-xl mb-4">
          Input Values
        </h2>

        <div className="flex gap-4">
          <input
            type="range"
            min="1"
            max="50"
            value={num1}
            onChange={(e) =>
              setNum1(Number(e.target.value))
            }
            className="w-full"
          />

          <div className="w-12">{num1}</div>
        </div>

        <div className="flex gap-4 mt-4">
          <input
            type="range"
            min="1"
            max="50"
            value={num2}
            onChange={(e) =>
              setNum2(Number(e.target.value))
            }
            className="w-full"
          />

          <div className="w-12">{num2}</div>
        </div>
      </div>

      {/* CODE COMPARISON */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traditional */}
        <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono">
          <h2 className="text-white mb-4 text-xl">
            Traditional Function
          </h2>

          <div>function add(a, b) {"{"}</div>
          <div className="ml-6">
            return a + b;
          </div>
          <div>{"}"}</div>

          <div className="mt-4">
            add({num1}, {num2});
          </div>
        </div>

        {/* Lambda */}
        <div className="bg-gray-900 text-yellow-400 p-5 rounded-xl font-mono">
          <h2 className="text-white mb-4 text-xl">
            Lambda Expression
          </h2>

          <div>const add = (a, b) =&gt; {"{"}</div>
          <div className="ml-6">
            return a + b;
          </div>
          <div>{"}"}</div>

          <div className="mt-4">
            add({num1}, {num2});
          </div>
        </div>
      </div>

      {/* EXECUTION */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
  <h2 className="text-3xl font-bold text-center text-white mb-10">
    ⚡ Lambda Execution Pipeline
  </h2>

  <div className="flex flex-wrap justify-center items-center gap-6">

    {/* STEP 1 */}
    {step >= 1 && (
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 animate-pulse rounded-2xl"></div>

        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20
          rounded-2xl p-6 w-40 text-center shadow-xl
          hover:scale-105 transition-all duration-300">

          <div className="text-blue-300 text-sm">
            Variable
          </div>

          <div className="text-4xl font-bold text-white mt-2">
            add
          </div>
        </div>
      </div>
    )}

    {step >= 2 && (
      <>
        <ArrowRight
          className="text-white animate-pulse"
          size={40}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 rounded-2xl animate-pulse"></div>

          <div className="relative bg-yellow-400/20 backdrop-blur-lg
            border border-yellow-300/30 rounded-2xl p-6 shadow-xl">

            <div className="text-yellow-300 text-sm mb-2">
              Anonymous Function
            </div>

            <div className="font-mono text-2xl text-white">
              (a,b) =&gt; a+b
            </div>
          </div>
        </div>
      </>
    )}

    {step >= 3 && (
      <>
        <ArrowRight
          className="text-white animate-bounce"
          size={40}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 rounded-2xl"></div>

          <div className="relative bg-green-400/20 border border-green-300/30
            backdrop-blur-lg rounded-2xl p-6 text-center">

            <div className="text-green-300 text-sm">
              Function Call
            </div>

            <div className="text-white text-2xl font-bold mt-2">
              add({num1}, {num2})
            </div>
          </div>
        </div>
      </>
    )}

    {step >= 4 && (
      <>
        <ArrowRight
          className="text-white animate-pulse"
          size={40}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-40 rounded-2xl"></div>

          <div className="relative bg-purple-400/20 border border-purple-300/30
            backdrop-blur-lg rounded-2xl p-6 text-center">

            <div className="text-purple-300 text-sm">
              Parameters
            </div>

            <div className="text-white text-xl mt-2">
              a = {num1}
            </div>

            <div className="text-white text-xl">
              b = {num2}
            </div>
          </div>
        </div>
      </>
    )}

    {step >= 5 && (
      <>
        <ArrowRight
          className="text-white "
          size={40}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-40 rounded-2xl"></div>

          <div className="relative bg-orange-400/20 border border-orange-300/30
            backdrop-blur-lg rounded-2xl p-6 text-center">

            <div className="text-orange-300 text-sm">
              Execute
            </div>

            <div className="text-white text-3xl font-bold">
              {num1} + {num2}
            </div>
          </div>
        </div>
      </>
    )}

    {step >= 6 && (
      <>
        <ArrowRight
          className="text-yellow-400 animate-bounce"
          size={50}
        />

        <div className="relative">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-60 rounded-full animate-pulse"></div>

          <div className="relative bg-red-500 rounded-full
            w-40 h-40 flex flex-col justify-center items-center
            shadow-2xl border-4 border-red-300">

            <div className="text-red-100 text-sm">
              Return Value
            </div>

            <div className="text-5xl font-black text-white">
              {result}
            </div>
          </div>
        </div>
      </>
    )}
  </div>

  {/* MEMORY */}
  {step >= 2 && (
    <div className="mt-14 bg-black/30 backdrop-blur rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        Function Memory
      </h3>

      <div className="flex justify-center items-center gap-8">

        <div className="bg-blue-500/20 border border-blue-300/30
          p-5 rounded-xl w-36 text-center">

          <div className="text-blue-300 text-sm">
            Variable
          </div>

          <div className="text-white text-2xl font-bold">
            add
          </div>

          <div className="text-gray-300">
            0x101
          </div>
        </div>

        <ArrowRight className="text-white" size={40} />

        <div className="bg-yellow-500/20 border border-yellow-300/30
          p-5 rounded-xl">

          <div className="text-yellow-300 text-sm">
            Function Object
          </div>

          <div className="font-mono text-white text-xl mt-2">
            (a,b) =&gt; a+b
          </div>
        </div>
      </div>
    </div>
  )}
</div>

      {/* ANONYMOUS FUNCTION */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Anonymous Function Object
        </h2>

        <div className="flex justify-center items-center gap-8">
          <div className="border-2 p-5 rounded-xl">
            add
          </div>

          <ArrowRight size={40} />

          <div className="bg-yellow-200 border-2 border-yellow-500 p-6 rounded-xl">
            Function Object

            <div className="mt-3 font-mono">
              (a,b) =&gt; a+b
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-700">
          Lambda expressions create anonymous
          functions. The function has no name and
          can be assigned to a variable.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="bg-blue-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">
          Execution Timeline
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className={`p-4 rounded-xl ${
            step >= 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}>
            Parameters
          </div>

          <ArrowRight />

          <div className={`p-4 rounded-xl ${
            step >= 2
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}>
            Lambda Created
          </div>

          <ArrowRight />

          <div className={`p-4 rounded-xl ${
            step >= 3
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}>
            Execute
          </div>

          <ArrowRight />

          <div className={`p-4 rounded-xl ${
            step >= 5
              ? "bg-purple-500 text-white"
              : "bg-gray-300"
          }`}>
            Return Value
          </div>
        </div>
      </div>

      {/* EXAMPLES */}
      <div className="bg-purple-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Common Lambda Examples
        </h2>

        <div className="grid md:grid-cols-2 gap-4 font-mono">
          <div className="bg-white p-4 rounded">
            x =&gt; x * 2
          </div>

          <div className="bg-white p-4 rounded">
            (a,b) =&gt; a + b
          </div>

          <div className="bg-white p-4 rounded">
            () =&gt; "Hello"
          </div>

          <div className="bg-white p-4 rounded">
            n =&gt; n * n
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-green-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Key Points
        </h2>

        <ul className="space-y-2 list-disc ml-6">
          <li>Lambda expressions are anonymous functions.</li>
          <li>They reduce boilerplate code.</li>
          <li>They can be stored in variables.</li>
          <li>They can be passed as arguments.</li>
          <li>Widely used in Java Streams, JavaScript, and Python.</li>
          <li>The <strong>=&gt;</strong> symbol separates parameters and body.</li>
        </ul>
      </div>
    </div>
  );
}