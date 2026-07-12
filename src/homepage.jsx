import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Coffee,
  FileCode2,
  Database,
  Globe,
  Server,
  Boxes,
  Network,
  GitBranch,
  Monitor,
  Brain,
  GraduationCap,
} from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "JavaScript",
      icon: <Code2 size={34} />,
      path: "/javascript",
      color: "bg-yellow-500",
      topics: [
        "Variables",
        "Functions",
        "Objects",
        "Arrays",
        "Closures",
        "Promises",
      ],
    },
    {
      title: "Java",
      icon: <Coffee size={34} />,
      path: "/java",
      color: "bg-orange-500",
      topics: [
        "OOP",
        "Collections",
        "Streams",
        "JDBC",
        "Threads",
        "Exceptions",
      ],
    },
    {
      title: "Python",
      icon: <Brain size={34} />,
      path: "/python",
      color: "bg-blue-500",
      topics: [
        "Functions",
        "OOP",
        "Decorators",
        "Generators",
        "Async",
        "Modules",
      ],
    },
    {
      title: "PHP",
      icon: <FileCode2 size={34} />,
      path: "/php",
      color: "bg-indigo-500",
      topics: [
        "Basics",
        "Arrays",
        "Sessions",
        "Cookies",
        "Laravel",
        "PDO",
      ],
    },
    {
      title: "HTML & CSS",
      icon: <Globe size={34} />,
      path: "/frontend",
      color: "bg-pink-500",
      topics: [
        "HTML",
        "CSS",
        "Flexbox",
        "Grid",
        "Responsive",
        "Animations",
      ],
    },
    {
      title: "Node.js",
      icon: <Server size={34} />,
      path: "/nodejs",
      color: "bg-green-500",
      topics: [
        "Express",
        "REST API",
        "JWT",
        "Sockets",
        "Middleware",
        "NPM",
      ],
    },
    {
      title: "OOP",
      icon: <Boxes size={34} />,
      path: "/oops",
      color: "bg-purple-500",
      topics: [
        "Class",
        "Object",
        "Inheritance",
        "Polymorphism",
        "Abstraction",
        "Encapsulation",
      ],
    },
    {
      title: "Database",
      icon: <Database size={34} />,
      path: "/database",
      color: "bg-cyan-500",
      topics: [
        "MySQL",
        "MongoDB",
        "Joins",
        "Indexes",
        "Normalization",
        "Transactions",
      ],
    },
    {
      title: "Data Structures",
      icon: <Network size={34} />,
      path: "/datastructures",
      color: "bg-red-500",
      topics: [
        "Array",
        "Stack",
        "Queue",
        "Linked List",
        "Tree",
        "Graph",
      ],
    },
    {
      title: "Algorithms",
      icon: <GitBranch size={34} />,
      path: "/algorithms",
      color: "bg-emerald-500",
      topics: [
        "Sorting",
        "Searching",
        "DFS",
        "BFS",
        "Recursion",
        "DP",
      ],
    },
    {
      title: "Frontend",
      icon: <Monitor size={34} />,
      path: "/frontend",
      color: "bg-sky-500",
      topics: [
        "React",
        "Redux",
        "Tailwind",
        "Next.js",
        "Vite",
        "Router",
      ],
    },
    {
      title: "Interview Prep",
      icon: <GraduationCap size={34} />,
      path: "/interview",
      color: "bg-rose-500",
      topics: [
        "JavaScript",
        "Java",
        "React",
        "Node",
        "SQL",
        "HR",
      ],
    },
  ];

return (
  <div className="min-h-screen bg-gray-100 text-gray-900">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl font-bold">
          Programming Visualizer
        </h1>

        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Learn programming visually with animations,
          interactive examples and coding visualizers.
        </p>

        <input
          type="text"
          placeholder="Search JavaScript, Java, OOP..."
          className="mt-8 w-full max-w-xl px-5 py-3 rounded-xl bg-white border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      {/* Category Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(item.path)}
            className="cursor-pointer rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${item.color}`}
            >
              {item.icon}
            </div>

            <h2 className="text-2xl font-bold mt-5">
              {item.title}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {topic}
                </span>
              ))}
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
              Explore →
            </button>
          </motion.div>
        ))}
      </div>

    </div>
  </div>
);
}