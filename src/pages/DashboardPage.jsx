import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { AICommandCenter } from "../components/Dashboard/AICommandCenter";
import DashboardWelcomeBack from "../components/Dashboard/DashboardWelcomeBack";
import ProjectAnalyser from "./ProjectAnalyser";
import ProjectIdeaGenerator from "./ProjectIdeaGenerator";
import { RecommendationsPanel } from "../components/Dashboard/RecommendationsPanel";
import { Menu, X } from "lucide-react";
import  {ResumeAgent}  from "../components/Resume Agent/resumeAgent";

export const DashboardPage = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll on mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Top Bar */}
      <div className="flex lg:hidden fixed top-0 left-0 right-0 z-30 p-4 items-center justify-between border-b bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">GeniOS Dashboard</h1>
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar */}
          <div className="relative z-50 w-80 bg-white shadow-lg">
            <Sidebar
              activePage={activePage}
              setActivePage={(page) => {
                setActivePage(page);
                setSidebarOpen(false);
              }}
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r border-gray-200 bg-white">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Content */}
        <main className="flex-1 px-4 lg:px-8 py-6 pt-20 lg:pt-6 max-w-none">
          {activePage === "Dashboard" && (
            <div className="space-y-8">
              <DashboardWelcomeBack />
              <AICommandCenter />
            </div>
          )}
          {activePage === "Portfolio" && <ProjectAnalyser />}
          {activePage === "Project Ideas" && <ProjectIdeaGenerator />}
          {activePage === "Resume" && <ResumeAgent />}
        </main>

        {/* Right Sidebar - Recommendations Panel (Desktop only) */}
        {activePage === "Dashboard" && (
          <div className="hidden xl:block w-80 p-6 bg-gray-50 border-l border-gray-200">
            <RecommendationsPanel />
          </div>
        )}
      </div>
    </div>
  );
};