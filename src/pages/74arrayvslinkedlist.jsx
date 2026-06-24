import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Plus,
  School,
  Train,
  Music,
  Globe,
  RotateCcw,
} from "lucide-react";

export default function ArrayVsLinkedList() {
  const seats = ["A", "B", "C", "D", "E"];

  const [tab, setTab] = useState(0);

  // Array
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Linked list traversal
  const coaches = ["A", "B", "C", "D", "E"];
  const [currentCoach, setCurrentCoach] = useState(-1);

  // Insert comparison
  const [arrayStudents, setArrayStudents] = useState([
    "A",
    "B",
    "C",
    "D",
  ]);

  const [listStudents, setListStudents] = useState([
    "A",
    "B",
    "C",
    "D",
  ]);

  const timerRef = useRef(null);

  const traverseTrain = () => {
    setCurrentCoach(-1);

    let i = 0;

    timerRef.current = setInterval(() => {
      setCurrentCoach(i);

      if (i === coaches.length - 1) {
        clearInterval(timerRef.current);
      }

      i++;
    }, 1000);
  };

  const insertStudent = () => {
    setArrayStudents((prev) => ["X", ...prev]);
    setListStudents((prev) => ["X", ...prev]);
  };

  const reset = () => {
    clearInterval(timerRef.current);

    setSelectedSeat(null);
    setCurrentCoach(-1);

    setArrayStudents(["A", "B", "C", "D"]);
    setListStudents(["A", "B", "C", "D"]);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-3">
          Array vs Linked List
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Learn where each data structure is useful.
        </p>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mb-8">

          <button
            onClick={() => setTab(0)}
            className={`px-5 py-3 rounded-xl ${
              tab === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Classroom
          </button>

          <button
            onClick={() => setTab(1)}
            className={`px-5 py-3 rounded-xl ${
              tab === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Train
          </button>

          <button
            onClick={() => setTab(2)}
            className={`px-5 py-3 rounded-xl ${
              tab === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Insert
          </button>

          <button
            onClick={() => setTab(3)}
            className={`px-5 py-3 rounded-xl ${
              tab === 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Real Uses
          </button>

        </div>

        {/* TAB 1 */}

        {tab === 0 && (
          <div>

            <div className="text-center mb-8">
              <School size={60} className="mx-auto text-blue-600 mb-4" />

              <h2 className="text-3xl font-bold">
                Classroom Seats (Array)
              </h2>

              <p className="text-gray-600 mt-3">
                Every student has a fixed seat number.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-8">

              {seats.map((student, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSeat(index)}
                  className={`w-28 h-28 rounded-2xl text-3xl font-bold transition-all ${
                    selectedSeat === index
                      ? "bg-green-500 text-white scale-110"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {student}

                  <div className="text-sm mt-2">
                    Seat {index}
                  </div>
                </button>
              ))}

            </div>

            {selectedSeat !== null && (
              <div className="bg-green-50 p-6 rounded-2xl text-center">

                <h3 className="text-2xl font-bold mb-3">
                  Direct Access
                </h3>

                <p className="text-xl">
                  seat[{selectedSeat}] ={" "}
                  {seats[selectedSeat]}
                </p>

                <p className="mt-3 text-green-700 text-lg">
                  O(1) Access
                </p>

              </div>
            )}

          </div>
        )}

        {/* TAB 2 */}

        {tab === 1 && (
          <div>

            <div className="text-center mb-8">
              <Train size={60} className="mx-auto text-purple-600 mb-4" />

              <h2 className="text-3xl font-bold">
                Train Coaches (Linked List)
              </h2>

              <p className="text-gray-600 mt-3">
                You must pass through each coach.
              </p>

              <button
                onClick={traverseTrain}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl"
              >
                Find Coach E
              </button>

            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">

              {coaches.map((coach, index) => (
                <React.Fragment key={index}>

                  <div
                    className={`w-28 h-28 rounded-2xl flex flex-col justify-center items-center text-white text-3xl font-bold transition-all ${
                      currentCoach === index
                        ? "bg-green-500 scale-110"
                        : "bg-purple-500"
                    }`}
                  >
                    {coach}

                    {currentCoach === index && (
                      <div className="text-sm mt-2">
                        HERE
                      </div>
                    )}
                  </div>

                  {index !== coaches.length - 1 && (
                    <ArrowRight
                      size={35}
                      className="text-purple-600"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

            <div className="mt-8 bg-purple-50 p-6 rounded-2xl">

              <p className="text-xl">
                Head → A → B → C → D → E
              </p>

              <p className="mt-4 text-lg">
                Must visit every node.
              </p>

            </div>

          </div>
        )}

        {/* TAB 3 */}

        {tab === 2 && (
          <div>

            <div className="text-center mb-8">

              <button
                onClick={insertStudent}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Insert X at Front
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-8">

              {/* Array */}

              <div className="bg-blue-50 p-6 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6 text-center">
                  Array
                </h2>

                <div className="flex flex-wrap justify-center gap-3">

                  {arrayStudents.map((student, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold text-white ${
                        student === "X"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {student}
                    </div>
                  ))}

                </div>

                <div className="mt-6 text-center text-lg">
                  Existing elements shift.
                </div>

                <div className="text-center mt-3 text-red-600">
                  O(n)
                </div>

              </div>

              {/* Linked List */}

              <div className="bg-purple-50 p-6 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6 text-center">
                  Linked List
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-3">

                  {listStudents.map((student, index) => (
                    <React.Fragment key={index}>

                      <div
                        className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold text-white ${
                          student === "X"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      >
                        {student}
                      </div>

                      {index !== listStudents.length - 1 && (
                        <ArrowRight size={25} />
                      )}

                    </React.Fragment>
                  ))}

                </div>

                <div className="mt-6 text-center text-lg">
                  Only pointers change.
                </div>

                <div className="text-center mt-3 text-green-600">
                  O(1)
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 4 */}

        {tab === 3 && (
          <div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-blue-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Arrays
                </h2>

                <ul className="space-y-4 text-lg">
                  <li>✔ Student marks</li>
                  <li>✔ Chess board</li>
                  <li>✔ Matrix</li>
                  <li>✔ Images (pixels)</li>
                  <li>✔ Database rows</li>
                </ul>

              </div>

              <div className="bg-purple-50 p-8 rounded-3xl">

                <h2 className="text-3xl font-bold mb-6">
                  Linked Lists
                </h2>

                <ul className="space-y-4 text-lg">
                  <li>
                    <Music className="inline mr-2" size={20} />
                    Music playlist
                  </li>

                  <li>
                    <Globe className="inline mr-2" size={20} />
                    Browser history
                  </li>

                  <li>✔ Undo operations</li>

                  <li>✔ LRU cache</li>

                  <li>✔ Navigation history</li>
                </ul>

              </div>

            </div>

          </div>
        )}

        {/* Summary */}

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-green-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-3">
              Use Array When
            </h2>

            <p className="text-lg">
              Fast access by index is important.
            </p>

          </div>

          <div className="bg-purple-100 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold mb-3">
              Use Linked List When
            </h2>

            <p className="text-lg">
              Frequent insertion and deletion occur.
            </p>

          </div>

        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Easy Memory Rule
          </h2>

          <div className="text-2xl leading-10">
            Array = Seats in a classroom
            <br />
            Linked List = Train coaches
          </div>

        </div>

        <div className="text-center mt-8">
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}