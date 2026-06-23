import { useState } from "react";
import {
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";

export default function ProtectedSimulator() {
  const [sameClass, setSameClass] = useState(false);
  const [childClass, setChildClass] = useState(false);
  const [outsideClass, setOutsideClass] = useState(false);

  const reset = () => {
    setSameClass(false);
    setChildClass(false);
    setOutsideClass(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Protected Access Modifier
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
        <pre>{`class Animal {
    protected String name = "Tiger";
}

class Dog extends Animal {
    void show() {
        System.out.println(name);
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Animal();

        // a.name ❌
    }
}`}</pre>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSameClass(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Same Class Access
        </button>

        <button
          onClick={() => setChildClass(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Child Class Access
        </button>

        <button
          onClick={() => setOutsideClass(true)}
          className="bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          Outside Class Access
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* Parent Class */}
      <div
        className={`p-6 rounded-2xl shadow transition-all duration-700 ${
          sameClass
            ? "bg-blue-200 scale-105 ring-4 ring-blue-500"
            : "bg-blue-100"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield />
          <h2 className="text-2xl font-bold">
            Animal Class
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl">
          protected name = "Tiger"
        </div>

        {sameClass && (
          <div className="mt-4 text-green-700 font-bold animate-pulse">
            ✓ Accessible inside Animal class.
          </div>
        )}
      </div>

      {/* Child Class */}
      <div
        className={`p-6 rounded-2xl shadow transition-all duration-700 ${
          childClass
            ? "bg-green-200 scale-105 ring-4 ring-green-500"
            : "bg-green-100"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">
          Dog Class (extends Animal)
        </h2>

        <div className="bg-white p-4 rounded-xl">
          name → inherited from Animal
        </div>

        {childClass && (
          <div className="flex items-center gap-2 mt-4 text-green-700 font-bold animate-pulse">
            <CheckCircle />
            Child class can access protected members.
          </div>
        )}
      </div>

      {/* Outside Class */}
      <div
        className={`p-6 rounded-2xl shadow transition-all duration-700 ${
          outsideClass
            ? "bg-red-200 scale-105 ring-4 ring-red-500"
            : "bg-red-100"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">
          Main Class
        </h2>

        <div className="bg-white p-4 rounded-xl">
          Animal a = new Animal();
        </div>

        {outsideClass && (
          <div className="flex items-center gap-2 mt-4 text-red-700 font-bold animate-pulse">
            <XCircle />
            a.name ❌ Compile Error
          </div>
        )}
      </div>

      {/* Memory Visualization */}
      <div className="bg-yellow-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-5">
          Inheritance Relationship
        </h2>

        <div className="flex flex-col items-center gap-4">

          <div className="bg-blue-200 px-8 py-4 rounded-xl">
            Animal
          </div>

          <div className="text-4xl animate-bounce">
            ↓
          </div>

          <div className="bg-green-200 px-8 py-4 rounded-xl">
            Dog
          </div>
        </div>
      </div>

      {/* Access Table */}
      <div className="bg-purple-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Who Can Access?
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">
                Location
              </th>
              <th className="border p-3">
                Access
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-3">
                Same Class
              </td>
              <td className="border p-3 text-green-600">
                ✅ Yes
              </td>
            </tr>

            <tr>
              <td className="border p-3">
                Child Class
              </td>
              <td className="border p-3 text-green-600">
                ✅ Yes
              </td>
            </tr>

            <tr>
              <td className="border p-3">
                Outside Class
              </td>
              <td className="border p-3 text-red-600">
                ❌ No
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Explanation */}
      <div className="bg-orange-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Protected Means
        </h2>

        <div className="space-y-3 text-lg">
          <div>
            ✅ Accessible inside the same class.
          </div>

          <div>
            ✅ Accessible inside child classes.
          </div>

          <div>
            ❌ Not accessible from unrelated classes.
          </div>

          <div>
            🔒 More restrictive than public.
          </div>
        </div>
      </div>
    </div>
  );
}