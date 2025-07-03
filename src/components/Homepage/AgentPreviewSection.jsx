import React from 'react';

export const AgentPreviewSection = () => {
  return (
    <section className="py-16 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">These are your agents. You'll meet them soon.</h2>
      <p className="text-gray-500 mb-10">Each agent specializes in a different aspect of your career evolution.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {["Resume", "Practice", "Roadmap", "Feedback"].map(agent => (
          <div key={agent} className="border rounded-lg p-6 shadow-sm">
            <div className="text-4xl mb-2">🔒</div>
            <p className="font-semibold mb-2">{agent} Agent</p>
            <button className="text-red-700 border border-red-500 px-4 py-2 rounded hover:bg-red-50 text-sm">
              Join to Unlock
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};