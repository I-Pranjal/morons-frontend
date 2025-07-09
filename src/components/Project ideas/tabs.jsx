import React, { useState } from 'react';
import { Sparkles, Target, Bot } from 'lucide-react';
import Overview from './overview';
import Categories from './categories';
import JDtoProject from './JDtoProject';
import SavedProjects from './savedprojects';
import Analytics from './analytics';

const tabs = ['Overview', 'Categories', 'JD-to-Project', 'My Ideas', 'Analytics'];

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
    <div className="px-4 py-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              tab === activeTab
                ? 'bg-white text-gray-900 border border-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;
