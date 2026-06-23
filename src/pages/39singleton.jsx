import { useState } from "react";
import {
  Plus,
  RotateCcw,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function SingletonLab() {
  const [normalObjects, setNormalObjects] =
    useState([]);

  const [singletonCreated, setSingletonCreated] =
    useState(false);

  const [singletonRefs, setSingletonRefs] =
    useState([]);

  const createNormal = () => {
    setNormalObjects([
      ...normalObjects,
      {
        id: normalObjects.length + 1,
      },
    ]);
  };

  const getSingleton = () => {
    setSingletonCreated(true);

    setSingletonRefs([
      ...singletonRefs,
      `ref${singletonRefs.length + 1}`,
    ]);
  };

  const reset = () => {
    setNormalObjects([]);
    setSingletonCreated(false);
    setSingletonRefs([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Singleton Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Only one object can exist, and everyone
          shares it.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={createNormal}
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Plus />
          Create Normal Object
        </button>

        <button
          onClick={getSingleton}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2 hover:scale-105 transition"
        >
          <Lock />
          Get Singleton Instance
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* NORMAL OBJECTS */}

      <div className="bg-red-50 p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6">
          Normal Class
        </h2>

        <div className="text-center mb-4">
          Every "new" creates a new object.
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {normalObjects.map((obj) => (
            <div
              key={obj.id}
              className="bg-red-200 p-6 rounded-xl shadow animate-bounce"
            >
              Object {obj.id}
            </div>
          ))}
        </div>

        {normalObjects.length > 1 && (
          <div className="text-center text-red-700 font-bold mt-5">
            Multiple objects created ❌
          </div>
        )}
      </div>

      {/* SINGLETON */}

      <div className="bg-green-50 p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6">
          Singleton Class
        </h2>

        <div className="flex justify-center mb-8">
          {singletonCreated && (
            <div className="bg-green-300 p-8 rounded-2xl shadow-lg animate-pulse">
              Singleton Object
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {singletonRefs.map((ref, index) => (
            <div
              key={index}
              className="bg-blue-200 p-4 rounded-xl"
            >
              {ref}
              <div className="text-sm mt-2">
                ↓
              </div>
              Singleton
            </div>
          ))}
        </div>

        {singletonRefs.length > 1 && (
          <div className="text-center mt-5 text-green-700 font-bold">
            Same object shared ✅
          </div>
        )}
      </div>

      {/* Stack and Heap */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stack */}

        <div className="bg-blue-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-5">
            Stack References
          </h2>

          {singletonRefs.map((ref, i) => (
            <div
              key={i}
              className="bg-blue-200 p-3 rounded mb-3"
            >
              {ref}
            </div>
          ))}
        </div>

        {/* Heap */}

        <div className="bg-yellow-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-5">
            Heap Memory
          </h2>

          {singletonCreated && (
            <div className="bg-yellow-300 p-6 rounded-xl text-center font-bold">
              One Singleton Object
            </div>
          )}
        </div>
      </div>

      {/* Code */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white mb-4 text-xl">
            Normal Class
          </h2>

          <pre>{`Student s1 =
    new Student();

Student s2 =
    new Student();

// Two objects`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white mb-4 text-xl">
            Singleton
          </h2>

          <pre>{`Database db1 =
    Database.getInstance();

Database db2 =
    Database.getInstance();

// Same object`}</pre>
        </div>
      </div>

      {/* Actual Singleton Code */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">
        <h2 className="text-white text-2xl mb-5">
          Java Singleton
        </h2>

        <pre>{`class Database {

    private static Database instance;

    private Database() {}

    public static Database getInstance() {

        if(instance == null) {
            instance =
                new Database();
        }

        return instance;
    }
}`}</pre>
      </div>

      {/* Real Examples */}

      <div className="bg-purple-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-5">
          Real World Examples
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl">
            Database Connection
          </div>

          <div className="bg-white p-5 rounded-xl">
            Logger
          </div>

          <div className="bg-white p-5 rounded-xl">
            Configuration Manager
          </div>
        </div>
      </div>

      {/* Comparison */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Normal Class
          </h2>

          <div className="space-y-3">
            <div>❌ Multiple objects</div>
            <div>❌ More memory usage</div>
            <div>❌ Separate state</div>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Singleton
          </h2>

          <div className="space-y-3">
            <div>✅ One object</div>
            <div>✅ Shared state</div>
            <div>✅ Less memory</div>
          </div>
        </div>
      </div>

      {/* Memory Meter */}

      <div className="bg-indigo-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-5">
          Memory Usage
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden">
          <div
            className="bg-red-500 h-8 transition-all duration-700"
            style={{
              width: `${Math.min(
                normalObjects.length * 20,
                100
              )}%`,
            }}
          />
        </div>

        <div className="text-center mt-4 font-bold text-lg">
          Normal Objects: {normalObjects.length}
          <br />
          Singleton Objects:{" "}
          {singletonCreated ? 1 : 0}
        </div>
      </div>
    </div>
  );
}