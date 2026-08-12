"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();

  const handleStartClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setShowWarningModal(true);
  };

  const confirmStartTest = () => {
    // Save student name and set timer start time in local storage
    localStorage.setItem("cat_student_name", name.trim());
    localStorage.setItem("cat_test_start_time", Date.now().toString());
    
    // Clear any previous answers and statuses
    localStorage.removeItem("cat_test_answers");
    localStorage.removeItem("cat_test_marked");
    localStorage.removeItem("cat_test_completed");
    
    // Redirect to test page
    router.push("/test");
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 min-h-screen text-slate-100 font-sans">
      <div className="max-w-2xl w-full space-y-8 bg-slate-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-slate-700/50 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-xl mb-4 border border-indigo-500/20 text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            CAT MOCK TEST
          </h1>
          <p className="mt-3 text-lg text-slate-300">
            2 Hour Full-Length CAT Mock Test
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-indigo-300 border-b border-slate-700/60 pb-2">
              Test Structure & Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></span>
                  <strong>VARC:</strong> 24 Questions
                </p>
                <p className="flex items-center">
                  <span className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></span>
                  <strong>DILR:</strong> 20 Questions
                </p>
                <p className="flex items-center">
                  <span className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></span>
                  <strong>QA:</strong> 22 Questions
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="h-2 w-2 bg-indigo-400 rounded-full mr-2"></span>
                  <strong>Duration:</strong> 120 Minutes (2 Hours)
                </p>
                <p className="flex items-center text-emerald-400">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full mr-2"></span>
                  <strong>MCQ Scheme:</strong> +3 / -1
                </p>
                <p className="flex items-center text-emerald-400">
                  <span className="h-2 w-2 bg-emerald-400 rounded-full mr-2"></span>
                  <strong>TITA Scheme:</strong> +3 / 0
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleStartClick} className="mt-8 space-y-4">
            <div>
              <label htmlFor="student-name" className="block text-sm font-semibold text-slate-300 mb-2">
                Enter Student Name
              </label>
              <input
                id="student-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your full name..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg tracking-wide shadow-lg transform active:scale-95 transition-all duration-150 ${
                name.trim()
                  ? "bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-indigo-600/30"
                  : "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              START TEST
            </button>
          </form>
        </div>
      </div>

      {/* Warning Confirmation Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-md w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl transform scale-100 transition-all">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-xl mb-4 border border-amber-500/20 text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Confirm Test Start</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Once you start the test, the 2-hour timer will begin immediately. You cannot pause the timer, and refreshing the page will not reset it.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowWarningModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmStartTest}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
