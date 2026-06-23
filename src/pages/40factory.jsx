import { useState } from "react";
import {
  Factory,
  Car,
  Truck,
  Bike,
  RotateCcw,
  ArrowDown,
  CheckCircle,
} from "lucide-react";

export default function FactoryMethodLab() {
  const [request, setRequest] = useState("");
  const [created, setCreated] = useState(null);

  const createVehicle = () => {
    setCreated(request);
  };

  const reset = () => {
    setRequest("");
    setCreated(null);
  };

  const vehicleEmoji = {
    Car: "🚗",
    Bike: "🏍️",
    Truck: "🚚",
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Factory Method Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Create objects without exposing the actual
          class creation logic.
        </p>
      </div>

      {/* Bad Example */}

      <div className="bg-red-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Without Factory
        </h2>

        <div className="bg-gray-900 text-red-400 p-5 rounded-xl">
          <pre>{`Vehicle v = new Car();

Vehicle v = new Bike();

Vehicle v = new Truck();`}</pre>
        </div>

        <div className="mt-4 text-red-700 font-bold">
          ❌ Client must know every class.
        </div>
      </div>

      {/* Controls */}

      <div className="bg-green-50 p-6 rounded-2xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">
          Request Vehicle
        </h2>

        <select
          value={request}
          onChange={(e) =>
            setRequest(e.target.value)
          }
          className="w-full p-4 border rounded-xl"
        >
          <option value="">
            Select Vehicle
          </option>
          <option>Car</option>
          <option>Bike</option>
          <option>Truck</option>
        </select>

        <div className="flex justify-center gap-4 mt-6">

          <button
            disabled={!request}
            onClick={createVehicle}
            className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2"
          >
            <Factory />
            Factory Create
          </button>

          <button
            onClick={reset}
            className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
          >
            <RotateCcw />
            Reset
          </button>
        </div>
      </div>

      {/* Factory Visualization */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Client */}

        <div className="bg-blue-100 p-6 rounded-2xl text-center shadow">
          <h2 className="text-2xl font-bold">
            Client
          </h2>

          <div className="mt-4">
            Vehicle v
          </div>

          <div className="mt-3 text-green-700">
            Doesn't know Car/Bike
          </div>
        </div>

        {/* Factory */}

        <div
          className={`
            p-6 rounded-2xl text-center shadow transition-all duration-700
            ${
              created
                ? "bg-yellow-300 animate-pulse scale-105"
                : "bg-yellow-100"
            }
          `}
        >
          <Factory size={50} className="mx-auto" />

          <h2 className="text-2xl font-bold mt-4">
            VehicleFactory
          </h2>

          {created && (
            <div className="mt-3 font-bold">
              Creating {created}
            </div>
          )}
        </div>

        {/* Heap */}

        <div className="bg-green-100 p-6 rounded-2xl text-center shadow">
          <h2 className="text-2xl font-bold">
            Heap Memory
          </h2>

          {created && (
            <div className="mt-6 bg-white p-6 rounded-xl animate-bounce">
              <div className="text-5xl">
                {vehicleEmoji[created]}
              </div>

              <div className="font-bold mt-3">
                {created} Object
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flow */}

      {created && (
        <div className="bg-purple-100 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-5">
            Object Creation Flow
          </h2>

          <div className="text-center text-xl space-y-2">

            Client requests Vehicle

            <div className="text-4xl">
              ↓
            </div>

            Factory decides object

            <div className="text-4xl">
              ↓
            </div>

            Creates {created}

            <div className="text-4xl">
              ↓
            </div>

            Returns Vehicle reference
          </div>
        </div>
      )}

      {/* Code Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Without Factory
          </h2>

          <pre>{`Vehicle v =
    new Car();

Vehicle v =
    new Bike();`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            With Factory
          </h2>

          <pre>{`Vehicle v =
    VehicleFactory
        .create(type);`}</pre>
        </div>
      </div>

      {/* Factory Code */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">
        <h2 className="text-white text-2xl mb-5">
          Java Factory Method
        </h2>

        <pre>{`interface Vehicle {}

class Car
implements Vehicle {}

class Bike
implements Vehicle {}

class VehicleFactory {

    static Vehicle create(
        String type
    ) {

        if(type.equals("Car"))
            return new Car();

        if(type.equals("Bike"))
            return new Bike();

        return null;
    }
}`}</pre>
      </div>

      {/* Benefits */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Without Factory
          </h2>

          <div className="space-y-3">
            <div>
              ❌ Client knows all classes
            </div>

            <div>
              ❌ Tight coupling
            </div>

            <div>
              ❌ Difficult maintenance
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            With Factory
          </h2>

          <div className="space-y-3">
            <div>
              ✅ Loose coupling
            </div>

            <div>
              ✅ Centralized creation
            </div>

            <div>
              ✅ Easier maintenance
            </div>
          </div>
        </div>
      </div>

      {/* Result */}

      {created && (
        <div className="bg-green-200 p-6 rounded-2xl text-center text-2xl font-bold animate-pulse">
          <CheckCircle
            className="mx-auto mb-3"
            size={40}
          />
          Client only knows Vehicle ✅
        </div>
      )}
    </div>
  );
}