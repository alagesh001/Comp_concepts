import { useState } from "react";
import {
  User,
  Lock,
  Shield,
  Building2,
  Plus,
  RotateCcw,
} from "lucide-react";

export default function AccessModifierSimulator() {
  const [showS1, setShowS1] = useState(false);
  const [showS2, setShowS2] = useState(false);

  const [school, setSchool] = useState("ABC School");

  const changeSchool = () => {
    setSchool((prev) =>
      prev === "ABC School"
        ? "XYZ School"
        : "ABC School"
    );
  };

  const reset = () => {
    setShowS1(false);
    setShowS2(false);
    setSchool("ABC School");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-4xl font-bold text-center">
        Static, Public, Private & Protected
      </h1>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() => setShowS1(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Create s1
        </button>

        <button
          onClick={() => setShowS2(true)}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Create s2
        </button>

        <button
          onClick={changeSchool}
          className="bg-purple-600 text-white px-5 py-3 rounded-xl"
        >
          Change Static School
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl"
        >
          <RotateCcw />
        </button>
      </div>

      {/* Class Area */}

      <div className="bg-purple-100 p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Student Class (Static Area)
        </h2>

        <div className="bg-white p-5 rounded-xl border-4 border-purple-500">

          <div className="flex items-center gap-3 text-xl font-bold">
            <Building2 />
            static school
          </div>

          <div className="mt-3 text-2xl text-purple-700">
            {school}
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Shared by every object.
          </div>
        </div>
      </div>

      {/* Objects */}

      <div className="grid md:grid-cols-2 gap-8">

        {showS1 && (
          <div className="bg-blue-100 p-6 rounded-2xl shadow hover:scale-105 transition">

            <h2 className="text-2xl font-bold mb-4">
              s1 Object
            </h2>

            <div className="space-y-4">

              <div className="bg-green-100 p-4 rounded-xl flex items-center gap-3">
                <User />
                public name = Rahul
              </div>

              <div className="bg-red-100 p-4 rounded-xl flex items-center gap-3">
                <Lock />
                private marks = 90
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl flex items-center gap-3">
                <Shield />
                protected section = A
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                static school = {school}
              </div>
            </div>
          </div>
        )}

        {showS2 && (
          <div className="bg-green-100 p-6 rounded-2xl shadow hover:scale-105 transition">

            <h2 className="text-2xl font-bold mb-4">
              s2 Object
            </h2>

            <div className="space-y-4">

              <div className="bg-green-100 p-4 rounded-xl flex items-center gap-3">
                <User />
                public name = Amit
              </div>

              <div className="bg-red-100 p-4 rounded-xl flex items-center gap-3">
                <Lock />
                private marks = 75
              </div>

              <div className="bg-yellow-100 p-4 rounded-xl flex items-center gap-3">
                <Shield />
                protected section = B
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                static school = {school}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Access Table */}

      <div className="bg-yellow-50 p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Accessibility
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">
                Modifier
              </th>
              <th className="border p-3">
                Same Class
              </th>
              <th className="border p-3">
                Outside Class
              </th>
              <th className="border p-3">
                Child Class
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-3">
                public
              </td>
              <td className="border p-3">✅</td>
              <td className="border p-3">✅</td>
              <td className="border p-3">✅</td>
            </tr>

            <tr>
              <td className="border p-3">
                private
              </td>
              <td className="border p-3">✅</td>
              <td className="border p-3">❌</td>
              <td className="border p-3">❌</td>
            </tr>

            <tr>
              <td className="border p-3">
                protected
              </td>
              <td className="border p-3">✅</td>
              <td className="border p-3">❌</td>
              <td className="border p-3">✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Memory */}

      <div className="bg-blue-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Memory View
        </h2>

        <div className="flex flex-col gap-4">

          <div className="bg-purple-200 p-4 rounded-xl">
            Student.school → {school}
          </div>

          {showS1 && (
            <div className="bg-blue-200 p-4 rounded-xl">
              s1 → Student Object
            </div>
          )}

          {showS2 && (
            <div className="bg-green-200 p-4 rounded-xl">
              s2 → Student Object
            </div>
          )}
        </div>
      </div>

      {/* Java Code */}

      <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
        <pre>{`class Student {

    public String name;

    private int marks;

    protected String section;

    static String school =
        "ABC School";
}

Student s1 =
    new Student();

Student s2 =
    new Student();

Student.school =
    "XYZ School";`}</pre>
      </div>

    </div>
  );
}