import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Package,
  ArrowRight,
  Briefcase,
  Lock,
  Clock,
  Cpu,
} from "lucide-react";

export default function ClosureVisualizer() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
  };

  const countValue = step >= 6 ? 11 : 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-3">
          JavaScript Closure Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          A closure is a function that remembers variables from its outer scope.
        </p>

        {/* Code */}
        <div className="bg-gray-900 text-green-400 rounded-2xl p-6 font-mono text-sm md:text-base overflow-auto mb-8 shadow-lg">
{`function outer() {
    let count = 10;

    return function inner() {
        count++;
        return count;
    }
}

const fn = outer();

fn(); // 11`}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:scale-105 transition"
          >
            <Play size={20} />
            Next Step
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:scale-105 transition"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        {/* Execution */}
        <div className="bg-blue-50 rounded-2xl p-5 mb-8 text-center text-lg font-medium">
          {step === 0 && "Click Next Step to begin execution."}
          {step === 1 && "outer() enters the call stack."}
          {step === 2 && "Variable count = 10 is created."}
          {step === 3 && "inner() function is created."}
          {step === 4 && "inner() returns and captures count."}
          {step === 5 &&
            "outer() finishes but count survives because of closure."}
          {step === 6 &&
            "Calling fn() executes inner() and count becomes 11."}
        </div>

        {/* Visualization */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Call Stack */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Call Stack
            </h2>

            <div className="bg-gray-100 rounded-2xl p-6 min-h-[320px] flex flex-col justify-end gap-4">

              {(step >= 1 && step <= 5) && (
                <div className="bg-blue-500 text-white p-4 rounded-xl text-center shadow-lg animate-pulse">
                  outer()
                </div>
              )}

              {step === 6 && (
                <div className="bg-green-500 text-white p-4 rounded-xl text-center shadow-lg animate-bounce">
                  inner()
                </div>
              )}
            </div>
          </div>

          {/* Heap Memory */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Heap / Closure Memory
            </h2>

            <div className="bg-yellow-50 rounded-2xl p-6 min-h-[320px] flex flex-col items-center justify-center">

              {step >= 2 && (
                <div className="bg-yellow-300 px-10 py-5 rounded-2xl shadow-xl text-2xl font-bold">
                  count = {countValue}
                </div>
              )}

              {step >= 4 && (
                <div className="mt-8 flex flex-col items-center animate-bounce">
                  <Package size={65} className="text-purple-600" />

                  <div className="font-bold text-xl text-purple-700 mt-2">
                    Closure Backpack
                  </div>

                  <div className="text-gray-600">
                    inner() carries count
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reference */}
        {step >= 4 && (
          <div className="mt-10 flex justify-center items-center gap-6 animate-pulse">
            <div className="bg-blue-500 text-white px-6 py-4 rounded-xl">
              outer()
            </div>

            <ArrowRight size={40} className="text-gray-500" />

            <div className="bg-purple-600 text-white px-6 py-4 rounded-xl">
              inner()
            </div>
          </div>
        )}

        {/* Final */}
        {step === 6 && (
          <div className="text-center mt-10">
            <div className="inline-block bg-green-500 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl animate-bounce">
              fn() returns 11
            </div>
          </div>
        )}

        {/* ---------------- EXPLANATION ---------------- */}

        <div className="mt-14 space-y-8">

          {/* What is closure */}
          <div className="bg-indigo-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-4">
              What is a Closure?
            </h2>

            <p className="text-lg leading-8">
              A closure is created when an inner function remembers variables
              from its outer function even after the outer function has
              completed execution.
            </p>

            <div className="mt-5 bg-white p-5 rounded-xl font-mono">
              outer() → count = 10 → return inner()
              <br />
              <br />
              inner() remembers count forever.
            </div>
          </div>

          {/* Internal working */}
          <div className="bg-green-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-5">
              What Happens Internally?
            </h2>

            <ol className="list-decimal pl-6 space-y-3 text-lg">
              <li>outer() enters the call stack.</li>
              <li>count variable is created.</li>
              <li>inner() function is created.</li>
              <li>JavaScript notices inner() uses count.</li>
              <li>count is attached to inner().</li>
              <li>outer() finishes execution.</li>
              <li>Normally count would disappear.</li>
              <li>Because inner() needs it, count survives.</li>
            </ol>
          </div>

          {/* Why variable survives */}
          <div className="bg-yellow-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-4">
              Why Doesn't count Get Destroyed?
            </h2>

            <p className="text-lg leading-8">
              JavaScript's garbage collector removes memory only when nothing
              references it.
            </p>

            <div className="flex justify-center mt-6 text-2xl font-mono">
              inner() ─────► count
            </div>

            <p className="mt-6 text-lg">
              Since inner() still points to count, JavaScript keeps count alive.
            </p>
          </div>

          {/* Why closures used */}
          <div className="bg-purple-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-6">
              Why Are Closures Used?
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-white p-5 rounded-xl shadow">
                <Lock className="text-indigo-600 mb-3" size={40} />
                <h3 className="font-bold text-xl mb-2">
                  Private Variables
                </h3>

                <p>
                  Hide data from outside code and protect state.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <Clock className="text-green-600 mb-3" size={40} />
                <h3 className="font-bold text-xl mb-2">
                  Timers & Callbacks
                </h3>

                <p>
                  setTimeout and event handlers use closures.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <Cpu className="text-red-500 mb-3" size={40} />
                <h3 className="font-bold text-xl mb-2">
                  React Hooks
                </h3>

                <p>
                  React functions capture state values using closures.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow">
                <Briefcase className="text-purple-600 mb-3" size={40} />
                <h3 className="font-bold text-xl mb-2">
                  Function Factories
                </h3>

                <p>
                  Create specialized functions with stored data.
                </p>
              </div>

            </div>
          </div>

          {/* Examples */}
          <div className="bg-blue-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-5">
              Real Examples
            </h2>

            <div className="space-y-5">

              <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono">
{`function counter() {
    let count = 0;

    return function() {
        count++;
        return count;
    }
}

const c = counter();

c(); // 1
c(); // 2
c(); // 3`}
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono">
{`button.onclick = function() {
    console.log(username);
}`}
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono">
{`setTimeout(() => {
    console.log(message);
}, 1000);`}
              </div>
            </div>
          </div>

          {/* Real Life */}
          <div className="bg-pink-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-5">
              Real Life Analogy
            </h2>

            <div className="text-lg leading-8">
              <p>📦 Function = Delivery person</p>
              <p>🎒 Closure = Backpack</p>
              <p>💰 Variables = Items inside backpack</p>

              <p className="mt-5">
                Even after leaving the house, the delivery person still carries
                the backpack. Similarly, the inner function carries variables
                after the outer function ends.
              </p>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-green-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-5">
              Advantages
            </h2>

            <ul className="space-y-3 text-lg">
              <li>✅ Data privacy</li>
              <li>✅ Maintains state</li>
              <li>✅ Cleaner code</li>
              <li>✅ Reusable functions</li>
              <li>✅ Used heavily in JavaScript frameworks</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-red-50 rounded-2xl p-6 shadow">
            <h2 className="text-3xl font-bold mb-5">
              Disadvantages
            </h2>

            <ul className="space-y-3 text-lg">
              <li>❌ Uses extra memory.</li>
              <li>❌ Variables live longer.</li>
              <li>❌ Can cause memory leaks if misused.</li>
              <li>❌ Difficult concept for beginners.</li>
            </ul>
          </div>

          {/* Final definition */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl text-center shadow-xl">
            <h2 className="text-4xl font-bold mb-5">
              Final Definition
            </h2>

            <p className="text-2xl leading-10">
              A closure is a function that remembers and carries variables from
              its outer scope even after the outer function has finished
              execution.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}