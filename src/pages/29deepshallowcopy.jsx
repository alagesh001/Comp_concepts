import { useState } from "react";
import {
  Copy,
  RotateCcw,
  Edit3,
} from "lucide-react";

export default function DeepVsShallowVisualizer() {
  const [showShallow, setShowShallow] =
    useState(false);

  const [showDeep, setShowDeep] =
    useState(false);

  const [city, setCity] = useState("Delhi");
  const [animate, setAnimate] =
    useState(false);

  const createShallow = () => {
    setShowShallow(true);
  };

  const createDeep = () => {
    setShowDeep(true);
  };

  const changeCity = () => {
    setAnimate(true);

    setCity((prev) =>
      prev === "Delhi"
        ? "Mumbai"
        : "Delhi"
    );

    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const reset = () => {
    setShowShallow(false);
    setShowDeep(false);
    setCity("Delhi");
    setAnimate(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-4xl font-bold text-center">
        Deep Copy vs Shallow Copy
      </h1>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={createShallow}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Copy />
          Create p2Shallow
        </button>

        <button
          onClick={createDeep}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Copy />
          Create p2Deep
        </button>

        <button
          onClick={changeCity}
          className="bg-orange-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Edit3 />
          Change p1 City
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* Stack */}

      <div className="bg-blue-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-5">
          Stack Memory
        </h2>

        <div className="flex gap-6 flex-wrap">

          <div className="bg-blue-200 px-6 py-4 rounded-xl shadow font-bold">
            p1
          </div>

          {showShallow && (
            <div className="bg-yellow-200 px-6 py-4 rounded-xl shadow font-bold animate-fade-in">
              p2Shallow
            </div>
          )}

          {showDeep && (
            <div className="bg-green-200 px-6 py-4 rounded-xl shadow font-bold animate-fade-in">
              p2Deep
            </div>
          )}
        </div>
      </div>

      {/* Person Objects */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* p1 */}

        <div className="bg-blue-100 rounded-2xl p-5 shadow hover:scale-105 transition">

          <h3 className="text-xl font-bold mb-4">
            p1 Person
          </h3>

          <div className="space-y-4">

            <div className="bg-white p-3 rounded-lg">
              name → "Rahul"
            </div>

            <div className="bg-white p-3 rounded-lg flex items-center gap-2">
              address

              <div className="flex-1 h-1 bg-red-500 animate-pulse rounded"></div>

              Address A
            </div>
          </div>
        </div>

        {/* Shallow */}

        {showShallow && (
          <div className="bg-yellow-100 rounded-2xl p-5 shadow hover:scale-105 transition">

            <h3 className="text-xl font-bold mb-4">
              p2Shallow
            </h3>

            <div className="space-y-4">

              <div className="bg-white p-3 rounded-lg">
                name → "Rahul"
              </div>

              <div className="bg-red-100 p-3 rounded-lg flex items-center gap-2">
                address

                <div className="flex-1 h-1 bg-red-500 animate-pulse rounded"></div>

                Address A
              </div>
            </div>
          </div>
        )}

        {/* Deep */}

        {showDeep && (
          <div className="bg-green-100 rounded-2xl p-5 shadow hover:scale-105 transition">

            <h3 className="text-xl font-bold mb-4">
              p2Deep
            </h3>

            <div className="space-y-4">

              <div className="bg-white p-3 rounded-lg">
                name → "Rahul"
              </div>

              <div className="bg-green-100 p-3 rounded-lg flex items-center gap-2">
                address

                <div className="flex-1 h-1 bg-green-500 animate-pulse rounded"></div>

                Address B
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Objects */}

      <div className="bg-green-50 rounded-2xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-6">
          Heap Memory
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Address A */}

          <div
            className={`
              relative rounded-2xl p-6 shadow transition-all duration-700
              ${
                animate
                  ? "bg-red-300 scale-101 ring-4 ring-red-500"
                  : "bg-red-100"
              }
            `}
          >
            <div className="absolute -top-3 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm">
              Shared
            </div>

            <h3 className="text-xl font-bold mb-4">
              Address A
            </h3>

            <div
              className={`
                bg-white p-4 rounded-xl text-xl transition-all duration-700
                ${
                  animate
                    ? "scale-104 bg-orange-200"
                    : ""
                }
              `}
            >
              city → {city}
            </div>

            <div className="mt-4 text-red-700">
              Used by p1 and p2Shallow
            </div>
          </div>

          {/* Address B */}

          {showDeep && (
            <div className="relative rounded-2xl p-6 shadow bg-green-100">

              <div className="absolute -top-3 left-4 bg-green-600 text-white px-3 py-1 rounded text-sm">
                Independent
              </div>

              <h3 className="text-xl font-bold mb-4">
                Address B
              </h3>

              <div className="bg-white p-4 rounded-xl text-xl">
                city → Delhi
              </div>

              <div className="mt-4 text-green-700">
                Used only by p2Deep
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Memory Diagram */}

      <div className="bg-purple-50 rounded-2xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-5">
          Reference Diagram
        </h2>

        <div className="space-y-4 text-lg">

          <div>
            p1 ─────────► Address A
          </div>

          {showShallow && (
            <div>
              p2Shallow ─► Address A
            </div>
          )}

          {showDeep && (
            <div>
              p2Deep ─────► Address B
            </div>
          )}
        </div>
      </div>

      {/* Result */}

      <div className="bg-yellow-100 rounded-2xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-5">
          Current Result
        </h2>

        <div className="space-y-3 text-lg">

          <div>
            p1.city = {city}
          </div>

          {showShallow && (
            <div className="text-red-700">
              p2Shallow.city = {city} ❌
            </div>
          )}

          {showDeep && (
            <div className="text-green-700">
              p2Deep.city = Delhi ✅
            </div>
          )}
        </div>
      </div>

      {/* Java Code */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">

          <h3 className="text-white mb-4">
            Shallow Copy
          </h3>

          <pre>{`Person p2Shallow = p1.clone();

// Both share Address object`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">

          <h3 className="text-white mb-4">
            Deep Copy
          </h3>

          <pre>{`Person p2Deep = new Person();

p2Deep.address =
    new Address();`}</pre>
        </div>
      </div>

    </div>
  );
}