// Analytics.jsx
import React from 'react';
import { Lightbulb, BarChart4, TrendingUp, Target } from 'lucide-react';

const metrics = [
  {
    title: 'Ideas Generated',
    value: 24,
    subtext: '+8 this week',
    icon: <Lightbulb className="h-5 w-5 text-green-600" />,
  },
  {
    title: 'Categories Explored',
    value: 6,
    subtext: '3 new areas',
    icon: <BarChart4 className="h-5 w-5 text-indigo-600" />,
  },
  {
    title: 'Avg Trend Score',
    value: 82,
    subtext: '+5 points',
    icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
  },
  {
    title: 'Projects Built',
    value: 5,
    subtext: '2 completed',
    icon: <Target className="h-5 w-5 text-orange-600" />,
  },
];

const categoryStats = [
  { name: 'AI/ML', count: 8, percent: '33%' },
  { name: 'Web Dev', count: 6, percent: '25%' },
  { name: 'Mobile', count: 4, percent: '17%' },
  { name: 'Web3', count: 3, percent: '12%' },
  { name: 'Data Science', count: 3, percent: '13%' },
];

const insights = [
  {
    title: 'Most Active Category',
    description: "You've generated the most ideas in this space",
    badge: 'AI/ML Projects',
  },
  {
    title: 'Execution Readiness',
    description: 'Your projects have detailed implementation plans',
    badge: '76% Average',
  },
  {
    title: 'Market Relevance',
    description: 'Your ideas align well with current market trends',
    badge: '82/100 Trend Score',
  },
];

function Analytics() {
  return (
    <div className="flex flex-col gap-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-1">{m.icon}<span className="text-sm text-gray-500">{m.title}</span></div>
            <div className="text-2xl font-semibold text-gray-900 leading-tight">{m.value}</div>
            <div className="text-xs text-gray-500">{m.subtext}</div>
          </div>
        ))}
      </div>

      {/* Category Stats + Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Categories</h3>
          <div className="space-y-3">
            {categoryStats.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{c.name}</span>
                  <span className="bg-gray-900 text-white px-2 py-0.5 rounded-full text-xs">{c.count} {c.percent}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-800 rounded-full"
                    style={{ width: c.percent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Insights */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                  {insight.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
