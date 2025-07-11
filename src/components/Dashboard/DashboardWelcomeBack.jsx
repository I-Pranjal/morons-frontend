import React from 'react';
import { Plus, Target, BarChart3, TrendingUp } from 'lucide-react';

function DashboardWelcomeBack() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Welcome back to GeniOS! <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Your intelligent career OS is optimizing your path.
        </p>
      </header>

      {/* Two Card Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Set Your Goal Card */}
        <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Set Your Goal</h3>
          </div>
          
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-2xl w-24 h-24 flex items-center justify-center mb-6 mx-auto">
              <Plus className="text-gray-400" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Define Your Career Goal</h4>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
              Set your target role, timeline, and let GeniOS create your personalized roadmap
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-colors shadow-lg shadow-red-600/25">
              <Target size={18} /> Set My Goal
            </button>
          </div>
        </div>

        {/* MDS Score Card */}
        <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 text-green-600 p-3 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your MDS Score</h3>
              <p className="text-green-600 font-semibold text-lg">
                0 <span className="text-sm font-normal text-gray-500">+0 this week</span>
              </p>
            </div>
          </div>

          {/* Scores */}
          <div className="space-y-4">
            {[
              { label: 'Skill', value: 40, color: 'bg-blue-500' },
              { label: 'Clarity', value: 30, color: 'bg-purple-500' },
              { label: 'Consistency', value: 60, color: 'bg-green-500' },
              { label: 'Application', value: 45, color: 'bg-orange-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="text-gray-900 font-semibold">{item.value}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
            <BarChart3 size={18} /> View Advanced Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardWelcomeBack;