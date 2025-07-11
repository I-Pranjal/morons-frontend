import React, { useState } from 'react';
import { Sparkles, Target, Bot, BarChart3, FolderOpen } from 'lucide-react';
import Overview from './overview';
import Categories from './categories';
import JDtoProject from './JDtoProject';
import SavedProjects from './savedprojects';
import Analytics from './analytics';

const tabs = ['Overview', 'Categories', 'JD-to-Project', 'My Ideas', 'Analytics'];

const tabIcons = {
  'Overview': <Sparkles className="w-4 h-4" />,
  'Categories': <FolderOpen className="w-4 h-4" />,
  'JD-to-Project': <Target className="w-4 h-4" />,
  'My Ideas': <Bot className="w-4 h-4" />,
  'Analytics': <BarChart3 className="w-4 h-4" />
};

const suggestions = [
  {
    title: 'Build a Trending AI Project',
    level: 'high',
    description: 'AI-powered tools are in high demand. Consider building a chatbot or automation tool.',
    icon: <Bot className="h-5 w-5 text-red-400" />,
    button: 'Generate AI Project Ideas',
  },
  {
    title: 'Add Technical Documentation',
    level: 'medium',
    description: 'Your last 3 projects lack detailed README files. This reduces their professional appeal.',
    icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
    button: 'Improve Documentation',
  },
  {
    title: 'Align with Target Role',
    level: 'high',
    description: 'Based on your profile, you should build more backend/API projects for SDE roles.',
    icon: <Target className="h-5 w-5 text-pink-400" />,
    button: 'Get Role-Specific Ideas',
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview suggestions={suggestions} />;
      case 'Categories':
        return <Categories />;
      case 'JD-to-Project':
        return <JDtoProject />;
      case 'My Ideas':
        return <SavedProjects />;
      case 'Analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap gap-2 -mb-px">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-sm font-medium transition-all duration-200 ${
                  tab === activeTab
                    ? 'bg-white text-red-600 border-b-2 border-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tabIcons[tab]}
                <span className="hidden sm:inline">{tab}</span>
                <span className="sm:hidden">{tab.split('-')[0]}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;
