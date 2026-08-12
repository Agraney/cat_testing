export interface Question {
  id: string;
  section: "VARC" | "DILR" | "QA";
  type: "MCQ" | "TITA";
  number: number;
  text: string;
  options?: string[]; // A, B, C, D
  passageId?: string; // For VARC reading passages
  setId?: string;      // For DILR data sets
}

export interface Passage {
  id: string;
  title: string;
  text: string;
}

export interface DILRSet {
  id: string;
  title: string;
  text: string;
  hasDiagram?: boolean;
  hasTable?: boolean;
}
