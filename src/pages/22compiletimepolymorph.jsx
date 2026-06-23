import { useState } from "react";
import { Plus } from "lucide-react";

export default function CompileTimePolymorphism() {
  const [numbers, setNumbers] = useState([]);

  const examples = [
    [5, 10],
    [5, 10, 15],
    [5, 10, 15, 20],
  ];

  const calculate = (nums) => {
    setNumbers(nums);
  };

  const sum = numbers.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Compile Time Polymorphism
      </h1>

      <div className="bg-blue-100 p-5 rounded-xl">
        <h2 className="font-bold text-xl mb-2">
          Method Overloading
        </h2>

        <p>
          Same method name with different parameters.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {examples.map((nums, index) => (
          <button
            key={index}
            onClick={() => calculate(nums)}
            className="bg-white shadow p-5 rounded-xl hover:scale-105 transition"
          >
            <div className="font-mono">
              add({nums.join(", ")})
            </div>
          </button>
        ))}
      </div>

      {numbers.length > 0 && (
        <div className="bg-green-100 p-6 rounded-xl text-center">
          <div className="text-xl mb-3">
            Selected Call
          </div>

          <div className="font-mono text-2xl">
            add({numbers.join(", ")})
          </div>

          <div className="text-4xl my-5">⬇️</div>

          <div className="text-5xl font-bold text-green-700">
            {sum}
          </div>
        </div>
      )}

      <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
        <pre>{`// Java Example

class Calculator {

  int add(int a, int b) {
    return a + b;
  }

  int add(int a, int b, int c) {
    return a + b + c;
  }

}

Calculator c = new Calculator();

c.add(5,10);
c.add(5,10,15);`}</pre>
      </div>

      <div className="bg-yellow-100 p-5 rounded-xl">
        <h2 className="font-bold mb-3">
          Why Compile Time?
        </h2>

        <p>
          The compiler decides which method to call
          before the program runs.
        </p>
      </div>
    </div>
  );
}