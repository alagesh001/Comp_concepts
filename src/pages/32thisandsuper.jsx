import { useState } from "react";
import {
  RotateCcw,
  ArrowDown,
  ArrowUp,
  Cat,
  PawPrint,
  Play,
} from "lucide-react";

export default function ThisAndSuperSimulator() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        this vs super
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
        <pre>{`class Animal {
    String name = "Animal";
}

class Cat extends Animal {
    String name = "Cat";

    void show() {
        System.out.println(this.name);
        System.out.println(super.name);
    }
}`}</pre>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <Play />
          Next Step
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* Stack */}
      <div className="bg-blue-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Stack Memory
        </h2>

        <div className="flex justify-center">
          <div
            className={`px-6 py-4 rounded-xl font-bold shadow transition-all duration-700 ${
              step >= 1
                ? "bg-blue-300 scale-110"
                : "bg-blue-100"
            }`}
          >
            Cat c
          </div>
        </div>
      </div>

      {/* Heap */}
      <div className="bg-green-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-8">
          Heap Memory
        </h2>

        <div className="flex flex-col items-center">

          {/* Dog Part */}
          <div
            className={`w-96 rounded-t-2xl p-6 shadow transition-all duration-700 ${
              step === 2
                ? "bg-blue-300 scale-105 ring-4 ring-blue-500"
                : "bg-blue-100"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Cat />
              <h3 className="text-xl font-bold">
                Cat Part
              </h3>
            </div>

            <div className="bg-white p-3 rounded">
              name = "Cat"
            </div>

            {step >= 2 && (
              <div className="mt-4 text-blue-700 font-bold animate-pulse">
                this.name → Cat
              </div>
            )}
          </div>

          <ArrowDown
            size={40}
            className="my-4 animate-bounce"
          />

          {/* Animal Part */}
          <div
            className={`w-96 rounded-b-2xl p-6 shadow transition-all duration-700 ${
              step === 3
                ? "bg-green-300 scale-105 ring-4 ring-green-500"
                : "bg-green-100"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <PawPrint />
              <h3 className="text-xl font-bold">
                Animal Part
              </h3>
            </div>

            <div className="bg-white p-3 rounded">
              name = "Animal"
            </div>

            {step >= 3 && (
              <div className="mt-4 text-green-700 font-bold animate-pulse">
                super.name → Animal
              </div>
            )}
          </div>
        </div>
      </div>

      {/* this Reference */}
      {step >= 2 && (
        <div className="bg-blue-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            this Reference
          </h2>

          <div className="flex items-center justify-center gap-6 text-xl">
            <div className="bg-blue-300 px-5 py-3 rounded">
              this
            </div>

            <ArrowDown />

            <div className="bg-white px-5 py-3 rounded">
              Cat Part
            </div>
          </div>

          <div className="text-center mt-4 text-blue-700 font-bold">
            this refers to the current object.
          </div>
        </div>
      )}

      {/* super Reference */}
      {step >= 3 && (
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            super Reference
          </h2>

          <div className="flex items-center justify-center gap-6 text-xl">
            <div className="bg-green-300 px-5 py-3 rounded">
              super
            </div>

            <ArrowDown />

            <div className="bg-white px-5 py-3 rounded">
              Animal Part
            </div>
          </div>

          <div className="text-center mt-4 text-green-700 font-bold">
            super refers to parent class members.
          </div>
        </div>
      )}

      {/* Output */}
      {step >= 4 && (
        <div className="bg-yellow-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Program Output
          </h2>

          <div className="space-y-3 text-xl">
            <div className="text-blue-700">
              this.name → Cat
            </div>

            <div className="text-green-700">
              super.name → Animal
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="bg-purple-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Current Step
        </h2>

        <div className="space-y-2 text-lg">
          <div className={step >= 1 ? "font-bold text-green-700" : ""}>
            1. Create Cat object.
          </div>

          <div className={step >= 2 ? "font-bold text-green-700" : ""}>
            2. Access this.name.
          </div>

          <div className={step >= 3 ? "font-bold text-green-700" : ""}>
            3. Access super.name.
          </div>

          <div className={step >= 4 ? "font-bold text-green-700" : ""}>
            4. Print output.
          </div>
        </div>
      </div>
    </div>
  );
}