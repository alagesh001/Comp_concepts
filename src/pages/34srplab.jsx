import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Wrench,
} from "lucide-react";

export default function SRPLab() {
  const [problem, setProblem] = useState(false);
  const [fixed, setFixed] = useState(false);

  const runProblem = () => {
    setProblem(true);
    setFixed(false);
  };

  const applySRP = () => {
    setFixed(true);
  };

  const reset = () => {
    setProblem(false);
    setFixed(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Single Responsibility Principle
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          A class should have only one reason to change.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={runProblem}
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <AlertTriangle />
          Change Email Logic
        </button>

        <button
          onClick={applySRP}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Wrench />
          Apply SRP
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* BAD DESIGN */}

      {!fixed && (
        <div className="bg-red-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Bad Design
          </h2>

          <div
            className={`
              max-w-md mx-auto rounded-2xl p-8 shadow-lg
              transition-all duration-700
              ${
                problem
                  ? "bg-red-300 animate-bounce scale-110 ring-4 ring-red-600"
                  : "bg-red-100"
              }
            `}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Student Class
            </h3>

            <div className="space-y-4">

              <div className="bg-white p-4 rounded-xl">
                saveStudent()
              </div>

              <div className="bg-white p-4 rounded-xl">
                printReport()
              </div>

              <div className="bg-white p-4 rounded-xl">
                sendEmail()
              </div>
            </div>

            {problem && (
              <div className="mt-6 text-red-700 font-bold text-center animate-pulse">
                Email logic changed ❌
                <br />
                Student class must change.
              </div>
            )}
          </div>
        </div>
      )}

      {/* GOOD DESIGN */}

      {fixed && (
        <div className="bg-green-50 p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-bold mb-6 text-center">
            SRP Applied
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-blue-200 p-6 rounded-2xl shadow hover:scale-110 transition">
              <h3 className="font-bold text-xl">
                Student
              </h3>

              <p className="mt-3">
                Stores data
              </p>
            </div>

            <div className="bg-yellow-200 p-6 rounded-2xl shadow hover:scale-110 transition">
              <h3 className="font-bold text-xl">
                StudentRepository
              </h3>

              <p className="mt-3">
                Save student
              </p>
            </div>

            <div className="bg-purple-200 p-6 rounded-2xl shadow hover:scale-110 transition">
              <h3 className="font-bold text-xl">
                ReportService
              </h3>

              <p className="mt-3">
                Print reports
              </p>
            </div>

            <div className="bg-green-200 p-6 rounded-2xl shadow hover:scale-110 transition">
              <h3 className="font-bold text-xl">
                EmailService
              </h3>

              <p className="mt-3">
                Send emails
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-green-700 text-2xl font-bold animate-pulse">
            One class → One responsibility ✅
          </div>
        </div>
      )}

      {/* Code Comparison */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Bad Code */}
        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Bad Code
          </h2>

          <pre>{`class Student {

    void saveStudent(){}

    void printReport(){}

    void sendEmail(){}
}`}</pre>
        </div>

        {/* Good Code */}
        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Good Code
          </h2>

          <pre>{`class Student {}

class StudentRepository {
    save();
}

class ReportService {
    print();
}

class EmailService {
    send();
}`}</pre>
        </div>
      </div>

      {/* Problem Explanation */}

      <div className="bg-yellow-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          What Went Wrong?
        </h2>

        <div className="space-y-3 text-lg">

          <div>
            ❌ Email changes affect Student class.
          </div>

          <div>
            ❌ Report changes affect Student class.
          </div>

          <div>
            ❌ Database changes affect Student class.
          </div>

          <div>
            ❌ Too many reasons to change.
          </div>
        </div>
      </div>

      {/* Benefits */}

      <div className="bg-green-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Benefits of SRP
        </h2>

        <div className="space-y-3 text-lg">

          <div>
            ✅ Easier maintenance
          </div>

          <div>
            ✅ Better testing
          </div>

          <div>
            ✅ Smaller classes
          </div>

          <div>
            ✅ Fewer bugs
          </div>
        </div>
      </div>

      {/* Maintainability Meter */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Maintainability
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">

          <div
            className={`h-8 transition-all duration-1000
            ${
              fixed
                ? "bg-green-500 w-[90%]"
                : problem
                ? "bg-red-500 w-[20%]"
                : "bg-yellow-500 w-[50%]"
            }`}
          />
        </div>

        <div className="mt-4 text-xl text-center font-bold">

          {!problem && !fixed && "Average"}

          {problem && !fixed && "Poor ❌"}

          {fixed && "Excellent ✅"}
        </div>
      </div>
    </div>
  );
}