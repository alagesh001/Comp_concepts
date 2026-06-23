import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    code: "int age = 25;",
    explanation:
      "Primitive values are stored directly inside the stack frame.",
    stack: [
      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" }
        ]
      }
    ],
    heap: []
  },

  {
    code: "Integer score = new Integer(90);",
    explanation:
      "Objects live in heap memory. Stack stores only the reference.",
    stack: [
      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" },
          { name: "score", value: "0x101", type: "reference" }
        ]
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Integer(90)"
      }
    ]
  },

  {
    code: 'String name = "John";',
    explanation:
      "Strings are objects and are stored separately in memory.",
    stack: [
      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" },
          { name: "score", value: "0x101", type: "reference" },
          { name: "name", value: "0x201", type: "reference" }
        ]
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Integer(90)"
      },
      {
        address: "0x201",
        value: '"John"'
      }
    ]
  },

  {
    code: "greet();",
    explanation:
      "Calling a method pushes a new stack frame.",
    stack: [
      {
        frame: "greet()",
        variables: [
          {
            name: "message",
            value: "0x301",
            type: "reference"
          }
        ]
      },

      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" },
          { name: "score", value: "0x101", type: "reference" },
          { name: "name", value: "0x201", type: "reference" }
        ]
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Integer(90)"
      },
      {
        address: "0x201",
        value: '"John"'
      },
      {
        address: "0x301",
        value: '"Hello"'
      }
    ]
  },

  {
    code: "return;",
    explanation:
      "The greet() frame disappears after the method returns.",
    stack: [
      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" },
          { name: "score", value: "0x101", type: "reference" },
          { name: "name", value: "0x201", type: "reference" }
        ]
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Integer(90)"
      },
      {
        address: "0x201",
        value: '"John"'
      },
      {
        address: "0x301",
        value: '"Hello"'
      }
    ]
  },

  {
    code: "GC",
    explanation:
      "Garbage collection removes unreachable objects.",
    stack: [
      {
        frame: "main()",
        variables: [
          { name: "age", value: "25", type: "primitive" },
          { name: "score", value: "0x101", type: "reference" },
          { name: "name", value: "0x201", type: "reference" }
        ]
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Integer(90)"
      },
      {
        address: "0x201",
        value: '"John"'
      }
    ]
  }
];

export default function StackHeapExplain() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const current = steps[step];

  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setStep((prev) => {
        if (prev === steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(id);
  }, [playing]);

  const variableColor = (type) => {
    if (type === "primitive")
      return "bg-green-500";

    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Java Memory Visualizer
      </h1>

      {/* CODE */}
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-6"
      >
        {current.code}
      </motion.div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() =>
            setStep(Math.max(0, step - 1))
          }
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Previous
        </button>

        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {playing ? "Pause" : "Auto Play"}
        </button>

        <button
          onClick={() =>
            setStep(
              Math.min(
                steps.length - 1,
                step + 1
              )
            )
          }
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Next
        </button>
      </div>

      {/* STACK + HEAP */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* STACK */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Stack Memory
          </h2>

          <AnimatePresence>
            {current.stack.map((frame) => (
              <motion.div
                key={frame.frame}
                initial={{
                  y: -50,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                exit={{
                  opacity: 0,
                  y: 50
                }}
                className="mb-5 border-4 border-orange-400 rounded-xl p-4 bg-orange-50"
              >
                <div className="font-bold mb-3">
                  {frame.frame}
                </div>

                {frame.variables.map((v) => (
                  <motion.div
                    key={v.name}
                    layout
                    className={`${variableColor(
                      v.type
                    )} text-white p-2 rounded mb-2`}
                  >
                    {v.name} = {v.value}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* HEAP */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">
            Heap Memory
          </h2>

          <AnimatePresence>
            {current.heap.map((obj) => (
              <motion.div
                key={obj.address}
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
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  type: "spring"
                }}
                className="bg-purple-500 text-white p-4 rounded-xl mb-4"
              >
                <div className="font-bold">
                  {obj.address}
                </div>

                <div>{obj.value}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-8 flex justify-center gap-2 flex-wrap">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${
              index === step
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* EXPLANATION */}
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
        className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl"
      >
        {current.explanation}
      </motion.div>
    </div>
  );
}