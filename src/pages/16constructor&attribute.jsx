import { useState } from "react";
import { Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConstructorAndAttributes() {
  const [color, setColor] = useState("Red");
  const [speed, setSpeed] = useState(60);
  const [cars, setCars] = useState([]);

  const createCar = () => {
    const newCar = {
      id: Date.now(),
      color,
      speed,
    };

    setCars([...cars, newCar]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Constructors and Attributes
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8">
{`class Car {

   String color;
   int speed;

   Car(String color, int speed) {
      this.color = color;
      this.speed = speed;
   }
}

Car car1 = new Car("Red", 60);`}
      </div>

      {/* Class Blueprint */}
      <div className="bg-yellow-100 border-4 border-yellow-400 p-6 rounded-2xl mb-8">

        <h2 className="text-3xl font-bold mb-4">
          Car Class (Blueprint)
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl">
            Attribute: color
          </div>

          <div className="bg-white p-4 rounded-xl">
            Attribute: speed
          </div>

        </div>

      </div>

      {/* Constructor */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Constructor Parameters
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-bold">
              Color
            </label>

            <select
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
              }
              className="w-full border p-3 rounded mt-2"
            >
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>

          <div>
            <label className="font-bold">
              Speed
            </label>

            <input
              type="range"
              min="40"
              max="140"
              value={speed}
              onChange={(e) =>
                setSpeed(Number(e.target.value))
              }
              className="w-full"
            />

            <div className="text-center mt-2">
              {speed} km/h
            </div>
          </div>

        </div>

        <button
          onClick={createCar}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          new Car("{color}", {speed})
        </button>

      </div>

      {/* Objects */}
      <div className="grid md:grid-cols-2 gap-6">

        <AnimatePresence>
          {cars.map((car) => (
            <motion.div
              key={car.id}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                Car Object
              </h2>

              <div className="flex justify-center mb-4">
                <Car
                  size={80}
                  color={car.color.toLowerCase()}
                />
              </div>

              <div className="space-y-3">

                <div className="bg-red-100 p-3 rounded">
                  color = {car.color}
                </div>

                <div className="bg-blue-100 p-3 rounded">
                  speed = {car.speed}
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      {/* Explanation */}
      <div className="mt-10 bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          What happened?
        </h2>

        <p>
          The constructor receives values.
        </p>

        <p>
          Those values are stored in attributes.
        </p>

        <p>
          Each object gets its own copy.
        </p>

        <div className="bg-white p-4 rounded mt-4 font-mono">
{`new Car("Red", 60)

color = "Red"
speed = 60`}
        </div>

      </div>

    </div>
  );
}