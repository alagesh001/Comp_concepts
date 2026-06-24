import React, { useState } from "react";
import {
  UserPlus,
  UserMinus,
  Ticket,
  Printer,
  RotateCcw,
  Users,
} from "lucide-react";

export default function QueueVisualizer() {
  const [tab, setTab] = useState(0);

  const [queue, setQueue] = useState([
    "A",
    "B",
    "C",
  ]);

  const [message, setMessage] = useState("");

  const [printJobs, setPrintJobs] = useState([
    "Doc1",
    "Doc2",
    "Doc3",
  ]);

  const enqueue = () => {
    const nextPerson = String.fromCharCode(
      65 + queue.length
    );

    setQueue(prev => [...prev, nextPerson]);

    setMessage(
      `${nextPerson} joined the queue.`
    );
  };

  const dequeue = () => {
    if (!queue.length) return;

    const served = queue[0];

    setQueue(prev => prev.slice(1));

    setMessage(
      `${served} received ticket and left.`
    );
  };

  const printDocument = () => {
    if (!printJobs.length) return;

    setPrintJobs(prev => prev.slice(1));
  };

  const reset = () => {
    setQueue(["A", "B", "C"]);

    setPrintJobs([
      "Doc1",
      "Doc2",
      "Doc3",
    ]);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Queue Data Structure
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          First In First Out (FIFO)
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Ticket Counter
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Enqueue / Dequeue
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Printer Queue
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Applications
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (

          <div>

            <div className="text-center mb-8">

              <Ticket
                size={60}
                className="mx-auto text-green-600 mb-4"
              />

              <h2 className="text-3xl font-bold">
                Ticket Counter
              </h2>

              <p className="mt-3 text-gray-600">
                The first person in line gets served first.
              </p>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {queue.map((person, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white text-3xl font-bold ${
                    index === 0
                      ? "bg-green-500 scale-110"
                      : "bg-blue-500"
                  }`}
                >
                  {person}

                  <div className="text-sm mt-2">
                    {index === 0
                      ? "Front"
                      : ""}
                  </div>
                </div>
              ))}

            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-2xl text-center">

              <p className="text-xl">
                Front → {queue[0]}
              </p>

              <p className="text-xl mt-2">
                Rear → {queue[queue.length - 1]}
              </p>

            </div>

          </div>

        )}

        {/* TAB 2 */}

        {tab === 1 && (

          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={enqueue}
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <UserPlus />
                Enqueue
              </button>

              <button
                onClick={dequeue}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <UserMinus />
                Dequeue
              </button>

            </div>

            <div className="flex flex-wrap justify-center gap-4">

              {queue.map((person, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white ${
                    index === 0
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {person}
                </div>
              ))}

            </div>

            {message && (

              <div className="mt-8 bg-yellow-50 p-6 rounded-2xl text-center text-xl">
                {message}
              </div>

            )}

          </div>

        )}

        {/* TAB 3 */}

        {tab === 2 && (

          <div>

            <div className="text-center mb-8">

              <Printer
                size={60}
                className="mx-auto text-purple-600 mb-4"
              />

              <h2 className="text-3xl font-bold">
                Printer Queue
              </h2>

            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              {printJobs.map((job, index) => (
                <div
                  key={index}
                  className={`w-32 h-24 rounded-2xl flex items-center justify-center text-white text-xl font-bold ${
                    index === 0
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                >
                  {job}
                </div>
              ))}

            </div>

            <div className="text-center">

              <button
                onClick={printDocument}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl"
              >
                Print Next Document
              </button>

            </div>

          </div>

        )}

        {/* TAB 4 */}

        {tab === 3 && (

          <div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  Real Uses
                </h2>

                <ul className="space-y-3 text-lg">
                  <li>✔ Ticket counters</li>
                  <li>✔ Printer queue</li>
                  <li>✔ CPU scheduling</li>
                  <li>✔ Call centers</li>
                  <li>✔ Customer support</li>
                </ul>

              </div>

              <div className="bg-blue-50 p-6 rounded-2xl">

                <h2 className="text-2xl font-bold mb-4">
                  Queue Operations
                </h2>

                <ul className="space-y-3 text-lg">
                  <li>Enqueue → O(1)</li>
                  <li>Dequeue → O(1)</li>
                  <li>Front → O(1)</li>
                  <li>Rear → O(1)</li>
                </ul>

              </div>

            </div>

          </div>

        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-4 gap-4">

          <div className="bg-green-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Enqueue
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Dequeue
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

          <div className="bg-blue-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Front
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

          <div className="bg-purple-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Rear
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-10 bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-3xl text-center">

          <Users
            size={60}
            className="mx-auto mb-4"
          />

          <h2 className="text-3xl font-bold mb-4">
            FIFO Rule
          </h2>

          <div className="text-2xl">
            First In → First Out
          </div>

          <div className="mt-4 text-xl">
            The first customer in line is served first.
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