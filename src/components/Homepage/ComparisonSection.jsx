import React from 'react';
import { ArrowRight, X, CheckCircle } from 'lucide-react';

export const ComparisonSection = () => {
  const comparisons = [
    { old: "PDFs, videos, timelines", new: "Modular AI Agents" },
    { old: "To-do lists and notes", new: "Autonomously managed career actions" },
    { old: "Motivation tricks", new: "Adaptive scoring and nudges" },
    { old: "Manual resumes", new: "AI-generated, role-aligned resumes" },
    { old: "Passive content", new: "Thinking, planning, evolving system" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
            You Get vs. What You Need
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            The difference between tools and systems.
          </p>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-1">
              Current World
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">(What you get everywhere else)</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-1">
              GeniOS World
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">(What you actually need)</p>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4 sm:space-y-6">
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-4 sm:px-6 sm:py-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between text-sm sm:text-base">
                {/* Old */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="text-gray-800 font-medium">{comparison.old}</span>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-red-500 mx-2 sm:mx-6" />

                {/* New */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-gray-900 font-semibold">{comparison.new}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-20 px-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            You've tried learning. Now try upgrading.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-lg font-semibold px-6 sm:px-12 py-3 sm:py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Install Intelligence → Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};
