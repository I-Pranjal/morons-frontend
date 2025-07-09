import React from 'react';
import { Lightbulb, Layers, TrendingUp, Hammer, Clock } from 'lucide-react';

const metrics = [
  {
    label: 'Ideas Generated',
    value: '24',
    icon: <Lightbulb className="h-5 w-5 text-green-500" />,
  },
  {
    label: 'Categories',
    value: '6',
    icon: <Layers className="h-5 w-5 text-purple-500" />,
  },
  {
    label: 'Trend Score (Avg.)',
    value: '82/100',
    icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
  },
  {
    label: 'Projects Built',
    value: '5',
    icon: <Hammer className="h-5 w-5 text-blue-500" />,
  },
  {
    label: 'Last Activity',
    value: '2h ago',
    icon: <Clock className="h-5 w-5 text-gray-500" />,
  },
];

function Top() {
  return (
    <div className="bg-[#f9fbfc] py-8 px-4 sm:px-6 md:px-12">
      {/* Title */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="bg-yellow-100 p-2 rounded-xl">
          <Lightbulb className="text-yellow-500 h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Ideas Agent</h1>
          <p className="text-gray-600 text-sm sm:text-base">AI-powered project ideas agent assistant</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl px-4 py-5 flex items-center shadow-sm border border-gray-100"
          >
            <div>{metric.icon}</div>
            <div className="ml-3 space-y-1">
              <div className="text-sm text-gray-500">{metric.label}</div>
              <div className="text-xl font-semibold text-gray-900">{metric.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Top;
