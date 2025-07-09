import React from "react";
import { ArrowRight, Brain } from "lucide-react";

const agents = [
  {
    name: "Resume Agent",
    status: "Active",
    description: "Ready to build your professional resume",
    task: "Create your first resume",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-600",
    clickable: true,
    progress: 0,
  },
  {
    name: "Practice Agent",
    status: "Active",
    description: "Ready to generate coding challenges",
    task: "Start with easy problems",
    color: "bg-green-50 border-green-200",
    textColor: "text-green-600",
    clickable: true,
    progress: 0,
  },
  {
    name: "Feedback Agent",
    status: "Active",
    description: "Processing your activity and progress",
    task: "Weekly progress review",
    color: "bg-yellow-50 border-yellow-200",
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
    <section className="p-6 bg-white rounded-xl border space-y-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">AI Agent Command Center</h2>
        <div className="text-sm text-gray-600">
          <span className="text-green-600 font-medium">3 Active</span> |{" "}
          <span className="text-gray-500">1 Locked</span> |{" "}
          <span className="text-gray-500">0% Overall</span>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {agents.map((agent, idx) => (
          <div key={idx} className={`rounded-xl border p-4 ${agent.color}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-base">{agent.name}</h4>
              <span
                className={`text-xs font-medium ${
                  agent.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                } px-2 py-0.5 rounded`}
              >
                {agent.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">{agent.description}</p>
            <p className="text-xs mt-3 font-semibold text-gray-500">Next Task</p>
            <p
              className={`text-sm font-medium ${
                agent.clickable ? "text-black" : "text-gray-500"
              }`}
            >
              {agent.task}
            </p>
            {agent.clickable && (
              <p className="text-sm mt-1 text-blue-600 cursor-pointer flex items-center gap-1">
                Click to open <ArrowRight size={14} />
              </p>
            )}
            <div className="text-sm text-gray-500 mt-2 font-medium">
              {agent.progress}% Progress
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
        <button className="border px-4 py-2 rounded-md text-green-700 font-medium border-green-200 hover:bg-green-50 transition w-full md:w-auto">
          + Install New Agents
        </button>
        <button className="bg-red-700 text-white px-4 py-2 rounded-md font-medium hover:bg-red-800 transition w-full md:w-auto">
          <span className="inline-flex items-center gap-2">
            <Brain size={16} />
            View Intelligence Center
          </span>
        </button>
      </div>
    </section>
  );
};
