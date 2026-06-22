import { useState } from "react";
import { Tv, Fan, Power } from "lucide-react";
import { motion } from "framer-motion";

export default function InterfaceDemo() {
  const [active, setActive] = useState(null);

  const turnOn = (device) => {
    setActive(device);

    setTimeout(() => {
      setActive(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Interface
      </h1>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8 overflow-auto">
{`interface Switchable {
    void turnOn();
}

class TV implements Switchable {
    public void turnOn() {
        System.out.println("TV ON");
    }
}

class Fan implements Switchable {
    public void turnOn() {
        System.out.println("Fan ON");
    }
}`}
      </div>

      {/* Interface */}
      <motion.div
        animate={{
          scale: active ? 1.05 : 1,
        }}
        className="bg-yellow-100 border-4 border-yellow-400 p-6 rounded-2xl text-center mb-8"
      >
        <h2 className="text-3xl font-bold">
          Interface: Switchable
        </h2>

        <div className="mt-4 bg-white p-4 rounded-xl">
          turnOn()
        </div>
      </motion.div>

      <div className="text-center text-5xl mb-6">
        ↓
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* TV */}
        <motion.div
          animate={{
            scale: active === "tv" ? 1.05 : 1,
          }}
          className={`
            p-6 rounded-2xl transition-all
            ${
              active === "tv"
                ? "bg-green-100 ring-4 ring-green-400"
                : "bg-white shadow"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-4">
            TV implements Switchable
          </h2>

          <div className="flex justify-center mb-4">
            <Tv size={90} />
          </div>

          <div className="bg-green-100 p-3 rounded mb-4">
            turnOn() → TV ON
          </div>

          <button
            onClick={() => turnOn("tv")}
            className="w-full bg-green-600 text-white p-3 rounded-xl"
          >
            tv.turnOn()
          </button>
        </motion.div>

        {/* Fan */}
        <motion.div
          animate={{
            scale: active === "fan" ? 1.05 : 1,
          }}
          className={`
            p-6 rounded-2xl transition-all
            ${
              active === "fan"
                ? "bg-blue-100 ring-4 ring-blue-400"
                : "bg-white shadow"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-4">
            Fan implements Switchable
          </h2>

          <div className="flex justify-center mb-4">
            <Fan size={90} />
          </div>

          <div className="bg-blue-100 p-3 rounded mb-4">
            turnOn() → Fan ON
          </div>

          <button
            onClick={() => turnOn("fan")}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            fan.turnOn()
          </button>
        </motion.div>

      </div>

      {/* Output */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl"
        >
          <div className="flex items-center gap-3 text-2xl">
            <Power />

            {active === "tv"
              ? "TV implementation executed."
              : "Fan implementation executed."}
          </div>
        </motion.div>
      )}

      {/* Explanation */}
      <div className="mt-8 bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          What is an Interface?
        </h2>

        <p className="mb-2">
          An interface defines WHAT should be done.
        </p>

        <p className="mb-2">
          Classes decide HOW to do it.
        </p>

        <div className="bg-white p-4 rounded-xl mt-4 font-mono">
{`Switchable
    ↓
turnOn()

TV  → TV ON
Fan → Fan ON`}
        </div>

      </div>

    </div>
  );
}