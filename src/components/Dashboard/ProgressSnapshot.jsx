import React from 'react';
import { TrendingUp, Target, Clock, Zap, FolderKanban } from 'lucide-react';

function ProgressSnapshot() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-5 w-full max-w-xs text-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-green-600" size={18} />
        <h3 className="font-semibold text-gray-800 text-base">Progress Snapshot</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-red-600" />
            <span className="text-gray-700">Tasks Completed</span>
          </div>
          <span className="text-red-600 font-semibold">0</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-gray-700">Total Sessions</span>
          </div>
          <span className="text-blue-500 font-semibold">0</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-gray-700">Current Streak</span>
          </div>
          <span className="text-yellow-500 font-semibold">0 🪵</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FolderKanban size={16} className="text-green-600" />
            <span className="text-gray-700">Active Projects</span>
          </div>
          <span className="text-green-600 font-semibold">0</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="text-center text-sm">
        <p className="text-gray-500">Last Activity</p>
        <p className="text-gray-700 font-medium">Never</p>
        <p className="text-green-600 font-medium cursor-pointer mt-1 hover:underline">
          Let’s get started!
        </p>
      </div>
    </div>
  );
}

export default ProgressSnapshot;
