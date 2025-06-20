import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, FileText, Linkedin, GitBranch, Lightbulb, BarChart3, BookOpen, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const Hubpage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = [
    {
    title: "Fundamentals",
    description: "Customize your experience with personalized role and topic of your preferences.",
    icon: Users,
    path: "/v8/userpreference",
    color: "bg-yellow-100 border-yellow-200"
  },
  {
    title: "Practice & Project",
    description: "Explore project ideas and compare job roles to build practical skills and make informed decisions.",
    icon: Lightbulb,
    path: "/v2/projectideagenerator",
    color: "bg-orange-100 border-orange-200"
  },
  {
    title: "Resume & Portfolio Builder",
    description: "Build your resume, analyze your portfolio, and optimize your LinkedIn profile for job readiness.",
    icon: FileText,
    path: "/resumemaker", 
    color: "bg-blue-100 border-blue-200"
  },
  {
    title: "Mock Interview & Miscellaneous",
    description: "Generate cover resume, letters, bios, and prepare for interviews with smart tools &technology.",
    icon: Users,
    path: "/contentgenerator", // representative path
    color: "bg-pink-100 border-pink-200"
  }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-900">
      <Navbar />
      {/* Tools Grid */}
      <main className="mx-auto lg:mx-64 px-12 py-24">
        <div className={` mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
           Resume & Portfolio Builder
          </h2>
          <p className="text-xl text-gray-300 ">
           "Accelerate your career growth with our all-in-one suite of AI-powered tools. From mastering the fundamentals and exploring real-world projects to crafting a standout resume and preparing for interviews — we’ve got you covered. Whether you're just starting out or aiming for your next big role, our platform helps you showcase your skills, make smarter choices, and stand out with confidence."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className={`
                   ${tool.color} 
                   p-6
                   rounded-3xl 
                   border 
                 border-gray-200 
                   transition-all 
                   duration-300 
                   hover:border-white 
                   hover:shadow-[5px_7px_7px_rgba(255,255,255,0.5)]  
                   cursor-pointer 
                   group
                  //  min-h-[3px] 
                   flex flex-col justify-between  
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm transition-shadow duration-300">
                      <Icon className="size-6 text-black" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-2">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => handleNavigation(tool.path)}
                    className="bg-neutral-900 text-white py-2 px-8 rounded-full text-sm font-medium hover:bg-neutral-800 hover:scale-105 transition-all duration-300"
                  >
                    Launch Tool
                  </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer/>

      
    </div>
  );
};

export default Hubpage;