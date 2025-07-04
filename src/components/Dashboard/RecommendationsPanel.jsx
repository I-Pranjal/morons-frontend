import React from "react";
import ProgressSnapshot from "./ProgressSnapshot";
import AIReccomendations from "./AIReccomendations";

export const RecommendationsPanel = () => {
  return (
    <aside className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 bg-white">
        Smart Guidance 
      </h2>
      <ProgressSnapshot />
      <AIReccomendations />
    </aside>
  );
};