import { useEffect, useState } from "react";
import {
  Play,
  RotateCcw,
  Cpu,
  Layers,
} from "lucide-react";

export default function ThreadLab() {
  const [mode, setMode] =
    useState("multi");

  const [running, setRunning] =
    useState(false);

  const [activeThread, setActiveThread] =
    useState(1);

  const [progress, setProgress] =
    useState({
      t1: 0,
      t2: 0,
      t3: 0,
    });

  const reset = () => {
    setRunning(false);

    setActiveThread(1);

    setProgress({
      t1: 0,
      t2: 0,
      t3: 0,
    });
  };

  useEffect(() => {
    if (!running) return;

    // --------------------
    // MULTI THREAD MODE
    // --------------------

    if (mode === "multi") {
      const i1 = setInterval(() => {
        setProgress((p) => ({
          ...p,
          t1: Math.min(
            p.t1 + 10,
            100
          ),
        }));
      }, 300);

      const i2 = setInterval(() => {
        setProgress((p) => ({
          ...p,
          t2: Math.min(
            p.t2 + 10,
            100
          ),
        }));
      }, 500);

      const i3 = setInterval(() => {
        setProgress((p) => ({
          ...p,
          t3: Math.min(
            p.t3 + 10,
            100
          ),
        }));
      }, 400);

      return () => {
        clearInterval(i1);
        clearInterval(i2);
        clearInterval(i3);
      };
    }

    // --------------------
    // SINGLE THREAD MODE
    // --------------------

    const interval = setInterval(() => {
      setProgress((p) => {
        const copy = { ...p };

        if (activeThread === 1) {
          copy.t1 = Math.min(
            copy.t1 + 10,
            100
          );

          if (copy.t1 >= 100) {
            setActiveThread(2);
          }
        }

        else if (activeThread === 2) {
          copy.t2 = Math.min(
            copy.t2 + 10,
            100
          );

          if (copy.t2 >= 100) {
            setActiveThread(3);
          }
        }

        else if (activeThread === 3) {
          copy.t3 = Math.min(
            copy.t3 + 10,
            100
          );

          if (copy.t3 >= 100) {
            setRunning(false);
          }
        }

        return copy;
      });
    }, 400);

    return () =>
      clearInterval(interval);

  }, [running, mode, activeThread]);

  const ThreadCard = (
    title,
    value,
    color,
    threadNo
  ) => (
    <div
      className={`
        p-5 rounded-xl shadow transition-all duration-300
        ${
          mode === "single" &&
          activeThread === threadNo &&
          running
            ? "ring-4 ring-yellow-400 scale-105"
            : "bg-white"
        }
      `}
    >
      <div className="flex justify-between mb-3">
        <div className="font-bold">
          {title}
        </div>

        <div>{value}%</div>
      </div>

      <div className="h-6 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      {mode === "single" &&
        activeThread === threadNo &&
        running && (
          <div className="mt-3 text-yellow-600 font-bold animate-pulse">
            CPU Executing
          </div>
        )}

      {value === 100 && (
        <div className="mt-3 text-green-600 font-bold">
          Completed
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Thread Simulator
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          A thread is an independent path of
          execution.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() => {
            reset();
            setMode("single");
          }}
          className={`px-5 py-3 rounded-xl ${
            mode === "single"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Single Thread
        </button>

        <button
          onClick={() => {
            reset();
            setMode("multi");
          }}
          className={`px-5 py-3 rounded-xl ${
            mode === "multi"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Multiple Threads
        </button>

        <button
          onClick={() =>
            setRunning(true)
          }
          disabled={running}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <Play />
          Start
        </button>

        <button
          onClick={reset}
          className="bg-gray-700 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* CPU */}

      <div className="bg-yellow-100 p-6 rounded-2xl text-center">

        <Cpu
          size={60}
          className={`mx-auto ${
            running
              ? "animate-spin"
              : ""
          }`}
        />

        <div className="text-2xl font-bold mt-3">
          CPU
        </div>

        {mode === "single" ? (
          <div className="mt-3 text-lg">
            Executing Thread{" "}
            {activeThread}
          </div>
        ) : (
          <div className="mt-3 text-lg">
            Switching between all threads
          </div>
        )}
      </div>

      {/* Threads */}

      <div className="grid md:grid-cols-3 gap-6">

        {ThreadCard(
          "Download Thread",
          progress.t1,
          "bg-blue-500",
          1
        )}

        {ThreadCard(
          "Music Thread",
          progress.t2,
          "bg-green-500",
          2
        )}

        {ThreadCard(
          "Cooking Thread",
          progress.t3,
          "bg-purple-500",
          3
        )}
      </div>

      {/* Execution Visualization */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Execution Order
        </h2>

        {mode === "single" && (
          <div className="text-center text-xl">

            <div
              className={
                activeThread === 1 &&
                running
                  ? "font-bold text-blue-700 animate-pulse"
                  : ""
              }
            >
              Download
            </div>

            <div className="text-4xl">
              ↓
            </div>

            <div
              className={
                activeThread === 2 &&
                running
                  ? "font-bold text-green-700 animate-pulse"
                  : ""
              }
            >
              Music
            </div>

            <div className="text-4xl">
              ↓
            </div>

            <div
              className={
                activeThread === 3 &&
                running
                  ? "font-bold text-purple-700 animate-pulse"
                  : ""
              }
            >
              Cooking
            </div>
          </div>
        )}

        {mode === "multi" && (
          <div className="flex justify-center gap-10 text-xl">

            <div className="animate-pulse">
              Download
            </div>

            <div className="animate-pulse">
              Music
            </div>

            <div className="animate-pulse">
              Cooking
            </div>
          </div>
        )}
      </div>

      {/* Memory */}

      <div className="bg-green-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Process Memory
        </h2>

        <pre>{`Process
   │
   ├── Thread-1 Stack
   │
   ├── Thread-2 Stack
   │
   ├── Thread-3 Stack
   │
   └── Shared Heap Memory`}</pre>
      </div>

      {/* Java Example */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-4">
          Java Thread Example
        </h2>

        <pre>{`class DownloadThread
extends Thread {

    public void run() {
        System.out.println(
            "Downloading"
        );
    }
}

DownloadThread t1 =
    new DownloadThread();

t1.start();`}</pre>
      </div>

      {/* Multiple */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-4">
          Multiple Threads
        </h2>

        <pre>{`Thread t1 =
    new Download();

Thread t2 =
    new Music();

Thread t3 =
    new Cooking();

t1.start();
t2.start();
t3.start();`}</pre>
      </div>

      {/* Summary */}

      <div className="bg-blue-200 p-6 rounded-2xl text-center">

        <Layers
          size={50}
          className="mx-auto mb-3"
        />

        <div className="text-2xl font-bold">
          Threads have separate stacks
          but share the same heap memory.
        </div>
      </div>

    </div>
  );
}