import { useState } from "react";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Wrench,
} from "lucide-react";

export default function ISPLab() {
  const [robotEat, setRobotEat] =
    useState(false);

  const [fixed, setFixed] =
    useState(false);

  const reset = () => {
    setRobotEat(false);
    setFixed(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Interface Segregation Principle
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Clients should not be forced to implement
          methods they do not use.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() => setRobotEat(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <AlertTriangle />
          Call robot.eat()
        </button>

        <button
          onClick={() => setFixed(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Wrench />
          Apply ISP
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
            Fat Interface
          </h2>

          <div className="flex flex-col items-center gap-6">

            <div
              className={`
                w-80 p-6 rounded-2xl shadow transition-all duration-700
                ${
                  robotEat
                    ? "bg-red-300 animate-bounce scale-105 ring-4 ring-red-500"
                    : "bg-red-100"
                }
              `}
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                Worker Interface
              </h3>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  work()
                </div>

                <div className="bg-white p-3 rounded">
                  eat()
                </div>

                <div className="bg-white p-3 rounded">
                  sleep()
                </div>
              </div>
            </div>

            <div className="text-5xl animate-bounce">
              ↓
            </div>

            <div
              className={`
                w-80 p-6 rounded-2xl shadow text-center transition-all duration-700
                ${
                  robotEat
                    ? "bg-red-300 animate-bounce ring-4 ring-red-600"
                    : "bg-gray-200"
                }
              `}
            >
              <h3 className="text-2xl font-bold">
                Robot
              </h3>

              <div className="mt-3">
                work() ✅
              </div>

              <div className="mt-3">
                eat() ❌
              </div>

              <div className="mt-3">
                sleep() ❌
              </div>

              {robotEat && (
                <div className="mt-5 text-red-700 font-bold animate-pulse">
                  Robot cannot eat!
                </div>
              )}
            </div>
          </div>

          {robotEat && (
            <div className="mt-8 bg-red-200 p-5 rounded-xl text-center text-xl font-bold">
              Robot forced to implement unused methods.
            </div>
          )}
        </div>
      )}

      {/* GOOD DESIGN */}

      {fixed && (
        <div className="bg-green-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold text-center mb-8">
            ISP Applied
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-200 p-6 rounded-2xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-bold">
                Workable
              </h3>

              <div className="mt-3">
                work()
              </div>
            </div>

            <div className="bg-yellow-200 p-6 rounded-2xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-bold">
                Eatable
              </h3>

              <div className="mt-3">
                eat()
              </div>
            </div>

            <div className="bg-purple-200 p-6 rounded-2xl shadow hover:scale-105 transition">
              <h3 className="text-xl font-bold">
                Sleepable
              </h3>

              <div className="mt-3">
                sleep()
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">

            <div className="bg-green-200 p-6 rounded-2xl shadow hover:scale-110 transition">
              <h3 className="text-2xl font-bold">
                Robot
              </h3>

              <div className="mt-3">
                implements Workable
              </div>

              <div className="mt-3 text-green-700 font-bold">
                Only what it needs ✅
              </div>
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

          <pre>{`interface Worker {

    void work();

    void eat();

    void sleep();
}

class Robot
implements Worker {

    work();

    eat(); // ❌

    sleep(); // ❌
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Good Code
          </h2>

          <pre>{`interface Workable {
    work();
}

interface Eatable {
    eat();
}

class Robot
implements Workable {

    work();
}`}</pre>
        </div>
      </div>

      {/* Problem */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without ISP
          </h2>

          <div className="space-y-3 text-lg">
            <div>
              ❌ Fat interfaces
            </div>

            <div>
              ❌ Unused methods
            </div>

            <div>
              ❌ Empty implementations
            </div>

            <div>
              ❌ Hard maintenance
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With ISP
          </h2>

          <div className="space-y-3 text-lg">
            <div>
              ✅ Small interfaces
            </div>

            <div>
              ✅ Flexible design
            </div>

            <div>
              ✅ Cleaner code
            </div>

            <div>
              ✅ Easier maintenance
            </div>
          </div>
        </div>
      </div>

      {/* Maintainability */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Design Quality
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">

          <div
            className={`
              h-8 transition-all duration-1000
              ${
                fixed
                  ? "bg-green-500 w-[90%]"
                  : robotEat
                  ? "bg-red-500 w-[20%]"
                  : "bg-yellow-500 w-[55%]"
              }
            `}
          />
        </div>

        <div className="text-center mt-4 text-xl font-bold">

          {!robotEat &&
            !fixed &&
            "Average"}

          {robotEat &&
            !fixed &&
            "Poor ❌"}

          {fixed &&
            "Excellent ✅"}
        </div>
      </div>

    </div>
  );
}