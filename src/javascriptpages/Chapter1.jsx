import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  Quote,
  Minus,
  ToggleLeft,
  CircleSlash,
  Repeat,
  ChevronRight,
  Check,
  X,
  BookOpen,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Hero: an animated REPL that "types" real chapter examples           */
/* ------------------------------------------------------------------ */

const REPL_LINES = [
  { expr: `100 + 4 * 11`, result: `144` },
  { expr: `"Straight" + " " + "line"`, result: `"Straight line"` },
  { expr: `typeof 4.5`, result: `"number"` },
  { expr: `1 / 0`, result: `Infinity` },
  { expr: `null == undefined`, result: `true` },
  { expr: `"5" - 1`, result: `4` },
];

function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing"); // typing -> result -> pause
  const line = REPL_LINES[lineIndex];

  useEffect(() => {
    let t;
    if (phase === "typing") {
      if (typed.length < line.expr.length) {
        t = setTimeout(() => setTyped(line.expr.slice(0, typed.length + 1)), 32);
      } else {
        t = setTimeout(() => setPhase("result"), 350);
      }
    } else if (phase === "result") {
      t = setTimeout(() => setPhase("pause"), 1400);
    } else {
      t = setTimeout(() => {
        setTyped("");
        setPhase("typing");
        setLineIndex((i) => (i + 1) % REPL_LINES.length);
      }, 500);
    }
    return () => clearTimeout(t);
  }, [typed, phase, line]);

  return (
    <div className="rounded-xl bg-stone-900 shadow-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-800/80 border-b border-stone-700">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-stone-400 font-mono">node — eloquent.js</span>
      </div>
      <div className="px-5 py-6 font-mono text-[15px] sm:text-base min-h-[104px] flex flex-col justify-center gap-1">
        <div className="flex items-center gap-2 text-stone-100">
          <span className="text-emerald-400">&gt;</span>
          <span>{typed}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[7px] h-[17px] bg-stone-300"
          />
        </div>
        <AnimatePresence mode="wait">
          {phase !== "typing" && (
            <motion.div
              key={lineIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-indigo-300 pl-4"
            >
              {line.result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared UI atoms                                               */
/* ------------------------------------------------------------------ */

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
      {children}
    </div>
  );
}

function Pill({ children, tone = "indigo" }) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    stone: "bg-stone-100 text-stone-600 border-stone-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-mono ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function CodeOut({ children, tone = "indigo" }) {
  const tones = {
    indigo: "text-indigo-700",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
  };
  return (
    <motion.span
      key={String(children)}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`font-mono font-semibold ${tones[tone]}`}
    >
      {children}
    </motion.span>
  );
}

function NumField({ value, onChange, width = "w-20" }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${width} text-center font-mono rounded-lg border border-stone-300 bg-stone-50 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 1. Numbers                                                          */
/* ------------------------------------------------------------------ */

function ArithmeticPlayground() {
  const [a, setA] = useState("6");
  const [b, setB] = useState("4");
  const [op, setOp] = useState("+");

  const na = parseFloat(a);
  const nb = parseFloat(b);
  const ops = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
    "%": (x, y) => x % y,
    "**": (x, y) => x ** y,
  };
  const result =
    Number.isNaN(na) || Number.isNaN(nb) ? "NaN" : String(ops[op](na, nb));

  return (
    <Card>
      <Label>Try it — arithmetic</Label>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <NumField value={a} onChange={setA} />
        <select
          value={op}
          onChange={(e) => setOp(e.target.value)}
          className="font-mono rounded-lg border border-stone-300 bg-stone-50 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {["+", "-", "*", "/", "%", "**"].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <NumField value={b} onChange={setB} />
        <span className="text-stone-400">=</span>
        <div className="min-w-[64px]">
          <CodeOut>{result}</CodeOut>
        </div>
      </div>
      <p className="text-sm text-stone-500 leading-relaxed">
        <code className="text-stone-700">%</code> gives the remainder
        (e.g. <code>314 % 100</code> is <code>14</code>), and{" "}
        <code className="text-stone-700">**</code> raises to a power.
        Operators follow the usual precedence — multiplication and
        division bind tighter than addition and subtraction.
      </p>
    </Card>
  );
}

function SpecialNumbers() {
  const [active, setActive] = useState(null);
  const cases = [
    { id: "inf", label: "Infinity", expr: "Infinity", result: "Infinity" },
    { id: "ninf", label: "-Infinity", expr: "-1 / 0", result: "-Infinity" },
    { id: "nan1", label: "0 / 0", expr: "0 / 0", result: "NaN" },
    { id: "nan2", label: '"five" - 2', expr: '"five" - 2', result: "NaN" },
    { id: "nan3", label: "Infinity - Infinity", expr: "Infinity - Infinity", result: "NaN" },
  ];
  const shown = cases.find((c) => c.id === active);

  return (
    <Card>
      <Label>Special numbers</Label>
      <div className="flex flex-wrap gap-2 mb-4">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-colors ${
              active === c.id
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-stone-50 text-stone-700 border-stone-300 hover:border-indigo-300"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {shown ? (
          <motion.div
            key={shown.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-stone-900 px-4 py-3 font-mono text-sm"
          >
            <span className="text-emerald-400">&gt; </span>
            <span className="text-stone-200">{shown.expr}</span>
            <div className="text-amber-300 pl-4">{shown.result}</div>
          </motion.div>
        ) : (
          <p className="text-sm text-stone-400">Pick one above to evaluate it.</p>
        )}
      </AnimatePresence>
      <p className="text-sm text-stone-500 leading-relaxed mt-4">
        <code className="text-stone-700">Infinity</code> and{" "}
        <code className="text-stone-700">-Infinity</code> handle numbers
        too large to represent. <code className="text-stone-700">NaN</code>{" "}
        ("not a number") is the result of a calculation that makes no
        sense — and oddly, <code>NaN === NaN</code> is <code>false</code>.
      </p>
    </Card>
  );
}

function NumbersTab() {
  return (
    <div className="grid gap-5">
      <p className="text-stone-600 leading-relaxed">
        Numbers are stored as 64-bit floating point values. That covers an
        enormous range, but with limited precision for very large or
        very fractional numbers.
      </p>
      <ArithmeticPlayground />
      <SpecialNumbers />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Strings                                                          */
/* ------------------------------------------------------------------ */

function StringsTab() {
  const [a, setA] = useState("con");
  const [b, setB] = useState("cat");

  return (
    <div className="grid gap-5">
      <p className="text-stone-600 leading-relaxed">
        Strings hold text and are written between quotes (single,
        double, or backtick). Use{" "}
        <code className="text-stone-700">+</code> to glue them together —
        this is called <span className="text-stone-800 font-medium">concatenation</span>.
      </p>
      <Card>
  <Label>Single Quotes ('), Double Quotes ("), and Backticks (`)</Label>

  <div className="space-y-6">

    {/* Single Quotes */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-stone-900 rounded-lg p-4">
        <p className="text-amber-400 mb-2 font-semibold">Single Quotes (')</p>

        <pre className="font-mono text-sm text-stone-200 whitespace-pre-wrap">
{`let name = 'John';

console.log(name);`}
        </pre>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="font-semibold text-emerald-700">Output</p>

        <pre>John</pre>

        <p className="mt-3 text-sm text-stone-600">
          Creates a string using <b>single quotes</b>.
        </p>
      </div>
    </div>

    {/* Double Quotes */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-stone-900 rounded-lg p-4">
        <p className="text-amber-400 mb-2 font-semibold">Double Quotes (")</p>

        <pre className="font-mono text-sm text-stone-200 whitespace-pre-wrap">
{`let city = "Delhi";

console.log(city);`}
        </pre>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="font-semibold text-emerald-700">Output</p>

        <pre>Delhi</pre>

        <p className="mt-3 text-sm text-stone-600">
          Also creates a string. Works the same as single quotes.
        </p>
      </div>
    </div>

    {/* Backticks */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-stone-900 rounded-lg p-4">
        <p className="text-amber-400 mb-2 font-semibold">Backticks (`)</p>

        <pre className="font-mono text-sm text-stone-200 whitespace-pre-wrap">
{`let name = "John";

console.log(\`Hello \${name}\`);`}
        </pre>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="font-semibold text-emerald-700">Output</p>

        <pre>Hello John</pre>

        <p className="mt-3 text-sm text-stone-600">
          Backticks support <b>string interpolation</b> using{" "}
          <code>${"{ }"}</code>.
        </p>
      </div>
    </div>

  </div>

  <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-5">
    <h3 className="font-semibold mb-3">Quick Comparison</h3>

    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Quote</th>
          <th className="text-left py-2">Can Create String</th>
          <th className="text-left py-2">Variables Inside</th>
          <th className="text-left py-2">Multiline</th>
        </tr>
      </thead>

      <tbody>

        <tr className="border-b">
          <td className="font-mono py-2">' '</td>
          <td>✅ Yes</td>
          <td>❌ No</td>
          <td>❌ No</td>
        </tr>

        <tr className="border-b">
          <td className="font-mono py-2">" "</td>
          <td>✅ Yes</td>
          <td>❌ No</td>
          <td>❌ No</td>
        </tr>

        <tr>
          <td className="font-mono py-2">` `</td>
          <td>✅ Yes</td>
          <td>✅ Yes (${`{}`})</td>
          <td>✅ Yes</td>
        </tr>

      </tbody>
    </table>

    <div className="mt-5 rounded-lg bg-yellow-50 border border-yellow-300 p-4">
      <p className="font-semibold mb-2">💡 Remember</p>

      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Single quotes and double quotes both create strings.</li>
        <li>There is no functional difference between them in JavaScript.</li>
        <li>Use backticks when you need to insert variables using <code>${"{variable}"}</code>.</li>
        <li>Backticks also allow multiline strings without using <code>\n</code>.</li>
      </ul>
    </div>
  </div>
</Card>
      <Card>
        <Label>Try it — concatenation</Label>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-28 font-mono rounded-lg border border-stone-300 bg-stone-50 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <span className="text-stone-400">+</span>
          <input
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-28 font-mono rounded-lg border border-stone-300 bg-stone-50 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <span className="text-stone-400">=</span>
          <CodeOut tone="emerald">"{a}{b}"</CodeOut>
        </div>
        <p className="text-sm text-stone-500">
          Length: <CodeOut tone="emerald">{(a + b).length}</CodeOut> characters —
          try <code className="text-stone-700">.length</code> on any string.
        </p>
      </Card>
     <Card>
  <Label>Escaping Special Characters</Label>

  <div className="space-y-4">

    {/* New Line */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-stone-900 p-4 font-mono text-sm text-stone-200">
{`console.log("Hello\\nWorld");`}
      </div>

      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <p className="font-semibold text-emerald-700 mb-2">Output</p>
<pre className="whitespace-pre-wrap">
Hello{"\n"}World
</pre>
      </div>
    </div>

    {/* Tab */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-stone-900 p-4 font-mono text-sm text-stone-200">
{`console.log("Name\\tAge");`}
      </div>

      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <p className="font-semibold text-emerald-700 mb-2">Output</p>
        <pre>Name    Age</pre>
      </div>
    </div>

    {/* Double Quotes */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-stone-900 p-4 font-mono text-sm text-stone-200">
{`console.log("He said, \\"Hello!\\"");`}
      </div>

      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <p className="font-semibold text-emerald-700 mb-2">Output</p>
        <pre>He said, "Hello!"</pre>
      </div>
    </div>

    {/* Single Quotes */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-stone-900 p-4 font-mono text-sm text-stone-200">
{`console.log('It\\'s JavaScript');`}
      </div>

      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <p className="font-semibold text-emerald-700 mb-2">Output</p>
        <pre>It's JavaScript</pre>
      </div>
    </div>

    {/* Backslash */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg bg-stone-900 p-4 font-mono text-sm text-stone-200">
{`console.log("C:\\\\Users\\\\John");`}
      </div>

      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
        <p className="font-semibold text-emerald-700 mb-2">Output</p>
        <pre>C:\Users\John</pre>
      </div>
    </div>

  </div>

  <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
    <h3 className="font-semibold mb-3">Common Escape Characters</h3>

    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Escape</th>
          <th className="text-left py-2">Meaning</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
          <td className="font-mono py-2">\n</td>
          <td>New Line</td>
        </tr>

        <tr className="border-b">
          <td className="font-mono py-2">\t</td>
          <td>Tab Space</td>
        </tr>

        <tr className="border-b">
          <td className="font-mono py-2">\"</td>
          <td>Double Quote</td>
        </tr>

        <tr className="border-b">
          <td className="font-mono py-2">\'</td>
          <td>Single Quote</td>
        </tr>

        <tr>
          <td className="font-mono py-2">\\\</td>
          <td>Backslash</td>
        </tr>
      </tbody>
    </table>
  </div>
</Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Unary operators                                                  */
/* ------------------------------------------------------------------ */

function UnaryTab() {
  const [num, setNum] = useState("12");
const [output, setOutput] = useState("");
  const samples = [
    { label: '"hi"', value: "hi" },
    { label: "42", value: 42 },
    { label: "true", value: true },
    { label: "undefined", value: undefined },
    { label: "Math.max", value: Math.max },
  ];

  const [pick, setPick] = useState(1);
  const n = parseFloat(num);

  const [value, setValue] = useState(5);

  return (
    <div className="grid gap-6">

      {/* typeof */}

      <Card>
        <Label>1. typeof Operator</Label>

        <p className="text-stone-600 mb-4">
          <b>typeof</b> tells us the type of a value.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {samples.map((s, i) => (
            <button
              key={i}
              onClick={() => setPick(i)}
              className={`px-3 py-1.5 rounded-lg border transition ${
                pick === i
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-stone-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="bg-stone-900 rounded-lg p-4 font-mono text-sm">
          <div className="text-stone-200">
            typeof {samples[pick].label}
          </div>

          <div className="text-green-400 mt-2">
            "{typeof samples[pick].value}"
          </div>
        </div>
      </Card>

      {/* Unary Minus */}

      <Card>
        <Label>2. Unary Minus (-)</Label>

        <p className="text-stone-600 mb-4">
          Unary minus changes the sign of a number.
          <br />
          Positive → Negative
          <br />
          Negative → Positive
        </p>

        <div className="flex items-center gap-3">
          <NumField value={num} onChange={setNum} />

          <span className="text-xl font-bold">→</span>

          <CodeOut tone="rose">
            {Number.isNaN(n) ? "NaN" : -n}
          </CodeOut>
        </div>
      </Card>

      {/* Prefix & Postfix */}

<Card>
  <Label>3. Prefix & Postfix Operators</Label>

  <p className="text-stone-600 mb-4">
    <b>Postfix (x++)</b> uses the current value first, then increases it.
    <br />
    <b>Prefix (++x)</b> increases the value first, then uses it.
  </p>

  <div className="bg-stone-900 rounded-lg p-5">
  <pre className="font-mono text-sm leading-7 text-stone-200 whitespace-pre">
{`let x = 5;

let y = x++;
console.log("y =", y);
console.log("x =", x);

let z = ++x;
console.log("z =", z);
console.log("x =", x);
`}
  </pre>
</div>



  <div className="mt-6 overflow-x-auto">
    <table className="w-full border text-sm">
      <thead className="bg-stone-100">
        <tr>
          <th className="border p-2">Step</th>
          <th className="border p-2">What Happens</th>
          <th className="border p-2">Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border p-2 font-mono">x = 5</td>
          <td className="border p-2">Initial Value</td>
          <td className="border p-2">5</td>
        </tr>

        <tr>
          <td className="border p-2 font-mono">y = x++</td>
          <td className="border p-2">
            Return current value, then increment x
          </td>
          <td className="border p-2">
            y = 5, x = 6
          </td>
        </tr>

        <tr>
          <td className="border p-2 font-mono">z = ++x</td>
          <td className="border p-2">
            Increment x first, then return it
          </td>
          <td className="border p-2">
            z = 7, x = 7
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="mt-6 rounded-lg bg-yellow-50 border border-yellow-300 p-4">
    <h3 className="font-semibold mb-2">💡 Easy Trick</h3>

    <p>✅ <b>x++</b> → <b>Use → Change</b></p>

    <p>✅ <b>++x</b> → <b>Change → Use</b></p>
  </div>
</Card>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Boolean values                                                    */
/* ------------------------------------------------------------------ */

function ComparisonPlayground() {
  const VALUES = [
    { label: '5', value: 5 },
    { label: '"5"', value: "5" },
    { label: '10', value: 10 },
    { label: '"10"', value: "10" },
    { label: 'true', value: true },
    { label: 'false', value: false },
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '""', value: "" },
    { label: '" "', value: " " },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
    { label: 'NaN', value: NaN },
    { label: '[]', value: [] },
    { label: '{}', value: {} },
  ];

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);
  const [op, setOp] = useState("==");

  const a = VALUES[left].value;
  const b = VALUES[right].value;

  const operations = {
    ">": (x, y) => x > y,
    "<": (x, y) => x < y,
    ">=": (x, y) => x >= y,
    "<=": (x, y) => x <= y,
    "==": (x, y) => x == y,
    "===": (x, y) => x === y,
    "!=": (x, y) => x != y,
    "!==": (x, y) => x !== y,
  };

  const result = operations[op](a, b);

  const explanation = () => {
    if (op === "==")
      return "Loose equality (==) compares values after automatic type conversion.";

    if (op === "===")
      return "Strict equality (===) compares both value and datatype.";

    if (op === "!=")
      return "Loose inequality (!=) performs type conversion before comparison.";

    if (op === "!==")
      return "Strict inequality (!==) compares both value and datatype.";

    return "Comparison operators convert values when needed before comparing.";
  };

  return (
    <Card>
      <Label>Comparison Playground</Label>

      <p className="text-stone-600 mb-5">
        Select two JavaScript values and compare them.
      </p>

      <div className="flex flex-wrap items-center gap-3">

        <select
          value={left}
          onChange={(e) => setLeft(Number(e.target.value))}
          className="rounded-lg border border-stone-300 px-3 py-2"
        >
          {VALUES.map((v, i) => (
            <option key={i} value={i}>
              {v.label}
            </option>
          ))}
        </select>

        <select
          value={op}
          onChange={(e) => setOp(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 font-mono"
        >
          <option>==</option>
          <option>===</option>
          <option>!=</option>
          <option>!==</option>
          <option>&gt;</option>
          <option>&lt;</option>
          <option>&gt;=</option>
          <option>&lt;=</option>
        </select>

        <select
          value={right}
          onChange={(e) => setRight(Number(e.target.value))}
          className="rounded-lg border border-stone-300 px-3 py-2"
        >
          {VALUES.map((v, i) => (
            <option key={i} value={i}>
              {v.label}
            </option>
          ))}
        </select>

      </div>

      <div className="mt-6 rounded-lg bg-stone-900 p-5 font-mono">

        <div className="text-stone-200">
          {VALUES[left].label} {op} {VALUES[right].label}
        </div>

        <div className="mt-3 text-green-400">
          Result : {String(result)}
        </div>

        <div className="text-cyan-400">
          Type : {typeof result}
        </div>

      </div>

      <div className="mt-5 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h3 className="font-semibold mb-2">
          Explanation
        </h3>

        <p>{explanation()}</p>
      </div>

      <div className="mt-5 rounded-lg bg-yellow-50 border border-yellow-300 p-4">
        <h3 className="font-semibold mb-3">
          Popular Interview Examples
        </h3>

        <ul className="space-y-2 text-sm">
          <li>✅ "5" == 5 → true</li>
          <li>❌ "5" === 5 → false</li>
          <li>✅ null == undefined → true</li>
          <li>❌ null === undefined → false</li>
          <li>✅ 0 == false → true</li>
          <li>❌ 0 === false → false</li>
          <li>✅ "" == false → true</li>
          <li>❌ "" === false → false</li>
          <li>✅ [] == false → true</li>
          <li>❌ [] === false → false</li>
        </ul>
      </div>
    </Card>
  );
}

function LogicalOperators() {
  const [a, setAv] = useState(true);
  const [b, setBv] = useState(false);

  const Toggle = ({ label, value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm transition-colors ${
        value
          ? "bg-indigo-600 border-indigo-600 text-white"
          : "bg-stone-50 border-stone-300 text-stone-700"
      }`}
    >
      {label} = {String(value)}
    </button>
  );

  const rows = [
    { label: "a && b", result: a && b, note: "true only if both are true" },
    { label: "a || b", result: a || b, note: "true if at least one is true" },
    { label: "!a", result: !a, note: "flips a" },
  ];

  return (
    <Card>
      <Label>Try it — logical operators</Label>
      <div className="flex flex-wrap gap-2 mb-4">
        <Toggle label="a" value={a} onChange={setAv} />
        <Toggle label="b" value={b} onChange={setBv} />
      </div>
      <div className="grid gap-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-lg bg-stone-50 border border-stone-200 px-4 py-2.5"
          >
            <span className="font-mono text-sm text-stone-700">{r.label}</span>
            <span className="text-xs text-stone-400 hidden sm:inline">{r.note}</span>
            <span
              className={`inline-flex items-center gap-1 font-mono font-semibold px-2 py-0.5 rounded-md ${
                r.result ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              }`}
            >
              {r.result ? <Check size={14} /> : <X size={14} />}
              {String(r.result)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BooleanTab() {
  return (
    <div className="grid gap-5">
      <p className="text-stone-600 leading-relaxed">
        A boolean is either <code className="text-stone-700">true</code> or{" "}
        <code className="text-stone-700">false</code>. Comparisons produce
        booleans, and logical operators (<code>&&</code>, <code>||</code>,{" "}
        <code>!</code>) combine them.
      </p>
      <Card>
  <Label>Truthy & Falsy Values</Label>

  <p className="text-stone-600 mb-5">
    JavaScript automatically converts values to <b>true</b> or <b>false</b> when used
    inside an <code>if</code> statement or logical expression.
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    {/* Falsy */}

    <div className="rounded-xl border border-red-200 bg-red-50 p-5">
      <h3 className="text-red-700 font-bold mb-4">
        ❌ Falsy Values (Become false)
      </h3>

      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between"><span>false</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>0</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>-0</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>0n</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>""</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>null</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>undefined</span><span>❌ false</span></div>
        <div className="flex justify-between"><span>NaN</span><span>❌ false</span></div>
      </div>
    </div>

    {/* Truthy */}

    <div className="rounded-xl border border-green-200 bg-green-50 p-5">
      <h3 className="text-green-700 font-bold mb-4">
        ✅ Truthy Values (Become true)
      </h3>

      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between"><span>true</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>1</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>-10</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>"Hello"</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>" "</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>[]</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>{`{}`}</span><span>✅ true</span></div>
        <div className="flex justify-between"><span>function(){`{}`}</span><span>✅ true</span></div>
      </div>
    </div>

  </div>

  {/* Examples */}

  <div className="mt-6">
    <h3 className="font-semibold mb-3">Examples</h3>

    <div className="space-y-4">

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-stone-900 rounded-lg p-4">
          <pre className="text-sm text-stone-200 whitespace-pre-wrap">
{`if (0) {
    console.log("Hello");
}`}
          </pre>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="font-semibold text-red-700">Output</p>
          <p>Nothing is printed because <b>0</b> is falsy.</p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-stone-900 rounded-lg p-4">
          <pre className="text-sm text-stone-200 whitespace-pre-wrap">
{`if ("Hello") {
    console.log("Hello");
}`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-semibold text-green-700">Output</p>
          <pre>Hello</pre>
          <p>"Hello" is a truthy value.</p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-stone-900 rounded-lg p-4">
          <pre className="text-sm text-stone-200 whitespace-pre-wrap">
{`if ([]) {
    console.log("Array");
}`}
          </pre>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-semibold text-green-700">Output</p>
          <pre>Array</pre>
          <p>Even an empty array is truthy.</p>
        </div>

      </div>

    </div>
  </div>

  {/* Memory Trick */}

  <div className="mt-6 rounded-lg bg-yellow-50 border border-yellow-300 p-4">
    <h3 className="font-semibold mb-2">💡 Easy Trick</h3>

    <p className="mb-2">
      JavaScript has only <b>8 Falsy Values</b>.
    </p>

    <div className="font-mono text-lg bg-white rounded p-3 border">
      false &nbsp; 0 &nbsp; -0 &nbsp; 0n &nbsp; "" &nbsp; null &nbsp; undefined &nbsp; NaN
    </div>

    <p className="mt-3 font-semibold text-green-700">
      Everything else is Truthy ✅
    </p>
  </div>
</Card>
      <ComparisonPlayground />
      <LogicalOperators />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Empty values                                                     */
/* ------------------------------------------------------------------ */

function EmptyValuesTab() {
  const [declared, setDeclared] = useState(false);
  const [nulled, setNulled] = useState(false);

  return (
    <div className="grid gap-5">
      <p className="text-stone-600 leading-relaxed">
        <code className="text-stone-700">undefined</code> and{" "}
        <code className="text-stone-700">null</code> both denote "no
        meaningful value" — but they arise differently.
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        <Card>
          <Label>undefined</Label>
          <button
            onClick={() => setDeclared((d) => !d)}
            className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:border-indigo-300 mb-3"
          >
            {declared ? "reset" : "let x;  (declare, no value)"}
          </button>
          <div className="rounded-lg bg-stone-900 px-4 py-3 font-mono text-sm">
            <span className="text-stone-200">x</span>
            <div className="pl-4 text-amber-300">
              {declared ? "undefined" : "— run it —"}
            </div>
          </div>
          <p className="text-sm text-stone-500 mt-3">
            A variable that exists but was never given a value.
          </p>
        </Card>
        <Card>
          <Label>null</Label>
          <button
            onClick={() => setNulled((d) => !d)}
            className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:border-indigo-300 mb-3"
          >
            {nulled ? "reset" : "let x = null;  (explicit)"}
          </button>
          <div className="rounded-lg bg-stone-900 px-4 py-3 font-mono text-sm">
            <span className="text-stone-200">x</span>
            <div className="pl-4 text-amber-300">
              {nulled ? "null" : "— run it —"}
            </div>
          </div>
          <p className="text-sm text-stone-500 mt-3">
            A value you set deliberately to mean "nothing here."
          </p>
        </Card>
      </div>
      <Card className="bg-stone-50">
        <p className="text-sm text-stone-500">
          Most of the time the distinction doesn't matter much, and{" "}
          <code className="text-stone-700">null == undefined</code> is{" "}
          <code className="text-stone-700">true</code>.
        </p>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Automatic type conversion                                        */
/* ------------------------------------------------------------------ */

const COERCIONS = [
  { expr: '8 * null', result: '0', note: 'null becomes 0' },
  { expr: '"5" - 1', result: '4', note: 'the string is converted to a number' },
  { expr: '"5" + 1', result: '"51"', note: '+ prefers strings — 1 becomes "1"' },
  { expr: '"five" * 2', result: 'NaN', note: '"five" cannot become a number' },
  { expr: 'false == 0', result: 'true', note: 'false converts to 0' },
];

function TypeConversionTab() {
  const [active, setActive] = useState(0);
  const c = COERCIONS[active];

  const [chain, setChain] = useState([]);
  const values = ["0", '""', "null", "undefined", "NaN", '"Book"', "true"];
  const toVal = (label) => {
    if (label === "0") return 0;
    if (label === '""') return "";
    if (label === "null") return null;
    if (label === "undefined") return undefined;
    if (label === "NaN") return NaN;
    if (label === "true") return true;
    return label.replace(/"/g, "");
  };

  const chainResultIndex = useMemo(() => {
    if (chain.length === 0) return -1;
    for (let i = 0; i < chain.length; i++) {
      if (toVal(chain[i])) return i; // || stops at first truthy
    }
    return chain.length - 1;
  }, [chain]);

  return (
    <div className="grid gap-5">
      <p className="text-stone-600 leading-relaxed">
        When operators meet values of different types, JavaScript
        silently converts one side rather than raising an error. This is
        convenient — until it's confusing.
      </p>
      <Card>
        <Label>Try it — coercion</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {COERCIONS.map((item, i) => (
            <button
              key={item.expr}
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono border transition-colors ${
                active === i
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-stone-50 text-stone-700 border-stone-300 hover:border-indigo-300"
              }`}
            >
              {item.expr}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg bg-stone-900 px-4 py-3 font-mono text-sm"
          >
            <span className="text-emerald-400">&gt; </span>
            <span className="text-stone-200">{c.expr}</span>
            <div className="text-amber-300 pl-4">{c.result}</div>
          </motion.div>
        </AnimatePresence>
        <p className="text-sm text-stone-500 mt-3">{c.note}</p>
      </Card>

      <Card>
        <Label>Short-circuiting of && and ||</Label>
        <p className="text-sm text-stone-500 mb-3">
          Build a chain of values joined by <code className="text-stone-700">||</code>.
          JavaScript evaluates left to right and stops at the first{" "}
          <span className="text-stone-800 font-medium">truthy</span> value.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {values.map((v) => (
            <button
              key={v}
              onClick={() => setChain((c) => [...c, v])}
              className="px-2.5 py-1 rounded-lg text-sm font-mono border border-stone-300 bg-stone-50 hover:border-indigo-300"
            >
              {v}
            </button>
          ))}
          <button
            onClick={() => setChain([])}
            className="px-2.5 py-1 rounded-lg text-sm font-mono border border-stone-300 text-stone-400 hover:text-rose-600 hover:border-rose-300"
          >
            clear
          </button>
        </div>
        {chain.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
            {chain.map((v, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-stone-400">||</span>}
                <motion.span
                  animate={
                    i === chainResultIndex
                      ? { scale: [1, 1.08, 1] }
                      : { opacity: i < chainResultIndex ? 0.35 : 1 }
                  }
                  className={`px-2 py-1 rounded-md border ${
                    i === chainResultIndex
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                      : "bg-stone-50 border-stone-200 text-stone-500"
                  }`}
                >
                  {v}
                </motion.span>
              </React.Fragment>
            ))}
            <span className="text-stone-400">→ result:</span>
            <CodeOut tone="emerald">{chain[chainResultIndex]}</CodeOut>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main app                                                            */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: "numbers", label: "Numbers", icon: Hash, Comp: NumbersTab },
  { id: "strings", label: "Strings", icon: Quote, Comp: StringsTab },
  { id: "unary", label: "Unary Operators", icon: Minus, Comp: UnaryTab },
  { id: "boolean", label: "Boolean Values", icon: ToggleLeft, Comp: BooleanTab },
  { id: "empty", label: "Empty Values", icon: CircleSlash, Comp: EmptyValuesTab },
  { id: "conversion", label: "Type Conversion", icon: Repeat, Comp: TypeConversionTab },
];

export default function ValuesTypesOperators() {
  const [tab, setTab] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === tab);
  const Panel = active.Comp;

  return (
    <div className="min-h-screen w-full bg-stone-50 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <div className="flex items-center gap-2.5 text-stone-400 text-sm font-mono mb-3">
          <BookOpen size={16} />
          <span>Chapter 1</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3">
          Values, Types, and Operators
        </h1>
        <p className="text-stone-500 max-w-2xl mb-8 leading-relaxed">
          The raw material a program works with. Every value has a type,
          and operators combine values into new ones — explore each idea
          below with a live example.
        </p>

        <div className="mb-8">
          <TerminalHero />
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6 sm:gap-8">
          {/* Sidebar nav */}
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {TABS.map((t, i) => {
              const Icon = t.icon;
              const isActive = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap md:whitespace-normal text-left transition-colors shrink-0"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-indigo-600 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-xs font-mono ${
                      isActive ? "text-indigo-200" : "text-stone-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    size={16}
                    className={`relative z-10 ${isActive ? "text-white" : "text-stone-400"}`}
                  />
                  <span className={`relative z-10 ${isActive ? "text-white" : "text-stone-700"}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ChevronRight size={16} className="text-indigo-500" />
                  <h2 className="font-serif text-xl font-semibold text-stone-900">
                    {active.label}
                  </h2>
                </div>
                <Panel />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
