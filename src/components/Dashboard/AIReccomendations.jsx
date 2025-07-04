import React from 'react';
import { Brain, Target, Construction, Lightbulb } from 'lucide-react';

function AIReccomendations() {
  return (
    <div className="rounded-xl border border-gray-300 bg-smokewhite px-4 py-5 w-full max-w-xs text-sm">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-green-600" size={18} />
        <h3 className="font-semibold text-gray-800 text-base">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {/* Set Your Career Goal */}
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <Target className="text-red-600 mt-0.5" size={48} />
            <div>
              <h4 className="font-semibold text-sm text-gray-800">Set Your Career Goal</h4>
              <p className="text-gray-600 text-sm">Define your target role to get personalized guidance</p>
              <button className="mt-2 border border-gray-300 text-sm text-gray-800 font-medium rounded-md px-3 py-1 hover:bg-gray-50">
                Set Goal
              </button>
            </div>
          </div>
        </div>

        {/* Take Your First Action */}
        <div className="rounded-lg bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <Brain className="text-rose-600 mt-0.5" size={48} />
            <div>
              <h4 className="font-semibold text-sm text-gray-800">Take Your First Action</h4>
              <p className="text-gray-600 text-sm">Start with the Resume Agent to build your profile</p>
              <button className="mt-2 border border-gray-300 text-sm text-gray-800 font-medium rounded-md px-3 py-1 hover:bg-gray-50">
                Start Building
              </button>
            </div>
          </div>
        </div>

        {/* Complete More Tasks */}
        <div className="rounded-lg bg-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-indigo-600 mt-0.5" size={48} />
            <div>
              <h4 className="font-semibold text-sm text-gray-800">Complete More Tasks</h4>
              <p className="text-gray-600 text-sm">Try the Practice Agent for skill development</p>
              <button className="mt-2 border border-gray-300 text-sm text-gray-800 font-medium rounded-md px-3 py-1 hover:bg-gray-50">
                Practice Now
              </button>
            </div>
          </div>
        </div>
      </div>
       <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-emerald-50 p-6 my-4 w-full max-w-xs text-center">
      <div className="flex justify-center mb-3">
        <div className="bg-emerald-100 p-3 rounded-full">
          <Brain className="text-emerald-600" size={24} />
        </div>
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-1">AI Learning</h4>
      <p className="text-sm text-gray-600 mb-4">
        Your system is learning from your actions<br />to provide better guidance
      </p>
      <div className="h-2 w-full bg-emerald-100 rounded-full mb-2">
        <div className="h-2 bg-emerald-400 rounded-full w-[0%]"></div>
      </div>
      <p className="text-sm text-emerald-600 font-medium">0% Intelligence Gained</p>
    </div>
    </div>
  );
}

export default AIReccomendations;
