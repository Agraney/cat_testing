import { NextResponse } from "next/server";
import { answerKey } from "@/data/answerKey";
import { allQuestions } from "@/data/questions";

export async function POST(request: Request) {
  try {
    const { studentName, answers } = await request.json();

    if (!studentName) {
      return NextResponse.json(
        { error: "Student name is required" },
        { status: 400 }
      );
    }

    let totalScore = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnattempted = 0;

    const sectionScores = {
      VARC: { score: 0, correct: 0, incorrect: 0, unattempted: 0 },
      DILR: { score: 0, correct: 0, incorrect: 0, unattempted: 0 },
      QA: { score: 0, correct: 0, incorrect: 0, unattempted: 0 }
    };

    const questionPerformance: Array<{
      id: string;
      number: number;
      section: "VARC" | "DILR" | "QA";
      type: "MCQ" | "TITA";
      status: "correct" | "incorrect" | "unattempted";
    }> = [];

    allQuestions.forEach((q) => {
      const studentAns = (answers[q.id] || "").trim();
      const correctAns = (answerKey[q.id] || "").trim();

      let status: "correct" | "incorrect" | "unattempted" = "unattempted";
      let points = 0;

      if (!studentAns) {
        status = "unattempted";
        points = 0;
        totalUnattempted++;
        sectionScores[q.section].unattempted++;
      } else {
        // Compare answers case-insensitively and trim spaces
        const isCorrect = studentAns.toLowerCase() === correctAns.toLowerCase();

        if (isCorrect) {
          status = "correct";
          points = 3;
          totalCorrect++;
          sectionScores[q.section].correct++;
        } else {
          status = "incorrect";
          points = q.type === "MCQ" ? -1 : 0;
          totalIncorrect++;
          sectionScores[q.section].incorrect++;
        }
      }

      totalScore += points;
      sectionScores[q.section].score += points;

      questionPerformance.push({
        id: q.id,
        number: q.number,
        section: q.section,
        type: q.type,
        status
      });
    });

    const totalAttempted = totalCorrect + totalIncorrect;
    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    return NextResponse.json({
      studentName,
      totalScore,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      totalAttempted,
      accuracy,
      sectionScores,
      questionPerformance
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Failed to grade submission" },
      { status: 500 }
    );
  }
}
