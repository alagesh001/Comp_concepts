import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Smartphone,
  Globe
} from "lucide-react";

export default function TrieVisualizer() {
  const [tab, setTab] = useState("trie");

  const [searchWord, setSearchWord] =
    useState("");

  const [visited, setVisited] =
    useState([]);

  const [found, setFound] =
    useState(false);

  const words = [
    "CAT",
    "CAR",
    "CAN",
    "DOG"
  ];

  async function searchTrie() {
    setVisited([]);
    setFound(false);

    const word =
      searchWord.toUpperCase();

    for (let i = 0; i < word.length; i++) {
      const prefix = word.slice(
        0,
        i + 1
      );

      setVisited(prev => [
        ...prev,
        prefix
      ]);

      await new Promise(r =>
        setTimeout(r, 800)
      );
    }

    if (words.includes(word)) {
      setFound(true);
    }
  }

  function LetterNode({
    value,
    prefix,
    end
  }) {
    const active =
      visited.includes(prefix);

    const success =
      found &&
      prefix ===
        searchWord.toUpperCase();

    return (
      <div className="flex flex-col items-center">

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow transition-all duration-500 ${
            success
              ? "bg-green-500 text-white scale-125"
              : active
              ? "bg-yellow-300 scale-110"
              : "bg-white"
          }`}
        >
          {value}
        </div>

        {end && (
          <div className="text-green-600 text-sm font-bold mt-2">
            Word End
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Trie Data Structure
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Fast Word Searching
        </p>
<p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">
  A Trie (pronounced "try") is a tree-like data structure used to store and search words efficiently. 
  It stores characters one by one, allowing fast word lookup, prefix matching, and autocomplete suggestions.
</p>
        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("trie")
            }
            className={`px-8 py-4 rounded-xl ${
              tab === "trie"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Trie
          </button>

          <button
            onClick={() =>
              setTab("search")
            }
            className={`px-8 py-4 rounded-xl ${
              tab === "search"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Search
          </button>

          <button
            onClick={() =>
              setTab("usage")
            }
            className={`px-8 py-4 rounded-xl ${
              tab === "usage"
                ? "bg-purple-600 text-white"
                : "bg-white"
            }`}
          >
            Usage
          </button>

        </div>

        {/* TAB 1 */}

        {tab === "trie" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="flex justify-center">

                <div className="flex flex-col items-center">

                  <div className="bg-blue-500 text-white px-6 py-3 rounded-xl mb-8">
                    ROOT
                  </div>

                  <LetterNode
                    value="C"
                    prefix="C"
                  />

                  <div className="h-8 border-l-4"></div>

                  <LetterNode
                    value="A"
                    prefix="CA"
                  />

                  <div className="h-8 border-l-4"></div>

                  <div className="flex gap-10">

                    <LetterNode
                      value="T"
                      prefix="CAT"
                      end
                    />

                    <LetterNode
                      value="R"
                      prefix="CAR"
                      end
                    />

                    <LetterNode
                      value="N"
                      prefix="CAN"
                      end
                    />

                  </div>

                </div>

                <div className="mx-24"></div>

                <div className="flex flex-col items-center">

                  <LetterNode
                    value="D"
                    prefix="D"
                  />

                  <div className="h-8 border-l-4"></div>

                  <LetterNode
                    value="O"
                    prefix="DO"
                  />

                  <div className="h-8 border-l-4"></div>

                  <LetterNode
                    value="G"
                    prefix="DOG"
                    end
                  />

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Why Trie Saves Space
              </h2>

              <p>
                CAT, CAR and CAN share:
              </p>

              <div className="text-3xl text-blue-600 font-bold mt-4">
                C → A
              </div>

              <p className="mt-4">
                Shared prefixes are stored once.
              </p>

            </div>
          </>
        )}

        {/* TAB 2 */}

        {tab === "search" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

              <div className="flex gap-4">

                <input
                  value={searchWord}
                  onChange={e =>
                    setSearchWord(
                      e.target.value
                    )
                  }
                  placeholder="Search word"
                  className="border p-3 rounded-xl flex-1"
                />

                <button
                  onClick={searchTrie}
                  className="bg-green-600 text-white px-8 rounded-xl flex gap-2 items-center"
                >
                  <Search />
                  Search
                </button>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="flex gap-4 flex-wrap">

                {visited.map(
                  (step, i) => (
                    <div
                      key={i}
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold ${
                        i ===
                          visited.length -
                            1 &&
                        found
                          ? "bg-green-500 text-white"
                          : "bg-yellow-300"
                      }`}
                    >
                      {step}
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-blue-100 rounded-3xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Search Path
              </h2>

              {visited.map(
                (step, i) => (
                  <div key={i}>
                    {step}
                  </div>
                )
              )}

              {found ? (
                <div className="text-green-600 text-2xl font-bold mt-4">
                  Word Found
                </div>
              ) : (
                visited.length > 0 && (
                  <div className="text-red-600 text-2xl font-bold mt-4">
                    Word Not Found
                  </div>
                )
              )}

            </div>
          </>
        )}

        {/* TAB 3 */}

        {tab === "usage" && (
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Globe />
                <h2 className="text-3xl font-bold">
                  Search Engines
                </h2>
              </div>

              Google suggestions.
            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Smartphone />
                <h2 className="text-3xl font-bold">
                  Contacts
                </h2>
              </div>

              Phone search.
            </div>

            <div className="bg-yellow-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <BookOpen />
                <h2 className="text-3xl font-bold">
                  Dictionaries
                </h2>
              </div>

              Word lookup.
            </div>

            <div className="bg-purple-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Search />
                <h2 className="text-3xl font-bold">
                  Autocomplete
                </h2>
              </div>

              Suggestions while typing.
            </div>

          </div>
        )}

      </div>
    </div>
  );
}