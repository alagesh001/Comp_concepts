import React, { useState, useRef, useEffect } from "react";
import {
  Timer,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Clock,
  MousePointer,
} from "lucide-react";

export default function ThrottlingVisualizer() {
  const [tab, setTab] = useState(0);

  const [events, setEvents] = useState(0);
  const [executed, setExecuted] = useState(0);
  const [ignored, setIgnored] = useState(0);

  const [running, setRunning] = useState(false);

  const [locked, setLocked] = useState(false);

  const [countdown, setCountdown] = useState(0);

  const throttleRef = useRef(false);

  const handleThrottle = () => {
    setEvents((prev) => prev + 1);

    if (throttleRef.current) {
      setIgnored((prev) => prev + 1);
      return;
    }

    throttleRef.current = true;

    setLocked(true);

    setExecuted((prev) => prev + 1);

    setCountdown(2);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      throttleRef.current = false;
      setLocked(false);
    }, 2000);
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      handleThrottle();
    }, 200);

    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setEvents(0);
    setExecuted(0);
    setIgnored(0);
    setCountdown(0);
    setLocked(false);
    throttleRef.current = false;
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Throttling Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand how throttling limits function execution.
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            onClick={() => {
              setTab(0);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Without Throttle
          </button>

          <button
            onClick={() => {
              setTab(1);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Internals
          </button>

          <button
            onClick={() => {
              setTab(2);
              reset();
            }}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Real Example
          </button>
        </div>

        {/* ---------------- TAB 1 ---------------- */}

        {tab === 0 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Without Throttling
            </h2>

            <button
              onClick={() => setEvents((p) => p + 1)}
              className="w-full p-10 bg-red-500 text-white rounded-3xl text-2xl"
            >
              Click Rapidly
            </button>

            <div className="mt-8 bg-red-50 rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-red-600">
                {events}
              </div>

              <div className="text-xl mt-4">
                Function Executions
              </div>
            </div>

          </div>
        )}

        {/* ---------------- TAB 2 ---------------- */}

        {tab === 1 && (
          <div>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`let waiting = false;

function throttle() {

   if(waiting) return;

   waiting = true;

   execute();

   setTimeout(() => {
      waiting = false;
   }, 2000);

}`}
            </div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={() => setRunning(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Play size={20} />
                Start Events
              </button>

              <button
                onClick={() => setRunning(false)}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Pause size={20} />
                Stop Events
              </button>

            </div>

            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl text-center">
                <MousePointer
                  size={50}
                  className="mx-auto mb-3"
                />

                <div className="text-4xl font-bold">
                  {events}
                </div>

                <div>Total Events</div>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl text-center">
                <CheckCircle
                  size={50}
                  className="mx-auto text-green-600 mb-3"
                />

                <div className="text-4xl font-bold text-green-600">
                  {executed}
                </div>

                <div>Executed</div>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl text-center">
                <XCircle
                  size={50}
                  className="mx-auto text-red-600 mb-3"
                />

                <div className="text-4xl font-bold text-red-600">
                  {ignored}
                </div>

                <div>Ignored</div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-2xl text-center">

                {locked ? (
                  <Clock
                    size={50}
                    className="mx-auto text-yellow-600 animate-spin mb-3"
                  />
                ) : (
                  <Timer
                    size={50}
                    className="mx-auto text-green-600 mb-3"
                  />
                )}

                <div className="text-4xl font-bold">
                  {countdown}s
                </div>

                <div>
                  {locked ? "Locked" : "Ready"}
                </div>

              </div>

            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Internal Steps
              </h2>

              <ol className="space-y-2 text-lg">
                <li>1. Event occurs.</li>
                <li>2. Function executes.</li>
                <li>3. Throttle lock begins.</li>
                <li>4. New events are ignored.</li>
                <li>5. Timer ends.</li>
                <li>6. Function can execute again.</li>
              </ol>
            </div>

          </div>
        )}

        {/* ---------------- TAB 3 ---------------- */}

        {tab === 2 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Scroll Event Example
            </h2>

            <div className="bg-blue-50 rounded-3xl p-8 mb-8">

              <div className="flex justify-center gap-8 flex-wrap">

                <div className="text-center">
                  <Timer
                    size={60}
                    className="mx-auto text-yellow-600"
                  />

                  <div className="mt-3">
                    2 Seconds
                  </div>
                </div>

                <div className="text-center">
                  <CheckCircle
                    size={60}
                    className="mx-auto text-green-600"
                  />

                  <div className="mt-3">
                    1 Execution
                  </div>
                </div>

                <div className="text-center">
                  <XCircle
                    size={60}
                    className="mx-auto text-red-600"
                  />

                  <div className="mt-3">
                    Many Ignored
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-green-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Real Uses
              </h2>

              <ul className="space-y-2 text-lg">
                <li>• Scroll events</li>
                <li>• Window resize</li>
                <li>• Mouse movement</li>
                <li>• Drag events</li>
                <li>• Infinite scrolling</li>
              </ul>
            </div>

          </div>
        )}

        {/* Comparison */}

        <div className="mt-12 grid md:grid-cols-2 gap-6">

          <div className="bg-purple-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Debounce
            </h2>

            <p className="text-lg">
              Wait until events stop.
            </p>

            <div className="mt-4 text-xl font-bold">
              Search Box
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Throttle
            </h2>

            <p className="text-lg">
              Run once every interval.
            </p>

            <div className="mt-4 text-xl font-bold">
              Scroll Events
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}