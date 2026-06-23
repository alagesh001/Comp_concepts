import React, { useState } from "react";
import { ArrowRight, Cpu, Zap } from "lucide-react";

export default function BindingVisualizer() {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 6) setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Static vs Dynamic Binding
      </h1>

      <div className="text-center text-gray-600">
        Compile-Time vs Runtime Method Resolution
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={next}
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

      {/* CODE */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono">
        <div>class Animal {"{"}</div>
        <div className="ml-6">speak() {"{ }"}</div>
        <div>{"}"}</div>

        <div className="mt-3">class Dog extends Animal {"{"}</div>
        <div className="ml-6">speak() {"{ }"}</div>
        <div>{"}"}</div>

        <div className="mt-4">
          Animal obj = new Dog();
        </div>

        {step >= 2 && (
          <div className="text-yellow-300 mt-2">
            obj.speak();
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* STATIC */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-blue-500" />
            <h2 className="text-2xl font-bold text-blue-600">
              Static Binding
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border p-4 rounded-xl">
              Variable Type:
              <div className="text-2xl font-bold">
                Animal
              </div>
            </div>

            {step >= 1 && (
              <>
                <div className="flex justify-center">
                  <ArrowRight />
                </div>

                <div className="bg-blue-100 p-4 rounded-xl">
                  Compiler chooses method
                </div>
              </>
            )}

            {step >= 3 && (
              <div className="bg-green-200 p-4 rounded-xl">
                Decision made before program runs.
              </div>
            )}
          </div>
        </div>

        {/* DYNAMIC */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-green-500" />
            <h2 className="text-2xl font-bold text-green-600">
              Dynamic Binding
            </h2>
          </div>

          <div className="space-y-4">
            {step >= 2 && (
              <div className="border p-4 rounded-xl">
                Reference Type:
                <div className="font-bold text-xl">
                  Animal
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className="border p-4 rounded-xl bg-yellow-100">
                Actual Object:
                <div className="font-bold text-xl">
                  Dog
                </div>
              </div>
            )}

            {step >= 4 && (
              <>
                <div className="flex justify-center">
                  <ArrowRight />
                </div>

                <div className="bg-green-200 p-4 rounded-xl">
                  Runtime checks actual object.
                </div>
              </>
            )}

            {step >= 5 && (
              <div className="bg-blue-200 p-4 rounded-xl">
                Dog.speak() executes.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXECUTION TIMELINE */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Program Execution Timeline
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <div
            className={`p-4 rounded-xl ${
              step >= 0
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Compile Code
          </div>

          <ArrowRight />

          <div
            className={`p-4 rounded-xl ${
              step >= 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Variable Type Known
          </div>

          <ArrowRight />

          <div
            className={`p-4 rounded-xl ${
              step >= 2
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Method Call
          </div>

          <ArrowRight />

          <div
            className={`p-4 rounded-xl ${
              step >= 4
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Runtime Lookup
          </div>

          <ArrowRight />

          <div
            className={`p-4 rounded-xl ${
              step >= 5
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Execute Method
          </div>
        </div>
      </div>

      {/* MEMORY */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Object Memory
        </h2>

        <div className="flex justify-center items-center gap-10">
          <div className="border-2 p-6 rounded-xl">
            <div className="font-bold">obj</div>
            <div>Animal</div>
            <div>0x101</div>
          </div>

          <ArrowRight size={40} />

          <div className="bg-yellow-200 border-2 p-6 rounded-xl">
            <div className="font-bold">Dog Object</div>

            <div className="mt-2">
              speak() → Dog version
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON */}
      <div className="bg-purple-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Static vs Dynamic Binding
        </h2>

        <table className="w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="p-3">Feature</th>
              <th>Static</th>
              <th>Dynamic</th>
            </tr>
          </thead>

          <tbody>
            <tr className=" border">
              <td className="p-3 font-bold">Decision Time</td>
              <td>Compile Time</td>
              <td>Runtime</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-bold">Speed</td>
              <td>Faster</td>
              <td>Slightly Slower</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-bold">Used In</td>
              <td>Method Overloading</td>
              <td>Method Overriding</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-bold">Polymorphism</td>
              <td>Compile-time</td>
              <td>Runtime</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}