import { useState } from "react";
import { Car, Bike } from "lucide-react";
import { motion } from "framer-motion";

export default function InheritanceDemo() {
  const [active, setActive] = useState(null);
const [message, setMessage] = useState("");
const [runId, setRunId] = useState({
  car: 0,
  bike: 0,
});
  const [positions, setPositions] = useState({
    car: 0,
    bike: 0,
  });

  const [running, setRunning] = useState({
    car: false,
    bike: false,
  });

const drive = (vehicle) => {
  if (running[vehicle]) return;

  setRunning((prev) => ({
    ...prev,
    [vehicle]: true,
  }));

  setActive(vehicle);

  // Force a fresh object instance
  setRunId((prev) => ({
    ...prev,
    [vehicle]: prev[vehicle] + 1,
  }));

  // Start at 0
  setPositions((prev) => ({
    ...prev,
    [vehicle]: 0,
  }));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setPositions((prev) => ({
        ...prev,
        [vehicle]: 320,
      }));
    });
  });

  setTimeout(() => {
    setRunning((prev) => ({
      ...prev,
      [vehicle]: false,
    }));

    setActive(null);
  }, vehicle === "car" ? 3500 : 2500);
};

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Inheritance
      </h1>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8 overflow-auto">
{`class Vehicle {

    int speed;

    void drive() {
        move();
    }
}

class Car extends Vehicle {

    void openDoor() {
        System.out.println("Door opened");
    }
}

class Bike extends Vehicle {

    void kickStart() {
        System.out.println("Bike started");
    }
}

Car car = new Car();
Bike bike = new Bike();

car.drive();      // inherited
car.openDoor();   // own method

bike.drive();     // inherited
bike.kickStart(); // own method`}
      </div>

      {/* Parent */}
      <motion.div
        animate={{
          scale: active ? 1.05 : 1,
        }}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">
          Vehicle (Parent Class)
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl">
            speed
          </div>

          <div className="bg-white p-4 rounded-xl">
            drive()
          </div>

        </div>
      </motion.div>

      {/* Arrow */}
      <div className="text-center text-5xl mb-6">
        ↓
      </div>

      {/* Child Classes */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Car */}
        <motion.div
          animate={{
            scale: active === "car" ? 1.05 : 1,
          }}
          className={`
            rounded-2xl p-6 transition-all
            ${
              active === "car"
                ? "bg-green-100 ring-4 ring-green-400"
                : "bg-white shadow"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-4">
            Car extends Vehicle
          </h2>

          <div className="flex justify-center mb-4">
            <Car size={80} color="red" />
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded">
              inherited speed
            </div>

            <div className="bg-yellow-100 p-3 rounded">
              inherited drive()
            </div>

            <div className="bg-green-100 p-3 rounded">
              unique: openDoor()
            </div>
          </div>

          <button
            disabled={running.car}
            onClick={() => drive("car")}
            className="
              w-full p-3 rounded-xl text-white
              bg-red-500
              disabled:bg-gray-400
            "
          >
            {running.car
              ? "Driving..."
              : "car.drive()"}
          </button>
     

<button
  onClick={() => setMessage("Car door opened")}
  className="w-full mt-5 bg-green-500 text-white p-3 rounded"
>
  car.openDoor()
</button>
        </motion.div>

        {/* Bike */}
        <motion.div
          animate={{
            scale: active === "bike" ? 1.05 : 1,
          }}
          className={`
            rounded-2xl p-6 transition-all
            ${
              active === "bike"
                ? "bg-blue-100 ring-4 ring-blue-400"
                : "bg-white shadow"
            }
          `}
        >
          
          <h2 className="text-2xl font-bold mb-4">
            Bike extends Vehicle
          </h2>

          <div className="flex justify-center mb-4">
            <Bike size={80} color="blue" />
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded">
              inherited speed
            </div>

            <div className="bg-yellow-100 p-3 rounded">
              inherited drive()
            </div>

            <div className="bg-blue-100 p-3 rounded">
              unique: kickStart()
            </div>
          </div>

          <button
            disabled={running.bike}
            onClick={() => drive("bike")}
            className="
              w-full p-3 rounded-xl text-white
              bg-red-500
              disabled:bg-gray-400
            "
          >
            {running.bike
              ? "Driving..."
              : "bike.drive()"}
          </button>
          <button
  onClick={() => setMessage("Bike started")}
  className="w-full mt-5 bg-green-500 text-white p-3 rounded"
>
  bike.kickStart()
</button>
        </motion.div>

      </div>
  {message && (
  <div className="bg-yellow-100 p-4 rounded-xl mt-6 mb-5 text-center text-xl">
    {message}
  </div>
)}
      {/* Road */}
      <div className="bg-gray-700 rounded-2xl p-8 relative overflow-hidden h-56 mb-8">

        {/* Lane 1 */}
        <div className="absolute top-16 left-0 w-full border-b-4 border-dashed border-white" />

        {/* Lane 2 */}
        <div className="absolute top-40 left-0 w-full border-b-4 border-dashed border-white" />

        {/* Car */}
        <motion.div
        key={runId.car}
          animate={{ x: positions.car }}
          transition={{ duration: 3.5 }}
          className="absolute top-4 left-4"
        >
          <Car size={70} color="red" />
        </motion.div>

        {/* Bike */}
        <motion.div
        key={runId.bike}
          animate={{ x: positions.bike }}
          transition={{ duration: 3.5 }}
          className="absolute top-28 left-4"
        >
          <Bike size={70} color="blue" />
        </motion.div>

        {/* Finish */}
        <div className="absolute right-10 top-0 bottom-0 w-2 bg-white" />
      </div>

      {/* Explanation */}
      <div className="bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          What is Inheritance?
        </h2>

        <p className="mb-2">
          Vehicle is the parent class.
        </p>

        <p className="mb-2">
          Car and Bike inherit its properties and methods.
        </p>

        <p className="mb-2">
          Both children use the inherited drive() method.
        </p>

        <p className="mb-2">
          Each child can also have its own unique methods.
        </p>

        <div className="bg-white p-4 rounded-xl mt-4 font-mono">
{`Vehicle
   ↑
Car    Bike

speed   ✓
drive() ✓

openDoor()  (Car only)
kickStart() (Bike only)`}
        </div>

      </div>

    </div>
  );
}