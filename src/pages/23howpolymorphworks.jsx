import { useState } from "react";
import { ArrowDown } from "lucide-react";

export default function PolymorphismExecution() {
  const compileFlow = [
    "Method Call: add(5,10)",
    "Compiler checks arguments",
    "Compiler finds add(int,int)",
    "Method binding completed",
    "Program executes method",
    "Result = 15",
  ];

  const runtimeFlow = [
    "animal.speak()",
    "Reference type = Animal",
    "Runtime checks actual object",
    "Object is Dog",
    "Dog.speak() selected",
    "Woof Woof!",
  ];

  const [compileStep, setCompileStep] = useState(0);
  const [runtimeStep, setRuntimeStep] = useState(0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Why Compile Time and Runtime Polymorphism?
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* COMPILE TIME */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow">
          <h2 className="text-3xl font-bold text-center mb-4">
            Compile Time Polymorphism
          </h2>

          <div className="bg-white rounded-xl p-4 mb-5">
            <p className="font-semibold mb-2">
              Java Code
            </p>

            <pre className="text-sm">
{`add(5,10);`}
            </pre>
          </div>

          <button
            onClick={() =>
              setCompileStep(
                Math.min(
                  compileStep + 1,
                  compileFlow.length
                )
              )
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-5"
          >
            Next Step
          </button>

          <div className="space-y-3">
            {compileFlow
              .slice(0, compileStep)
              .map((step, index) => (
                <div key={index}>
                  <div className="bg-blue-200 p-3 rounded-lg">
                    {step}
                  </div>

                  {index !== compileStep - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {compileStep === compileFlow.length && (
            <div className="mt-5 bg-green-200 p-4 rounded-xl">
              Compiler selected the method BEFORE the
              program ran.
            </div>
          )}
        </div>

        {/* RUNTIME */}
        <div className="bg-purple-50 rounded-2xl p-6 shadow">
          <h2 className="text-3xl font-bold text-center mb-4">
            Runtime Polymorphism
          </h2>

          <div className="bg-white rounded-xl p-4 mb-5">
            <p className="font-semibold mb-2">
              Java Code
            </p>

            <pre className="text-sm">
{`Animal animal;

animal = new Dog();

animal.speak();`}
            </pre>
          </div>

          <button
            onClick={() =>
              setRuntimeStep(
                Math.min(
                  runtimeStep + 1,
                  runtimeFlow.length
                )
              )
            }
            className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-5"
          >
            Next Step
          </button>

          <div className="space-y-3">
            {runtimeFlow
              .slice(0, runtimeStep)
              .map((step, index) => (
                <div key={index}>
                  <div className="bg-purple-200 p-3 rounded-lg">
                    {step}
                  </div>

                  {index !== runtimeStep - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown />
                    </div>
                  )}
                </div>
              ))}
          </div>

          {runtimeStep === runtimeFlow.length && (
            <div className="mt-5 bg-green-200 p-4 rounded-xl">
              Runtime selected the method AFTER the
              program started running.
            </div>
          )}
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-10 bg-gray-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Key Difference
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-xl mb-2">
              Compile Time
            </h3>

            <div className="text-center text-2xl">
              add(5,10)
            </div>

            <div className="text-center text-3xl py-2">
              ↓
            </div>

            <div className="text-center">
              Compiler chooses method
            </div>

            <div className="text-center text-3xl py-2">
              ↓
            </div>

            <div className="text-center text-green-700 font-bold">
              Before Execution
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-xl mb-2">
              Runtime
            </h3>

            <div className="text-center text-2xl">
              animal.speak()
            </div>

            <div className="text-center text-3xl py-2">
              ↓
            </div>

            <div className="text-center">
              JVM checks object type
            </div>

            <div className="text-center text-3xl py-2">
              ↓
            </div>

            <div className="text-center text-green-700 font-bold">
              During Execution
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}