import React from 'react';
import { Plus, Target, BarChart3, TrendingUp } from 'lucide-react';

function DashboardWelcomeBack() {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Welcome Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back to GeniOS! <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your intelligent career OS is optimizing your path.
        </p>
      </header>

      {/* Two Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Set Your Goal Card */}
        <div className="rounded-xl border border-gray-200 p-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-100 text-red-600 p-2 rounded-full">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Set Your Goal</h3>
          </div>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-4">
              <Plus className="text-gray-500" size={28} />
            </div>
            <h4 className="text-base font-semibold text-gray-800 mb-2">Define Your Career Goal</h4>
            <p className="text-sm text-center text-gray-500 mb-4 max-w-xs">
              Set your target role, timeline, and let GeniOS create your personalized roadmap
            </p>
            <button className="bg-red-700 hover:bg-red-800 text-white text-sm font-medium px-5 py-2 rounded-md flex items-center gap-2">
              <Target size={16} /> Set My Goal
            </button>
          </div>
        </div>

        {/* MDS Score Card */}
        <div className="rounded-xl border border-gray-200 p-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Your MDS Score</h3>
              <p className="text-sm text-green-600 font-medium">
                0 <span className="text-xs">+0 this week</span>
              </p>
            </div>
          </div>

          {/* Scores */}
          <div className="space-y-3 text-sm text-gray-700 mt-4">
            {[
              { label: 'Skill', value: 40 },
              { label: 'Clarity', value: 30 },
              { label: 'Consistency', value: 60 },
              { label: 'Application', value: 45 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span>{item.label}</span><span>{item.value}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 border border-green-400 text-green-700 hover:bg-green-50 font-medium text-sm py-2 rounded-md flex justify-center items-center gap-2">
            <BarChart3 size={16} /> View Advanced Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardWelcomeBack;
