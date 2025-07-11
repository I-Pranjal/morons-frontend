// Analytics.jsx
import React from 'react';
import { Lightbulb, BarChart4, TrendingUp, Target, Award, Calendar, Users, Zap } from 'lucide-react';

const metrics = [
  {
    title: 'Ideas Generated',
    value: 24,
    subtext: '+8 this week',
    icon: <Lightbulb className="h-6 w-6 text-green-600" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    title: 'Categories Explored',
    value: 6,
    subtext: '3 new areas',
    icon: <BarChart4 className="h-6 w-6 text-indigo-600" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    title: 'Avg Trend Score',
    value: 82,
    subtext: '+5 points',
    icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    title: 'Projects Built',
    value: 5,
    subtext: '2 completed',
    icon: <Target className="h-6 w-6 text-orange-600" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
];

const categoryStats = [
  { name: 'AI/ML', count: 8, percent: '33%', color: 'bg-purple-600' },
  { name: 'Web Dev', count: 6, percent: '25%', color: 'bg-blue-600' },
  { name: 'Mobile', count: 4, percent: '17%', color: 'bg-green-600' },
  { name: 'Web3', count: 3, percent: '12%', color: 'bg-yellow-600' },
  { name: 'Data Science', count: 3, percent: '13%', color: 'bg-red-600' },
];

const insights = [
  {
    title: 'Most Active Category',
    description: "You've generated the most ideas in this space",
    badge: 'AI/ML Projects',
    icon: <Award className="h-5 w-5 text-yellow-500" />,
    color: 'bg-yellow-50 border-yellow-200'
  },
  {
    title: 'Execution Readiness',
    description: 'Your projects have detailed implementation plans',
    badge: '76% Average',
    icon: <Zap className="h-5 w-5 text-green-500" />,
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Market Relevance',
    description: 'Your ideas align well with current market trends',
    badge: '82/100 Trend Score',
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200'
  },
];

const activityData = [
  { day: 'Mon', ideas: 4 },
  { day: 'Tue', ideas: 6 },
  { day: 'Wed', ideas: 2 },
  { day: 'Thu', ideas: 8 },
  { day: 'Fri', ideas: 5 },
  { day: 'Sat', ideas: 1 },
  { day: 'Sun', ideas: 3 },
];

function Analytics() {
  const maxIdeas = Math.max(...activityData.map(d => d.ideas));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Project Analytics Dashboard</h2>
        <p className="text-lg text-gray-600">Track your project ideation progress and insights</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className={`${metric.bgColor} ${metric.borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {metric.icon}
              </div>
              <div className={`text-xs font-semibold px-2 py-1 rounded-full bg-white ${metric.color}`}>
                {metric.subtext}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-xl">
              <BarChart4 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Project Categories</h3>
          </div>
          
          <div className="space-y-4">
            {categoryStats.map((category, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{category.count}</span>
                    <span className="bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {category.percent}
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: category.percent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-xl">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Weekly Activity</h3>
          </div>
          
          <div className="space-y-4">
            {activityData.map((day, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(day.ideas / maxIdeas) * 100}%` }}
                  ></div>
                </div>
                <div className="w-8 text-sm font-bold text-gray-900">{day.ideas}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total this week</span>
              <span className="font-bold text-gray-900">{activityData.reduce((sum, day) => sum + day.ideas, 0)} ideas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-xl">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Project Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`${insight.color} border-2 rounded-2xl p-6 hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {insight.icon}
                </div>
                <h4 className="font-bold text-gray-900">{insight.title}</h4>
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{insight.description}</p>
              <span className="inline-block bg-white text-gray-800 font-semibold px-3 py-2 rounded-lg text-sm shadow-sm">
                {insight.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
