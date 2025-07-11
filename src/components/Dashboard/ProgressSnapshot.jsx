import React from 'react';
import { TrendingUp, Target, Clock, Zap, FolderKanban } from 'lucide-react';

function ProgressSnapshot() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 text-green-600 p-2 rounded-xl">
          <TrendingUp size={20} />
        </div>
        <h3 className="font-bold text-lg text-gray-900">Progress Snapshot</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <Target size={16} className="text-red-600" />
            <span className="text-gray-700 font-medium">Tasks Completed</span>
          </div>
          <span className="text-red-600 font-bold text-lg">0</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-blue-500" />
            <span className="text-gray-700 font-medium">Total Sessions</span>
          </div>
          <span className="text-blue-500 font-bold text-lg">0</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-gray-700 font-medium">Current Streak</span>
          </div>
          <span className="text-yellow-500 font-bold text-lg">0 🪵</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <FolderKanban size={16} className="text-green-600" />
            <span className="text-gray-700 font-medium">Active Projects</span>
          </div>
          <span className="text-green-600 font-bold text-lg">0</span>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="text-center">
        <p className="text-gray-500 text-sm mb-2">Last Activity</p>
        <p className="text-gray-900 font-semibold mb-2">Never</p>
        <button className="text-green-600 font-semibold text-sm hover:text-green-700 hover:underline transition-colors">
          Let's get started!
        </button>
      </div>
    </div>
  );
}

export default ProgressSnapshot;
