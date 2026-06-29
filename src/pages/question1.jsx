import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  Target,
  BarChart3,
  BookOpen,
} from "lucide-react";

import { interviewQuestions } from "../data/indesqns";

export default function InterviewMCQ() {
  const questions = useMemo(
    () => [...interviewQuestions].sort(() => Math.random() - 0.5),
    []
  );
// const questions = useMemo(() => {
//   return [...interviewQuestions]
//     .sort(() => Math.random() - 0.5)
//     .slice(0, 20);
// }, []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  const question = questions[current];

  const submitAnswer = () => {
    if (selected === null) return;

    const correct = selected === question.answer;

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setResults((prev) => [
      ...prev,
      {
        topic: question.topic,
        difficulty: question.difficulty,
        correct,
      },
    ]);

    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  if (finished) {
    const topicStats = {};

    results.forEach((item) => {
      if (!topicStats[item.topic]) {
        topicStats[item.topic] = {
          total: 0,
          correct: 0,
        };
      }

      topicStats[item.topic].total++;

      if (item.correct) {
        topicStats[item.topic].correct++;
      }
    });

    const strengths = [];
    const weaknesses = [];

    Object.entries(topicStats).forEach(([topic, data]) => {
      const percent = (data.correct / data.total) * 100;

      if (percent >= 70) {
        strengths.push(topic);
      } else {
        weaknesses.push(topic);
      }
    });

    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <Trophy className="text-yellow-500" size={40} />
              <h1 className="text-4xl font-bold">
                Interview Report
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">

              <div className="bg-blue-50 rounded-3xl p-8">
                <p className="text-gray-500 mb-2">
                  Overall Score
                </p>

                <div className="text-6xl font-bold text-blue-600">
                  {score}/{questions.length}
                </div>

                <div className="mt-6 w-full bg-gray-200 h-5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(score / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 1 }}
                    className="h-full bg-green-500"
                  />
                </div>

                <p className="mt-4 text-lg font-semibold">
                  {Math.round(
                    (score / questions.length) * 100
                  )}
                  % Performance
                </p>
              </div>

              <div className="bg-purple-50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="text-purple-600" />
                  <h2 className="text-2xl font-bold">
                    Topic Analysis
                  </h2>
                </div>

                {Object.entries(topicStats).map(
                  ([topic, data]) => {
                    const percentage =
                      (data.correct / data.total) * 100;

                    return (
                      <div key={topic} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>{topic}</span>
                          <span>
                            {data.correct}/{data.total}
                          </span>
                        </div>

                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${percentage}%`,
                            }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div className="bg-green-50 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="text-green-600" />
                  <h2 className="text-2xl font-bold">
                    Strengths
                  </h2>
                </div>

                {strengths.length === 0 ? (
                  <p>No major strengths identified.</p>
                ) : (
                  strengths.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 py-2"
                    >
                      <CheckCircle2 className="text-green-600" />
                      {item}
                    </div>
                  ))
                )}
              </div>

              <div className="bg-red-50 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-600" />
                  <h2 className="text-2xl font-bold">
                    Weaknesses
                  </h2>
                </div>

                {weaknesses.length === 0 ? (
                  <p>No major weaknesses.</p>
                ) : (
                  weaknesses.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 py-2"
                    >
                      <XCircle className="text-red-600" />
                      {item}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-3xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-yellow-600" />
                <h2 className="text-2xl font-bold">
                  Recommendations
                </h2>
              </div>

              {weaknesses.includes("DSA") && (
                <p>• Practice searching and sorting algorithms.</p>
              )}

              {weaknesses.includes("JavaScript") && (
                <p>• Review closures, promises, and async/await.</p>
              )}

              {weaknesses.includes("Database") && (
                <p>• Learn SQL joins and normalization.</p>
              )}

              {weaknesses.includes("OOP") && (
                <p>• Revise inheritance and abstraction.</p>
              )}

              {weaknesses.includes("React") && (
                <p>• Practice hooks and component lifecycle.</p>
              )}
            </div>

            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              <RotateCcw size={20} />
              Restart Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">

        <motion.div
          layout
          className="bg-white shadow-xl rounded-3xl p-8"
        >
          {/* Progress */}

          <div className="mb-8">
            <div className="flex justify-between mb-3 text-sm font-medium">
              <span>
                Question {current + 1} / {questions.length}
              </span>

              <span>
                Score: {score}
              </span>
            </div>

            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{
                  width: `${
                    ((current + 1) / questions.length) * 100
                  }%`,
                }}
                className="h-full bg-blue-600"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-blue-600" />
                <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                  {question.topic}
                </span>

                <span className="px-3 py-1 bg-purple-100 rounded-full text-sm">
                  {question.difficulty}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-8">
                {question.question}
              </h1>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  let classes =
                    "border-gray-300 hover:border-blue-500";

                  if (submitted) {
                    if (index === question.answer) {
                      classes =
                        "border-green-500 bg-green-50";
                    }

                    if (
                      index === selected &&
                      index !== question.answer
                    ) {
                      classes =
                        "border-red-500 bg-red-50";
                    }
                  } else if (selected === index) {
                    classes =
                      "border-blue-500 bg-blue-50";
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={submitted}
                      onClick={() => setSelected(index)}
                      className={`relative w-full border-2 rounded-2xl p-5 text-left transition ${classes}`}
                    >
                      {submitted &&
                        index === question.answer && (
                          <motion.div
                            initial={{ x: -30 }}
                            animate={{ x: 0 }}
                            className="absolute -left-8 top-5 text-2xl"
                          >
                            👉
                          </motion.div>
                        )}

                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {option}
                        </span>

                        {submitted &&
                          index === question.answer && (
                            <CheckCircle2 className="text-green-600" />
                          )}

                        {submitted &&
                          index === selected &&
                          index !== question.answer && (
                            <XCircle className="text-red-600" />
                          )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-200"
                >
                  <h3 className="font-bold text-lg mb-2">
                    Explanation
                  </h3>

                  <p className="text-gray-700">
                    {question.explanation}
                  </p>
                </motion.div>
              )}

              <div className="mt-8">
                {!submitted ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selected === null}
                    className="bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl"
                  >
                    Next Question
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </motion.div>

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}