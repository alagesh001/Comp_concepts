import { useState } from "react";
import { motion } from "framer-motion";

const dataTypes = [
  {
    name: "byte",
    bytes: 1,
    value: 100,
    binary: ["01100100"],
    color: "bg-red-500"
  },
  {
    name: "short",
    bytes: 2,
    value: 30000,
    binary: [
      "01110101",
      "00110000"
    ],
    color: "bg-orange-500"
  },
  {
    name: "int",
    bytes: 4,
    value: 25,
    binary: [
      "00000000",
      "00000000",
      "00000000",
      "00011001"
    ],
    color: "bg-green-500"
  },
  {
    name: "long",
    bytes: 8,
    value: 25,
    binary: [
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00000000",
      "00011001"
    ],
    color: "bg-blue-500"
  },
  {
    name: "char",
    bytes: 2,
    value: "A",
    binary: [
      "00000000",
      "01000001"
    ],
    color: "bg-cyan-500"
  }
];

export default function MemorySpaceVisualizer() {
  const [index, setIndex] = useState(2);

  const type = dataTypes[index];

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        How Space Is Stored In Memory
      </h1>

      {/* Type buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {dataTypes.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded-lg ${
              index === i
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Variable */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono text-xl mb-8">
        {type.name} value = {type.value};
      </div>

      {/* Memory */}
      <div className="bg-white p-8 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Memory Boxes
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">

          {type.binary.map((byte, i) => (
            <motion.div
              key={i}
              initial={{
                y: 40,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              transition={{
                delay: i * 0.2
              }}
              className={`${type.color} text-white rounded-xl p-5 w-32 text-center`}
            >
              <div className="text-sm mb-2">
                Byte {i + 1}
              </div>

              <div className="font-mono text-sm">
                {byte}
              </div>
            </motion.div>
          ))}

        </div>

        <div className="mt-8 text-center text-2xl font-bold">
          {type.bytes} Byte
          {type.bytes > 1 && "s"}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl">
        <strong>{type.name}</strong> reserves
        {" "}
        <strong>{type.bytes} byte(s)</strong>
        {" "}
        in memory.

        <br /><br />

        Each byte contains 8 bits.

        <br /><br />

        Total bits:
        {" "}
        <strong>
          {type.bytes * 8}
        </strong>
      </div>

    </div>
  );
}