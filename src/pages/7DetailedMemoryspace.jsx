import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dataTypes = [
  {
    name: "byte",
    value: 100,
    bytes: 1,
    color: "bg-red-500",
    description: "Stores small integers.",
    memory: [
      {
        address: "1000",
        binary: "01100100"
      }
    ]
  },

  {
    name: "short",
    value: 30000,
    bytes: 2,
    color: "bg-orange-500",
    description: "Stores medium integers.",
    memory: [
      {
        address: "1000",
        binary: "01110101"
      },
      {
        address: "1001",
        binary: "00110000"
      }
    ]
  },

  {
    name: "int",
    value: 25,
    bytes: 4,
    color: "bg-green-500",
    description: "Most commonly used integer.",
    memory: [
      {
        address: "1000",
        binary: "00000000"
      },
      {
        address: "1001",
        binary: "00000000"
      },
      {
        address: "1002",
        binary: "00000000"
      },
      {
        address: "1003",
        binary: "00011001"
      }
    ]
  },

  {
    name: "long",
    value: 25,
    bytes: 8,
    color: "bg-blue-500",
    description: "Stores very large integers.",
    memory: [
      { address: "1000", binary: "00000000" },
      { address: "1001", binary: "00000000" },
      { address: "1002", binary: "00000000" },
      { address: "1003", binary: "00000000" },
      { address: "1004", binary: "00000000" },
      { address: "1005", binary: "00000000" },
      { address: "1006", binary: "00000000" },
      { address: "1007", binary: "00011001" }
    ]
  },

  {
    name: "char",
    value: "A",
    bytes: 2,
    color: "bg-cyan-500",
    description: "Stores Unicode characters.",
    memory: [
      {
        address: "1000",
        binary: "00000000"
      },
      {
        address: "1001",
        binary: "01000001"
      }
    ]
  }
];

export default function DetailedMemorySpaceVisualizer() {
  const [index, setIndex] = useState(2);

  const type = dataTypes[index];

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        How Data Occupies Memory
      </h1>

      {/* Type Selection */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {dataTypes.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setIndex(i)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              index === i
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Code */}
      <motion.div
        key={type.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8 text-xl"
      >
        {type.name} value = {type.value};
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-gray-500">
            Bytes
          </div>
          <div className="text-3xl font-bold">
            {type.bytes}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-gray-500">
            Bits
          </div>
          <div className="text-3xl font-bold">
            {type.bytes * 8}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-gray-500">
            Value
          </div>
          <div className="text-3xl font-bold">
            {type.value}
          </div>
        </div>

      </div>

      {/* Memory Usage */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Memory Used
        </h2>

        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: i < type.bytes ? 1 : 0.2
              }}
              className={`h-10 flex-1 rounded ${
                i < type.bytes
                  ? type.color
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="mt-3 text-gray-600">
          Each box represents 1 byte.
        </div>
      </div>

      {/* Memory Addresses */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Memory Addresses
        </h2>

        <AnimatePresence>
          {type.memory.map((byte, i) => (
            <motion.div
              key={byte.address}
              initial={{
                x: -50,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1
              }}
              transition={{
                delay: i * 0.1
              }}
              className="grid grid-cols-3 gap-4 mb-3 items-center"
            >
              <div className="font-mono font-bold">
                {byte.address}
              </div>

              <div
                className={`${type.color} text-white p-3 rounded text-center`}
              >
                Byte {i + 1}
              </div>

              <div className="font-mono bg-gray-100 p-3 rounded">
                {byte.binary}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      {/* Individual Bits */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Bits Inside Each Byte
        </h2>

        {type.memory.map((byte) => (
          <div key={byte.address} className="mb-6">

            <div className="font-semibold mb-2">
              Address {byte.address}
            </div>

            <div className="flex gap-1 flex-wrap">
              {byte.binary.split("").map((bit, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.2
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded text-white font-bold ${
                    bit === "1"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {bit}
                </motion.div>
              ))}
            </div>

          </div>
        ))}

      </div>

      {/* Explanation */}
      <motion.div
        key={type.name + "-explanation"}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className="bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl"
      >
        <h3 className="font-bold text-xl mb-3">
          What is happening?
        </h3>

        <p className="mb-3">
          A <strong>{type.name}</strong> variable
          occupies <strong>{type.bytes} byte(s)</strong>
          in memory.
        </p>

        <p className="mb-3">
          Each byte contains <strong>8 bits</strong>.
        </p>

        <p>
          Total storage:
          <strong>
            {" "}
            {type.bytes} × 8 = {type.bytes * 8} bits
          </strong>
        </p>
      </motion.div>

    </div>
  );
}