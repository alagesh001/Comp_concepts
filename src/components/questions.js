export const computerQuestions = [
  {
    question: "What does Ctrl + C do?",
    options: ["Copy", "Paste", "Save", "Delete"],
    answer: "Copy",
  },
  {
    question: "Which of these is a web browser?",
    options: ["Chrome", "Excel", "Photoshop", "PowerPoint"],
    answer: "Chrome",
  },
  {
    question: "What is the full form of CPU?",
    options: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Central Program Unit",
      "Computer Program Utility",
    ],
    answer: "Central Processing Unit",
  },
  {
    question: "Which key refreshes a webpage?",
    options: ["F5", "F1", "F9", "F12"],
    answer: "F5",
  },
  {
    question: "Which of these is an operating system?",
    options: ["Windows", "Google", "Intel", "Chrome"],
    answer: "Windows",
  },
];

export const logicalQuestions = [
  {
    question: "2, 4, 8, 16, ?",
    options: ["20", "24", "32", "64"],
    answer: "32",
  },
  {
    question: "5, 10, 15, 20, ?",
    options: ["22", "24", "25", "30"],
    answer: "25",
  },
  {
    question: "Complete the pattern: A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    answer: "I",
  },
  {
    question: "Find the odd one out.",
    options: ["Apple", "Banana", "Mango", "Carrot"],
    answer: "Carrot",
  },
  {
    question: "If today is Monday, what day will it be after 10 days?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    answer: "Thursday",
  },
];

export function getRandomQuestions(questions, count) {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export const interestAreas = [
  "Designing Graphics",
  "Programming",
  "Web Development",
  "Working with Numbers",
  "Video Editing",
  "Drawing Technical Designs",
];

export const careerGoals = [
  "Get a Job",
  "Freelancing",
  "Start a Business",
  "Personal Interest",
];