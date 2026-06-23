import { useState } from "react";
import {
  Stethoscope,
  User,
  Music,
  Link2,
  Unlink,
  Plus,
  Trash2,
  RotateCcw,
} from "lucide-react";

export default function AssociationVsAggregation() {
  const [doctorConnected, setDoctorConnected] = useState(false);
  const [playlistExists, setPlaylistExists] = useState(true);

  const reset = () => {
    setDoctorConnected(false);
    setPlaylistExists(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Association vs Aggregation
      </h1>

      {/* Definitions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">
            Association
          </h2>

          <p>
            Objects simply know or use each other.
          </p>

          <p className="mt-2">
            No ownership.
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl">
          <h2 className="text-2xl font-bold mb-3">
            Aggregation
          </h2>

          <p>
            One object contains other objects.
          </p>

          <p className="mt-2">
            Weak ownership.
          </p>
        </div>
      </div>

      {/* Association */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold mb-5 text-center">
          Association Example
        </h2>

        <div className="flex justify-center items-center gap-8">
          <div className="bg-white p-5 rounded-xl text-center">
            <Stethoscope
              size={50}
              className="mx-auto mb-2"
            />
            Doctor
          </div>

          {doctorConnected ? (
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-green-500"></div>
              <Link2 />
              <div className="w-16 h-1 bg-green-500"></div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-gray-300"></div>
              <Unlink />
              <div className="w-16 h-1 bg-gray-300"></div>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl text-center">
            <User
              size={50}
              className="mx-auto mb-2"
            />
            Patient
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setDoctorConnected(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Connect
          </button>

          <button
            onClick={() => setDoctorConnected(false)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
        </div>

        <div className="mt-5 bg-white p-4 rounded-xl">
          Doctor and Patient exist even when disconnected.
        </div>
      </div>

      {/* Aggregation */}
      <div className="bg-green-50 p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold mb-5 text-center">
          Aggregation Example
        </h2>

        {playlistExists ? (
          <div className="bg-green-200 p-5 rounded-xl text-center mb-5">
            <Music
              size={50}
              className="mx-auto mb-2"
            />
            Playlist
          </div>
        ) : (
          <div className="bg-gray-300 p-5 rounded-xl text-center mb-5">
            Playlist Deleted
          </div>
        )}

        <div className="flex justify-center gap-4 flex-wrap">
          <div className="bg-white p-4 rounded-xl">
            🎵 Song 1
          </div>

          <div className="bg-white p-4 rounded-xl">
            🎵 Song 2
          </div>

          <div className="bg-white p-4 rounded-xl">
            🎵 Song 3
          </div>
        </div>

        {!playlistExists && (
          <div className="mt-5 bg-green-200 p-4 rounded-xl text-center">
            Songs still exist.
          </div>
        )}

        <button
          onClick={() => setPlaylistExists(false)}
          className="mt-6 w-full bg-red-600 text-white p-3 rounded-lg flex justify-center gap-2"
        >
          <Trash2 />
          Delete Playlist
        </button>
      </div>

      {/* Memory View */}
      <div className="bg-yellow-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Memory Visualization
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold mb-3">
              Association
            </h3>

            <pre>{`
Doctor Object

Patient Object
            `}</pre>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <h3 className="font-bold mb-3">
              Aggregation
            </h3>

            <pre>{`
Playlist Object
      |
      ↓
Song Objects
            `}</pre>
          </div>
        </div>
      </div>

      {/* Java Code */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Association
          </h3>

          <pre>{`Doctor d = new Doctor();

Patient p = new Patient();

d.treat(p);`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Aggregation
          </h3>

          <pre>{`Song s = new Song();

Playlist p =
    new Playlist();

p.addSong(s);`}</pre>
        </div>
      </div>

      {/* Final Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Difference
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Feature</th>
              <th className="border p-3">
                Association
              </th>
              <th className="border p-3">
                Aggregation
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-3">
                Relationship
              </td>
              <td className="border p-3">
                Uses
              </td>
              <td className="border p-3">
                Has-a
              </td>
            </tr>

            <tr>
              <td className="border p-3">
                Ownership
              </td>
              <td className="border p-3">
                None
              </td>
              <td className="border p-3">
                Weak
              </td>
            </tr>

            <tr>
              <td className="border p-3">
                Example
              </td>
              <td className="border p-3">
                Doctor ↔ Patient
              </td>
              <td className="border p-3">
                Playlist → Songs
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={reset}
        className="w-full bg-blue-600 text-white p-4 rounded-xl flex justify-center gap-2"
      >
        <RotateCcw />
        Reset Simulation
      </button>
    </div>
  );
}