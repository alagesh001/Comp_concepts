import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FunctionMachine() {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);

  const [insideFunction, setInsideFunction] =
    useState(null);

  const [result, setResult] = useState(null);

  const [running, setRunning] = useState(false);

  const sleep = (ms) =>
    new Promise((resolve) =>
      setTimeout(resolve, ms)
    );

  const runFunction = async () => {
    setRunning(true);
    setResult(null);

    // parameters receive arguments
    setInsideFunction({
      a: num1,
      b: num2,
      answer: null,
    });

    await sleep(1000);

    const sum = num1 + num2;

    setInsideFunction({
      a: num1,
      b: num2,
      answer: sum,
    });

    await sleep(1500);

    setResult(sum);

    await sleep(1000);

    setInsideFunction(null);

    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Functions Are Machines
      </h1>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8">
{`function add(a, b) {
   return a + b;
}

add(${num1}, ${num2});`}
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Arguments
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              First Number
            </label>

            <input
              type="range"
              min="0"
              max="20"
              value={num1}
              onChange={(e) =>
                setNum1(Number(e.target.value))
              }
              className="w-full"
            />

            <div className="text-3xl text-center">
              {num1}
            </div>
          </div>

          <div>
            <label className="font-semibold">
              Second Number
            </label>

            <input
              type="range"
              min="0"
              max="20"
              value={num2}
              onChange={(e) =>
                setNum2(Number(e.target.value))
              }
              className="w-full"
            />

            <div className="text-3xl text-center">
              {num2}
            </div>
          </div>

        </div>

      </div>

      {/* Function Machine */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* Arguments */}
        <div className="bg-white p-6 rounded-2xl shadow text-center">

          <h2 className="text-xl font-bold mb-4">
            Arguments
          </h2>

          <div className="bg-blue-500 text-white p-4 rounded mb-3">
            {num1}
          </div>

          <div className="bg-blue-500 text-white p-4 rounded">
            {num2}
          </div>

        </div>

        {/* Function */}
        <div className="bg-yellow-300 rounded-2xl shadow p-6 text-center">

          <div className="text-6xl mb-4">
            ⚙️
          </div>

          <h2 className="text-2xl font-bold">
            add(a,b)
          </h2>

        </div>

        {/* Return */}
        <div className="bg-white p-6 rounded-2xl shadow text-center">

          <h2 className="text-xl font-bold mb-4">
            Return Value
          </h2>

          <AnimatePresence>
            {result !== null && (
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="bg-green-500 text-white p-5 rounded text-3xl"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Stack Frame */}
      <AnimatePresence>
        {insideFunction && (
          <motion.div
            initial={{
              y: 50,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{
              y: 50,
              opacity: 0
            }}
            className="bg-white rounded-2xl shadow p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              Function Stack Frame
            </h2>

            <div className="space-y-3">

              <div className="bg-purple-100 p-4 rounded">
                a = {insideFunction.a}
              </div>

              <div className="bg-purple-100 p-4 rounded">
                b = {insideFunction.b}
              </div>

              {insideFunction.answer !== null && (
                <div className="bg-green-100 p-4 rounded">
                  return = {insideFunction.answer}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="text-center">

        <button
          disabled={running}
          onClick={runFunction}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl disabled:opacity-50"
        >
          Call Function
        </button>

      </div>

      {/* Explanation */}
      <div className="mt-10 bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl">

        <h2 className="text-xl font-bold mb-3">
          What happens?
        </h2>

        <p className="mb-2">
          Arguments ({num1}, {num2}) are passed to the function.
        </p>

        <p className="mb-2">
          Parameters a and b receive those values.
        </p>

        <p className="mb-2">
          The function performs the calculation.
        </p>

        <p>
          The result is returned to the caller.
        </p>

      </div>

    </div>
  );
}