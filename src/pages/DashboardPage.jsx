import React, { useState } from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { AICommandCenter } from "../components/Dashboard/AICommandCenter";
import { RecommendationsPanel } from "../components/Dashboard/RecommendationsPanel";
import DashboardWelcomeBack from "../components/Dashboard/DashboardWelcomeBack";
import ProjectAnalyser from "./ProjectAnalyser";
import ProjectIdeaGenerator from "./ProjectIdeaGenerator";

export const DashboardPage = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="grid grid-cols-6">
      <Sidebar className="col-span-1" setActivePage={setActivePage} activePage={activePage} />
      <main className="col-span-4 py-6 bg-gray-50 min-h-screen">
        {activePage === "Portfolio" && <ProjectAnalyser />}
        {activePage === "Project Ideas" && <ProjectIdeaGenerator />}
        {(activePage === "Dashboard") && (
          <>
            <DashboardWelcomeBack />
            <AICommandCenter />
          </>
        )}
      </main>
      <div className="w-full md:w-80 p-4 bg-gray-50 border-l">
        <RecommendationsPanel className="col-span-1" />
      </div>
    </div>
  );
};
