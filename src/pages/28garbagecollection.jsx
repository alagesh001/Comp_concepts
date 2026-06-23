import { useState } from "react";
import {
  Trash2,
  Plus,
  RotateCcw,
  ScanSearch,
} from "lucide-react";

export default function GarbageCollectorSimulator() {
  const [objects, setObjects] = useState([]);
  const [counter, setCounter] = useState(1);
  const [gcRunning, setGcRunning] = useState(false);

  const createObject = () => {
    setObjects([
      ...objects,
      {
        id: counter,
        referenced: true,
        collecting: false,
      },
    ]);

    setCounter(counter + 1);
  };

  const removeReference = (id) => {
    setObjects(
      objects.map((obj) =>
        obj.id === id
          ? { ...obj, referenced: false }
          : obj
      )
    );
  };

  const runGC = () => {
    const hasGarbage = objects.some(
      (obj) => !obj.referenced
    );

    if (!hasGarbage) return;

    setGcRunning(true);

    // Start animation
    setObjects((prev) =>
      prev.map((obj) =>
        !obj.referenced
          ? { ...obj, collecting: true }
          : obj
      )
    );

    // Remove after animation
    setTimeout(() => {
      setObjects((prev) =>
        prev.filter((obj) => obj.referenced)
      );

      setGcRunning(false);
    }, 1800);
  };

  const reset = () => {
    setObjects([]);
    setCounter(1);
    setGcRunning(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Garbage Collection Simulator
      </h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={createObject}
          className="bg-green-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus />
          Create Object
        </button>

        <button
          onClick={runGC}
          className="bg-purple-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <ScanSearch />
          Run Garbage Collector
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* GC Robot */}
      {gcRunning && (
        <div className="text-center text-4xl animate-bounce">
          🤖 Garbage Collector Running...
        </div>
      )}

      {/* Stack Memory */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Stack Memory (References)
        </h2>

        <div className="space-y-3">
          {objects.map((obj) =>
            obj.referenced ? (
              <div
                key={obj.id}
                className="bg-blue-200 p-4 rounded-xl flex justify-between items-center"
              >
                <span className="font-semibold">
                  obj{obj.id}
                </span>

                <button
                  onClick={() =>
                    removeReference(obj.id)
                  }
                  className="text-red-600 flex gap-2 items-center"
                >
                  <Trash2 size={18} />
                  obj{obj.id} = null
                </button>
              </div>
            ) : null
          )}

          {objects.length > 0 &&
            objects.every(
              (obj) => !obj.referenced
            ) && (
              <div className="text-red-600 font-semibold">
                No references remaining.
              </div>
            )}
        </div>
      </div>

      {/* Heap Memory */}
      <div className="bg-green-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Heap Memory (Objects)
        </h2>

        {objects.length === 0 && (
          <div className="text-gray-500">
            Heap is empty.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`
                p-5 rounded-xl text-center shadow
                transition-all duration-[1800ms]
                ${
                  obj.collecting
                    ? "bg-red-300 opacity-0 scale-50 rotate-12"
                    : obj.referenced
                    ? "bg-green-200"
                    : "bg-yellow-200"
                }
              `}
            >
              <div className="text-2xl mb-2">
                📦
              </div>

              <div className="font-bold text-lg">
                Object {obj.id}
              </div>

              {obj.referenced && (
                <div className="mt-3 text-green-700 font-semibold">
                  Reachable
                </div>
              )}

              {!obj.referenced &&
                !obj.collecting && (
                  <div className="mt-3 text-yellow-700 font-semibold">
                    Eligible for GC
                  </div>
                )}

              {obj.collecting && (
                <div className="mt-3 text-red-700 font-bold animate-pulse">
                  Collecting...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Java Example */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
        <pre>{`Student s = new Student();

s = null;      // Remove reference

System.gc();   // JVM may run GC
`}</pre>
      </div>

      {/* Lifecycle */}
      <div className="bg-yellow-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Object Lifecycle
        </h2>

        <div className="text-center text-xl space-y-2">
          <div>Create Object</div>

          <div className="text-3xl">↓</div>

          <div>Reference Exists</div>

          <div className="text-3xl">↓</div>

          <div>Reference Removed</div>

          <div className="text-3xl">↓</div>

          <div>Eligible for GC</div>

          <div className="text-3xl">↓</div>

          <div>Garbage Collector Runs</div>

          <div className="text-3xl">↓</div>

          <div className="text-green-700 font-bold">
            Object Removed
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Important Concept
        </h2>

        <div className="space-y-3 text-lg">
          <div>
            ❌ Java does not delete objects immediately.
          </div>

          <div>
            ✅ References are removed first.
          </div>

          <div>
            ✅ Unreachable objects become eligible for GC.
          </div>

          <div>
            ✅ Garbage Collector removes them later.
          </div>
        </div>
      </div>
    </div>
  );
}