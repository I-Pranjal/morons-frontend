import React from 'react';
import { CheckCircle, BookOpen, TrendingUp, Clock } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    { label: 'Labs Completed', value: '0/5', icon: CheckCircle },
    { label: 'Modules Done', value: '0/60', icon: BookOpen },
    { label: 'Overall Progress', value: '0%', icon: TrendingUp },
    { label: 'Time Spent', value: '2h 30m', icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Grid - Mobile: 1x4, Desktop: 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-300/20"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-300/10 rounded-lg flex items-center justify-center border border-amber-300/30">
                <stat.icon size={24} className="text-amber-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-300 font-medium">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;