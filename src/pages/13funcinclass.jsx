import { useState } from "react";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

export default function OOPCarRace() {
  const [activeCar, setActiveCar] = useState(null);
const [running, setRunning] = useState({
  car1: false,
  car2: false,
});
const [animateCar, setAnimateCar] = useState({
  car1: true,
  car2: true,
});
  const [positions, setPositions] = useState({
    car1: 0,
    car2: 0,
  });

  const cars = [
    {
      name: "car1",
      color: "#ef4444",
      speed: 60,
    },
    {
      name: "car2",
      color: "#2563eb",
      speed: 120,
    },
  ];

const drive = (car) => {
  if (running[car.name]) return;

  setRunning(prev => ({
    ...prev,
    [car.name]: true,
  }));

  setActiveCar(car.name);

  // Disable animation temporarily
  setAnimateCar(prev => ({
    ...prev,
    [car.name]: false,
  }));

  // Instant jump to start
  setPositions(prev => ({
    ...prev,
    [car.name]: 0,
  }));

  // Next frame: enable animation and move
  setTimeout(() => {
    setAnimateCar(prev => ({
      ...prev,
      [car.name]: true,
    }));

    setPositions(prev => ({
      ...prev,
      [car.name]: 300,
    }));
  }, 50);

  setTimeout(() => {
    setRunning(prev => ({
      ...prev,
      [car.name]: false,
    }));

    setActiveCar(null);
  }, car.speed === 60 ? 4000 : 2000);
};
  const speedRotation = (speed) => {
    return -90 + (speed / 180) * 180;
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Class and Methods
      </h1>

      {/* Class */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8">
{`class Car {
   String color;
   int speed;

   void drive() {
      move(speed);
   }
}`}
      </div>

      {/* Objects */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {cars.map((car) => (
          <div
            key={car.name}
            className={`
              rounded-2xl p-6 transition-all duration-500
              ${
                activeCar === car.name
                  ? "bg-yellow-100 ring-4 ring-yellow-400 shadow-2xl scale-105"
                  : "bg-white shadow"
              }
            `}
          >
            <h2 className="text-2xl font-bold mb-4">
              {car.name}
            </h2>

            <div className="flex justify-center mb-4">
              <Car
                size={80}
                color={car.color}
                strokeWidth={2.5}
              />
            </div>

            <div className="space-y-3">

              <div className="bg-gray-100 p-3 rounded">
                color = {car.color === "#ef4444" ? "Red" : "Blue"}
              </div>

              <div className="bg-gray-100 p-3 rounded">
                speed = {car.speed} km/h
              </div>

             <button
  onClick={() => drive(car)}
  disabled={running[car.name]}
  className="
    w-full p-3 rounded-xl text-white
    bg-blue-600
    disabled:bg-gray-400
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {running[car.name]
    ? "Driving..."
    : `${car.name}.drive()`}
</button>

            </div>
          </div>
        ))}

      </div>

      {/* Speedometers */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {cars.map((car) => (
          <div
            key={car.name}
            className={`
              rounded-2xl p-6 text-center transition-all duration-500
              ${
                activeCar === car.name
                  ? "bg-yellow-100 ring-4 ring-yellow-400 shadow-2xl"
                  : "bg-white shadow"
              }
            `}
          >
            <h2 className="text-2xl font-bold mb-4">
              {car.name} Speedometer
            </h2>

            <div className="relative w-40 h-20 mx-auto overflow-hidden">

              <div className="absolute w-40 h-40 border-8 border-gray-300 rounded-full" />

              <motion.div
                animate={{
                  rotate:
                    activeCar === car.name
                      ? speedRotation(car.speed)
                      : -90,
                }}
                transition={{
                  duration: 1,
                }}
                className="absolute bottom-0 left-1/2 origin-bottom w-1 h-16 bg-red-500"
              />

            </div>

            <div className="mt-4 text-2xl font-bold">
              {activeCar === car.name
                ? `${car.speed} km/h`
                : "0 km/h"}
            </div>

          </div>
        ))}

      </div>

      {/* Road */}
   <div className="bg-gray-700 rounded-2xl p-8 relative overflow-hidden h-56">

  {/* Lane 1 */}
  <div className="absolute top-16 left-0 w-full border-b-4 border-dashed border-white" />

  {/* Lane 2 */}
  <div className="absolute top-40 left-0 w-full border-b-4 border-dashed border-white" />

  {/* Red Car */}
<motion.div
  animate={{ x: positions.car1 }}
  transition={
    animateCar.car1
      ? { duration: 4 }
      : { duration: 0 }
  }
      className="absolute top-4 left-4"

>
    <Car
      size={70}
      color="#ef4444"
      strokeWidth={2.5}
    />
  </motion.div>

  {/* Blue Car */}
 <motion.div
  animate={{ x: positions.car2 }}
  transition={
    animateCar.car2
      ? { duration: 2 }
      : { duration: 0 }
  }
      className="absolute top-28 left-4"

>
    <Car
      size={70}
      color="#2563eb"
      strokeWidth={2.5}
    />
  </motion.div>

  {/* Finish Line */}
  <div className="absolute right-10 top-0 bottom-0 w-2 bg-white" />

</div>

      {/* Explanation */}
      <div className="mt-10 bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-xl font-bold mb-3">
          What is happening?
        </h2>

        <p className="mb-2">
          Both objects come from the same <strong>Car</strong> class.
        </p>

        <p className="mb-2">
          Both objects use the same <strong>drive()</strong> method.
        </p>

        <p className="mb-2">
          car1 stores speed = 60.
        </p>

        <p className="mb-2">
          car2 stores speed = 120.
        </p>

        <p>
          The same method behaves differently because each object
          contains different data.
        </p>

      </div>

    </div>
  );
}