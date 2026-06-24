import React, { useState } from "react";
import {
  AlertTriangle,
  HeartPulse,
  UserPlus,
  RotateCcw,
  Stethoscope,
} from "lucide-react";

export default function PriorityQueueVisualizer() {
  const [tab, setTab] = useState(0);

  const [patients, setPatients] = useState([
    {
      name: "Rahul",
      priority: 1,
      label: "Normal"
    },
    {
      name: "Anita",
      priority: 2,
      label: "Serious"
    },
    {
      name: "Ravi",
      priority: 3,
      label: "Critical"
    }
  ]);

  const [counter, setCounter] = useState(1);

  const addPatient = (priority, label) => {
    const names = [
      "Amit",
      "Priya",
      "Vikas",
      "Neha",
      "Arjun",
      "Kiran"
    ];

    const patient = {
      name: names[counter % names.length],
      priority,
      label
    };

    const updated = [...patients, patient];

    updated.sort((a, b) => b.priority - a.priority);

    setPatients(updated);

    setCounter(counter + 1);
  };

  const treatPatient = () => {
    if (!patients.length) return;

    setPatients(prev => prev.slice(1));
  };

  const reset = () => {
    setPatients([
      {
        name: "Rahul",
        priority: 1,
        label: "Normal"
      },
      {
        name: "Anita",
        priority: 2,
        label: "Serious"
      },
      {
        name: "Ravi",
        priority: 3,
        label: "Critical"
      }
    ]);
  };

  const color = priority => {
    if (priority === 3) return "bg-red-500";
    if (priority === 2) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-blue-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Priority Queue
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Highest Priority Served First
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Queue vs Priority
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Emergency Room
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Interactive
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Heap View
          </button>

        </div>

        {/* Tab 1 */}

        {tab === 0 && (

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-50 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold text-center mb-6">
                Normal Queue
              </h2>

              <div className="space-y-4">

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  Rahul
                </div>

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  Anita
                </div>

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  Ravi
                </div>

              </div>

              <div className="mt-6 text-center text-xl">
                Rahul → Anita → Ravi
              </div>

            </div>

            <div className="bg-red-50 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold text-center mb-6">
                Priority Queue
              </h2>

              <div className="space-y-4">

                <div className="bg-red-500 text-white p-4 rounded-xl">
                  Ravi (Critical)
                </div>

                <div className="bg-orange-500 text-white p-4 rounded-xl">
                  Anita (Serious)
                </div>

                <div className="bg-green-500 text-white p-4 rounded-xl">
                  Rahul (Normal)
                </div>

              </div>

              <div className="mt-6 text-center text-xl">
                Highest priority first
              </div>

            </div>

          </div>

        )}

        {/* Tab 2 */}

        {tab === 1 && (

          <div>

            <Stethoscope
              size={70}
              className="mx-auto text-red-600 mb-6"
            />

            <div className="space-y-4 max-w-2xl mx-auto">

              {patients.map((patient, index) => (

                <div
                  key={index}
                  className={`${color(
                    patient.priority
                  )} text-white p-5 rounded-2xl flex justify-between text-xl`}
                >
                  <span>{patient.name}</span>

                  <span>
                    {patient.label}
                  </span>
                </div>

              ))}

            </div>

            <div className="text-center mt-8">

              <button
                onClick={treatPatient}
                className="bg-red-600 text-white px-6 py-3 rounded-xl"
              >
                Treat Next Patient
              </button>

            </div>

          </div>

        )}

        {/* Tab 3 */}

        {tab === 2 && (

          <div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <button
                onClick={() =>
                  addPatient(3, "Critical")
                }
                className="bg-red-600 text-white px-5 py-3 rounded-xl"
              >
                Critical
              </button>

              <button
                onClick={() =>
                  addPatient(2, "Serious")
                }
                className="bg-orange-500 text-white px-5 py-3 rounded-xl"
              >
                Serious
              </button>

              <button
                onClick={() =>
                  addPatient(1, "Normal")
                }
                className="bg-green-500 text-white px-5 py-3 rounded-xl"
              >
                Normal
              </button>

            </div>

            <div className="space-y-4 max-w-xl mx-auto">

              {patients.map((patient, index) => (

                <div
                  key={index}
                  className={`${color(
                    patient.priority
                  )} text-white p-5 rounded-xl flex justify-between`}
                >
                  <span>{patient.name}</span>

                  <span>
                    {patient.label}
                  </span>
                </div>

              ))}

            </div>

          </div>

        )}

        {/* Tab 4 */}

        {tab === 3 && (

          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Heap Representation
            </h2>

            <div className="flex flex-col items-center gap-6">

              <div className="w-44 h-20 bg-red-500 text-white rounded-xl flex items-center justify-center text-xl">
                Critical
              </div>

              <div className="flex gap-20">

                <div className="w-40 h-20 bg-orange-500 text-white rounded-xl flex items-center justify-center">
                  Serious
                </div>

                <div className="w-40 h-20 bg-green-500 text-white rounded-xl flex items-center justify-center">
                  Normal
                </div>

              </div>

            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-2xl text-center text-xl">

              Highest priority remains at the top.

            </div>

          </div>

        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-green-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Insert
            </h3>

            <div className="text-3xl mt-2">
              O(log n)
            </div>

          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Remove Max
            </h3>

            <div className="text-3xl mt-2">
              O(log n)
            </div>

          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Peek
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

        </div>

        <div className="mt-10 bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-3xl text-center">

          <HeartPulse
            size={60}
            className="mx-auto mb-4"
          />

          <h2 className="text-3xl font-bold mb-4">
            Key Idea
          </h2>

          <div className="text-2xl">
            Arrival order does not matter.
          </div>

          <div className="mt-3 text-xl">
            Priority decides who gets served first.
          </div>

        </div>

        <div className="text-center mt-8">

          <button
            onClick={reset}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center mx-auto"
          >
            <RotateCcw />
            Reset
          </button>

        </div>

      </div>
    </div>
  );
}