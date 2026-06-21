import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
  {
    title: "Boolean",
    code: "boolean isLoggedIn = true;",
    explanation:
      "A boolean stores either true or false directly inside the stack.",
    stack: [
      {
        name: "isLoggedIn",
        value: "true",
        color: "bg-green-500"
      }
    ],
    heap: []
  },

  {
    title: "Object",
    code: "Person p = new Person();",
    explanation:
      "Objects live in the heap. The variable stores only a reference.",
    stack: [
      {
        name: "p",
        value: "0x101",
        color: "bg-blue-500"
      }
    ],
    heap: [
      {
        address: "0x101",
        value: "Person {}"
      }
    ]
  },

  {
    title: "Array",
    code: "int[] nums = {1,2,3};",
    explanation:
      "Arrays are objects and are stored in heap memory.",
    stack: [
      {
        name: "nums",
        value: "0x201",
        color: "bg-blue-500"
      }
    ],
    heap: [
      {
        address: "0x201",
        value: "[1, 2, 3]"
      }
    ]
  },

  {
    title: "Copy Primitive",
    code: `
int a = 10;
int b = a;
`,
    explanation:
      "Primitive values are copied. Changing b does not affect a.",
    stack: [
      {
        name: "a",
        value: "10",
        color: "bg-green-500"
      },
      {
        name: "b",
        value: "10",
        color: "bg-green-500"
      }
    ],
    heap: []
  },

  {
    title: "Copy Object",
    code: `
Person p1 = new Person();
Person p2 = p1;
`,
    explanation:
      "Object variables copy the reference, not the object.",
    stack: [
      {
        name: "p1",
        value: "0x301",
        color: "bg-blue-500"
      },
      {
        name: "p2",
        value: "0x301",
        color: "bg-blue-500"
      }
    ],
    heap: [
      {
        address: "0x301",
        value: "Person {}"
      }
    ]
  },

  {
    title: "Mutation",
    code: `
p1.name = "John";
`,
    explanation:
      "Both references see the change because they point to the same object.",
    stack: [
      {
        name: "p1",
        value: "0x301",
        color: "bg-blue-500"
      },
      {
        name: "p2",
        value: "0x301",
        color: "bg-blue-500"
      }
    ],
    heap: [
      {
        address: "0x301",
        value: 'Person { name: "John" }'
      }
    ]
  },

  {
    title: "Equality",
    code: `
a == b
p1 == p2
`,
    explanation:
      "Primitive equality compares values. Object equality compares references.",
    stack: [
      {
        name: "a",
        value: "10",
        color: "bg-green-500"
      },
      {
        name: "b",
        value: "10",
        color: "bg-green-500"
      },
      {
        name: "p1",
        value: "0x301",
        color: "bg-blue-500"
      },
      {
        name: "p2",
        value: "0x301",
        color: "bg-blue-500"
      }
    ],
    heap: [
      {
        address: "0x301",
        value: "Person {}"
      }
    ]
  }
];

export default function MemoryConceptVisualizer() {
  const [index, setIndex] = useState(0);

  const current = examples[index];

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Memory Concepts Visualizer
      </h1>

      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {examples.map((item, i) => (
          <button
            key={item.title}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded-lg ${
              i === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <motion.div
        key={current.code}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono mb-6 whitespace-pre"
      >
        {current.code}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Stack */}
        <div className="bg-blue-50 rounded-xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Stack
          </h2>

          <AnimatePresence>
            {current.stack.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{
                  y: 30,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                className={`${item.color} text-white p-3 rounded-lg mb-3`}
              >
                {item.name} = {item.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Heap */}
        <div className="bg-purple-50 rounded-xl p-5 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Heap
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
                className="bg-purple-600 text-white p-4 rounded-lg mb-3"
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
        className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded-xl"
      >
        {current.explanation}
      </motion.div>
    </div>
  );
}