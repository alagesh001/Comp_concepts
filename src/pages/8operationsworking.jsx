import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    code: "int a = 10;",
    stack: [
      { name: "a", value: 10 }
    ],
    cpu: "",
    explanation:
      "Variable a is stored in memory."
  },

  {
    code: "int b = 20;",
    stack: [
      { name: "a", value: 10 },
      { name: "b", value: 20 }
    ],
    cpu: "",
    explanation:
      "Variable b is stored in memory."
  },

  {
    code: "a + b",
    stack: [
      { name: "a", value: 10 },
      { name: "b", value: 20 }
    ],
    cpu: "10 + 20",
    explanation:
      "The CPU fetches values from memory."
  },

  {
    code: "10 + 20",
    stack: [
      { name: "a", value: 10 },
      { name: "b", value: 20 }
    ],
    cpu: "30",
    explanation:
      "The CPU calculates the result."
  },

  {
    code: "int c = 30;",
    stack: [
      { name: "a", value: 10 },
      { name: "b", value: 20 },
      { name: "c", value: 30 }
    ],
    cpu: "",
    explanation:
      "The result is stored in c."
  }
];

export default function OperationMemoryVisualizer() {
  const [step, setStep] = useState(0);

  const current = steps[step];

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        How Operations Are Performed
      </h1>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono mb-8">
        {current.code}
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Memory */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Stack Memory
          </h2>

          <AnimatePresence>
            {current.stack.map((v) => (
              <motion.div
                key={v.name}
                layout
                initial={{
                  x: -50,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                className="bg-blue-500 text-white p-4 rounded-xl mb-3"
              >
                {v.name} = {v.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CPU */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            CPU
          </h2>

          <motion.div
            key={current.cpu}
            initial={{
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className="bg-orange-500 text-white text-4xl text-center p-10 rounded-xl"
          >
            {current.cpu || "Idle"}
          </motion.div>
        </div>

      </div>

      {/* Explanation */}
      <div className="mt-8 bg-yellow-100 p-5 rounded-xl border-l-8 border-yellow-500">
        {current.explanation}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="bg-gray-600 text-white px-5 py-2 rounded"
        >
          Previous
        </button>

        <button
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}