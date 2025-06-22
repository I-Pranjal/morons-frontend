import React, { useState } from 'react';
import { Lightbulb, CheckSquare, Award, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import for navigation
import Navbar from "../Navbar"
import ProjectIdeasGenerator from '../projectIdeaGenerator/projectIdeaGenerator';
import Footer from '../footer'; // Added footer import

// Import other components
// import ProjectEvaluator from '../ProjectEvaluator';
// import Assessments from '../Assessments';

const PracticeProjectHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // Track active component
  const navigate = useNavigate(); // Add navigation hook

  const sidebarItems = [
    {
      id: 'project-generator',
      title: 'Project Idea Generator',
      icon: Lightbulb,
      route: '/v2/projectideagenerator',
      component: 'ProjectIdeasGenerator'
    },
    {
      id: 'project-evaluator',
      title: 'Project Evaluator',
      icon: CheckSquare,
      route: '/evaluator',
      component: 'ProjectEvaluator'
    },
    {
      id: 'assessments',
      title: 'Assessments',
      icon: Award,
      route: '/assessments',
      component: 'Assessments'
    }
  ];

  const handleSidebarClick = (item) => {
    setActiveComponent(item.component);
    setSidebarOpen(false); // Close mobile sidebar after selection
  };

  const renderActiveComponent = () => {
    switch(activeComponent) {
      case 'ProjectIdeasGenerator':
        return <ProjectIdeasGenerator />;
      case 'ProjectEvaluator':
        // return <ProjectEvaluator />;
        return <div className="p-8 text-center text-gray-400">Project Evaluator component will be loaded here</div>;
      case 'Assessments':
        // return <Assessments />;
        return <div className="p-8 text-center text-gray-400">Assessments component will be loaded here</div>;
      default:
        return (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Content */}
            <div className="text-center space-y-6">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to Practice Project Hub
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Your comprehensive toolkit for developing, evaluating, and testing your programming projects. 
                  Choose a tool from the sidebar to get started.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200 cursor-pointer"
                      onClick={() => handleSidebarClick(item)}
                    >
                      <div className="text-center">
                        <div className="p-3 bg-amber-300/10 rounded-lg border border-amber-300/20 w-fit mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-amber-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-6">Your Progress</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-300 mb-1">0</div>
                    <div className="text-gray-400 text-sm">Projects Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-300 mb-1">0</div>
                    <div className="text-gray-400 text-sm">Projects Evaluated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-300 mb-1">0</div>
                    <div className="text-gray-400 text-sm">Assessments Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="min-h-[calc(100vh-4rem)] bg-black text-white mt-16">
        {/* Mobile Menu Button - positioned below navbar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex">
          {/* Sidebar - Always visible on desktop, toggleable on mobile */}
          <div className={`
            fixed md:relative top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-black z-40 transition-transform duration-300 border-r border-gray-800
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-4">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeComponent === item.component;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSidebarClick(item)}
                      className={`w-full text-left p-6 rounded-xl transition-all duration-200 border group ${
                        isActive 
                          ? 'bg-amber-300/10 text-amber-300 border-amber-300/30' 
                          : 'bg-gray-900 text-gray-300 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg transition-colors ${
                            isActive 
                              ? 'text-amber-300' 
                              : 'text-white group-hover:text-amber-300'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area - Right side of sidebar */}
          <div className="flex-1 p-6 md:p-8 pt-8 ml-0 md:ml-0">
            {renderActiveComponent()}
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PracticeProjectHub;