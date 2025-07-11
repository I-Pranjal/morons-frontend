import React from "react";
import { ArrowRight, Brain, Plus } from "lucide-react";

const agents = [
  {
    name: "Resume Agent",
    status: "Active",
    description: "Ready to build your professional resume",
    task: "Create your first resume",
    color: "bg-blue-50 border-blue-200 hover:border-blue-300",
    textColor: "text-blue-600",
    clickable: true,
    progress: 0,
  },
  {
    name: "Practice Agent",
    status: "Active",
    description: "Ready to generate coding challenges",
    task: "Start with easy problems",
    color: "bg-green-50 border-green-200 hover:border-green-300",
    textColor: "text-green-600",
    clickable: true,
    progress: 0,
  },
  {
    name: "Feedback Agent",
    status: "Active",
    description: "Processing your activity and progress",
    task: "Weekly progress review",
    color: "bg-yellow-50 border-yellow-200 hover:border-yellow-300",
    textColor: "text-yellow-600",
    clickable: true,
    progress: 0,
  },
  {
    name: "Roadmap Agent",
    status: "Locked",
    description: "Complete profile setup to unlock",
    task: "Set your career goal",
    color: "bg-gray-50 border-gray-200",
    textColor: "text-gray-500",
    clickable: false,
    progress: 0,
  },
];

export const AICommandCenter = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">AI Agent Command Center</h2>
          <p className="text-gray-600 mt-1">Manage your intelligent career assistants</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">3 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-500">1 Locked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700 font-medium">0% Overall Progress</span>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {agents.map((agent, idx) => (
          <div 
            key={idx} 
            className={`rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer ${agent.color} ${
              agent.clickable ? 'hover:shadow-lg transform hover:-translate-y-1' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg text-gray-900">{agent.name}</h4>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  agent.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {agent.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{agent.description}</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Task</p>
                <p className={`font-medium ${agent.clickable ? "text-gray-900" : "text-gray-500"}`}>
                  {agent.task}
                </p>
              </div>
              
              {agent.clickable && (
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <span>Click to open</span>
                  <ArrowRight size={16} />
                </div>
              )}
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-600">Progress</span>
                  <span className="text-xs font-semibold text-gray-900">{agent.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${agent.status === 'Active' ? 'bg-blue-500' : 'bg-gray-400'} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${agent.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 pt-6">
        <button className="flex items-center justify-center gap-2 border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-colors">
          <Plus size={18} />
          Install New Agents
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-red-600/25">
          <span className="inline-flex items-center gap-2">
            <Brain size={18} />
            View Intelligence Center
          </span>
        </button>
      </div>
    </section>
  );
};