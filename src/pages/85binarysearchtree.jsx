import React, { useState } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Database,
  Phone,
  Trophy
} from "lucide-react";

export default function BSTVisualizer() {
  const [tab, setTab] = useState("bst");
  const [selected, setSelected] = useState(50);
  const [visited, setVisited] =
    useState([]);
      const [found, setFound] =
        useState(null);
  const [searchValue, setSearchValue] =
    useState("");
  const tree = {
    value: 50,
    left: {
      value: 30,
      left: { value: 20 },
      right: { value: 40 }
    },
    right: {
      value: 70,
      left: { value: 60 },
      right: { value: 80 }
    }
  };
  async function searchBST() {
    let current = tree;

    setVisited([]);
    setFound(null);

    while (current) {
      setVisited(prev => [
        ...prev,
        current.value
      ]);

      await new Promise(r =>
        setTimeout(r, 1000)
      );

      if (
        current.value ===
        Number(searchValue)
      ) {
        setFound(current.value);
        return;
      }

      if (
        Number(searchValue) <
        current.value
      ) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }
  function findNode(node, value, parent = null) {
    if (!node) return null;

    if (node.value === value)
      return { node, parent };

    return (
      findNode(node.left, value, node) ||
      findNode(node.right, value, node)
    );
  }

  const result = findNode(tree, selected);

  const current = result?.node;
  const parent = result?.parent;

  function Node({ node }) {
    if (!node) return null;

    const isSelected =
      selected === node.value;

    const isParent =
      parent?.value === node.value;

    const isLeft =
      current?.left?.value === node.value;

    const isRight =
      current?.right?.value === node.value;

    return (
      <div className="flex flex-col items-center">

        <button
          onClick={() =>
            setSelected(node.value)
          }
          className={`w-20 h-20 rounded-full text-xl font-bold shadow-lg transition-all duration-500 ${
            isSelected
              ? "bg-blue-500 text-white scale-125"
              : isParent
              ? "bg-yellow-400"
              : isLeft
              ? "bg-green-400"
              : isRight
              ? "bg-pink-400"
              : "bg-white"
          }`}
        >
          {node.value}
        </button>

        {(node.left || node.right) && (
          <>
            <div className="h-8 border-l-4 border-gray-500"></div>

            <div className="flex gap-20">

              <Node node={node.left} />

              <Node node={node.right} />

            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-3">
          Binary Search Tree
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Left &lt; Parent &lt; Right
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() => setTab("bst")}
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "bst"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            BST Rules
          </button>
 <button
            onClick={() =>
              setTab("search")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "search"
                ? "bg-red-600 text-white"
                : "bg-white"
            }`}
          >
            Search
          </button>
          <button
            onClick={() =>
              setTab("usage")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "usage"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Usage
          </button>

        </div>

        {tab === "bst" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

              <div className="flex justify-center">
                <Node node={tree} />
              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-5">

              <div className="bg-yellow-100 p-6 rounded-2xl">

                <div className="font-bold mb-3">
                  Parent
                </div>

                <div className="text-3xl">
                  {parent
                    ? parent.value
                    : "None"}
                </div>

              </div>

              <div className="bg-green-100 p-6 rounded-2xl">

                <div className="flex gap-2 mb-3">
                  <ArrowLeft />
                  Left Child
                </div>

                <div className="text-3xl">
                  {current?.left
                    ? current.left.value
                    : "None"}
                </div>

              </div>

              <div className="bg-pink-100 p-6 rounded-2xl">

                <div className="flex gap-2 mb-3">
                  <ArrowRight />
                  Right Child
                </div>

                <div className="text-3xl">
                  {current?.right
                    ? current.right.value
                    : "None"}
                </div>

              </div>

              <div className="bg-blue-100 p-6 rounded-2xl">

                <div className="font-bold mb-3">
                  BST Rule
                </div>

                <div className="text-xl">
                  Left &lt; {selected}
                  <br />
                  Right &gt; {selected}
                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                BST Property
              </h2>

              <ul className="space-y-3 text-lg">
                <li>
                  Smaller values go left.
                </li>

                <li>
                  Larger values go right.
                </li>

                <li>
                  Searching follows one path.
                </li>

                <li>
                  Average search complexity:
                  O(log n)
                </li>
              </ul>

            </div>
          </>
        )}
  {tab === "search" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

              <div className="flex gap-4">

                <input
                  value={searchValue}
                  onChange={e =>
                    setSearchValue(
                      e.target.value
                    )
                  }
                  placeholder="Search value"
                  className="border p-3 rounded-xl flex-1"
                />

                <button
                  onClick={searchBST}
                  className="bg-green-600 text-white px-8 rounded-xl flex gap-2 items-center"
                >
                  <Search size={18} />
                  Search
                </button>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <div className="flex justify-center">
                <Node node={tree} />
              </div>

            </div>

            <div className="bg-blue-100 rounded-3xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Search Path
              </h2>

              <div className="flex gap-4 flex-wrap">

                {visited.map((node, i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold ${
                      found === node
                        ? "bg-green-500 text-white"
                        : "bg-yellow-300"
                    }`}
                  >
                    {node}
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Example
              </h2>

              <div className="text-xl">

                Search 60:

                <br /><br />

                50

                <br />

                60 &gt; 50

                <br />

                Go Right

                <br /><br />

                70

                <br />

                60 &lt; 70

                <br />

                Go Left

                <br /><br />

                60 Found

              </div>

            </div>
          </>
        )}

        {tab === "usage" && (
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Search />
                <h2 className="text-3xl font-bold">
                  Searching
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                Fast lookup of values.
              </div>

            </div>

            <div className="bg-green-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Database />
                <h2 className="text-3xl font-bold">
                  Databases
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                Indexing records.
              </div>

            </div>

            <div className="bg-yellow-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Phone />
                <h2 className="text-3xl font-bold">
                  Contacts
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                Names can be searched quickly.
              </div>

            </div>

            <div className="bg-pink-100 rounded-3xl p-6">

              <div className="flex gap-3 mb-4">
                <Trophy />
                <h2 className="text-3xl font-bold">
                  Rankings
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">
                Maintain sorted order.
              </div>

            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Why BST Exists
              </h2>

              <p>
                Arrays require scanning.
              </p>

              <p>
                BST eliminates half of the remaining
                values at each comparison.
              </p>

              <p className="text-green-600 text-xl font-bold mt-4">
                Average search complexity:
                O(log n)
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}