import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

export default function SOLIDPrinciplesLab() {
  const [principle, setPrinciple] = useState("S");
  const [goodDesign, setGoodDesign] =
    useState(false);

  const reset = () => {
    setPrinciple("S");
    setGoodDesign(false);
  };

  const data = {
    S: {
      name: "Single Responsibility Principle",
      bad: [
        "Student Class",
        "Save Student",
        "Print Report",
        "Send Email",
      ],
      good: [
        "Student",
        "StudentRepository",
        "ReportService",
        "EmailService",
      ],
      description:
        "One class should have only one reason to change.",
    },

    O: {
      name: "Open Closed Principle",
      bad: [
        "if(circle)",
        "if(rectangle)",
        "if(square)",
      ],
      good: [
        "Shape",
        "Circle",
        "Rectangle",
        "Square",
      ],
      description:
        "Open for extension, closed for modification.",
    },

    L: {
      name: "Liskov Substitution Principle",
      bad: [
        "Bird",
        "Penguin",
        "fly() ❌",
      ],
      good: [
        "Bird",
        "FlyingBird",
        "Penguin",
      ],
      description:
        "Child objects should replace parent objects safely.",
    },

    I: {
      name: "Interface Segregation Principle",
      bad: [
        "Worker",
        "work()",
        "eat()",
        "sleep()",
      ],
      good: [
        "Workable",
        "Eatable",
      ],
      description:
        "Don't force classes to implement unused methods.",
    },

    D: {
      name: "Dependency Inversion Principle",
      bad: [
        "Car",
        "DieselEngine",
      ],
      good: [
        "Car",
        "Engine",
        "Diesel",
        "Electric",
      ],
      description:
        "Depend on abstractions, not implementations.",
    },
  };

  const current = data[principle];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-4xl font-bold text-center">
        SOLID Principles Lab
      </h1>

      {/* Principle Buttons */}

      <div className="flex flex-wrap justify-center gap-3">

        {["S", "O", "L", "I", "D"].map((p) => (
          <button
            key={p}
            onClick={() => {
              setPrinciple(p);
              setGoodDesign(false);
            }}
            className={`px-6 py-3 rounded-xl text-white font-bold transition
            ${
              principle === p
                ? "bg-blue-600 scale-110"
                : "bg-gray-500"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() =>
            setGoodDesign(!goodDesign)
          }
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Toggle Solution
        </button>

        <button
          onClick={reset}
          className="bg-gray-700 text-white px-5 py-3 rounded-xl"
        >
          <RotateCcw />
        </button>
      </div>

      {/* Title */}

      <div className="bg-blue-100 p-6 rounded-2xl text-center shadow">
        <h2 className="text-3xl font-bold">
          {current.name}
        </h2>

        <p className="mt-3 text-lg">
          {current.description}
        </p>
      </div>

      {/* Bad Design */}

      {!goodDesign && (
        <div className="bg-red-50 p-6 rounded-2xl shadow">

          <div className="flex items-center gap-3 mb-5">
            <XCircle className="text-red-600" />
            <h2 className="text-2xl font-bold">
              Bad Design
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {current.bad.map((item) => (
              <div
                key={item}
                className="bg-red-200 px-5 py-4 rounded-xl shadow hover:scale-105 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Good Design */}

      {goodDesign && (
        <div className="bg-green-50 p-6 rounded-2xl shadow">

          <div className="flex items-center gap-3 mb-5">
            <CheckCircle className="text-green-600" />
            <h2 className="text-2xl font-bold">
              SOLID Solution
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {current.good.map((item) => (
              <div
                key={item}
                className="bg-green-200 px-5 py-4 rounded-xl shadow hover:scale-110 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Java Example */}

      <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">

        {principle === "S" && (
          <pre>{`class Student {
   save();
   print();
   sendEmail();
}

// Split responsibilities.`}</pre>
        )}

        {principle === "O" && (
          <pre>{`interface Shape {
   area();
}

class Circle implements Shape {}
class Rectangle implements Shape {}`}</pre>
        )}

        {principle === "L" && (
          <pre>{`Bird b = new Penguin();

b.fly(); // Problem`}</pre>
        )}

        {principle === "I" && (
          <pre>{`interface Worker {
   work();
   eat();
}`}</pre>
        )}

        {principle === "D" && (
          <pre>{`class Car {
   Engine engine;
}`}</pre>
        )}
      </div>

      {/* Explanation */}

      <div className="bg-yellow-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Why?
        </h2>

        {principle === "S" && (
          <p>
            One class should do one job only.
          </p>
        )}

        {principle === "O" && (
          <p>
            Add new features without changing old code.
          </p>
        )}

        {principle === "L" && (
          <p>
            Child classes should behave like parent classes.
          </p>
        )}

        {principle === "I" && (
          <p>
            Smaller interfaces are easier to implement.
          </p>
        )}

        {principle === "D" && (
          <p>
            Depend on abstractions instead of concrete classes.
          </p>
        )}
      </div>

      {/* Summary */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          SOLID Summary
        </h2>

        <div className="space-y-3 text-lg">

          <div>
            S → Single Responsibility
          </div>

          <div>
            O → Open Closed
          </div>

          <div>
            L → Liskov Substitution
          </div>

          <div>
            I → Interface Segregation
          </div>

          <div>
            D → Dependency Inversion
          </div>
        </div>
      </div>
    </div>
  );
}