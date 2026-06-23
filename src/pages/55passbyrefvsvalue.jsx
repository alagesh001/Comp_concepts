import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function PassByConcept() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Pass by Value vs Pass by Reference
      </h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Next Step
        </button>

        <button
          onClick={reset}
          className="px-6 py-3 bg-red-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono">
        <div>let a = 10;</div>

        {step >= 1 && <div>let b = a;</div>}

        {step >= 2 && <div>a = 20;</div>}

        <div className="mt-4">--------------------</div>

        {step >= 3 && <div>let person1 = {"{name:'John'}"};</div>}

        {step >= 4 && <div>let person2 = person1;</div>}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* PASS BY VALUE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">
            Pass by Value
          </h2>

          <div className="space-y-4">
            <div className="border-2 p-4 rounded-xl">
              <div className="font-bold">a</div>
              <div className="text-3xl">
                {step >= 2 ? "20" : "10"}
              </div>
            </div>

            {step >= 1 && (
              <>
                <div className="flex justify-center">
                  <ArrowRight size={30} />
                </div>

                <div className="border-2 p-4 rounded-xl">
                  <div className="font-bold">b</div>
                  <div className="text-3xl">10</div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 bg-blue-100 p-4 rounded">
            {step === 0 && "Variable a stores 10."}
            {step === 1 && "b receives a copy of 10."}
            {step >= 2 &&
              "Changing a does not affect b because values are copied."}
          </div>
        </div>

        {/* PASS BY REFERENCE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-600">
            Pass by Reference
          </h2>

          <div className="space-y-6">
            {step >= 3 && (
              <div className="flex items-center gap-4">
                <div className="border-2 p-4 rounded-xl w-28">
                  <div className="font-bold">person1</div>
                  <div>0x101</div>
                </div>

                <ArrowRight />

                <div className="bg-yellow-100 border-2 border-yellow-500 p-4 rounded-xl">
                  Heap Object
                  <div>{`{ name: "John" }`}</div>
                </div>
              </div>
            )}

            {step >= 4 && (
              <div className="flex items-center gap-4">
                <div className="border-2 p-4 rounded-xl w-28">
                  <div className="font-bold">person2</div>
                  <div>0x101</div>
                </div>

                <ArrowRight />

                <div className="bg-yellow-100 border-2 border-yellow-500 p-4 rounded-xl">
                  Same Object
                  <div>{`{ name: "John" }`}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-green-100 p-4 rounded">
            {step < 3 &&
              "Objects are stored in heap memory."}

            {step === 3 &&
              "person1 stores the address 0x101."}

            {step >= 4 &&
              "person2 receives the same address, so both point to one object."}
          </div>
        </div>
      </div>

      {/* Memory Diagram */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Memory Visualization
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Stack */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stack Memory</h3>

            <div className="space-y-3">
              <div className="border p-4 rounded bg-white">
                a → {step >= 2 ? "20" : "10"}
              </div>

              {step >= 1 && (
                <div className="border p-4 rounded bg-white">
                  b → 10
                </div>
              )}

              {step >= 3 && (
                <div className="border p-4 rounded bg-white">
                  person1 → 0x101
                </div>
              )}

              {step >= 4 && (
                <div className="border p-4 rounded bg-white">
                  person2 → 0x101
                </div>
              )}
            </div>
          </div>

          {/* Heap */}
          <div>
            <h3 className="text-xl font-bold mb-4">Heap Memory</h3>

            {step >= 3 && (
              <div className="bg-yellow-200 p-6 rounded-xl border-2 border-yellow-500">
                Address: 0x101
                <div className="mt-2">{`{ name: "John" }`}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Key Difference
        </h2>

        <ul className="space-y-2 list-disc ml-6">
          <li>Primitive values are copied.</li>
          <li>Objects store memory addresses.</li>
          <li>Pass by value creates separate variables.</li>
          <li>Pass by reference shares the same object.</li>
          <li>Stack stores variables.</li>
          <li>Heap stores objects.</li>
        </ul>
      </div>
    </div>
  );
}