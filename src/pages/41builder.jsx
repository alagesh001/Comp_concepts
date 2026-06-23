import { useState } from "react";
import {
  Hammer,
  CheckCircle,
  RotateCcw,
  Plus,
} from "lucide-react";

export default function BuilderLab() {
  const [engine, setEngine] = useState(null);
  const [color, setColor] = useState(null);
  const [sunroof, setSunroof] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [built, setBuilt] = useState(false);

  const reset = () => {
    setEngine(null);
    setColor(null);
    setSunroof(false);
    setAutomatic(false);
    setBuilt(false);
  };

  const canBuild =
    engine && color;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Builder Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Build complex objects step by step.
        </p>
      </div>

      {/* Constructor Problem */}

      <div className="bg-red-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Without Builder
        </h2>

        <div className="bg-gray-900 text-red-400 p-5 rounded-xl">
          <pre>{`Car car = new Car(
    "V8",
    "Red",
    true,
    true,
    "Automatic"
);`}</pre>
        </div>

        <div className="mt-4 text-red-700 font-bold">
          ❌ Hard to remember argument order.
        </div>

        <div className="text-red-700">
          ❌ Constructor becomes very large.
        </div>
      </div>

      {/* Builder Steps */}

      <div className="bg-green-50 p-6 rounded-2xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">
          Car Builder
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Engine */}

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">
              Engine
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setEngine("V6")
                }
                className={`px-4 py-2 rounded ${
                  engine === "V6"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                V6
              </button>

              <button
                onClick={() =>
                  setEngine("V8")
                }
                className={`px-4 py-2 rounded ${
                  engine === "V8"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                V8
              </button>

              <button
                onClick={() =>
                  setEngine("Electric")
                }
                className={`px-4 py-2 rounded ${
                  engine === "Electric"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Electric
              </button>
            </div>
          </div>

          {/* Color */}

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">
              Color
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setColor("Red")
                }
                className={`px-4 py-2 rounded ${
                  color === "Red"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Red
              </button>

              <button
                onClick={() =>
                  setColor("Blue")
                }
                className={`px-4 py-2 rounded ${
                  color === "Blue"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Blue
              </button>

              <button
                onClick={() =>
                  setColor("Black")
                }
                className={`px-4 py-2 rounded ${
                  color === "Black"
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                Black
              </button>
            </div>
          </div>
        </div>

        {/* Options */}

        <div className="flex flex-wrap gap-6 mt-6">

          <button
            onClick={() =>
              setSunroof(!sunroof)
            }
            className={`px-5 py-3 rounded-xl ${
              sunroof
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            ☀️ Sunroof
          </button>

          <button
            onClick={() =>
              setAutomatic(!automatic)
            }
            className={`px-5 py-3 rounded-xl ${
              automatic
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            ⚙️ Automatic
          </button>
        </div>

        {/* Build */}

        <div className="flex justify-center mt-8">

          <button
            disabled={!canBuild}
            onClick={() =>
              setBuilt(true)
            }
            className={`px-8 py-4 rounded-xl text-white flex gap-2 text-lg
              ${
                canBuild
                  ? "bg-green-600 hover:scale-105"
                  : "bg-gray-400"
              }
              transition
            `}
          >
            <Hammer />
            Build Car
          </button>
        </div>
      </div>

      {/* Builder Chain */}

      <div className="bg-yellow-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Builder Chain
        </h2>

        <div className="space-y-2 font-mono text-lg">

          {engine && (
            <div>
              ✔ setEngine("{engine}")
            </div>
          )}

          {color && (
            <div>
              ✔ setColor("{color}")
            </div>
          )}

          {sunroof && (
            <div>
              ✔ setSunroof(true)
            </div>
          )}

          {automatic && (
            <div>
              ✔ setAutomatic(true)
            </div>
          )}

          {built && (
            <div className="text-green-700 font-bold">
              ✔ build()
            </div>
          )}
        </div>
      </div>

      {/* Heap Memory */}

      <div className="bg-purple-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Heap Memory
        </h2>

        {!built && (
          <div className="text-gray-500">
            No Car object created yet.
          </div>
        )}

        {built && (
          <div className="flex justify-center">

            <div
              className={`
                p-8 rounded-2xl shadow-lg
                animate-bounce
                ${
                  color === "Red"
                    ? "bg-red-300"
                    : color === "Blue"
                    ? "bg-blue-300"
                    : "bg-gray-400"
                }
              `}
            >
              <div className="text-5xl text-center">
                🚗
              </div>

              <div className="font-bold text-xl mt-4">
                Car Object
              </div>

              <div className="mt-3">
                Engine: {engine}
              </div>

              <div>
                Color: {color}
              </div>

              <div>
                Sunroof:{" "}
                {sunroof ? "Yes" : "No"}
              </div>

              <div>
                Automatic:{" "}
                {automatic ? "Yes" : "No"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Java Builder */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-5">
          Java Builder
        </h2>

        <pre>{`Car car =
    new CarBuilder()

        .setEngine("${engine || "V8"}")

        .setColor("${color || "Red"}")

        .setSunroof(${sunroof})

        .setAutomatic(${automatic})

        .build();`}</pre>
      </div>

      {/* Actual Builder */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-5">
          Builder Class
        </h2>

        <pre>{`class CarBuilder {

    setEngine(){}

    setColor(){}

    setSunroof(){}

    setAutomatic(){}

    Car build() {
        return new Car(...);
    }
}`}</pre>
      </div>

      {/* Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without Builder
          </h2>

          <div className="space-y-3">
            <div>
              ❌ Large constructors
            </div>

            <div>
              ❌ Hard to read
            </div>

            <div>
              ❌ Argument order matters
            </div>

            <div>
              ❌ Difficult maintenance
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With Builder
          </h2>

          <div className="space-y-3">
            <div>
              ✅ Step-by-step creation
            </div>

            <div>
              ✅ Readable code
            </div>

            <div>
              ✅ Optional fields
            </div>

            <div>
              ✅ Flexible objects
            </div>
          </div>
        </div>
      </div>

      {/* Result */}

      {built && (
        <div className="bg-green-200 p-6 rounded-2xl text-center text-2xl font-bold animate-pulse">
          <CheckCircle
            className="mx-auto mb-3"
            size={40}
          />
          Car successfully built.
        </div>
      )}

      {/* Reset */}

      <div className="flex justify-center">
        <button
          onClick={reset}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>
    </div>
  );
}