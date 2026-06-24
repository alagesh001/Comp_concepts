import React, { useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  Hash,
  Database
} from "lucide-react";

export default function HashMapTeaching() {
  const SIZE = 8;
const [targetBucket, setTargetBucket] = useState(null);
const [searchStage, setSearchStage] = useState("");
  const [tab, setTab] = useState("hashmap");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [searchKey, setSearchKey] = useState("");

  const [buckets, setBuckets] = useState(
    Array(SIZE)
      .fill(null)
      .map(() => [])
  );

  const [linear, setLinear] = useState([]);

  const [highlightBucket, setHighlightBucket] =
    useState(null);

  const [checkedIndex, setCheckedIndex] =
    useState(-1);

  const [ascii, setAscii] = useState([]);

  const [sum, setSum] = useState(0);

  const [message, setMessage] = useState("");

  function hash(str) {
    const chars = [...str].map(c =>
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

  async function searchBucketDemo() {
  if (!searchKey) return;

  const bucket = hash(searchKey);

  setTargetBucket(bucket);
  setHighlightBucket(searchKey);

  setSearchStage("hash");

  await new Promise(r => setTimeout(r, 1000));

  setSearchStage("jump");

  await new Promise(r => setTimeout(r, 1000));

  setHighlightBucket(bucket);

  setSearchStage("found");
}
  function insert() {
    if (!key) return;

    const bucket = hash(key);

    const updated = [...buckets];

    updated[bucket].push({
      key,
      value
    });

    setBuckets(updated);

    setLinear(prev => [
      ...prev,
      { key, value }
    ]);

    setHighlightBucket(bucket);

    if (updated[bucket].length > 1) {
      setMessage(
        "Collision! Multiple keys inside one bucket."
      );
    } else {
      setMessage(
        `${key} stored in bucket ${bucket}`
      );
    }

    setKey("");
    setValue("");
  }

  function searchHash() {
    const bucket = hash(searchKey);

    setHighlightBucket(bucket);

    const found = buckets[bucket].find(
      x => x.key === searchKey
    );

    if (found) {
      setMessage(
        `${searchKey} found inside bucket ${bucket}`
      );
    } else {
      setMessage("Not found.");
    }
  }

  async function searchLinear() {
    setCheckedIndex(-1);

    for (let i = 0; i < linear.length; i++) {
      setCheckedIndex(i);

      await new Promise(r =>
        setTimeout(r, 700)
      );

      if (
        linear[i].key === searchKey
      ) {
        setMessage(
          `${searchKey} found after checking ${
            i + 1
          } items`
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

    setLinear([]);

    setHighlightBucket(null);

    setAscii([]);

    setSum(0);

    setCheckedIndex(-1);

    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-2">
          HashMap & Buckets
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Understand why HashMap is fast
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("hashmap")
            }
            className={`px-8 py-4 rounded-xl font-bold transition ${
              tab === "hashmap"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            HashMap & Buckets
          </button>

          <button
            onClick={() =>
              setTab("uses")
            }
            className={`px-8 py-4 rounded-xl font-bold transition ${
              tab === "uses"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Why Buckets?
          </button>

        </div>

        {/* Controls */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              value={key}
              onChange={e =>
                setKey(e.target.value)
              }
              placeholder="Key"
              className="border p-3 rounded-xl"
            />

            <input
              value={value}
              onChange={e =>
                setValue(e.target.value)
              }
              placeholder="Value"
              className="border p-3 rounded-xl"
            />

            <button
              onClick={insert}
              className="bg-blue-600 text-white rounded-xl flex justify-center items-center gap-2"
            >
              <Plus />
              Insert
            </button>

            <button
              onClick={reset}
              className="bg-red-500 text-white rounded-xl flex justify-center items-center gap-2"
            >
              <RotateCcw />
              Reset
            </button>

          </div>

          <div className="flex gap-4 mt-4">

            <input
              value={searchKey}
              onChange={e =>
                setSearchKey(
                  e.target.value
                )
              }
              placeholder="Search key"
              className="flex-1 border p-3 rounded-xl"
            />

            {tab === "hashmap" ? (
              <button
                onClick={searchHash}
                className="bg-green-600 text-white px-8 rounded-xl flex items-center gap-2"
              >
                <Search />
                Search
              </button>
            ) : (
              <button
                onClick={searchLinear}
                className="bg-orange-500 text-white px-8 rounded-xl flex items-center gap-2"
              >
                <Search />
                Search
              </button>
            )}

          </div>

        </div>

        {/* TAB 1 */}

        {tab === "hashmap" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

              <h2 className="text-3xl font-bold mb-5 flex gap-3 items-center">
                <Hash />
                Hash Function
              </h2>

              <div className="flex gap-4 flex-wrap">

                {ascii.map((a, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-blue-500 text-white rounded-xl flex items-center justify-center text-xl font-bold animate-bounce"
                  >
                    {a}
                  </div>
                ))}

              </div>

              {ascii.length > 0 && (
                <div className="mt-5 text-2xl font-bold text-blue-600">
                  {sum} % {SIZE} = {highlightBucket}
                </div>
              )}

            </div>

            <div className="grid md:grid-cols-4 gap-5">

              {buckets.map(
                (bucket, index) => (
                  <div
                    key={index}
                    className={`rounded-3xl shadow-lg p-5 transition-all duration-500 ${
                      highlightBucket ===
                      index
                        ? "bg-green-200 scale-105 ring-4 ring-green-400"
                        : "bg-white"
                    }`}
                  >
                    <div className="text-xl font-bold mb-4">
                      Bucket {index}
                    </div>

                    {bucket.length ===
                    0 ? (
                      <div className="text-gray-400">
                        Empty
                      </div>
                    ) : (
                      bucket.map(
                        (item, i) => (
                          <div
                            key={i}
                          >
                            <div className="bg-blue-100 p-3 rounded-xl mb-2 shadow animate-pulse">
                              <div className="font-bold">
                                {item.key}
                              </div>

                              <div>
                                {item.value}
                              </div>
                            </div>

                            {i !==
                              bucket.length -
                                1 && (
                              <div className="text-center text-2xl">
                                ↓
                              </div>
                            )}
                          </div>
                        )
                      )
                    )}
                  </div>
                )
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">
                How HashMap Works
              </h2>

              <p>
                1. Key enters hash
                function.
              </p>

              <p>
                2. Hash function
                calculates bucket
                number.
              </p>

              <p>
                3. Data is stored in
                that bucket.
              </p>

              <p>
                4. If multiple keys
                go to same bucket,
                collision occurs.
              </p>

              <p className="font-bold text-green-600 mt-3">
                Search only checks
                one bucket.
              </p>
            </div>
          </>
        )}

        {/* TAB 2 */}

        {tab === "uses" && (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Without bucket */}

            <div className="bg-red-100 rounded-3xl shadow-xl p-6">

              <h2 className="text-3xl font-bold text-red-700 mb-5">
                Without Buckets
              </h2>

              <div className="space-y-4">

                {linear.map(
                  (item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl transition-all duration-500 ${
                        checkedIndex ===
                        i
                          ? "bg-yellow-300 scale-103"
                          : "bg-red-300"
                      }`}
                    >
                      {item.key} :{" "}
                      {item.value}
                    </div>
                  )
                )}

              </div>

              <div className="mt-6 text-xl font-bold text-red-700">
                Search checks every
                item.
              </div>

              <div className="text-3xl mt-4 font-bold">
                O(n)
              </div>
            </div>

            {/* With bucket */}

            <div className="bg-green-100 rounded-3xl shadow-xl p-6">

              <h2 className="text-3xl font-bold text-green-700 mb-5">
                With Buckets
              </h2>

              <div className="space-y-3">

                {buckets.map(
                  (bucket, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl ${
                        highlightBucket ===
                        i
                          ? "bg-green-200"
                          : "bg-green-200"
                      }`}
                    >
                      Bucket {i}

                      {bucket.length >
                        0 && (
                        <span className="ml-3 font-bold">
                          →
                          {
                            bucket[0]
                              .key
                          }
                        </span>
                      )}
                    </div>
                  )
                )}

              </div>

              <div className="mt-6 text-xl font-bold text-green-700">
                Jump directly to one
                bucket.
              </div>

              <div className="text-3xl mt-4 font-bold">
                O(1)
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database />
                Why Buckets Exist
              </h2>

              <p>
                Without buckets,
                searching means
                checking every item
                one by one.
              </p>

              <p className="mt-2">
                Buckets work like
                shelves in a library.
              </p>

              <p className="mt-2">
                The hash function
                tells us which shelf
                to go to.
              </p>

              <p className="mt-2">
                Only that shelf is
                searched.
              </p>

              <p className="mt-4 text-green-600 font-bold text-xl">
                Buckets are the main
                reason HashMap is
                fast.
              </p>

            </div>
          </div>
        )}{tab === "uses" && (
  <div className="space-y-8">

    {/* Search Flow */}

    {targetBucket !== null && (
      <div className="bg-white rounded-3xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Search Process
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6">

          <div className="bg-blue-100 p-5 rounded-2xl text-center shadow">
            <div className="text-sm text-gray-500">
              Search Key
            </div>
            <div className="text-2xl font-bold">
              {searchKey}
            </div>
          </div>

          <div className="text-4xl">
            ↓
          </div>

          <div
            className={`p-5 rounded-2xl shadow transition ${
              searchStage === "hash"
                ? "bg-yellow-300 animate-pulse scale-110"
                : "bg-yellow-100"
            }`}
          >
            Hash Function
          </div>

          <div className="text-4xl">
            ↓
          </div>

          <div
            className={`p-5 rounded-2xl shadow transition ${
              searchStage === "jump"
                ? "bg-orange-300 animate-bounce"
                : "bg-orange-100"
            }`}
          >
            Jump to Bucket {targetBucket}
          </div>

        </div>
      </div>
    )}

    <div className="grid md:grid-cols-2 gap-8">

      {/* WITHOUT BUCKETS */}

      <div className="bg-red-100 rounded-3xl shadow-xl p-6">

        <h2 className="text-3xl font-bold text-red-700 mb-5">
          Without Buckets
        </h2>

        <div className="mb-4 text-red-700">
          Every item must be checked.
        </div>

        <div className="space-y-4">

          {linear.map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl transition-all duration-500 ${
                checkedIndex === i
                  ? "bg-yellow-300 scale-110 ring-4 ring-yellow-500"
                  : "bg-red-300"
              }`}
            >
              <div className="font-bold">
                {item.key}
              </div>

              <div>
                Value: {item.value}
              </div>
            </div>
          ))}

        </div>

        <div className="mt-6 text-red-700 font-bold text-xl">
          Search path:
        </div>

        <div className="mt-2 text-lg">
          Item 1 ❌
          <br />
          Item 2 ❌
          <br />
          Item 3 ❌
          <br />
          Item n ✅
        </div>

        <div className="mt-6 text-4xl font-bold text-red-700">
          O(n)
        </div>

      </div>

      {/* WITH BUCKETS */}

      <div className="bg-green-100 rounded-3xl shadow-xl p-6">

        <h2 className="text-3xl font-bold text-green-700 mb-5">
          With Buckets
        </h2>

        <div className="mb-4 text-green-700">
          Direct access using hash.
        </div>

        <div className="space-y-3">

          {buckets.map((bucket, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 transition-all duration-700 ${
                highlightBucket === i
                  ? "bg-green-500 text-white scale-105 ring-4 ring-green-300"
                  : "bg-green-200"
              }`}
            >
              <div className="flex justify-between items-center">

                <span className="font-bold">
                  Bucket {i}
                </span>

                <div className="flex gap-2">

                  {bucket.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white text-black px-3 py-1 rounded-lg shadow"
                    >
                      {item.key}
                    </div>
                  ))}

                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="mt-6 text-green-700 font-bold text-xl">
          Search path:
        </div>

        <div className="mt-2 text-lg">
          Hash(key)
          <br />
          ↓
          <br />
          Bucket {targetBucket ?? "?"}
          <br />
          ↓
          <br />
          Search only that bucket
        </div>

        <div className="mt-6 text-4xl font-bold text-green-700">
          O(1)
        </div>

      </div>

    </div>

    {/* Explanation */}

    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
        <Database />
        Why Buckets Exist
      </h2>

      <div className="space-y-3 text-lg">

        <p>
          Without buckets, the computer checks every
          item one by one.
        </p>

        <p>
          Buckets divide data into smaller groups.
        </p>

        <p>
          The hash function calculates which bucket
          should contain the key.
        </p>

        <p>
          Instead of searching the entire collection,
          only one bucket is searched.
        </p>

        <div className="bg-green-100 p-4 rounded-xl mt-4">

          <div className="font-bold text-green-700">
            Library Example
          </div>

          <div className="mt-2">
            Without buckets:
            Search every book.
          </div>

          <div>
            With buckets:
            Go directly to the correct shelf.
          </div>

        </div>

        <div className="text-green-600 text-xl font-bold mt-4">
          Buckets are the main reason HashMap is fast.
        </div>

      </div>

    </div>

  </div>
)}

        {/* Status */}

        <div className="text-center text-2xl text-blue-600 font-bold mt-8">
          {message}
        </div>

      </div>
    </div>
  );
}