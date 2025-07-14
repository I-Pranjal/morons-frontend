import React, { useState } from 'react';
import { BarChart2, Folder, Settings, Activity } from 'lucide-react';
import OverviewTab from './overviewTab';
import CategoriesTab from './categoriesTab';
import JDMatchTab from './JDMatchTab';
import AnalyticsTab from './AnalyticsTab';

const tabs = [
  { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'jdmatch', label: 'JD Match', icon: <Settings className="w-4 h-4" /> },
  { id: 'categories', label: 'Categories', icon: <Folder className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <Activity className="w-4 h-4" /> },
];

export default function ResumeDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'jdmatch':
        return <JDMatchTab />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Tab Header */}
      <div className="flex gap-1 bg-[#f1f5f9] p-1 rounded-xl w-fit">
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all
        ${
          activeTab === tab.id
            ? 'bg-white text-black shadow-sm'
            : 'text-slate-600 hover:text-black'
        }`}
    >
      {tab.icon}
      {tab.label}
    </button>
  ))}
</div>


      {/* Tab Body */}
      <div className='my-4'>{renderTabContent()}</div>
    </div>
  );
}
