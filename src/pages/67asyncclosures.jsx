import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Clock,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function AsyncClosureVisualizer() {
  const [tab, setTab] = useState(0);

  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Closures in Async Code
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand how closures preserve variables during delayed execution.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 flex-wrap mb-8">

          <button
            onClick={() => {
              setTab(0);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Delayed Execution
          </button>

          <button
            onClick={() => {
              setTab(1);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            var vs let
          </button>

          <button
            onClick={() => {
              setTab(2);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Real Async Closure
          </button>

        </div>

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

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`function greet() {

   let name = "John";

   setTimeout(() => {
      console.log(name);
   }, 2000);
}

greet();`}
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl text-center text-lg mb-8">

              {step === 0 && "Click Next Step"}
              {step === 1 && "greet() executes."}
              {step === 2 && "name = 'John' created."}
              {step === 3 && "Callback enters Web API."}
              {step === 4 && "greet() finishes."}
              {step === 5 && "Callback executes later."}
              {step === 6 && "Closure remembers name."}

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  Function Scope
                </h2>

                {step >= 2 && (
                  <div className="bg-blue-500 text-white p-4 rounded-xl">
                    name = "John"
                  </div>
                )}

              </div>

              <div className="bg-yellow-50 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  Web API
                </h2>

                {step >= 3 && step <= 5 && (
                  <Clock
                    className="animate-spin mx-auto text-yellow-600"
                    size={60}
                  />
                )}

              </div>

              <div className="bg-green-50 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  Closure
                </h2>

                {step >= 6 && (
                  <div className="bg-green-500 text-white p-4 rounded-xl animate-bounce">
                    name = "John"
                  </div>
                )}

              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl mt-8">
              {step >= 6 && <div>John</div>}
            </div>

          </div>
        )}

        {/* TAB 2 */}

       {tab === 1 && (
  <div>

    <h2 className="text-3xl font-bold text-center mb-8">
      Why var prints 3 3 3 ?
    </h2>

    <div className="grid lg:grid-cols-2 gap-8">

      {/* VAR */}

      <div className="bg-red-50 rounded-3xl p-6 border-4 border-red-300">

        <h3 className="text-3xl font-bold text-center mb-6 text-red-600">
          var
        </h3>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono mb-6">
{`for(var i=0;i<3;i++) {
   setTimeout(() => {
      console.log(i);
   });
}`}
        </div>

        <h4 className="font-bold text-xl mb-4">
          Loop Execution
        </h4>

        <div className="space-y-3">

          <div className="bg-red-200 p-4 rounded-xl">
            Iteration 0 → i = 0
          </div>

          <div className="bg-red-200 p-4 rounded-xl">
            Iteration 1 → i = 1
          </div>

          <div className="bg-red-200 p-4 rounded-xl">
            Iteration 2 → i = 2
          </div>

          <div className="bg-red-500 text-white p-4 rounded-xl text-center">
            Loop Ends → i = 3
          </div>

        </div>

        <h4 className="font-bold text-xl mt-6 mb-4">
          All Closures Point Here
        </h4>

        <div className="bg-red-600 text-white p-5 rounded-xl text-center text-2xl">
          i = 3
        </div>

        <div className="mt-6 bg-black text-green-400 p-4 rounded-xl text-xl text-center">
          3 &nbsp;&nbsp; 3 &nbsp;&nbsp; 3
        </div>

      </div>

      {/* LET */}

      <div className="bg-green-50 rounded-3xl p-6 border-4 border-green-300">

        <h3 className="text-3xl font-bold text-center mb-6 text-green-600">
          let
        </h3>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono mb-6">
{`for(let i=0;i<3;i++) {
   setTimeout(() => {
      console.log(i);
   });
}`}
        </div>

        <h4 className="font-bold text-xl mb-4">
          Separate Variables
        </h4>

        <div className="space-y-3">

          <div className="bg-green-400 text-white p-4 rounded-xl">
            Closure 1 → i = 0
          </div>

          <div className="bg-green-400 text-white p-4 rounded-xl">
            Closure 2 → i = 1
          </div>

          <div className="bg-green-400 text-white p-4 rounded-xl">
            Closure 3 → i = 2
          </div>

        </div>

        <h4 className="font-bold text-xl mt-6 mb-4">
          Each Closure Has Its Own Variable
        </h4>

        <div className="flex gap-3 justify-center">

          <div className="bg-green-600 text-white p-4 rounded-xl">
            0
          </div>

          <div className="bg-green-600 text-white p-4 rounded-xl">
            1
          </div>

          <div className="bg-green-600 text-white p-4 rounded-xl">
            2
          </div>

        </div>

        <div className="mt-6 bg-black text-green-400 p-4 rounded-xl text-xl text-center">
          0 &nbsp;&nbsp; 1 &nbsp;&nbsp; 2
        </div>

      </div>

    </div>

    {/* Timeline */}

    <div className="mt-10 bg-blue-50 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Timeline
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 text-lg">

        <div className="bg-blue-500 text-white px-5 py-3 rounded-xl">
          Loop Runs
        </div>

        →
        
        <div className="bg-yellow-500 text-white px-5 py-3 rounded-xl">
          Callbacks Stored
        </div>

        →

        <div className="bg-red-500 text-white px-5 py-3 rounded-xl">
          Loop Ends
        </div>

        →

        <div className="bg-green-500 text-white px-5 py-3 rounded-xl">
          Callbacks Execute
        </div>

      </div>

    </div>

    {/* Explanation */}

    <div className="mt-10 grid md:grid-cols-2 gap-6">

      <div className="bg-red-100 p-6 rounded-2xl">

        <h3 className="text-2xl font-bold mb-3">
          var
        </h3>

        <ul className="space-y-2 text-lg">
          <li>• Function scoped</li>
          <li>• Only one variable i exists</li>
          <li>• All callbacks share it</li>
          <li>• Loop finishes with i = 3</li>
          <li>• All callbacks print 3</li>
        </ul>

      </div>

      <div className="bg-green-100 p-6 rounded-2xl">

        <h3 className="text-2xl font-bold mb-3">
          let
        </h3>

        <ul className="space-y-2 text-lg">
          <li>• Block scoped</li>
          <li>• New variable every iteration</li>
          <li>• Each closure captures its own i</li>
          <li>• Values remain 0, 1, and 2</li>
          <li>• Callbacks print 0 1 2</li>
        </ul>

      </div>

    </div>

  </div>
)}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`function createCounter() {

   let count = 0;

   return function() {

      setTimeout(() => {
         count++;
         console.log(count);
      }, 1000);

   };
}

const counter = createCounter();

counter();
counter();`}
            </div>

            <div className="grid lg:grid-cols-4 gap-6">

              <div className="bg-blue-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Outer Function
                </h3>

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  count = 0
                </div>

              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  setTimeout
                </h3>

                {step >= 2 && (
                  <Clock
                    size={50}
                    className="mx-auto animate-spin"
                  />
                )}

              </div>

              <div className="bg-green-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Closure Memory
                </h3>

                {step >= 4 && (
                  <div className="bg-green-500 text-white p-4 rounded-xl">
                    count survives
                  </div>
                )}

              </div>

              <div className="bg-purple-50 p-5 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Delayed Callback
                </h3>

                {step >= 5 && (
                  <CheckCircle
                    size={50}
                    className="mx-auto text-green-600"
                  />
                )}

              </div>

            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl mt-8">

              {step >= 5 && <div>1</div>}
              {step >= 6 && <div>2</div>}

            </div>

          </div>
        )}

        {/* Final Explanation */}

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Why Closures Matter in Async Code
          </h2>

          <p className="text-2xl leading-10">
            The callback executes later, but the closure keeps the
            variables alive even after the outer function has finished.
          </p>

        </div>

      </div>
    </div>
  );
}