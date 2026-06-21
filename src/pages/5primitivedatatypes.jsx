import { useState } from "react";
import { motion } from "framer-motion";

const types = [
  {
    name: "byte",
    size: "1 byte (8 bits)",
    example: "byte age = 100;",
    value: "100",
    color: "bg-red-500",
    binary: "01100100",
    range: "-128 to 127",
    description: "Small integers."
  },

  {
    name: "short",
    size: "2 bytes (16 bits)",
    example: "short marks = 30000;",
    value: "30000",
    color: "bg-orange-500",
    binary: "0111010100110000",
    range: "-32,768 to 32,767",
    description: "Medium integers."
  },

  {
    name: "int",
    size: "4 bytes (32 bits)",
    example: "int salary = 50000;",
    value: "50000",
    color: "bg-green-500",
    binary: "32 bits",
    range: "-2³¹ to 2³¹-1",
    description: "Most commonly used integer."
  },

  {
    name: "long",
    size: "8 bytes (64 bits)",
    example: "long population = 8000000000L;",
    value: "8000000000",
    color: "bg-blue-500",
    binary: "64 bits",
    range: "-2⁶³ to 2⁶³-1",
    description: "Very large integers."
  },

  {
    name: "float",
    size: "4 bytes",
    example: "float pi = 3.14f;",
    value: "3.14",
    color: "bg-purple-500",
    binary: "IEEE 754",
    range: "~7 digits precision",
    description: "Single precision decimal."
  },

  {
    name: "double",
    size: "8 bytes",
    example: "double pi = 3.14159265;",
    value: "3.14159265",
    color: "bg-pink-500",
    binary: "IEEE 754",
    range: "~15 digits precision",
    description: "Double precision decimal."
  },

  {
    name: "boolean",
    size: "JVM dependent",
    example: "boolean isLogin = true;",
    value: "true",
    color: "bg-yellow-500",
    binary: "1 / 0",
    range: "true or false",
    description: "Logical values."
  },

  {
    name: "char",
    size: "2 bytes",
    example: "char grade = 'A';",
    value: "A",
    color: "bg-cyan-500",
    binary: "65",
    range: "0 to 65,535",
    description: "Unicode character."
  }
];

export default function PrimitiveTypesVisualizer() {
  const [index, setIndex] = useState(0);

  const type = types[index];

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Java Primitive Types
      </h1>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {types.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded-lg ${
              i === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <motion.div
        key={type.example}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono mb-6"
      >
        {type.example}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Memory Box */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Stack Memory
          </h2>

          <motion.div
            key={type.name}
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className={`${type.color} text-white p-6 rounded-xl text-center`}
          >
            <div className="text-lg font-bold">
              {type.name}
            </div>

            <div className="text-3xl mt-2">
              {type.value}
            </div>
          </motion.div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-2 gap-4">

  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
    <div className="text-sm text-blue-600 font-medium">
      Size
    </div>

    <div className="text-2xl font-bold text-blue-900">
      {type.size}
    </div>
  </div>

  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
    <div className="text-sm text-green-600 font-medium">
      Range
    </div>

    <div className="text-lg font-bold text-green-900">
      {type.range}
    </div>
  </div>

  <div className="col-span-2 bg-purple-50 rounded-xl p-4 border border-purple-200">
    <div className="text-sm text-purple-600 font-medium mb-2">
      Binary Representation
    </div>

    <div className="font-mono text-lg break-all">
      {type.binary}
    </div>
  </div>

  <div className="col-span-2 bg-orange-50 rounded-xl p-4 border border-orange-200">
    <div className="text-sm text-orange-600 font-medium mb-2">
      Description
    </div>

    <p className="text-gray-700 leading-relaxed">
      {type.description}
    </p>
  </div>

</div>
      </div>
    </div>
  );
}