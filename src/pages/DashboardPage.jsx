import React from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { AICommandCenter } from "../components/Dashboard/AICommandCenter";
import { RecommendationsPanel } from "../components/Dashboard/RecommendationsPanel";

export const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex p-6 bg-gray-50 min-h-screen space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div >
            <h1 className="text-2xl font-bold text-gray-800">Welcome back to GeniOS! 👋</h1>
            <p className="text-gray-500 text-sm">Your intelligent career OS is optimizing your path.</p>
          </div>
        </header>
        <AICommandCenter />
      </main>
      <div className="w-full md:w-80 p-4 bg-gray-50 border-l">
        {/* <RecommendationsPanel /> */}
      </div>
    </div>
  );
};