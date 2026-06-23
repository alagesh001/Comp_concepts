import { useState } from "react";
import { Car, Music, RotateCcw, Trash2 } from "lucide-react";

export default function CompositionAggregationMemory() {
  const [carAlive, setCarAlive] = useState(true);
  const [playlistAlive, setPlaylistAlive] = useState(true);

  const reset = () => {
    setCarAlive(true);
    setPlaylistAlive(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Composition vs Aggregation in Memory
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* COMPOSITION */}
        <div className="bg-red-50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-5">
            Composition
          </h2>

          <div className="bg-white p-4 rounded-xl mb-5">
            Car owns the Engine.
            <br />
            Engine cannot survive without the Car.
          </div>

          <h3 className="font-bold mb-2">
            Stack Memory
          </h3>

          {carAlive ? (
            <div className="bg-blue-200 p-3 rounded text-center">
              car
            </div>
          ) : (
            <div className="bg-gray-300 p-3 rounded text-center">
              car = null
            </div>
          )}

          <div className="text-center text-3xl py-4">
            ↓
          </div>

          <h3 className="font-bold mb-2">
            Heap Memory
          </h3>

          {carAlive ? (
            <>
              <div className="bg-red-200 p-4 rounded-xl text-center">
                <Car className="mx-auto mb-2" size={40} />
                Car Object
              </div>

              <div className="text-center text-3xl py-3">
                ↓
              </div>

              <div className="bg-orange-200 p-4 rounded-xl text-center">
                ⚙️ Engine Object
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-300 p-4 rounded-xl text-center">
                Car Deleted
              </div>

              <div className="text-center text-3xl py-3">
                ↓
              </div>

              <div className="bg-gray-300 p-4 rounded-xl text-center">
                Engine Deleted
              </div>
            </>
          )}

          <button
            onClick={() => setCarAlive(false)}
            className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg flex justify-center gap-2"
          >
            <Trash2 />
            Delete Car
          </button>
        </div>

        {/* AGGREGATION */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-5">
            Aggregation
          </h2>

          <div className="bg-white p-4 rounded-xl mb-5">
            Playlist contains Songs.
            <br />
            Songs exist independently.
          </div>

          <h3 className="font-bold mb-2">
            Stack Memory
          </h3>

          <div className="space-y-3">
            <div className="bg-green-200 p-3 rounded text-center">
              song1
            </div>

            <div className="bg-green-200 p-3 rounded text-center">
              song2
            </div>

            <div className="bg-green-200 p-3 rounded text-center">
              song3
            </div>

            {playlistAlive ? (
              <div className="bg-blue-200 p-3 rounded text-center">
                playlist
              </div>
            ) : (
              <div className="bg-gray-300 p-3 rounded text-center">
                playlist = null
              </div>
            )}
          </div>

          <div className="text-center text-3xl py-4">
            ↓
          </div>

          <h3 className="font-bold mb-2">
            Heap Memory
          </h3>

          {playlistAlive ? (
            <div className="bg-blue-200 p-4 rounded-xl text-center mb-4">
              <Music className="mx-auto mb-2" size={40} />
              Playlist Object
            </div>
          ) : (
            <div className="bg-gray-300 p-4 rounded-xl text-center mb-4">
              Playlist Deleted
            </div>
          )}

          <div className="space-y-3">
            <div className="bg-green-200 p-3 rounded text-center">
              🎵 Song Object 1
            </div>

            <div className="bg-green-200 p-3 rounded text-center">
              🎵 Song Object 2
            </div>

            <div className="bg-green-200 p-3 rounded text-center">
              🎵 Song Object 3
            </div>
          </div>

          {!playlistAlive && (
            <div className="mt-4 bg-green-100 p-3 rounded text-center">
              Songs still exist.
            </div>
          )}

          <button
            onClick={() => setPlaylistAlive(false)}
            className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg flex justify-center gap-2"
          >
            <Trash2 />
            Delete Playlist
          </button>
        </div>
      </div>

      {/* Java Code */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Composition
          </h3>

          <pre>{`class Car {
    private Engine engine =
        new Engine();
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
          <h3 className="text-white mb-3">
            Aggregation
          </h3>

          <pre>{`Song s1 = new Song();
Song s2 = new Song();

Playlist p =
    new Playlist();

p.addSong(s1);
p.addSong(s2);`}</pre>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-yellow-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          What happened in memory?
        </h2>

        <div className="space-y-2 text-lg">
          <div>
            🚗 Car deleted → Engine deleted.
          </div>

          <div>
            🎵 Playlist deleted → Songs survive.
          </div>

          <div>
            Composition = Shared lifetime.
          </div>

          <div>
            Aggregation = Independent lifetime.
          </div>
        </div>
      </div>

      <button
        onClick={reset}
        className="w-full bg-green-600 text-white p-4 rounded-xl flex justify-center gap-2"
      >
        <RotateCcw />
        Reset Simulation
      </button>
    </div>
  );
}