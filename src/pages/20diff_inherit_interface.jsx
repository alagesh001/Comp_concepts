import { useState } from "react";
import { Car, Tv, Fan, Power } from "lucide-react";
import { motion } from "framer-motion";

export default function InterfaceVsInheritance() {
  const [active, setActive] = useState("");

  const activate = (item) => {
    setActive(item);

    setTimeout(() => {
      setActive("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Interface vs Inheritance
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8 overflow-auto">
{`// Inheritance

class Vehicle {
    void drive() {}
}

class Car extends Vehicle {
}

// Interface

interface Switchable {
    void turnOn();
}

class TV implements Switchable {
    public void turnOn() {}
}

class Fan implements Switchable {
    public void turnOn() {}
}`}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* INHERITANCE */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Inheritance
          </h2>

          <div
            className={`p-5 rounded-xl mb-4 text-center transition-all ${
              active === "vehicle"
                ? "bg-yellow-100 ring-4 ring-yellow-400"
                : "bg-yellow-50"
            }`}
          >
            <h3 className="text-2xl font-bold">
              Vehicle
            </h3>

            <div className="mt-3 bg-white p-2 rounded">
              speed
            </div>

            <div className="mt-2 bg-white p-2 rounded">
              drive()
            </div>
          </div>

          <div className="text-center text-4xl mb-4">
            ↓ extends
          </div>

          <motion.div
            animate={{
              scale: active === "car" ? 1.05 : 1,
            }}
            className={`
              p-5 rounded-xl text-center
              ${
                active === "car"
                  ? "bg-green-100 ring-4 ring-green-400"
                  : "bg-green-50"
              }
            `}
          >
            <div className="flex justify-center mb-3">
              <Car size={80} color="red" />
            </div>

            <h3 className="text-2xl font-bold">
              Car
            </h3>

            <div className="mt-3 bg-white p-2 rounded">
              inherited speed
            </div>

            <div className="mt-2 bg-white p-2 rounded">
              inherited drive()
            </div>

            <div className="mt-2 bg-green-100 p-2 rounded">
              openDoor()
            </div>

            <button
              onClick={() => activate("car")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
            >
              car.drive()
            </button>
          </motion.div>

        </div>

        {/* INTERFACE */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
            Interface
          </h2>

          <div
            className={`p-5 rounded-xl mb-4 text-center transition-all ${
              active === "switch"
                ? "bg-yellow-100 ring-4 ring-yellow-400"
                : "bg-yellow-50"
            }`}
          >
            <h3 className="text-2xl font-bold">
              Switchable
            </h3>

            <div className="mt-3 bg-white p-2 rounded">
              turnOn()
            </div>
          </div>

          <div className="text-center text-4xl mb-4">
            ↓ implements
          </div>

          <div className="grid grid-cols-2 gap-4">

            <motion.div
              animate={{
                scale: active === "tv" ? 1.05 : 1,
              }}
              className={`
                p-4 rounded-xl text-center
                ${
                  active === "tv"
                    ? "bg-blue-100 ring-4 ring-blue-400"
                    : "bg-blue-50"
                }
              `}
            >
              <div className="flex justify-center mb-3">
                <Tv size={70} />
              </div>

              <h3 className="font-bold">
                TV
              </h3>

              <div className="mt-2 bg-white p-2 rounded">
                turnOn()
              </div>

              <button
                onClick={() => activate("tv")}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                turnOn()
              </button>
            </motion.div>

            <motion.div
              animate={{
                scale: active === "fan" ? 1.05 : 1,
              }}
              className={`
                p-4 rounded-xl text-center
                ${
                  active === "fan"
                    ? "bg-purple-100 ring-4 ring-purple-400"
                    : "bg-purple-50"
                }
              `}
            >
              <div className="flex justify-center mb-3">
                <Fan size={70} />
              </div>

              <h3 className="font-bold">
                Fan
              </h3>

              <div className="mt-2 bg-white p-2 rounded">
                turnOn()
              </div>

              <button
                onClick={() => activate("fan")}
                className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
              >
                turnOn()
              </button>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Result */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 text-2xl">
            <Power />

            {active === "car" &&
              "Car inherited drive() from Vehicle."}

            {active === "tv" &&
              "TV implemented turnOn()."}

            {active === "fan" &&
              "Fan implemented turnOn()."}
          </div>
        </motion.div>
      )}

      {/* Summary */}
      <div className="mt-8 bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          Difference
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Inheritance
            </h3>

            <p>IS-A relationship</p>
            <p>Reuses code</p>
            <p>extends</p>

            <div className="mt-3 font-mono">
              Car is a Vehicle
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Interface
            </h3>

            <p>CAN-DO relationship</p>
            <p>Defines behavior</p>
            <p>implements</p>

            <div className="mt-3 font-mono">
              TV is Switchable
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}