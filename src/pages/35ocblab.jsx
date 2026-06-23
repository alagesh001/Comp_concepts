import { useState } from "react";
import {
  RotateCcw,
  Plus,
  Wrench,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function OCPLab() {
  const [triangleRequest, setTriangleRequest] =
    useState(false);

  const [ocpApplied, setOcpApplied] =
    useState(false);

  const reset = () => {
    setTriangleRequest(false);
    setOcpApplied(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Open Closed Principle
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Software should be open for extension but
          closed for modification.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() =>
            setTriangleRequest(true)
          }
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <AlertTriangle />
          Client Wants Triangle
        </button>

        <button
          onClick={() =>
            setOcpApplied(true)
          }
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Wrench />
          Apply OCP
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

      {!ocpApplied && (
        <div className="bg-red-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            Bad Design
          </h2>

          <div
            className={`
              max-w-3xl mx-auto p-8 rounded-2xl shadow-lg transition-all duration-700
              ${
                triangleRequest
                  ? "bg-red-300 animate-bounce scale-105 ring-4 ring-red-600"
                  : "bg-red-100"
              }
            `}
          >
            <h3 className="text-2xl font-bold mb-5">
              AreaCalculator
            </h3>

            <div className="space-y-3 font-mono text-lg">

              <div>
                if(shape == Circle)
              </div>

              <div>
                if(shape == Rectangle)
              </div>

              {triangleRequest && (
                <div className="text-red-700 font-bold animate-pulse">
                  if(shape == Triangle)
                </div>
              )}
            </div>

            {triangleRequest && (
              <div className="mt-6 text-center text-red-700 font-bold text-xl animate-pulse">
                Existing class modified ❌
              </div>
            )}
          </div>

          {triangleRequest && (
            <div className="mt-8 bg-red-200 p-5 rounded-xl text-center text-xl font-bold">
              New feature caused old code to change.
            </div>
          )}
        </div>
      )}

      {/* GOOD DESIGN */}

      {ocpApplied && (
        <div className="bg-green-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            OCP Applied
          </h2>

          <div className="flex flex-col items-center gap-6">

            <div className="bg-blue-200 p-6 rounded-2xl shadow hover:scale-105 transition">
              <h3 className="text-2xl font-bold">
                Shape
              </h3>

              <div className="mt-2">
                area()
              </div>
            </div>

            <div className="text-4xl animate-bounce">
              ↓
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-yellow-200 p-6 rounded-2xl shadow hover:scale-110 transition">
                <h3 className="font-bold text-xl">
                  Circle
                </h3>

                <div className="mt-3">
                  area()
                </div>
              </div>

              <div className="bg-purple-200 p-6 rounded-2xl shadow hover:scale-110 transition">
                <h3 className="font-bold text-xl">
                  Rectangle
                </h3>

                <div className="mt-3">
                  area()
                </div>
              </div>

              <div
                className={`
                  p-6 rounded-2xl shadow transition-all duration-700
                  ${
                    triangleRequest
                      ? "bg-green-300 scale-110 animate-pulse"
                      : "bg-green-200"
                  }
                `}
              >
                <h3 className="font-bold text-xl">
                  Triangle
                </h3>

                <div className="mt-3">
                  area()
                </div>
              </div>
            </div>

            <div className="text-green-700 text-2xl font-bold animate-pulse">
              New class added ✅
            </div>

            <div className="text-xl">
              Existing code unchanged.
            </div>
          </div>
        </div>
      )}

      {/* Bad Code */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Bad Code
          </h2>

          <pre>{`class AreaCalculator {

    calculate(shape){

        if(shape=="Circle")
            ...

        if(shape=="Rectangle")
            ...

        // Add Triangle here
    }
}`}</pre>
        </div>

        {/* Good Code */}

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Good Code
          </h2>

          <pre>{`interface Shape {
    area();
}

class Circle
    implements Shape {}

class Rectangle
    implements Shape {}

class Triangle
    implements Shape {}`}</pre>
        </div>
      </div>

      {/* Visual Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without OCP
          </h2>

          <div className="space-y-3 text-lg">

            <div>
              ❌ Modify existing code
            </div>

            <div>
              ❌ Risk bugs
            </div>

            <div>
              ❌ Hard to maintain
            </div>

            <div>
              ❌ Large if-else chains
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With OCP
          </h2>

          <div className="space-y-3 text-lg">

            <div>
              ✅ Add new classes
            </div>

            <div>
              ✅ Existing code safe
            </div>

            <div>
              ✅ Easy maintenance
            </div>

            <div>
              ✅ Easy extension
            </div>
          </div>
        </div>
      </div>

      {/* Maintainability */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Maintainability
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">

          <div
            className={`
              h-8 transition-all duration-1000
              ${
                ocpApplied
                  ? "bg-green-500 w-[90%]"
                  : triangleRequest
                  ? "bg-red-500 w-[25%]"
                  : "bg-yellow-500 w-[60%]"
              }
            `}
          />
        </div>

        <div className="text-center mt-4 text-xl font-bold">

          {!triangleRequest &&
            !ocpApplied &&
            "Average"}

          {triangleRequest &&
            !ocpApplied &&
            "Poor ❌"}

          {ocpApplied &&
            "Excellent ✅"}
        </div>
      </div>

    </div>
  );
}