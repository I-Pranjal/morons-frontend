import React, { useState, useEffect } from 'react';

export const AgentPreviewSection = () => {
  const [progress, setProgress] = useState({ resume: 0, practice: 0, roadmap: 0, feedback: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => ({
        resume: (prev.resume + 1.2) % 100,
        practice: (prev.practice + 0.8) % 100,
        roadmap: (prev.roadmap + 1.5) % 100,
        feedback: (prev.feedback + 0.6) % 100,
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleJoinToUnlock = () => {
    const email = prompt("Enter your email to unlock these agents:");
    if (email) {
      console.log("Joining waitlist with email:", email);
    }
  };

  const agents = [
    {
      name: "Resume Agent",
      description: "Optimizing career signal...",
      progress: progress.resume,
      icon: "📄"
    },
    {
      name: "Practice Agent", 
      description: "Calibrating challenges...",
      progress: progress.practice,
      icon: "🎯"
    },
    {
      name: "Roadmap Agent",
      description: "Constructing personalized milestones...",
      progress: progress.roadmap,
      icon: "📈"
    },
    {
      name: "Feedback Agent",
      description: "Analyzing progression delta...",
      progress: progress.feedback,
      icon: "💬"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            These are your agents. You'll meet them soon.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each agent specializes in a different aspect of your career evolution.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {agents.map((agent, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative group">
              {/* Hidden content - visible on hover */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{agent.icon}</span>
                  <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">{agent.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Intelligence Level</span>
                    <span className="text-gray-600">{Math.round(agent.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${agent.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {agent.progress < 30 ? "Initializing neural pathways..." : 
                     agent.progress < 70 ? "Calibrating intelligence matrix..." : "Nearly operational..."}
                  </p>
                </div>
              </div>
              
              {/* Blurred overlay - hides on hover */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 border-2 border-teal-200/30 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-orange-50/50 rounded-xl"></div>
                <div className="text-4xl mb-4 text-red-300 animate-pulse">🔒</div>
                <button
                  className="text-red-700 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                  onClick={handleJoinToUnlock}
                >
                  🔒 Join to Unlock
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-xl text-gray-900 mb-6 font-medium">
              From 1x to 10x, we've seen what happens when AI becomes your daily co-pilot.
            </p>
            <p className="text-gray-600 mb-4">
              But the journey begins with a single agent.
            </p>
            <p className="text-red-700 font-semibold text-lg">
              Join beta. Watch what happens in 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};