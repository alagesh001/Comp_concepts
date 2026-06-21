import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AsyncAlarmClock() {
  const [student, setStudent] = useState("Idle");
  const [alarm, setAlarm] = useState("Off");
  const [activities, setActivities] = useState([]);
  const [running, setRunning] = useState(false);

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const reset = () => {
    setStudent("Idle");
    setAlarm("Off");
    setActivities([]);
  };

  // Synchronous version
  const runSync = async () => {
    reset();
    setRunning(true);

    setStudent("Waiting beside clock");
    setAlarm("⏰ 5 seconds");

    await sleep(5000);

    setAlarm("🔔 Alarm!");

    await sleep(1000);

    setActivities(["🍰 Take cake out"]);

    setStudent("Study Chapter 1");
    await sleep(1500);

    setActivities((a) => [...a, "📚 Chapter 1"]);

    setStudent("Study Chapter 2");
    await sleep(1500);

    setActivities((a) => [...a, "📚 Chapter 2"]);

    setStudent("Idle");
    setRunning(false);
  };

  // Asynchronous version
  const runAsync = async () => {
    reset();
    setRunning(true);

    setStudent("Set Alarm");
    setAlarm("⏰ 5 seconds");

    await sleep(1000);

    setStudent("Study Chapter 1");
    setActivities(["📚 Chapter 1"]);

    await sleep(1500);

    setStudent("Study Chapter 2");
    setActivities((a) => [...a, "📚 Chapter 2"]);

    await sleep(1500);

    setStudent("Study Chapter 3");
    setActivities((a) => [...a, "📚 Chapter 3"]);

    await sleep(2000);

    setAlarm("🔔 Alarm!");

    setStudent("Take Cake Out");
    setActivities((a) => [...a, "🍰 Take cake out"]);

    await sleep(1000);

    setStudent("Idle");
    setAlarm("Off");

    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Synchronous vs Asynchronous
      </h1>

      {/* Code Examples */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono">
{`// Synchronous

setAlarm();

wait();

takeCakeOut();

study();`}
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl font-mono">
{`// Asynchronous

setTimeout(() => {
   takeCakeOut();
},5000);

study();
study();
study();`}
        </div>

      </div>

      {/* Visualization */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Student */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <div className="text-7xl mb-4">
            👨‍🎓
          </div>

          <h2 className="text-2xl font-bold mb-4">
            JavaScript Thread
          </h2>

          <motion.div
            key={student}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-blue-500 text-white p-4 rounded-xl"
          >
            {student}
          </motion.div>

        </div>

        {/* Alarm */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <div className="text-7xl mb-4">
            ⏰
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Browser Timer
          </h2>

          <motion.div
            key={alarm}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-orange-500 text-white p-4 rounded-xl"
          >
            {alarm}
          </motion.div>

        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Completed Tasks
          </h2>

          <AnimatePresence>
            {activities.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  x: -20,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                className="bg-green-500 text-white p-3 rounded mb-3"
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>

        </div>

      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          disabled={running}
          onClick={runSync}
          className="bg-red-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          Run Synchronous
        </button>

        <button
          disabled={running}
          onClick={runAsync}
          className="bg-green-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          Run Asynchronous
        </button>

      </div>

      {/* Explanation */}
      <div className="mt-10 bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl">

        <h3 className="text-xl font-bold mb-3">
          What is happening?
        </h3>

        <p className="mb-3">
          <strong>Synchronous:</strong> The student waits beside the clock
          until the alarm rings. No studying happens.
        </p>

        <p>
          <strong>Asynchronous:</strong> The student sets the alarm and
          continues studying. When the alarm rings, the student handles
          the alarm task.
        </p>

      </div>

    </div>
  );
}