import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AsyncSyncVisualizer() {
  const [mode, setMode] = useState("sync");

  const [callStack, setCallStack] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [output, setOutput] = useState([]);
  const [running, setRunning] = useState(false);

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const reset = () => {
    setCallStack([]);
    setWaiting([]);
    setOutput([]);
    setRunning(false);
  };

  const runSync = async () => {
    reset();
    setRunning(true);

    setCallStack(["Tea"]);
    await sleep(1000);

    setOutput(["Tea"]);

    setCallStack(["Waiting 3s"]);
    await sleep(3000);

    setCallStack(["Coffee"]);
    await sleep(1000);

    setOutput(["Tea", "Coffee"]);

    setCallStack([]);

    setRunning(false);
  };

  const runAsync = async () => {
    reset();
    setRunning(true);

    setCallStack(["Tea"]);
    await sleep(1000);

    setOutput(["Tea"]);

    setWaiting(["Coffee (3s timer)"]);

    setCallStack(["Milk"]);
    await sleep(1000);

    setOutput(["Tea", "Milk"]);

    setCallStack([]);

    await sleep(3000);

    setWaiting([]);

    setCallStack(["Coffee"]);

    await sleep(1000);

    setOutput(["Tea", "Milk", "Coffee"]);

    setCallStack([]);

    setRunning(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Synchronous vs Asynchronous
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode("sync")}
          className={`px-5 py-3 rounded-xl ${
            mode === "sync"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Synchronous
        </button>

        <button
          onClick={() => setMode("async")}
          className={`px-5 py-3 rounded-xl ${
            mode === "async"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Asynchronous
        </button>
      </div>

      <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono mb-8 whitespace-pre">
        {mode === "sync"
          ? `console.log("Tea");
wait(3000);
console.log("Coffee");`
          : `console.log("Tea");

setTimeout(() => {
  console.log("Coffee");
},3000);

console.log("Milk");`}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Call Stack */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Call Stack
          </h2>

          <AnimatePresence>
            {callStack.map((item) => (
              <motion.div
                key={item}
                initial={{
                  y: 30,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="bg-blue-500 text-white p-3 rounded mb-3"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Waiting Area */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Waiting Tasks
          </h2>

          <AnimatePresence>
            {waiting.map((item) => (
              <motion.div
                key={item}
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="bg-yellow-500 text-white p-3 rounded mb-3"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Output */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Console Output
          </h2>

          {output.map((item, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="bg-green-500 text-white p-3 rounded mb-3"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          disabled={running}
          onClick={() =>
            mode === "sync"
              ? runSync()
              : runAsync()
          }
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg disabled:opacity-50"
        >
          Run Program
        </button>
      </div>

      <div className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl">
        {mode === "sync"
          ? "Synchronous code waits for each task to finish before moving to the next."
          : "Asynchronous code can continue executing while waiting tasks run outside the call stack."}
      </div>
    </div>
  );
}