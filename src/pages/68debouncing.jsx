import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Clock,
  RotateCcw,
  Play,
  Timer,
  Server,
} from "lucide-react";

export default function DebouncingVisualizer() {
  const [tab, setTab] = useState(0);

  const [text, setText] = useState("");
  const [apiCalls, setApiCalls] = useState([]);

  const [debouncedText, setDebouncedText] = useState("");
  const [timerValue, setTimerValue] = useState(0);

  const timerRef = useRef(null);

  // Debounce logic
  useEffect(() => {
    if (!text) return;

    setTimerValue(1000);

    const interval = setInterval(() => {
      setTimerValue(prev => {
        if (prev <= 100) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedText(text);
      setApiCalls(prev => [...prev, text]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  const handleWithoutDebounce = e => {
    const value = e.target.value;
    setText(value);

    setApiCalls(prev => [...prev, value]);
  };

  const handleDebounce = e => {
    setText(e.target.value);
  };

  const reset = () => {
    setText("");
    setDebouncedText("");
    setApiCalls([]);
    setTimerValue(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Debouncing Visualizer
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Understand how search boxes avoid unnecessary API calls.
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
            Without Debounce
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
            Real Search
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Without Debouncing
            </h2>

            <input
              type="text"
              value={text}
              onChange={handleWithoutDebounce}
              placeholder="Type react..."
              className="w-full p-4 border rounded-xl text-xl mb-8"
            />

            <div className="bg-red-50 p-6 rounded-2xl mb-8">

              <h3 className="text-2xl font-bold mb-4">
                API Calls
              </h3>

              <div className="space-y-3">

                {apiCalls.map((call, index) => (
                  <div
                    key={index}
                    className="bg-red-500 text-white p-3 rounded-xl"
                  >
                    API Call: {call}
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-yellow-50 p-6 rounded-2xl">

              Typing "react" produces:

              <div className="mt-4 text-xl">
                r → re → rea → reac → react
              </div>

              <div className="mt-4 text-red-600 text-2xl font-bold">
                5 API Calls
              </div>

            </div>

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Debounce Internals
            </h2>

            <div className="bg-gray-900 text-green-400 p-6 rounded-2xl mb-8 font-mono">
{`clearTimeout(timer);

timer = setTimeout(() => {
   search();
}, 1000);`}
            </div>

            <input
              value={text}
              onChange={handleDebounce}
              placeholder="Type slowly..."
              className="w-full p-4 border rounded-xl text-xl mb-8"
            />

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl">

                <h3 className="text-xl font-bold mb-4">
                  User Typing
                </h3>

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  {text || "Typing..."}
                </div>

              </div>

              <div className="bg-yellow-50 p-6 rounded-2xl">

                <h3 className="text-xl font-bold mb-4">
                  Timer
                </h3>

                <Clock
                  size={60}
                  className="mx-auto text-yellow-600"
                />

                <div className="text-center mt-4 text-2xl">
                  {timerValue} ms
                </div>

              </div>

              <div className="bg-green-50 p-6 rounded-2xl">

                <h3 className="text-xl font-bold mb-4">
                  API Call
                </h3>

                {debouncedText && (
                  <div className="bg-green-500 text-white p-4 rounded-xl">
                    {debouncedText}
                  </div>
                )}

              </div>

            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl">

              <h2 className="text-2xl font-bold mb-4">
                What Happens?
              </h2>

              <ol className="space-y-3 text-lg">
                <li>1. User types.</li>
                <li>2. Timer starts.</li>
                <li>3. User types again.</li>
                <li>4. Old timer removed.</li>
                <li>5. New timer starts.</li>
                <li>6. API called after delay.</li>
              </ol>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Real Search Box
            </h2>

            <div className="relative mb-8">

              <Search
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                value={text}
                onChange={handleDebounce}
                placeholder="Search products..."
                className="w-full pl-14 p-4 border rounded-xl text-xl"
              />

            </div>

            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  User
                </h3>

                <div className="bg-blue-500 text-white p-4 rounded-xl">
                  {text || "Typing"}
                </div>

              </div>

              <div className="bg-yellow-50 p-6 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Debounce Timer
                </h3>

                <Timer
                  size={50}
                  className="mx-auto text-yellow-600"
                />
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Server
                </h3>

                <Server
                  size={50}
                  className="mx-auto text-purple-600"
                />
              </div>

              <div className="bg-green-50 p-6 rounded-2xl">

                <h3 className="font-bold text-xl mb-4">
                  Result
                </h3>

                {debouncedText && (
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    Searching...
                  </div>
                )}

              </div>

            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-2xl">

              <h2 className="text-2xl font-bold mb-4">
                Real Uses
              </h2>

              <ul className="space-y-2 text-lg">
                <li>• Google Search</li>
                <li>• Amazon Search</li>
                <li>• Auto Suggestions</li>
                <li>• API Optimization</li>
                <li>• Form Validation</li>
              </ul>

            </div>

          </div>
        )}

        {/* Final Summary */}

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Debouncing
          </h2>

          <p className="text-2xl leading-10">
            Debouncing delays a function call until the user stops
            performing an action for a specified amount of time.
          </p>

        </div>

      </div>
    </div>
  );
}