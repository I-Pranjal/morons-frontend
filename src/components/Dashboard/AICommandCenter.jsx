import React from "react";

const agents = [
  {
    name: "Resume Agent",
    status: "Active",
    description: "Ready to build your professional resume",
    task: "Create your first resume",
    color: "bg-blue-50 border-blue-200"
  },
  {
    name: "Practice Agent",
    status: "Active",
    description: "Ready to generate coding challenges",
    task: "Start with easy problems",
    color: "bg-green-50 border-green-200"
  },
  {
    name: "Feedback Agent",
    status: "Active",
    description: "Processing your activity and progress",
    task: "Weekly progress review",
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    name: "Roadmap Agent",
    status: "Locked",
    description: "Complete profile setup to unlock",
    task: "Set your career goal",
    color: "bg-gray-50 border-gray-200"
  }
];

export const AICommandCenter = () => {
  return (
    <section className="p-6 bg-white rounded-lg border shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">AI Agent Command Center</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, idx) => (
          <div key={idx} className={`rounded-lg border p-4 ${agent.color}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-sm">{agent.name}</h4>
              <span className="text-xs text-green-600">{agent.status}</span>
            </div>
            <p className="text-xs text-gray-700">{agent.description}</p>
            <p className="text-xs mt-1 text-gray-500 font-semibold">Next Task</p>
            <p className="text-sm text-blue-600 underline cursor-pointer">{agent.task}</p>
          </div>
        ))}
      </div>
    </section>
  );
};