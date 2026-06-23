import { useState } from "react";
import {
  User,
  Stethoscope,
  Link2,
  Unlink,
  RotateCcw,
} from "lucide-react";

export default function AssociationDemo() {
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setConnected(true);
  };

  const disconnect = () => {
    setConnected(false);
  };

  const reset = () => {
    setConnected(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Association in OOP
      </h1>

      <div className="bg-blue-100 p-5 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">
          Definition
        </h2>

        <p>
          Association means two objects know each other
          or work together.
        </p>

        <p className="mt-2">
          Neither object owns the other.
        </p>
      </div>

      {/* Objects */}
      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <Stethoscope
            size={80}
            className="mx-auto text-blue-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Doctor
          </h2>

          <p className="text-gray-600 mt-2">
            Can exist independently.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <User
            size={80}
            className="mx-auto text-green-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Patient
          </h2>

          <p className="text-gray-600 mt-2">
            Can exist independently.
          </p>
        </div>
      </div>

      {/* Connection */}
      <div className="flex justify-center items-center gap-8 py-6">

        <div className="bg-blue-200 p-4 rounded-xl">
          Doctor
        </div>

        {connected ? (
          <div className="flex items-center gap-2">
            <div className="h-1 w-24 bg-green-500"></div>
            <Link2 className="text-green-600" />
            <div className="h-1 w-24 bg-green-500"></div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-1 w-24 bg-gray-300"></div>
            <Unlink className="text-gray-400" />
            <div className="h-1 w-24 bg-gray-300"></div>
          </div>
        )}

        <div className="bg-green-200 p-4 rounded-xl">
          Patient
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={connect}
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Assign Doctor
        </button>

        <button
          onClick={disconnect}
          className="bg-red-600 text-white px-5 py-3 rounded-lg"
        >
          Remove Association
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-lg flex gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {/* Memory */}
      <div className="bg-yellow-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Memory View
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded">
            Doctor Object
          </div>

          {connected && (
            <div className="text-center text-2xl">
              ↓ reference
            </div>
          )}

          {connected && (
            <div className="bg-green-100 p-4 rounded">
              Patient Object
            </div>
          )}

          {!connected && (
            <div className="bg-green-100 p-4 rounded">
              Patient Object
            </div>
          )}
        </div>
      </div>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
        <pre>{`class Doctor {

    public void treat(Patient p) {
        System.out.println(
            "Treating patient"
        );
    }
}

class Patient {

}

Doctor d = new Doctor();

Patient p = new Patient();

d.treat(p);`}</pre>
      </div>

      {/* Key Points */}
      <div className="bg-green-100 p-5 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Key Points
        </h2>

        <ul className="space-y-2">
          <li>✔ Doctor exists without Patient.</li>

          <li>✔ Patient exists without Doctor.</li>

          <li>✔ No ownership.</li>

          <li>✔ Temporary relationship.</li>

          <li>
            ✔ Objects simply interact.
          </li>
        </ul>
      </div>
    </div>
  );
}