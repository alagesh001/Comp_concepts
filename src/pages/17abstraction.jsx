import { useState } from "react";
import { Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AbstractionDemo() {
  const [driving, setDriving] = useState(false);
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [showImplementation, setShowImplementation] =
    useState(false);
const drive = () => {
  if (driving) return;

  setDriving(true);

  // Disable animation and jump to start
  setAnimate(false);
  setPosition(0);

  // Next frame: enable animation and drive
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setAnimate(true);
      setPosition(350);
    });
  });

  setTimeout(() => {
    setDriving(false);
  }, 3000);
};

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Abstraction
      </h1>

      {/* Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8">
{`class Car {

    public void drive() {
        startEngine();
        injectFuel();
        igniteSpark();
        rotateWheels();
    }
}

car.drive();`}
      </div>

      {/* User View */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          What User Sees
        </h2>

        <div className="bg-blue-100 p-4 rounded-xl mb-4">
          car.drive()
        </div>

        <button
          onClick={drive}
          disabled={driving}
          className="
            bg-blue-600 text-white
            px-8 py-3 rounded-xl
            disabled:bg-gray-400
          "
        >
          {driving ? "Driving..." : "Drive Car"}
        </button>

      </div>

      {/* Road */}
      <div className="bg-gray-700 rounded-2xl p-8 relative overflow-hidden h-40 mb-8">

        <div className="absolute top-20 left-0 w-full border-b-4 border-dashed border-white" />

       <motion.div
  animate={{ x: position }}
  transition={
    animate
      ? { duration: 3 }
      : { duration: 0 }
  }
  className="absolute top-4 left-4"
>
  <Car size={70} color="red" />
</motion.div>

        <div className="absolute right-10 top-0 bottom-0 w-2 bg-white" />
      </div>

      {/* Hidden Details */}
      <button
        onClick={() =>
          setShowImplementation(!showImplementation)
        }
        className="bg-purple-600 text-white px-6 py-3 rounded-xl mb-6"
      >
        {showImplementation
          ? "Hide Implementation"
          : "Show Hidden Implementation"}
      </button>

      <AnimatePresence>
        {showImplementation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-yellow-100 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              Internal Implementation
            </h2>

            <div className="space-y-3">

              <div className="bg-white p-4 rounded">
                startEngine()
              </div>

              <div className="bg-white p-4 rounded">
                injectFuel()
              </div>

              <div className="bg-white p-4 rounded">
                igniteSpark()
              </div>

              <div className="bg-white p-4 rounded">
                rotateWheels()
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explanation */}
      <div className="bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          What is Abstraction?
        </h2>

        <p className="mb-2">
          The user only sees:
        </p>

        <div className="bg-white p-4 rounded mb-4 font-mono">
          car.drive();
        </div>

        <p className="mb-2">
          The internal implementation is hidden.
        </p>

        <p className="mb-2">
          The user only needs to know how to use the object.
        </p>

        <div className="bg-white p-4 rounded mt-4 font-mono">
{`Visible:
car.drive()

Hidden:
startEngine()
injectFuel()
igniteSpark()
rotateWheels()`}
        </div>

      </div>

    </div>
  );
}