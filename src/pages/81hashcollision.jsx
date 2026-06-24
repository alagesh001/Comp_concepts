import React, { useState } from "react";
import { AlertTriangle, Search, RotateCcw } from "lucide-react";

export default function HashCollisionVisualizer() {
  const SIZE = 5;

  const [key, setKey] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [buckets, setBuckets] = useState(
    Array(SIZE)
      .fill(null)
      .map(() => [])
  );

  const [ascii, setAscii] = useState([]);
  const [sum, setSum] = useState(0);

  const [targetBucket, setTargetBucket] = useState(null);

  const [collision, setCollision] = useState(false);

  const [checkingIndex, setCheckingIndex] =
    useState(null);

  const [foundIndex, setFoundIndex] =
    useState(null);

  const [message, setMessage] = useState("");

  function hash(str) {
    const chars = [...str].map((c) =>
      c.charCodeAt(0)
    );

    const total = chars.reduce(
      (a, b) => a + b,
      0
    );

    setAscii(chars);
    setSum(total);

    return total % SIZE;
  }

  async function insert() {
    if (!key) return;

    const bucket = hash(key);

    setTargetBucket(bucket);

    await new Promise((r) =>
      setTimeout(r, 700)
    );

    const updated = [...buckets];

    if (updated[bucket].length > 0) {
      setCollision(true);
      setMessage(
        "Collision! Bucket already occupied."
      );

      await new Promise((r) =>
        setTimeout(r, 1200)
      );
    } else {
      setCollision(false);
    }

    updated[bucket].push({
      key
    });

    setBuckets(updated);

    setMessage(
      `${key} inserted into Bucket ${bucket}`
    );

    setKey("");
  }

  async function search() {
    if (!searchKey) return;

    const bucket = hash(searchKey);

    setTargetBucket(bucket);

    setCheckingIndex(null);
    setFoundIndex(null);

    await new Promise((r) =>
      setTimeout(r, 800)
    );

    for (
      let i = 0;
      i < buckets[bucket].length;
      i++
    ) {
      setCheckingIndex(i);

      await new Promise((r) =>
        setTimeout(r, 800)
      );

      if (
        buckets[bucket][i].key ===
        searchKey
      ) {
        setFoundIndex(i);

        setMessage(
          `${searchKey} found!`
        );

        return;
      }
    }

    setMessage("Not found.");
  }

  function reset() {
    setBuckets(
      Array(SIZE)
        .fill(null)
        .map(() => [])
    );

    setAscii([]);
    setSum(0);

    setTargetBucket(null);

    setCollision(false);

    setCheckingIndex(null);

    setFoundIndex(null);

    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-2">
          Hash Collision Visualizer
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Why collisions happen in HashMap
        </p>

        {/* Controls */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              value={key}
              onChange={(e) =>
                setKey(e.target.value)
              }
              placeholder="Insert key"
              className="border p-3 rounded-xl"
            />

            <button
              onClick={insert}
              className="bg-blue-600 text-white rounded-xl"
            >
              Insert
            </button>

            <input
              value={searchKey}
              onChange={(e) =>
                setSearchKey(
                  e.target.value
                )
              }
              placeholder="Search key"
              className="border p-3 rounded-xl"
            />

            <button
              onClick={search}
              className="bg-green-600 text-white rounded-xl flex justify-center items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>

          </div>

          <button
            onClick={reset}
            className="mt-4 bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

        {/* Hash Calculation */}

        {ascii.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Hash Calculation
            </h2>

            <div className="flex gap-3 flex-wrap">

              {ascii.map((v, i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold animate-bounce"
                >
                  {v}
                </div>
              ))}

            </div>

            <div className="mt-4 text-xl">
              Sum = {sum}
            </div>

            <div className="text-2xl font-bold text-blue-600">
              {sum} % {SIZE} = {targetBucket}
            </div>

          </div>
        )}

        {/* Collision Warning */}

        {collision && (
          <div className="bg-red-100 border-2 border-red-400 rounded-3xl p-6 mb-8 animate-pulse">

            <div className="flex items-center gap-3 text-red-700 text-2xl font-bold">
              <AlertTriangle />
              Collision Detected!
            </div>

            <p className="mt-2">
              Another key already exists in this bucket.
            </p>

          </div>
        )}

        {/* Buckets */}

        <div className="grid md:grid-cols-5 gap-5">

          {buckets.map((bucket, bucketIndex) => (
            <div
              key={bucketIndex}
              className={`rounded-3xl p-5 shadow-xl transition-all duration-700 ${
                targetBucket === bucketIndex
                  ? "bg-green-200 scale-105 ring-4 ring-green-400"
                  : "bg-white"
              }`}
            >
              <div className="text-xl font-bold mb-5">
                Bucket {bucketIndex}
              </div>

              {bucket.length === 0 ? (
                <div className="text-gray-400">
                  Empty
                </div>
              ) : (
                bucket.map((item, index) => (
                  <div key={index}>
                    <div
                      className={`p-3 rounded-xl mb-2 transition-all duration-500 ${
                        foundIndex === index &&
                        targetBucket ===
                          bucketIndex
                          ? "bg-green-500 text-white scale-110"
                          : checkingIndex ===
                              index &&
                            targetBucket ===
                              bucketIndex
                          ? "bg-yellow-300"
                          : "bg-blue-100"
                      }`}
                    >
                      {item.key}
                    </div>

                    {index !==
                      bucket.length - 1 && (
                      <div className="text-center text-2xl">
                        ↓
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Explanation */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            What is a Collision?
          </h2>

          <p>
            Two different keys can produce the same
            bucket number.
          </p>

          <div className="mt-4 bg-gray-100 p-4 rounded-xl">

            apple → Bucket 0
            <br />
            news → Bucket 0
          </div>

          <p className="mt-4">
            Both keys are stored inside the same
            bucket using a chain.
          </p>

          <p className="mt-4 font-bold text-green-600">
            HashMap searches only inside that bucket.
          </p>

        </div>

      </div>
    </div>
  );
}