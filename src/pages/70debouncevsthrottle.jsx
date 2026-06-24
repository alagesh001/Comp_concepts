import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Clock,
  Search,
  Activity,
  CheckCircle,
} from "lucide-react";

export default function DebounceVsThrottle() {
  const [tab, setTab] = useState(0);

  const [events, setEvents] = useState([]);

  const [throttleRuns, setThrottleRuns] = useState([]);
  const [debounceRuns, setDebounceRuns] = useState([]);

  const [running, setRunning] = useState(false);

  const throttleLock = useRef(false);
  const debounceTimer = useRef(null);

  // Generate events every 500ms
  useEffect(() => {
    if (!running) return;

    let count = 1;

    const interval = setInterval(() => {
      const eventName = `Event ${count}`;

      setEvents((prev) => [...prev, eventName]);

      // THROTTLE
      if (!throttleLock.current) {
        throttleLock.current = true;

        setThrottleRuns((prev) => [...prev, eventName]);

        setTimeout(() => {
          throttleLock.current = false;
        }, 2000);
      }

      // DEBOUNCE
      clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        setDebounceRuns((prev) => [...prev, eventName]);
      }, 2000);

      count++;

      if (count > 10) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setEvents([]);
    setThrottleRuns([]);
    setDebounceRuns([]);
    setRunning(false);

    clearTimeout(debounceTimer.current);
    throttleLock.current = false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Debounce vs Throttle
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Same events. Different behavior.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

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
            Race
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
            Real World
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
            Timeline
          </button>

        </div>

        {/* Controls */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() => setRunning(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Play size={20} />
            Start Events
          </button>

          <button
            onClick={reset}
            className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="bg-blue-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">
                  Events
                </h2>

                <div className="space-y-2">
                  {events.map((e, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">
                  Throttle
                </h2>

                <div className="space-y-2">
                  {throttleRuns.map((e, i) => (
                    <div
                      key={i}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      ✔ {e}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">
                  Debounce
                </h2>

                <div className="space-y-2">
                  {debounceRuns.map((e, i) => (
                    <div
                      key={i}
                      className="bg-purple-500 text-white p-2 rounded"
                    >
                      ✔ {e}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-yellow-50 p-6 rounded-2xl text-lg">

              <p>
                Throttle executes periodically.
              </p>

              <p>
                Debounce waits until events stop.
              </p>

            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-blue-50 p-8 rounded-3xl">

                <Search
                  size={60}
                  className="mx-auto text-blue-600 mb-4"
                />

                <h2 className="text-3xl font-bold text-center mb-4">
                  Debounce
                </h2>

                <ul className="space-y-3 text-lg">
                  <li>• Search box</li>
                  <li>• Form validation</li>
                  <li>• Auto suggestions</li>
                  <li>• API requests</li>
                </ul>

              </div>

              <div className="bg-green-50 p-8 rounded-3xl">

                <Activity
                  size={60}
                  className="mx-auto text-green-600 mb-4"
                />

                <h2 className="text-3xl font-bold text-center mb-4">
                  Throttle
                </h2>

                <ul className="space-y-3 text-lg">
                  <li>• Scroll events</li>
                  <li>• Mouse movement</li>
                  <li>• Resize events</li>
                  <li>• Dragging</li>
                </ul>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-purple-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Debounce
                </h2>

                <div className="text-xl leading-10">

                  Type

                  <br />

                  Type

                  <br />

                  Type

                  <br />

                  Stop

                  <br />

                  ↓

                  <br />

                  Execute

                </div>

              </div>

              <div className="bg-green-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Throttle
                </h2>

                <div className="text-xl leading-10">

                  Event

                  <br />

                  Execute

                  <br />

                  Wait

                  <br />

                  Execute

                  <br />

                  Wait

                </div>

              </div>

            </div>

            <div className="mt-8 bg-orange-100 p-6 rounded-3xl">

              <h2 className="text-2xl font-bold mb-4">
                Easy Rule
              </h2>

              <div className="text-2xl text-center leading-10">

                Debounce = Wait until user stops.

                <br />

                Throttle = Allow one execution every interval.

              </div>

            </div>

          </div>
        )}

        {/* Final Comparison */}

        <div className="mt-12 grid md:grid-cols-2 gap-6">

          <div className="bg-purple-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Debounce
            </h2>

            <div className="text-lg">
              Wait for silence.
            </div>

          </div>

          <div className="bg-green-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Throttle
            </h2>

            <div className="text-lg">
              Limit frequency.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}