import React, { useState } from "react";
import {
  GitBranch,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Calculator,
  Search,
  Workflow
} from "lucide-react";

export default function BinaryTreeVisualizer() {
  const [tab, setTab] = useState("tree");
  const [selected, setSelected] = useState("A");

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: { value: "D" },
      right: { value: "E" }
    },
    right: {
      value: "C",
      left: { value: "F" },
      right: { value: "G" }
    }
  };

  function findNode(node, value, parent = null) {
    if (!node) return null;

    if (node.value === value) {
      return { node, parent };
    }

    return (
      findNode(node.left, value, node) ||
      findNode(node.right, value, node)
    );
  }

  const result = findNode(tree, selected);

  const current = result?.node;
  const parent = result?.parent;

  function TreeNode({ node }) {
    if (!node) return null;

    const isSelected =
      selected === node.value;

    const isLeft =
      current?.left?.value === node.value;

    const isRight =
      current?.right?.value === node.value;

    const isParent =
      parent?.value === node.value;

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

              <TreeNode node={node.left} />

              <TreeNode node={node.right} />

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
          Binary Tree
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Left Child • Right Child • Usage
        </p>

        {/* Tabs */}

        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={() =>
              setTab("tree")
            }
            className={`px-8 py-4 rounded-xl font-bold ${
              tab === "tree"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Structure
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

        {/* TAB 1 */}

        {tab === "tree" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

              <div className="flex justify-center">
                <TreeNode node={tree} />
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
                  Type
                </div>

                <div className="text-2xl">
                  {selected === "A"
                    ? "Root"
                    : !current?.left &&
                      !current?.right
                    ? "Leaf"
                    : "Internal"}
                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

              <h2 className="text-2xl font-bold mb-4">
                Binary Tree Rules
              </h2>

              <ul className="space-y-3 text-lg">

                <li>
                  🌳 One root node.
                </li>

                <li>
                  ⬅ Maximum one left child.
                </li>

                <li>
                  ➡ Maximum one right child.
                </li>

                <li>
                  🍃 Leaf nodes have no children.
                </li>

              </ul>

            </div>
          </>
        )}

        {/* TAB 2 */}

        {tab === "usage" && (
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-blue-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 mb-4">
                <Search />
                <h2 className="text-3xl font-bold">
                  Binary Search Tree
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">

                Smaller → Left

                <br />

                Greater → Right

              </div>

            </div>

            <div className="bg-green-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 mb-4">
                <Calculator />
                <h2 className="text-3xl font-bold">
                  Expression Trees
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">

                +

                <br />

                / \

                <br />

                5 ×

                <br />

                / \

                <br />

                3 2

              </div>

            </div>

            <div className="bg-yellow-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 mb-4">
                <Workflow />
                <h2 className="text-3xl font-bold">
                  Decision Trees
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">

                Rain?

                <br />

                Yes → Umbrella

                <br />

                No → Go Outside

              </div>

            </div>

            <div className="bg-pink-100 rounded-3xl p-6 shadow">

              <div className="flex gap-3 mb-4">
                <Cpu />
                <h2 className="text-3xl font-bold">
                  Heaps
                </h2>
              </div>

              <div className="bg-white p-5 rounded-2xl">

                Priority Queue

                <br />

                Task Scheduling

              </div>

            </div>

            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Why Binary Trees Exist
              </h2>

              <p className="mb-3">
                Limiting nodes to two children creates
                ordered structures.
              </p>

              <p className="mb-3">
                Searching becomes efficient.
              </p>

              <p className="mb-3">
                Decisions naturally branch into
                two directions.
              </p>

              <div className="text-green-600 text-xl font-bold mt-4">
                Many advanced data structures are
                based on binary trees.
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}