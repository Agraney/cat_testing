"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { allQuestions, getPassageById, getDILRSetById } from "@/data/questions";
import { Question } from "@/data/types";

export default function TestPage() {
  const router = useRouter();
  
  // Navigation & States
  const [studentName, setStudentName] = useState("");
  const [currentSection, setCurrentSection] = useState<"VARC" | "DILR" | "QA">("VARC");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Answers: key is question.id, value is selected option or text input
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Marked for Review: key is question.id, value is boolean
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  
  // Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(7200); // 120 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const name = localStorage.getItem("cat_student_name");
    const startTimeStr = localStorage.getItem("cat_test_start_time");
    
    if (!name || !startTimeStr) {
      router.push("/");
      return;
    }
    
    setStudentName(name);

    // Restore answers and marked status if they exist
    const savedAnswers = localStorage.getItem("cat_test_answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    
    const savedMarked = localStorage.getItem("cat_test_marked");
    if (savedMarked) {
      setMarkedForReview(JSON.parse(savedMarked));
    }

    // Initialize Timer
    const startTime = parseInt(startTimeStr, 10);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = 7200 - elapsed;

    if (remaining <= 0) {
      // Auto-submit immediately if time has already run out
      setTimeLeft(0);
      handleAutoSubmit();
    } else {
      setTimeLeft(remaining);
    }

    // Warn on page unload/refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Warning: If you close or refresh this page, your test progress might be lost or submitted. Are you sure you want to exit?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Filter questions for the current active section
  const sectionQuestions = allQuestions.filter(q => q.section === currentSection);
  const currentQuestion: Question | undefined = sectionQuestions[currentQuestionIndex];

  // Auto-submit helper
  const handleAutoSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const name = localStorage.getItem("cat_student_name") || "Student";
    const currentAnswers = JSON.parse(localStorage.getItem("cat_test_answers") || "{}");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: name,
          answers: currentAnswers
        })
      });

      if (!response.ok) throw new Error("Failed to submit test results");
      const results = await response.json();
      
      localStorage.setItem("cat_test_results", JSON.stringify(results));
      localStorage.setItem("cat_test_completed", "true");
      router.push("/result");
    } catch (err) {
      console.error(err);
      alert("Submission error. Navigating to home.");
      router.push("/");
    }
  }, [isSubmitting, router]);

  // Main Submit handler (manual submit)
  const submitTest = async () => {
    setShowSubmitModal(false);
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          answers
        })
      });

      if (!response.ok) throw new Error("Failed to submit test results");
      const results = await response.json();
      
      localStorage.setItem("cat_test_results", JSON.stringify(results));
      localStorage.setItem("cat_test_completed", "true");
      router.push("/result");
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your test. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Timer Countdown loop
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    timerRef.current = setInterval(() => {
      const startTimeStr = localStorage.getItem("cat_test_start_time");
      if (startTimeStr) {
        const startTime = parseInt(startTimeStr, 10);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = 7200 - elapsed;
        
        if (remaining <= 0) {
          setTimeLeft(0);
          if (timerRef.current) clearInterval(timerRef.current);
          handleAutoSubmit();
        } else {
          setTimeLeft(remaining);
        }
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, handleAutoSubmit]);

  // Format helper for timer digits (e.g. 02:00:00)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  // Save progress locally whenever answers or marked status change
  const saveAnswers = (updatedAnswers: Record<string, string>) => {
    setAnswers(updatedAnswers);
    localStorage.setItem("cat_test_answers", JSON.stringify(updatedAnswers));
  };

  const saveMarked = (updatedMarked: Record<string, boolean>) => {
    setMarkedForReview(updatedMarked);
    localStorage.setItem("cat_test_marked", JSON.stringify(updatedMarked));
  };

  // Option select handler (for MCQs)
  const handleOptionSelect = (optionValue: string) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: optionValue };
    saveAnswers(newAnswers);
  };

  // Text input handler (for TITA questions)
  const handleTitaInput = (textValue: string) => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers, [currentQuestion.id]: textValue };
    saveAnswers(newAnswers);
  };

  // Clear answer handler
  const handleClearAnswer = () => {
    if (!currentQuestion) return;
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    saveAnswers(newAnswers);
    
    // Also remove marked for review if cleared
    const newMarked = { ...markedForReview };
    delete newMarked[currentQuestion.id];
    saveMarked(newMarked);
  };

  // Toggle marked for review status
  const handleToggleMark = () => {
    if (!currentQuestion) return;
    const newMarked = {
      ...markedForReview,
      [currentQuestion.id]: !markedForReview[currentQuestion.id]
    };
    saveMarked(newMarked);
  };

  // Section Tab Click Handler
  const handleSectionChange = (section: "VARC" | "DILR" | "QA") => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
  };

  // Navigation: Next / Prev
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Helper to determine palette button styles
  const getQuestionPaletteStatus = (q: Question) => {
    const isAnswered = !!answers[q.id];
    const isMarked = !!markedForReview[q.id];

    if (isMarked) return "bg-purple-600 text-white border-purple-700 hover:bg-purple-700";
    if (isAnswered) return "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700";
    return "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white";
  };

  // Retrieve VARC Passage / DILR Set
  const activePassage = currentQuestion?.passageId ? getPassageById(currentQuestion.passageId) : undefined;
  const activeDILRSet = currentQuestion?.setId ? getDILRSetById(currentQuestion.setId) : undefined;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans select-none">
      {/* Top Header Panel */}
      <header className="bg-slate-900 border-b border-slate-850 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="font-extrabold text-indigo-400 tracking-wider text-xl">CAT MOCK PORTAL</div>
          <div className="text-slate-500">|</div>
          <div className="text-sm text-slate-300 font-medium">Candidate: <span className="text-white font-bold">{studentName}</span></div>
        </div>

        {/* Section Tabs navigation */}
        <nav className="flex space-x-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
          {(["VARC", "DILR", "QA"] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => handleSectionChange(sec)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition duration-150 ${
                currentSection === sec
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {sec}
            </button>
          ))}
        </nav>

        {/* Countdown Timer */}
        <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-mono text-lg font-extrabold tracking-widest text-indigo-400">
            {formatTime(timeLeft)}
          </span>
        </div>
      </header>

      {/* Main Testing Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Passage/Set panel (Desktop: 50% split pane, scrollable) */}
        {(activePassage || activeDILRSet) && (
          <div className="flex-1 overflow-y-auto p-6 bg-slate-900/20 border-r border-slate-850 border-b md:border-b-0 max-h-[40vh] md:max-h-none md:w-1/2">
            {activePassage && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-indigo-300 border-b border-slate-800 pb-2">
                  {activePassage.title}
                </h2>
                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
                  {activePassage.text}
                </div>
              </div>
            )}
            
            {activeDILRSet && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-indigo-300 border-b border-slate-800 pb-2">
                  {activeDILRSet.title}
                </h2>
                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
                  {activeDILRSet.text}
                </div>
                
                {/* HTML DILR diagrams & figures */}
                {activeDILRSet.hasDiagram && (
                  <div className="w-full mx-auto bg-slate-900 border border-slate-700/60 rounded-xl p-5 text-slate-100 mt-6 shadow-2xl">
                    <div className="text-center font-bold mb-3 text-indigo-400 text-sm tracking-wide">
                      Schematic Map of City Metro Lines
                    </div>
                    <div className="flex justify-center items-center bg-white rounded-lg p-3 overflow-hidden shadow-inner">
                      <img
                        src="/metro_map.png"
                        alt="City Metro Lines Schematic Map"
                        className="max-w-full h-auto object-contain rounded"
                      />
                    </div>
                    <div className="text-center text-xs text-slate-400 mt-3 leading-relaxed">
                      <span className="font-semibold text-slate-300">Legend:</span> Rectangles: Terminal stations (A, B, C, D, M, N, P, Q) &bull; Diamonds: Junction stations (R, S, T, V) &bull; Small circles: Other stations
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Active Question panel */}
        <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${(!activePassage && !activeDILRSet) ? "md:w-3/4" : "md:w-1/3"}`}>
          {currentQuestion ? (
            <div className="flex-1 flex flex-col space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  Question {currentQuestion.number} ({currentQuestion.type})
                </span>
                
                {markedForReview[currentQuestion.id] && (
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    ★ Marked for Review
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="text-lg leading-relaxed text-slate-100 font-medium">
                {/* We render HTML dangerously to allow math equations to use tags like <sup> or <sub> safely */}
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
              </div>

              {/* Input Options / Box */}
              <div className="flex-1 space-y-3">
                {currentQuestion.type === "MCQ" && currentQuestion.options ? (
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((opt, i) => {
                      const label = ["A", "B", "C", "D"][i];
                      const isSelected = answers[currentQuestion.id] === label;

                      return (
                        <button
                          key={label}
                          onClick={() => handleOptionSelect(label)}
                          className={`w-full text-left px-5 py-4 rounded-xl border flex items-center space-x-4 transition duration-150 active:scale-[0.99] ${
                            isSelected
                              ? "bg-indigo-600/25 border-indigo-500 text-white"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-750 hover:bg-slate-850/40"
                          }`}
                        >
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                            isSelected
                              ? "bg-indigo-500 border-indigo-400 text-white"
                              : "bg-slate-950 border-slate-700 text-slate-400"
                          }`}>
                            {label}
                          </span>
                          <span className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: opt }} />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2 max-w-sm">
                    <label htmlFor="tita-answer" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Type Your Numerical Answer
                    </label>
                    <input
                      id="tita-answer"
                      type="text"
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleTitaInput(e.target.value)}
                      placeholder="Enter value..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                )}
              </div>

              {/* Question Action Controls */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-850">
                <button
                  onClick={handleToggleMark}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm transition duration-150 flex items-center space-x-2 ${
                    markedForReview[currentQuestion.id]
                      ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30"
                      : "bg-slate-900 border border-slate-800 text-slate-350 hover:bg-slate-850"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={markedForReview[currentQuestion.id] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{markedForReview[currentQuestion.id] ? "Unmark Review" : "Mark for Review"}</span>
                </button>

                <button
                  onClick={handleClearAnswer}
                  disabled={!answers[currentQuestion.id]}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm border transition duration-150 ${
                    answers[currentQuestion.id]
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/25"
                      : "bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  Clear Response
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              No question selected.
            </div>
          )}

          {/* Previous / Next footer controls */}
          <footer className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-3 rounded-xl font-semibold text-sm border transition ${
                currentQuestionIndex === 0
                  ? "bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 active:scale-95"
              }`}
            >
              &larr; Previous
            </button>

            <span className="text-xs font-bold text-slate-500">
              Question {currentQuestionIndex + 1} of {sectionQuestions.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === sectionQuestions.length - 1}
              className={`px-5 py-3 rounded-xl font-semibold text-sm border transition ${
                currentQuestionIndex === sectionQuestions.length - 1
                  ? "bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850 active:scale-95"
              }`}
            >
              Next &rarr;
            </button>
          </footer>
        </div>

        {/* Right Palette Sidebar Panel */}
        <aside className="w-full md:w-64 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-850 p-6 flex flex-col justify-between shrink-0 max-h-[40vh] md:max-h-none overflow-y-auto">
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-2">
              Question Palette
            </h3>
            
            {/* Color index legend */}
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold uppercase text-slate-400 mb-4 bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-slate-800 border border-slate-700 rounded-full shrink-0"></span>
                <span>Unseen</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-emerald-600 border border-emerald-700 rounded-full shrink-0"></span>
                <span>Saved</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 bg-purple-600 border border-purple-700 rounded-full shrink-0"></span>
                <span>Review</span>
              </div>
            </div>

            {/* Visual Grid Bubbles */}
            <div className="grid grid-cols-5 gap-2.5">
              {sectionQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 w-9 rounded-xl border flex items-center justify-center font-mono text-sm font-bold transition duration-100 ${
                    currentQuestionIndex === idx ? "ring-2 ring-indigo-500" : ""
                  } ${getQuestionPaletteStatus(q)}`}
                >
                  {q.number}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-850 mt-6 md:mt-0">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-rose-600/10 active:scale-95 transition flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span>SUBMIT TEST</span>
            </button>
          </div>
        </aside>
      </main>

      {/* Manual Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-md w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-rose-500/10 rounded-xl mb-4 border border-rose-500/20 text-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Submit Test?</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Are you sure you want to submit the test? Once submitted, your answers will be locked, and you cannot modify them or re-enter the test.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={submitTest}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/20 transition"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global submitting spinner */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-slate-300 font-bold tracking-wide">Calculating Score & Locking Exam...</p>
        </div>
      )}
    </div>
  );
}
