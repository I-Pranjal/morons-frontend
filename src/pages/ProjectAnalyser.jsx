import React from 'react';
import { MoveLeft, Save, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProjectAnalyser() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        {/* <Link to="/dashboard">
        <button className=" flex absolute top-4 left-4 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-100">
            <MoveLeft size={20} className="text-gray-600 mx-2" />
            Back to Dashboard
        </button>
        </Link> */}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Analyser</h1>
          <p className="text-gray-600 text-sm mt-1">
            Share us your project details and we will help you enhance your credibility.
          </p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2">
          <Save size={16} /> Remember the project
        </button>
      </div>

      {/* About Me Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <User className="text-emerald-500" size={18} />
          <h2 className="text-base font-semibold text-gray-800">Describe your new project</h2>
        </div>
        <textarea
          placeholder="Write an elaborate description of your project, including its purpose, technologies used, and any challenges you faced."
          rows={5}
          className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-y"
        />
      </div>
    </div>
  );
}

export default ProjectAnalyser;
