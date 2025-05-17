import React, { useState } from 'react';
import History from '../components/History';
import { Calendar, Download, Filter } from 'lucide-react';


const HistoryDashboard = () => {
  const [dateRange, setDateRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Handle history item click to navigate to the specific history item
  const handleHistoryItemClick = (item) => {
    // In a real app, this would navigate to the specific history item view
    // history.push(item.path);
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Activity History</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          
          <button className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="text-sm font-medium mb-3">Filter Options</h3>
          
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date Range</label>
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="text-gray-400" />
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-sm border-gray-200 rounded py-1"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
            
            {/* Additional filters could be added here */}
          </div>
        </div>
      )}
      
      {/* Main history display */}
      <div className="bg-white rounded-lg shadow">
        <History 
          compact={false} 
          limit={20} 
          onItemClick={handleHistoryItemClick}
        />
      </div>
      
      {/* Info cards - Statistics about user history */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Activities</h3>
          <p className="text-2xl font-bold mt-1">24</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Most Common</h3>
          <p className="text-xl font-medium mt-1">Resume Reviews</p>
          <p className="text-xs text-gray-500 mt-1">10 activities</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Last Activity</h3>
          <p className="text-xl font-medium mt-1">Mock Interview</p>
          <p className="text-xs text-gray-500 mt-1">Today at 2:30 PM</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryDashboard;