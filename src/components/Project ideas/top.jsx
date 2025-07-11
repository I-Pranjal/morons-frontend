import React from 'react';
import { Lightbulb, Layers, TrendingUp, Hammer, Clock, Sparkles } from 'lucide-react';

const metrics = [
  {
    label: 'Ideas Generated',
    value: '24',
    icon: <Lightbulb className="h-5 w-5 text-green-500" />,
    change: '+8 this week',
    color: 'text-green-600'
  },
  {
    label: 'Categories',
    value: '6',
    icon: <Layers className="h-5 w-5 text-purple-500" />,
    change: '3 new areas',
    color: 'text-purple-600'
  },
  {
    label: 'Trend Score (Avg.)',
    value: '82/100',
    icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
    change: '+5 points',
    color: 'text-orange-600'
  },
  {
    label: 'Projects Built',
    value: '5',
    icon: <Hammer className="h-5 w-5 text-blue-500" />,
    change: '2 completed',
    color: 'text-blue-600'
  },
  {
    label: 'Last Activity',
    value: '2h ago',
    icon: <Clock className="h-5 w-5 text-gray-500" />,
    change: 'Active session',
    color: 'text-gray-600'
  },
];

function Top() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
              <Lightbulb className="text-white h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Project Ideas Agent</h1>
              <p className="text-gray-600 text-lg mt-1">AI-powered project idea generation and analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">AI Agent Active</span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-red-600/25">
              <Sparkles size={18} />
              Generate Ideas
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-xl">
                  {metric.icon}
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 ${metric.color}`}>
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Top;
