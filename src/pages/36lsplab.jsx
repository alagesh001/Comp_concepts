import { useState } from "react";
import {
  RotateCcw,
  Play,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function LSPLab() {
  const [penguinUsed, setPenguinUsed] =
    useState(false);

  const [fixed, setFixed] =
    useState(false);

  const reset = () => {
    setPenguinUsed(false);
    setFixed(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Liskov Substitution Principle
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Child classes should replace parent classes
          without breaking the application.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() => setPenguinUsed(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Play />
          Use Penguin
        </button>

        <button
          onClick={() => setFixed(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <CheckCircle />
          Apply LSP
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* BAD DESIGN */}

      {!fixed && (
        <div className="bg-red-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            Bad Design
          </h2>

          <div className="flex flex-col items-center gap-5">

            <div className="bg-blue-200 p-6 rounded-2xl shadow w-72 text-center">
              <h3 className="text-2xl font-bold">
                Bird
              </h3>

              <div className="mt-3">
                fly()
              </div>
            </div>

            <div className="text-5xl animate-bounce">
              ↓
            </div>

            <div
              className={`
                w-72 p-6 rounded-2xl shadow text-center transition-all duration-700
                ${
                  penguinUsed
                    ? "bg-red-300 scale-110 animate-bounce ring-4 ring-red-600"
                    : "bg-red-200"
                }
              `}
            >
              <h3 className="text-2xl font-bold">
                Penguin
              </h3>

              <div className="mt-3">
                fly()
              </div>

              {penguinUsed && (
                <div className="mt-5 text-red-700 font-bold animate-pulse">
                  ❌ Penguin cannot fly!
                </div>
              )}
            </div>
          </div>

          {penguinUsed && (
            <div className="mt-8 bg-red-200 p-5 rounded-xl text-center text-xl font-bold">
              Parent behavior broken.
            </div>
          )}
        </div>
      )}

      {/* GOOD DESIGN */}

      {fixed && (
        <div className="bg-green-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            LSP Applied
          </h2>

          <div className="flex flex-col items-center gap-6">

            <div className="bg-blue-200 p-6 rounded-2xl shadow w-72 text-center">
              <h3 className="text-2xl font-bold">
                Bird
              </h3>
            </div>

            <div className="text-5xl animate-bounce">
              ↓
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-200 p-6 rounded-2xl shadow hover:scale-105 transition">
                <h3 className="text-xl font-bold">
                  FlyingBird
                </h3>

                <div className="mt-3">
                  fly()
                </div>
              </div>

              <div className="bg-blue-200 p-6 rounded-2xl shadow hover:scale-105 transition">
                <h3 className="text-xl font-bold">
                  Penguin
                </h3>

                <div className="mt-3">
                  swim()
                </div>
              </div>
            </div>

            <div className="text-green-700 text-2xl font-bold animate-pulse">
              Penguin no longer forced to fly.
            </div>
          </div>
        </div>
      )}

      {/* Code Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Bad Code
          </h2>

          <pre>{`class Bird {
    void fly() {}
}

class Penguin
    extends Bird {

    void fly() {
        throw Error();
    }
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Good Code
          </h2>

          <pre>{`class Bird {}

class FlyingBird
    extends Bird {

    void fly(){}
}

class Penguin
    extends Bird {

    void swim(){}
}`}</pre>
        </div>
      </div>

      {/* Java Example */}

      <div className="bg-yellow-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Problem
        </h2>

        <pre>{`Bird bird = new Penguin();

bird.fly(); // ❌`}</pre>
      </div>

      <div className="bg-green-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Correct Design
        </h2>

        <pre>{`Bird bird = new Penguin();

bird.swim(); // ✅`}</pre>
      </div>

      {/* Effects */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without LSP
          </h2>

          <div className="space-y-3 text-lg">
            <div>❌ Runtime failures</div>
            <div>❌ Unexpected behavior</div>
            <div>❌ Broken inheritance</div>
            <div>❌ Parent contract violated</div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With LSP
          </h2>

          <div className="space-y-3 text-lg">
            <div>✅ Safe substitution</div>
            <div>✅ Correct inheritance</div>
            <div>✅ Reliable behavior</div>
            <div>✅ Better design</div>
          </div>
        </div>
      </div>

      {/* Maintainability */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Reliability Meter
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">

          <div
            className={`
              h-8 transition-all duration-1000
              ${
                fixed
                  ? "bg-green-500 w-[90%]"
                  : penguinUsed
                  ? "bg-red-500 w-[20%]"
                  : "bg-yellow-500 w-[60%]"
              }
            `}
          />
        </div>

        <div className="text-center mt-4 text-xl font-bold">
          {!penguinUsed &&
            !fixed &&
            "Average"}

          {penguinUsed &&
            !fixed &&
            "Broken ❌"}

          {fixed &&
            "Excellent ✅"}
        </div>
      </div>
    </div>
  );
}