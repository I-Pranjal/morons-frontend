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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-amber-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-300/20"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-300/10 rounded-lg flex items-center justify-center border border-amber-300/30">
                  <stat.icon size={24} className="text-amber-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;