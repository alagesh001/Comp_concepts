import { useState } from "react";
export default function Assessment() {
  return <div>Assessment</div>;
}
export function ColorCodingChallenge() {
  const [color, setColor] = useState("red");

  return (
    <section className="bg-gray-50 p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-2">
        Mini Coding Challenge
      </h2>

      <p className="text-gray-600 mb-6">
        Change the color value below and see the circle update.
      </p>

      {/* Circle */}
      <div className="flex justify-center mb-6">
        <div
          className="w-32 h-32 rounded-full border-4 border-gray-300 transition-all duration-300"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Code Editor */}
      If you want it to look even more like coding, you can do:

<div className="bg-gray-900 text-gray-200 font-mono p-4 rounded-lg">
  <div>const circle = {"{"}</div>

  <div className="ml-4 flex items-center">
    <span className="text-blue-400">color:</span>

    <div className="flex items-center">
  <span className="text-green-400">"</span>

 <input
  value={color}
  onChange={(e) => setColor(e.target.value)}
  style={{
    width: `${Math.max(color.length, 0.5)}ch`,
  }}
  className="bg-transparent text-yellow-300 outline-none"
/>

  <span className="text-green-400">"</span>
</div>

   
  </div>

  <div>{"};"}</div>
</div>

      <p className="mt-4 text-sm text-gray-500">
        Try: red, blue, green, orange, purple, pink, black
      </p>
    </section>
  );
}


export function PaddingChallenge() {
  const [padding, setPadding] = useState("16");

  return (
    <section className="bg-gray-50 p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-2">
        Mini Coding Challenge
      </h2>

      <p className="text-gray-600 mb-6">
        Change the padding value to make the button bigger or smaller.
      </p>

      {/* Preview */}
      <div className="flex justify-center mb-6">
        <button
          style={{
            padding: `${padding}px`,
          }}
          className="bg-blue-600 text-white rounded transition-all"
        >
          Click Me
        </button>
      </div>

      {/* Code */}
      <div className="bg-gray-900 text-gray-200 font-mono p-4 rounded-lg">
        <div>const button = {"{"}</div>

        <div className="ml-4 flex items-center">
          <span className="text-blue-400 mr-1">padding:</span>

          <input
            value={padding}
            onChange={(e) =>
              setPadding(e.target.value.replace(/[^0-9]/g, ""))
            }
            style={{
              width: `${Math.max(padding.length, 1)}ch`,
            }}
            className="bg-transparent text-yellow-300 outline-none"
          />

          <span className="text-green-400">px</span>
        </div>

        <div>{"};"}</div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Try values: 5, 10, 20, 30
      </p>
    </section>
  );
}

export function BoxSizeChallenge() {
  const [width, setWidth] = useState("120");
  const [height, setHeight] = useState("120");

  return (
    <section className="bg-gray-50 p-6 rounded-xl border">
      <h2 className="text-xl font-semibold mb-2">
        Mini Coding Challenge
      </h2>

      <p className="text-gray-600 mb-6">
        Change the width and height values to resize the box.
      </p>

      {/* Preview */}
      <div className="flex justify-center mb-8">
        <div
          className="bg-blue-500 rounded transition-all duration-300"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      </div>

      {/* Code Editor */}
      <div className="bg-gray-900 text-gray-200 font-mono p-4 rounded-lg">
        <div>const box = {"{"}</div>

        <div className="ml-4 flex items-center">
          <span className="text-blue-400 mr-1">
            width:
          </span>

          <input
            value={width}
            onChange={(e) =>
              setWidth(
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            style={{
              width: `${Math.max(width.length, 1)}ch`,
            }}
            className="bg-transparent text-yellow-300 outline-none"
          />

          <span className="text-green-400">
            px;
          </span>
        </div>

        <div className="ml-4 flex items-center">
          <span className="text-blue-400 mr-1">
            height:
          </span>

          <input
            value={height}
            onChange={(e) =>
              setHeight(
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            style={{
              width: `${Math.max(height.length, 1)}ch`,
            }}
            className="bg-transparent text-yellow-300 outline-none"
          />

          <span className="text-green-400">
            px;
          </span>
        </div>

        <div>{"};"}</div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Try values like 50, 100, 200.
      </p>
    </section>
  );
}

