import React, { useState } from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { AICommandCenter } from "../components/Dashboard/AICommandCenter";
import { RecommendationsPanel } from "../components/Dashboard/RecommendationsPanel";
import DashboardWelcomeBack from "../components/Dashboard/DashboardWelcomeBack";
import ProjectAnalyser from "./ProjectAnalyser";
import ProjectIdeaGenerator from "./ProjectIdeaGenerator";
import { Menu } from "lucide-react";

export const DashboardPage = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 items-center justify-between border-b bg-white shadow-sm">
        <h1 className="text-lg font-semibold">GeniOS Dashboard</h1>
        <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
      </div>
 
      {/* Mobile Sidebar + Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative z-40 w-64 bg-white shadow-lg">
            <Sidebar
              activePage={activePage}
              setActivePage={(page) => {
                setActivePage(page);
                setSidebarOpen(false); // Close after selection
              }}
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-1/6">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main Content */}
      <main className=" min-w-screen w-full md:w-4/6 p-4">
        {activePage === "Portfolio" && <ProjectAnalyser />}
        {activePage === "Project Ideas" && <ProjectIdeaGenerator />}
        {activePage === "Dashboard" && (
          <>
            <DashboardWelcomeBack />
            <AICommandCenter />
          </>
        )}
      </main>

      {/* Recommendations Panel */}
      {/* <div className="hidden md:block md:w-1/6 p-4 border-l bg-gray-50">
        <RecommendationsPanel />
      </div> */}
    </div>
  );
};
