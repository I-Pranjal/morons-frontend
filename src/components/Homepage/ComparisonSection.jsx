import React from 'react';

export const ComparisonSection = () => {
  const comparisons = [
    ["PDFs, videos, timelines", "Modular AI Agents"],
    ["To-do lists and notes", "Autonomously managed career actions"],
    ["Motivation tricks", "Adaptive scoring and nudges"],
    ["Manual resumes", "AI-generated, role-aligned resumes"],
    ["Passive content", "Thinking, planning, evolving system"]
  ];
  return (
    <section className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">You Get vs. What You Need</h2>
      <p className="text-gray-500 mb-8">The difference between tools and systems.</p>
      <div className="max-w-4xl mx-auto space-y-6">
        {comparisons.map(([oldVal, newVal], idx) => (
          <div key={idx} className="flex justify-between items-center text-left bg-white p-4 rounded-lg shadow-sm">
            <div className="text-red-600 line-through">{oldVal}</div>
            <div className="text-2xl text-gray-300 mx-4">→</div>
            <div className="text-green-700 font-semibold">{newVal}</div>
          </div>
        ))}
      </div>
    </section>
  );
};