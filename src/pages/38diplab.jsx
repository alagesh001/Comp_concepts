import { useState } from "react";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Wrench,
  ArrowDown,
} from "lucide-react";

export default function DIPLab() {
  const [changeEngine, setChangeEngine] =
    useState(false);

  const [fixed, setFixed] =
    useState(false);

  const reset = () => {
    setChangeEngine(false);
    setFixed(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Dependency Inversion Principle
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Depend on abstractions, not concrete classes.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() => setChangeEngine(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <AlertTriangle />
          Switch to Electric
        </button>

        <button
          onClick={() => setFixed(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Wrench />
          Apply DIP
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
            Tight Coupling
          </h2>

          <div className="flex flex-col items-center gap-5">

            <div
              className={`
                w-72 p-6 rounded-2xl shadow text-center transition-all duration-700
                ${
                  changeEngine
                    ? "bg-red-300 animate-bounce scale-110 ring-4 ring-red-500"
                    : "bg-blue-200"
                }
              `}
            >
              <h3 className="text-2xl font-bold">
                Car
              </h3>

              <div className="mt-3">
                uses DieselEngine
              </div>
            </div>

            <ArrowDown size={40} />

            <div className="bg-yellow-200 p-6 rounded-2xl shadow w-72 text-center">
              <h3 className="text-2xl font-bold">
                DieselEngine
              </h3>
            </div>
          </div>

          {changeEngine && (
            <div className="mt-8 bg-red-200 p-5 rounded-xl text-center text-xl font-bold animate-pulse">
              Client wants Electric Engine.
              <br />
              Car class must change ❌
            </div>
          )}
        </div>
      )}

      {/* GOOD DESIGN */}

      {fixed && (
        <div className="bg-green-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            DIP Applied
          </h2>

          <div className="flex flex-col items-center gap-5">

            <div className="bg-blue-200 p-6 rounded-2xl shadow w-72 text-center">
              <h3 className="text-2xl font-bold">
                Car
              </h3>
            </div>

            <ArrowDown size={40} />

            <div className="bg-purple-200 p-6 rounded-2xl shadow w-72 text-center">
              <h3 className="text-2xl font-bold">
                Engine
              </h3>
            </div>

            <ArrowDown size={40} />

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-yellow-200 p-6 rounded-2xl shadow hover:scale-105 transition">
                <h3 className="text-xl font-bold">
                  DieselEngine
                </h3>
              </div>

              <div
                className={`
                  p-6 rounded-2xl shadow transition-all duration-700
                  ${
                    changeEngine
                      ? "bg-green-300 scale-110 animate-pulse"
                      : "bg-green-200"
                  }
                `}
              >
                <h3 className="text-xl font-bold">
                  ElectricEngine
                </h3>
              </div>
            </div>

            <div className="text-green-700 text-2xl font-bold animate-pulse">
              Car remains unchanged ✅
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

          <pre>{`class DieselEngine {}

class Car {

    DieselEngine engine =
        new DieselEngine();
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Good Code
          </h2>

          <pre>{`interface Engine {}

class DieselEngine
implements Engine {}

class ElectricEngine
implements Engine {}

class Car {

    Engine engine;
}`}</pre>
        </div>
      </div>

      {/* Injection Example */}

      <div className="bg-yellow-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Dependency Injection
        </h2>

        <pre>{`Engine engine =
    new ElectricEngine();

Car car =
    new Car(engine);`}</pre>
      </div>

      {/* Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without DIP
          </h2>

          <div className="space-y-3 text-lg">
            <div>❌ Tight coupling</div>
            <div>❌ Difficult changes</div>
            <div>❌ Hard testing</div>
            <div>❌ Low flexibility</div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With DIP
          </h2>

          <div className="space-y-3 text-lg">
            <div>✅ Loose coupling</div>
            <div>✅ Easy replacement</div>
            <div>✅ Better testing</div>
            <div>✅ High flexibility</div>
          </div>
        </div>
      </div>

      {/* Flexibility Meter */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Flexibility
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">

          <div
            className={`
              h-8 transition-all duration-1000
              ${
                fixed
                  ? "bg-green-500 w-[90%]"
                  : changeEngine
                  ? "bg-red-500 w-[20%]"
                  : "bg-yellow-500 w-[55%]"
              }
            `}
          />
        </div>

        <div className="text-center mt-4 text-xl font-bold">

          {!changeEngine &&
            !fixed &&
            "Average"}

          {changeEngine &&
            !fixed &&
            "Poor ❌"}

          {fixed &&
            "Excellent ✅"}
        </div>
      </div>

    </div>
  );
}