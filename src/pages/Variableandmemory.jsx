import { useState } from "react";

export default function VariablesMemoryDemo() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(20);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          Variables and Memory
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Variables store values inside computer memory.
        </p>

        {/* Code Section */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-lg mb-10">
          <p>let x = {x};</p>
          <p>let y = {y};</p>
        </div>

        {/* Variable to Memory */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Variable */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Variables
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded-xl">
                <h3 className="font-bold text-lg">x</h3>
                <p>Value = {x}</p>
              </div>

              <div className="bg-purple-100 border-2 border-purple-500 p-4 rounded-xl">
                <h3 className="font-bold text-lg">y</h3>
                <p>Value = {y}</p>
              </div>
            </div>
          </div>

          {/* Memory */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Computer Memory
            </h2>

            <div className="space-y-4">
              <div className="border-4 border-blue-500 rounded-xl p-4 bg-white shadow">
                <p className="text-gray-500 text-sm">
                  Address: 1001
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {x}
                </p>
              </div>

              <div className="border-4 border-purple-500 rounded-xl p-4 bg-white shadow">
                <p className="text-gray-500 text-sm">
                  Address: 1002
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {y}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Change Values
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setX(x + 1)}
              className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              x = x + 1
            </button>

            <button
              onClick={() => setY(y + 5)}
              className="px-5 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              y = y + 5
            </button>

            <button
              onClick={() => {
                setX(10);
                setY(20);
              }}
              className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-10 bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded">
          <h3 className="font-bold mb-2">What happens?</h3>
          <ul className="list-disc ml-5 space-y-2">
            <li>A variable gives a name to a memory location.</li>
            <li>The value is stored inside memory.</li>
            <li>Changing a variable updates the value in memory.</li>
            <li>Different variables usually use different memory locations.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}