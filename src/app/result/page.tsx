"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SectionBreakdown {
  score: number;
  correct: number;
  incorrect: number;
  unattempted: number;
}

interface QuestionPerf {
  id: string;
  number: number;
  section: "VARC" | "DILR" | "QA";
  type: "MCQ" | "TITA";
  status: "correct" | "incorrect" | "unattempted";
}

interface TestResults {
  studentName: string;
  totalScore: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  totalAttempted: number;
  accuracy: number;
  sectionScores: Record<"VARC" | "DILR" | "QA", SectionBreakdown>;
  questionPerformance: QuestionPerf[];
}

export default function ResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResults | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem("cat_test_completed");
    const rawResults = localStorage.getItem("cat_test_results");

    if (!completed || !rawResults) {
      router.push("/");
      return;
    }

    try {
      setResults(JSON.parse(rawResults));
    } catch (e) {
      console.error(e);
      router.push("/");
    }
  }, [router]);

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mr-3"></div>
        <span>Loading results...</span>
      </div>
    );
  }

  // Group questions by section for rendering
  const varcPerf = results.questionPerformance.filter(q => q.section === "VARC");
  const dilrPerf = results.questionPerformance.filter(q => q.section === "DILR");
  const qaPerf = results.questionPerformance.filter(q => q.section === "QA");

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-slate-100 font-sans p-6 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            CAT MOCK TEST — RESULT
          </h1>
          <p className="text-lg text-slate-350">
            Candidate Name: <span className="font-bold text-indigo-400">{results.studentName}</span>
          </p>
        </div>

        {/* Score Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Final Score</p>
            <p className="text-4xl font-extrabold text-white">{results.totalScore}</p>
          </div>
          
          <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Correct</p>
            <p className="text-4xl font-extrabold text-white">{results.totalCorrect}</p>
          </div>

          <div className="bg-slate-900/80 border border-rose-500/20 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Incorrect</p>
            <p className="text-4xl font-extrabold text-white">{results.totalIncorrect}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/40 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-4xl font-extrabold text-white">{results.accuracy}%</p>
          </div>
        </div>

        {/* Detailed stats summary */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-wrap justify-around gap-6 text-sm text-slate-350">
          <p>Total Questions: <span className="font-bold text-white">66</span></p>
          <p>Attempted: <span className="font-bold text-white">{results.totalAttempted}</span></p>
          <p>Unattempted: <span className="font-bold text-white">{results.totalUnattempted}</span></p>
        </div>

        {/* Section-Wise Score Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-4">
          <h2 className="text-xl font-bold text-indigo-300 border-b border-slate-800 pb-2">
            SECTION-WISE PERFORMANCE
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs uppercase bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Section</th>
                  <th className="px-4 py-3 font-semibold text-center">Score</th>
                  <th className="px-4 py-3 font-semibold text-center">Correct</th>
                  <th className="px-4 py-3 font-semibold text-center">Incorrect</th>
                  <th className="px-4 py-3 font-semibold text-center">Unattempted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {(["VARC", "DILR", "QA"] as const).map((sec) => {
                  const secStats = results.sectionScores[sec];
                  return (
                    <tr key={sec} className="hover:bg-slate-800/10 transition">
                      <td className="px-4 py-3 font-bold text-slate-100">{sec}</td>
                      <td className="px-4 py-3 text-center font-bold text-indigo-400">{secStats.score}</td>
                      <td className="px-4 py-3 text-center text-emerald-400 font-semibold">{secStats.correct}</td>
                      <td className="px-4 py-3 text-center text-rose-400 font-semibold">{secStats.incorrect}</td>
                      <td className="px-4 py-3 text-center text-slate-450">{secStats.unattempted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question-Wise Performance Grid */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-6">
          <h2 className="text-xl font-bold text-indigo-300 border-b border-slate-800 pb-2">
            QUESTION-WISE PERFORMANCE BREAKDOWN
          </h2>

          <div className="space-y-6">
            {/* Render loop for each section */}
            {([
              { title: "VARC (Verbal Ability & Reading Comprehension)", data: varcPerf },
              { title: "DILR (Data Interpretation & Logical Reasoning)", data: dilrPerf },
              { title: "QA (Quantitative Aptitude)", data: qaPerf }
            ]).map((sec) => (
              <div key={sec.title} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sec.title}</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {sec.data.map((q) => {
                    let statusLabel = "Unattempted";
                    let statusStyle = "bg-slate-800/40 text-slate-400 border-slate-800";
                    let icon = "—";

                    if (q.status === "correct") {
                      statusLabel = "Correct";
                      statusStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                      icon = "✓";
                    } else if (q.status === "incorrect") {
                      statusLabel = "Incorrect";
                      statusStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
                      icon = "✕";
                    }

                    return (
                      <div
                        key={q.id}
                        className={`px-3 py-2.5 rounded-xl border text-center font-semibold text-xs flex flex-col items-center justify-center space-y-1.5 ${statusStyle}`}
                      >
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Q{q.number}</span>
                        <div className="flex items-center space-x-1 font-extrabold text-sm">
                          <span>{icon}</span>
                          <span>{statusLabel}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-350 hover:text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition shadow-lg active:scale-95"
          >
            Reset Mock Test & Return
          </button>
        </div>
      </div>
    </div>
  );
}
