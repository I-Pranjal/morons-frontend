import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, FileText, Linkedin, GitBranch, Lightbulb, BarChart3, BookOpen, Play } from 'lucide-react';
import Navbar from '../Navbar';

const ProfinacleLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = [
    {
      title: "Resume Builder",
      description: "Create professional resumes with AI-powered optimization and industry-specific templates.",
      icon: FileText,
      path: "/resumemaker",
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Content Generator",
      description: "Generate compelling career content including cover letters, LinkedIn posts, and professional bios.",
      icon: Users,
      path: "/contentgenerator",
      color: "bg-red-50 hover:bg-red-100"
    },
    {
      title: "LinkedIn Analyzer",
      description: "Analyze and optimize your LinkedIn profile for maximum visibility and engagement.",
      icon: Linkedin,
      path: "/v2/linkedinanalyser",
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Job Role Comparator",
      description: "Compare different job roles, salaries, and career paths to make informed decisions.",
      icon: BarChart3,
      path: "/v2/jobrolecomparator",
      color: "bg-red-50 hover:bg-red-100"
    },
    {
      title: "Project Ideas Generator",
      description: "Discover innovative project ideas tailored to your skills and career goals.",
      icon: Lightbulb,
      path: "/v2/projectideagenerator",
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Portfolio Analyzer",
      description: "Get detailed analysis and feedback on your portfolio to showcase your best work.",
      icon: GitBranch,
      path: "/v2/portfolioanalyser",
      color: "bg-red-50 hover:bg-red-100"
    },
    {
      title: "User Preferences",
      description: "Customize your experience with personalized role and topic preferences.",
      icon: Users,
      path: "/v8/userpreference",
      color: "bg-yellow-50 hover:bg-yellow-100"
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-900">
      <Navbar />
      {/* Tools Grid */}
      <main className="container mx-auto px-6 py-30">
        <div className={` mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
           Resume & Portfolio Builder
          </h2>
          <p className="text-xl text-gray-300 ">
           Let's take your career to the next level with our suite of AI-powered tools designed to help you build a standout resume and portfolio. Whether you're a seasoned professional or just starting out, our tools will guide you in creating compelling content that showcases your skills and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className={`
  ${tool.color} 
  p-8 
  rounded-3xl 
  border 
  border-gray-200 
  transition-all 
  duration-300 
  hover:border-white 
  hover:shadow-[5px_7px_7px_rgba(255,255,255,0.5)]  
  cursor-pointer 
  group
`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm transition-shadow duration-300">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <button
                    onClick={() => handleNavigation(tool.path)}
                    className="bg-neutral-900 text-white py-3 px-6 rounded-full font-medium hover:bg-neutral-800 hover:scale-105 transition-colors duration-300"
                  >
                    Launch Tool
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      
    </div>
  );
};

export default ProfinacleLanding;