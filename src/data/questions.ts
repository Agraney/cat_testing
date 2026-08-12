import { Passage, Question, DILRSet } from "./types";
import { varcPassages, varcQuestions } from "./varcQuestions";
import { dilrSets, dilrQuestions } from "./dilrQuestions";
import { qaQuestions } from "./qaQuestions";

export const allPassages: Passage[] = varcPassages;
export const allDILRSets: DILRSet[] = dilrSets;

export const allQuestions: Question[] = [
  ...varcQuestions,
  ...dilrQuestions,
  ...qaQuestions
];

export const getQuestionsBySection = (section: "VARC" | "DILR" | "QA"): Question[] => {
  return allQuestions.filter(q => q.section === section);
};

export const getPassageById = (id: string): Passage | undefined => {
  return allPassages.find(p => p.id === id);
};

export const getDILRSetById = (id: string): DILRSet | undefined => {
  return allDILRSets.find(s => s.id === id);
};
