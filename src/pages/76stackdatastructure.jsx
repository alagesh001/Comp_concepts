import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  ArrowLeft,
  Layers,
  Monitor,
} from "lucide-react";

export default function StackVisualizer() {
  const [tab, setTab] = useState(0);

  const [stack, setStack] = useState([10, 20, 30]);

  const [message, setMessage] = useState("");

  const [history, setHistory] = useState([
    "Google",
    "YouTube",
    "GitHub",
    "ChatGPT",
  ]);

  const [currentPage, setCurrentPage] = useState(3);

  const [callStack, setCallStack] = useState([]);

  const timerRef = useRef(null);

  const pushItem = () => {
    const value = Math.floor(Math.random() * 90 + 10);

    setStack(prev => [...prev, value]);

    setMessage(`${value} pushed onto stack.`);
  };

  const popItem = () => {
    if (!stack.length) return;

    const removed = stack[stack.length - 1];

    setStack(prev => prev.slice(0, -1));

    setMessage(`${removed} popped from stack.`);
  };

  const browserBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const runFunctions = () => {
    setCallStack([]);

    const functions = [
      "main()",
      "calculate()",
      "process()",
      "display()"
    ];

    let index = 0;

    timerRef.current = setInterval(() => {
      if (index < functions.length) {
        setCallStack(prev => [
          ...prev,
          functions[index]
        ]);
      } else {
        setCallStack(prev => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      }

      index++;

      if (index > functions.length * 2 - 1) {
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  const reset = () => {
    clearInterval(timerRef.current);

    setStack([10, 20, 30]);

    setCurrentPage(3);

    setCallStack([]);

    setMessage("");
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Stack Data Structure
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Last In First Out (LIFO)
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Plate Stack
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Push / Pop
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Browser
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Function Calls
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (

          <div>

            <h2 className="text-3xl font-bold text-center mb-8">
              Stack of Plates
            </h2>

            <div className="flex flex-col-reverse items-center gap-3">

              {stack.map((item, index) => (
                <div
                  key={index}
                  className={`w-48 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg ${
                    index === stack.length - 1
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {item}
                </div>
              ))}

            </div>

            <div className="mt-8 text-center text-2xl">
              Top = {stack[stack.length - 1]}
            </div>

          </div>

        )}

        {/* TAB 2 */}

        {tab === 1 && (

          <div>

            <div className="flex justify-center gap-4 mb-8">

              <button
                onClick={pushItem}
                className="bg-green-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
              >
                <Plus />
                Push
              </button>

              <button
                onClick={popItem}
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
              >
                <Minus />
                Pop
              </button>

            </div>

            <div className="flex flex-col-reverse items-center gap-3">

              {stack.map((item, index) => (
                <div
                  key={index}
                  className={`w-48 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold transition-all ${
                    index === stack.length - 1
                      ? "bg-green-500 scale-110"
                      : "bg-blue-500"
                  }`}
                >
                  {item}
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

              <Monitor
                size={60}
                className="mx-auto text-blue-600 mb-4"
              />

              <h2 className="text-3xl font-bold">
                Browser History
              </h2>

            </div>

            <div className="bg-blue-50 p-10 rounded-3xl text-center">

              <div className="text-4xl font-bold mb-8">
                {history[currentPage]}
              </div>

              <button
                onClick={browserBack}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
              >
                <ArrowLeft />
                Back
              </button>

            </div>

            <div className="mt-8 text-center text-xl">
              ChatGPT ← GitHub ← YouTube ← Google
            </div>

          </div>

        )}

        {/* TAB 4 */}

        {tab === 3 && (

          <div>

            <div className="text-center mb-8">

              <button
                onClick={runFunctions}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Run Program
              </button>

            </div>

            <div className="flex justify-center">

              <div className="bg-gray-900 rounded-3xl p-6 w-72">

                <h2 className="text-white text-center text-2xl mb-6">
                  Call Stack
                </h2>

                <div className="flex flex-col-reverse gap-3">

                  {callStack.map((frame, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-white text-center ${
                        index === callStack.length - 1
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {frame}
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        )}

        {/* Complexity */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-green-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Push
            </h3>

            <div className="text-3xl mt-2">
              O(1)
            </div>

          </div>

          <div className="bg-red-100 p-5 rounded-2xl text-center">

            <h3 className="font-bold text-xl">
              Pop
            </h3>

            <div className="text-3xl mt-2">
              O(1)
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

        {/* Applications */}

        <div className="mt-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Real Applications
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-xl">

            <div>
              ✔ Browser Back Button
            </div>

            <div>
              ✔ Undo Operations
            </div>

            <div>
              ✔ Function Calls
            </div>

            <div>
              ✔ Expression Evaluation
            </div>

            <div>
              ✔ Recursion
            </div>

            <div>
              ✔ DFS Traversal
            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="mt-8 bg-yellow-100 p-8 rounded-3xl text-center">

          <Layers
            size={60}
            className="mx-auto mb-4 text-yellow-700"
          />

          <h2 className="text-3xl font-bold mb-4">
            Memory Rule
          </h2>

          <div className="text-2xl">
            Last In → First Out
            <br />
            The top element always leaves first.
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