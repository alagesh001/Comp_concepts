import { useState } from "react";
import { motion } from "framer-motion";

export default function OOPClassObject() {
  const [cars, setCars] = useState([]);

  const createCar = () => {
    const colors = [
      "Red",
      "Blue",
      "Green",
      "Black",
      "Yellow"
    ];

    const randomColor =
      colors[Math.floor(Math.random() * colors.length)];

    const speed =
      Math.floor(Math.random() * 150) + 50;

    setCars([
      ...cars,
      {
        id: Date.now(),
        color: randomColor,
        speed
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Class and Object
      </h1>

      {/* Class */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Class: Car
        </h2>

        <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl">
{`class Car {
   String color;
   int speed;

   void drive() {
      System.out.println("Driving");
   }
}`}
        </div>

        <div className="mt-5 text-gray-600">
          A class is a blueprint. It defines what an object will contain.
        </div>

      </div>

      {/* Blueprint */}
      <div className="bg-blue-100 border-2 border-blue-500 rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Blueprint
        </h2>

        <div className="space-y-3">

          <div className="bg-white p-4 rounded-xl">
            🎨 color
          </div>

          <div className="bg-white p-4 rounded-xl">
            ⚡ speed
          </div>

          <div className="bg-white p-4 rounded-xl">
            🚗 drive()
          </div>

        </div>

      </div>

      {/* Create Object */}
      <div className="text-center mb-8">

        <button
          onClick={createCar}
          className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg"
        >
          Create Object
        </button>

      </div>

      {/* Objects */}
      <div className="grid md:grid-cols-3 gap-6">

        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className="bg-white rounded-2xl shadow p-5"
          >
            <h3 className="text-xl font-bold mb-4">
              car{index + 1}
            </h3>

            <div className="space-y-3">

              <div className="bg-red-100 p-3 rounded">
                🎨 Color: {car.color}
              </div>

              <div className="bg-yellow-100 p-3 rounded">
                ⚡ Speed: {car.speed}
              </div>

              <button className="w-full bg-blue-500 text-white p-3 rounded">
                🚗 drive()
              </button>

            </div>
          </motion.div>
        ))}

      </div>

      {/* Memory */}
      {cars.length > 0 && (
        <div className="mt-10 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Memory
          </h2>

          {cars.map((car, i) => (
            <div
              key={car.id}
              className="mb-4 flex items-center gap-4"
            >
              <div className="font-mono">
                car{i + 1}
              </div>

              <div>➡️</div>

              <div className="bg-green-100 p-4 rounded-xl">
                {car.color}, {car.speed}
              </div>
            </div>
          ))}

        </div>
      )}

      {/* Explanation */}
      <div className="mt-10 bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl">

        <h2 className="text-xl font-bold mb-3">
          What is happening?
        </h2>

        <p className="mb-2">
          The class is a blueprint.
        </p>

        <p className="mb-2">
          Every time you press "Create Object",
          a new object is created.
        </p>

        <p>
          All objects share the same structure
          but store different values.
        </p>

      </div>

    </div>
  );
}