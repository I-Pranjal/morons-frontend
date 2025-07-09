// JDtoProject.jsx
import React from 'react';
import { Target, BarChart3 } from 'lucide-react';

function JDtoProject() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-red-700 h-5 w-5" />
        <h2 className="text-xl font-semibold text-gray-900">JD-Aligned Project Suggestions</h2>
      </div>

      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Paste Job Description / Internship Details
      </label>

      {/* Text Area */}
      <textarea
        rows="6"
        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 text-sm text-gray-700 placeholder:text-gray-400"
        placeholder="Paste the full job description here to get project ideas that align perfectly with the role requirements..."
      ></textarea>

      {/* Button */}
      <button className="mt-6 w-full bg-red-800 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm">
        <BarChart3 className="h-4 w-4" />
        Analyze & Suggest Projects
      </button>
    </div>
  );
}

export default JDtoProject;