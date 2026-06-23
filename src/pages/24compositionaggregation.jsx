import { useState } from "react";
import { Home, School, Trash2 } from "lucide-react";

export default function CompositionAggregation() {
  const [houseExists, setHouseExists] = useState(true);
  const [schoolExists, setSchoolExists] = useState(true);

  const rooms = houseExists
    ? ["Bedroom", "Kitchen", "Bathroom"]
    : [];

  const teachers = ["Teacher A", "Teacher B", "Teacher C"];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Composition vs Aggregation
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* COMPOSITION */}
        <div className="bg-red-50 rounded-2xl p-6 shadow">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Composition
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4">
            Strong Relationship
            <br />
            Child cannot exist alone.
          </div>

          {houseExists ? (
            <div className="bg-red-200 p-5 rounded-xl text-center">
              <Home size={60} className="mx-auto mb-3" />
              <h3 className="font-bold text-xl">
                House
              </h3>
            </div>
          ) : (
            <div className="bg-gray-300 p-5 rounded-xl text-center">
              House Destroyed
            </div>
          )}

          <div className="flex justify-center my-4 text-3xl">
            ↓
          </div>

          <div className="grid gap-3">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div
                  key={room}
                  className="bg-white p-3 rounded-lg"
                >
                  🏠 {room}
                </div>
              ))
            ) : (
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                Rooms destroyed with House
              </div>
            )}
          </div>

          <button
            onClick={() => setHouseExists(false)}
            className="mt-5 w-full bg-red-600 text-white p-3 rounded-lg flex justify-center gap-2"
          >
            <Trash2 />
            Destroy House
          </button>
        </div>

        {/* AGGREGATION */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Aggregation
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4">
            Weak Relationship
            <br />
            Child can exist independently.
          </div>

          {schoolExists ? (
            <div className="bg-blue-200 p-5 rounded-xl text-center">
              <School size={60} className="mx-auto mb-3" />
              <h3 className="font-bold text-xl">
                School
              </h3>
            </div>
          ) : (
            <div className="bg-gray-300 p-5 rounded-xl text-center">
              School Closed
            </div>
          )}

          <div className="flex justify-center my-4 text-3xl">
            ↓
          </div>

          <div className="grid gap-3">
            {teachers.map((teacher) => (
              <div
                key={teacher}
                className="bg-white p-3 rounded-lg"
              >
                👨‍🏫 {teacher}
              </div>
            ))}
          </div>

          {!schoolExists && (
            <div className="mt-4 bg-green-200 p-3 rounded-lg text-center">
              Teachers still exist.
            </div>
          )}

          <button
            onClick={() => setSchoolExists(false)}
            className="mt-5 w-full bg-blue-600 text-white p-3 rounded-lg flex justify-center gap-2"
          >
            <Trash2 />
            Close School
          </button>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gray-100 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-5">
          What Happened?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-red-600 mb-3">
              Composition
            </h3>

            <div>
              House destroyed
            </div>

            <div className="text-3xl text-center py-2">
              ↓
            </div>

            <div>
              Rooms destroyed
            </div>

            <div className="mt-3 text-green-700">
              Same lifetime
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold text-blue-600 mb-3">
              Aggregation
            </h3>

            <div>
              School closed
            </div>

            <div className="text-3xl text-center py-2">
              ↓
            </div>

            <div>
              Teachers still exist
            </div>

            <div className="mt-3 text-green-700">
              Independent lifetime
            </div>
          </div>
        </div>
      </div>

      {/* Java Code */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Composition
          </h3>

          <pre>{`class House {
   Room room = new Room();
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Aggregation
          </h3>

          <pre>{`class School {
   Teacher teacher;

   School(Teacher t){
      teacher = t;
   }
}`}</pre>
        </div>
      </div>

      <div className="bg-yellow-100 p-5 rounded-xl">
        <h2 className="font-bold text-xl mb-3">
          Memory Trick
        </h2>

        <div className="space-y-2">
          <div>
            ❤️ Composition = "Cannot live separately"
          </div>

          <div>
            🤝 Aggregation = "Can live separately"
          </div>
        </div>
      </div>
    </div>
  );
}