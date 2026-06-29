import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Repeat,
  CheckCircle,
  Code2,
  Users,
  Download,
  Menu
} from "lucide-react";

const SCENARIOS = {
  for: {
    title: "for loop",
    icon: Users,
    description: "When you know how many times something should repeat",
    example: "Process 5 students",
    total: 5,
    code: `
for(int i=1;i<=5;i++){
  processStudent(i);
}
`
  },

  while: {
    title: "while loop",
    icon: Download,
    description: "Runs until condition becomes false",
    example: "Download until 100%",
    total: 100,
    step: 20,
    code: `
while(progress < 100){
  downloadChunk();
  progress += 20;
}
`
  },

  do: {
    title: "do-while loop",
    icon: Menu,
    description: "Runs at least once before checking condition",
    example: "Menu system that stops on Exit",
    menu: ["Home", "Profile", "Settings", "Help", "Exit"],
    code: `
do{
  showMenu();
  choice = input();
} while(choice != "Exit");
`
  }
};

export default function LoopScenarioVisualizer() {

  const [type, setType] = useState("for");
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [menuIndex, setMenuIndex] = useState(0);
  const [choice, setChoice] = useState("");

  const intervalRef = useRef(null); // ✅ IMPORTANT FIX

  const scenario = SCENARIOS[type];
  const Icon = scenario.icon;

  // ✅ SAFE RESET (kills loop properly)
  function reset() {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStep(0);
    setLogs([]);
    setProgress(0);
    setMenuIndex(0);
    setChoice("");
  }

  function start() {

    reset(); // always kill previous run first

    let i = 0;
    let prog = 0;

    intervalRef.current = setInterval(() => {

      // ================= FOR LOOP =================
      if (type === "for") {

        if (i >= scenario.total) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return;
        }

        i++;

        setStep(i);

        setLogs(prev => [
          ...prev,
          `Iteration ${i} executed`
        ]);
      }

      // ================= WHILE LOOP =================
      if (type === "while") {

        if (prog >= scenario.total) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return;
        }

        prog += scenario.step;

        if (prog > scenario.total) prog = scenario.total;

        setProgress(prog);
        setStep(prog / scenario.step);

        setLogs(prev => [
          ...prev,
          `Downloading... ${prog}%`
        ]);
      }

      // ================= DO-WHILE LOOP (FIXED) =================
      if (type === "do") {

        const menu = scenario.menu;

        const current = i % menu.length;

        setMenuIndex(current);

        setStep(i + 1);

        setLogs(prev => [
          ...prev,
          `Menu shown: ${menu[current]}`
        ]);

        i++;

        // stop condition (simulate user exit properly)
        if (i >= 6) {

          setChoice("Exit");

          setLogs(prev => [
            ...prev,
            `User selected Exit → loop stopped`
          ]);

          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

    }, 900);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black text-center">
          Loop Simulator (Fixed Version)
        </h1>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">

          {Object.keys(SCENARIOS).map(key => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`px-6 py-3 rounded-xl font-bold ${
                type === key ? "bg-black text-white" : "bg-white"
              }`}
            >
              {SCENARIOS[key].title}
            </button>
          ))}

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* LEFT */}
          <div className="bg-white rounded-3xl shadow-xl p-7">

            <div className="flex gap-3 items-center">
              <Icon />
              <h2 className="text-3xl font-bold">{scenario.title}</h2>
            </div>

            <p className="mt-4 text-gray-600">{scenario.description}</p>

            <div className="mt-5 bg-blue-50 p-4 rounded-xl">
              {scenario.example}
            </div>

            <button
              onClick={start}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
            >
              <Play /> Run
            </button>

            <button
              onClick={reset}
              className="mt-3 w-full bg-gray-200 py-3 rounded-xl flex justify-center gap-2"
            >
              <RotateCcw /> Reset
            </button>

          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-3xl shadow-xl p-7">

            <h2 className="text-2xl font-bold flex gap-2">
              <Repeat /> Live Execution
            </h2>

            <div className="mt-8 flex flex-col items-center">

              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-40 h-40 bg-black text-white flex items-center justify-center text-4xl font-bold rounded-full"
              >
                {type === "while"
                  ? `${progress}%`
                  : type === "do"
                    ? SCENARIOS.do.menu[menuIndex]
                    : step
                }
              </motion.div>

              {/* DO-WHILE MENU */}
              {type === "do" && (
                <div className="mt-6 text-center space-y-2">

                  {scenario.menu.map((m, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl ${
                        i === menuIndex ? "bg-green-200" : "bg-gray-100"
                      }`}
                    >
                      {m}
                    </div>
                  ))}

                  {choice && (
                    <p className="text-red-600 font-bold mt-3">
                      {choice}
                    </p>
                  )}

                </div>
              )}

            </div>

            {/* LOGS */}
            <div className="mt-6 space-y-2">

              <AnimatePresence>
                {logs.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-green-100 p-3 rounded-xl flex gap-2"
                  >
                    <CheckCircle className="text-green-600" />
                    {l}
                  </motion.div>
                ))}
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* CODE */}
        <div className="mt-10 bg-gray-950 text-green-300 p-7 rounded-3xl">

          <h2 className="text-white text-2xl font-bold flex gap-2">
            <Code2 /> Code
          </h2>

          <pre className="mt-5 whitespace-pre-wrap">
            {scenario.code}
          </pre>

        </div>

      </div>
    </div>
  );
}