import React from "react";

const recommendations = [
  {
    title: "Set Your Career Goal",
    description: "Define your target role to get personalized guidance",
    button: "Set Goal"
  },
  {
    title: "Take Your First Action",
    description: "Start with the Resume Agent to build your profile",
    button: "Start Building"
  },
  {
    title: "Complete More Tasks",
    description: "Try the Practice Agent for skill development",
    button: "Practice Now"
  }
];

export const RecommendationsPanel = () => {
  return (
    <aside className="space-y-6">
      <section className="bg-white rounded-lg p-4 border">
        <h4 className="font-semibold text-sm mb-4">AI Recommendations</h4>
        {recommendations.map((rec, idx) => (
          <div key={idx} className="mb-4">
            <h5 className="text-sm font-medium">{rec.title}</h5>
            <p className="text-xs text-gray-500 mb-2">{rec.description}</p>
            <button className="bg-gray-100 text-xs px-3 py-1 rounded">{rec.button}</button>
          </div>
        ))}
      </section>
      <section className="bg-white rounded-lg p-4 border text-center text-xs">
        <h5 className="font-medium mb-2">🧠 AI Learning</h5>
        <p className="text-gray-500">Your system is learning from your actions to provide better guidance</p>
        <p className="text-green-600 mt-2">0% Intelligence Gained</p>
      </section>
    </aside>
  );
};