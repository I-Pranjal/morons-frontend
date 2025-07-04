import React from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { AICommandCenter } from "../components/Dashboard/AICommandCenter";
import { RecommendationsPanel } from "../components/Dashboard/RecommendationsPanel";
import DashboardWelcomeBack from "../components/Dashboard/DashboardWelcomeBack";

export const DashboardPage = () => {
  return (
    <div className="grid grid-cols-6">
      <Sidebar className="col-span-1" />
      <main className="col-span-4 p-6 bg-gray-50 min-h-screen space-y-6">
        <DashboardWelcomeBack />
        <AICommandCenter />
      </main>
      <div className="w-full md:w-80 p-4 bg-gray-50 border-l">
        <RecommendationsPanel className="col-span-1" />
      </div>
    </div>
  );
};