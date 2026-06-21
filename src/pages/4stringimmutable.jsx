import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Create String",
    code: 'String name = "John";',
    explanation:
      "The variable points to a String object containing 'John'.",

    stack: [
      {
        name: "name",
        address: "0x101"
      }
    ],

    heap: [
      {
        address: "0x101",
        value: '"John"'
      }
    ]
  },

  {
    title: "Assign New Value",
    code: 'name = "Mike";',
    explanation:
      "The original String does not change. A new String object is created.",

    stack: [
      {
        name: "name",
        address: "0x201"
      }
    ],

    heap: [
      {
        address: "0x101",
        value: '"John"'
      },
      {
        address: "0x201",
        value: '"Mike"'
      }
    ]
  },

  {
    title: "Concatenation",
    code: 'name = name + " Smith";',
    explanation:
      "Concatenation creates another String object instead of modifying the existing one.",

    stack: [
      {
        name: "name",
        address: "0x301"
      }
    ],

    heap: [
      {
        address: "0x101",
        value: '"John"'
      },
      {
        address: "0x201",
        value: '"Mike"'
      },
      {
        address: "0x301",
        value: '"Mike Smith"'
      }
    ]
  },

  {
    title: "Garbage Collection",
    code: "// old strings become unreachable",
    explanation:
      "The old String objects may later be removed by the garbage collector.",

    stack: [
      {
        name: "name",
        address: "0x301"
      }
    ],

    heap: [
      {
        address: "0x301",
        value: '"Mike Smith"'
      }
    ]
  }
];

export default function StringImmutabilityVisualizer() {
  const [step, setStep] = useState(0);

  const current = steps[step];

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Why Strings Are Immutable
      </h1>

      {/* Code */}
      <motion.div
        key={current.code}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-6 whitespace-pre"
      >
        {current.code}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Stack */}
        <div className="bg-blue-50 rounded-2xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Stack
          </h2>

          <AnimatePresence>
            {current.stack.map((variable) => (
              <motion.div
                key={variable.name + variable.address}
                initial={{
                  x: -50,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="bg-blue-600 text-white p-4 rounded-xl mb-3"
              >
                {variable.name} → {variable.address}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Heap */}
        <div className="bg-purple-50 rounded-2xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">
            Heap (String Objects)
          </h2>

          <AnimatePresence>
            {current.heap.map((str) => (
              <motion.div
                key={str.address}
                layout
                initial={{
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0
                }}
                transition={{
                  type: "spring"
                }}
                className="bg-purple-600 text-white p-4 rounded-xl mb-3"
              >
                <div className="font-bold">
                  {str.address}
                </div>

                <div>{str.value}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Explanation */}
      <motion.div
        key={current.explanation}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mt-6 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl"
      >
        {current.explanation}
      </motion.div>

      {/* Timeline */}
      <div className="flex justify-center gap-3 mt-8">
        {steps.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setStep(index)}
            className={`w-12 h-12 rounded-full font-bold ${
              step === index
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}