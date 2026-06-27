import { dsaQuestions } from "./dsaquestions";
import { programmingFundamentalsQuestions } from "./fundamentals";
import { advancedProgrammingQuestions } from "./advanced";
import { databaseQuestions } from "./databasequestions";

export const interviewQuestions = [
  ...dsaQuestions,
  ...programmingFundamentalsQuestions,
  ...advancedProgrammingQuestions,
  ...databaseQuestions,
];