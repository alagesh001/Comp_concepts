import { useMemo,useState } from "react";

import {
  computerQuestions,
  logicalQuestions,
  getRandomQuestions,interestAreas,
  careerGoals,
} from "../components/questions";
import {ColorCodingChallenge,PaddingChallenge,BoxSizeChallenge} from "../components/colorcodechange"

export default function StudentAssessment() {
  const selectedComputer = useMemo(
    () => getRandomQuestions(computerQuestions, 3),
    []
  );

  const selectedLogical = useMemo(
    () => getRandomQuestions(logicalQuestions, 3),
    []
  );
  const challenges = [
  ColorCodingChallenge,
  PaddingChallenge,
  BoxSizeChallenge,
];
const RandomChallenge =
  challenges[Math.floor(Math.random() * challenges.length)];
const interestAreas = [
  "Designing Graphics",
  "Programming",
  "Web Development",
  "Mobile App Development",
  "Working with Numbers",
  "Video Editing",
];
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold">
            Student Career Assessment
          </h1>
          <p className="mt-2 text-blue-100">
            Find the right course for your future.
          </p>
        </div>

        <div className="p-8 space-y-10">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                placeholder="Age"
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="Education"
                className="border rounded-lg p-3"
              />

              <select className="border rounded-lg p-3">
                <option>Select Status</option>
                <option>School Student</option>
                <option>College Student</option>
                <option>Job Seeker</option>
                <option>Working Professional</option>
              </select>
            </div>
          </section>

          {/* Career Goal */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Career Goal
            </h2>

            <div className="space-y-2">
              {careerGoals.map((goal) => (
                <label key={goal} className="block">
                  <input
                    type="radio"
                    name="goal"
                    className="mr-2"
                  />
                  {goal}
                </label>
              ))}
            </div>
          </section>
       {/* Interests */}
         <section>
  <h2 className="text-xl font-semibold mb-4">
    Areas of Interest
  </h2>

  <div className="space-y-4">
    {interestAreas.map((item) => (
      <div key={item}>
        <label className="block mb-2 font-medium">
          {item}
        </label>

        <input
          type="range"
          min="1"
          max="5"
          className="w-full"
        />
      </div>
    ))}
  </div>
</section>
<RandomChallenge />


          {/* Computer Questions */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Computer Knowledge
            </h2>

            <div className="space-y-8">
              {selectedComputer.map((q, index) => (
                <div key={index}>
                  <p className="font-medium mb-3">
                    {index + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label
                        key={option}
                        className="block"
                      >
                        <input
                          type="radio"
                          name={`computer-${index}`}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Logical Questions */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Logical Aptitude
            </h2>

            <div className="space-y-8">
              {selectedLogical.map((q, index) => (
                <div key={index}>
                  <p className="font-medium mb-3">
                    {index + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label
                        key={option}
                        className="block"
                      >
                        <input
                          type="radio"
                          name={`logical-${index}`}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}