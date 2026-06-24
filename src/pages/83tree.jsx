import React, { useState } from "react";
import {
  Crown,
  Users,
  FolderTree,
  Building2,
  Code2,
  UserRound
} from "lucide-react";

export default function TreeVisualizer() {
  const [tab, setTab] = useState("tree");
  const [selected, setSelected] = useState("A");

  const tree = {
    value: "A",
    children: [
      {
        value: "B",
        children: [
          { value: "D", children: [] },
          { value: "E", children: [] }
        ]
      },
      {
        value: "C",
        children: [
          { value: "F", children: [] }
        ]
      }
    ]
  };

  function findNode(node, value, parent = null) {
    if (node.value === value) {
      return { node, parent };
    }

    for (const child of node.children) {
      const result = findNode(
        child,
        value,
        node
      );

      if (result) return result;
    }

    return null;
  }

  const result = findNode(tree, selected);

  const selectedNode = result?.node;
  const parent = result?.parent;

  function Node({ node }) {
    const isSelected =
      selected === node.value;

    const isParent =
      parent?.value === node.value;

    const isChild =
      selectedNode?.children.some(
        c => c.value === node.value
      );

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
              : isChild
              ? "bg-green-400"
              : "bg-white"
          }`}
        >
          {node.value}
        </button>

        {node.children.length > 0 && (
          <>
            <div className="h-10 border-l-4 border-gray-500"></div>

            <div className="flex gap-16">
              {node.children.map(child => (
                <Node
                  key={child.value}
                  node={child}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-2">
          Tree Data Structure
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Parent • Child • Real World Usage
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("tree")
            }
            className={`px-8 py-4 rounded-xl font-bold transition ${
              tab === "tree"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Relationships
          </button>

          <button
            onClick={() =>
              setTab("usage")
            }
            className={`px-8 py-4 rounded-xl font-bold transition ${
              tab === "usage"
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            Usage Examples
          </button>

        </div>

        {/* TAB 1 */}

        {tab === "tree" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

              <div className="flex justify-center">
                <Node node={tree} />
              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-5">

              <div className="bg-purple-100 p-6 rounded-2xl shadow">

                <div className="flex gap-2 mb-3">
                  <Crown />
                  <span className="font-bold">
                    Root
                  </span>
                </div>

                <div className="text-3xl">
                  A
                </div>

              </div>

              <div className="bg-yellow-100 p-6 rounded-2xl shadow">

                <div className="flex gap-2 mb-3">
                  <Users />
                  <span className="font-bold">
                    Parent
                  </span>
                </div>

                <div className="text-3xl">
                  {parent
                    ? parent.value
                    : "None"}
                </div>

              </div>

              <div className="bg-green-100 p-6 rounded-2xl shadow">

                <div className="font-bold mb-3">
                  Children
                </div>

                <div className="text-2xl">
                  {selectedNode.children.length
                    ? selectedNode.children
                        .map(
                          c => c.value
                        )
                        .join(", ")
                    : "None"}
                </div>

              </div>

              <div className="bg-blue-100 p-6 rounded-2xl shadow">

                <div className="font-bold mb-3">
                  Node Type
                </div>

                <div className="text-2xl">
                  {selected === "A"
                    ? "Root"
                    : selectedNode.children
                        .length === 0
                    ? "Leaf"
                    : "Internal"}
                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Click Any Node
              </h2>

              <ul className="space-y-2 text-lg">
                <li>🔵 Selected node</li>
                <li>🟡 Parent</li>
                <li>🟢 Children</li>
                <li>🍃 Leaf nodes have no children</li>
                <li>🌳 Root has no parent</li>
              </ul>

            </div>
          </>
        )}

        {/* TAB 2 */}

        {tab === "usage" && (
          <div className="grid md:grid-cols-2 gap-8">

            {/* File System */}

            <div className="bg-yellow-100 rounded-3xl shadow-xl p-6">

              <div className="flex gap-3 items-center mb-4">
                <FolderTree size={35} />
                <h2 className="text-3xl font-bold">
                  File System
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl text-lg font-mono">

                C:
                <br />
                ├── Users
                <br />
                │ └── Documents
                <br />
                │ └── Photos
                <br />
                └── Program Files

              </div>

            </div>

            {/* Organization */}

            <div className="bg-blue-100 rounded-3xl shadow-xl p-6">

              <div className="flex gap-3 items-center mb-4">
                <Building2 size={35} />
                <h2 className="text-3xl font-bold">
                  Company Structure
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl text-lg">

                CEO
                <br />
                ├── Manager
                <br />
                │ ├── Developer
                <br />
                │ └── Tester
                <br />
                └── HR

              </div>

            </div>

            {/* DOM */}

            <div className="bg-green-100 rounded-3xl shadow-xl p-6">

              <div className="flex gap-3 items-center mb-4">
                <Code2 size={35} />
                <h2 className="text-3xl font-bold">
                  HTML DOM
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl text-lg font-mono">

                html
                <br />
                └── body
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── div
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── button

              </div>

            </div>

            {/* Family */}

            <div className="bg-pink-100 rounded-3xl shadow-xl p-6">

              <div className="flex gap-3 items-center mb-4">
                <UserRound size={35} />
                <h2 className="text-3xl font-bold">
                  Family Tree
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl text-lg">

                Grandfather
                <br />
                ├── Father
                <br />
                │ ├── Son
                <br />
                │ └── Daughter
                <br />
                └── Uncle

              </div>

            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Why Trees Are Useful
              </h2>

              <p className="mb-3">
                Trees organize hierarchical data.
              </p>

              <p className="mb-3">
                Every node can have children.
              </p>

              <p className="mb-3">
                Searching and traversal become easier.
              </p>

              <p className="text-green-600 text-xl font-bold mt-4">
                Whenever data has levels or hierarchy,
                trees are usually the solution.
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}