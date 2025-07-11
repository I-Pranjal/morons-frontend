import React from "react";
import {
  LayoutDashboard,
  Target,
  FileText,
  Code,
  User,
  Flag,
  BarChart3,
  Zap,
  Brain,
  CreditCard,
  BookOpen,
  Settings,
  X,
} from "lucide-react";

export const Sidebar = ({ activePage, setActivePage, isMobile = false, onClose }) => {
  const navigation = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Project Ideas", icon: <Target size={20} /> },
    { label: "Resume", icon: <FileText size={20} /> },
    { label: "Practice", icon: <Code size={20} /> },
    { label: "Portfolio", icon: <User size={20} /> },
    { label: "Ambition", icon: <Flag size={20} /> },
  ];

  const system = [
    { label: "Reports", icon: <BarChart3 size={20} /> },
    { label: "Activity", icon: <Zap size={20} /> },
    { label: "Intelligence", icon: <Brain size={20} /> },
    { label: "Subscription", icon: <CreditCard size={20} /> },
    { label: "Library", icon: <BookOpen size={20} /> },
    { label: "Milestones", icon: <Flag size={20} /> },
    { label: "Agent Settings", icon: <Settings size={20} /> },
    { label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        {/* Mobile close button */}
        {isMobile && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Logo & User Info */}
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg">
            G
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">Geni</p>
            <p className="text-sm text-gray-500">Welcome, Pranjal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">NAVIGATION</p>
          <nav className="space-y-2">
            {navigation.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                  activePage === item.label
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => {
                  if (item.label === "Resume") {
                    window.location.href = "/resume";
                  } else {
                    setActivePage(item.label);
                    if (isMobile) onClose?.();
                  }
                }}
              >
                <div className={`${activePage === item.label ? "text-white" : "text-gray-500"}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">SYSTEM</p>
          <nav className="space-y-2">
            {system.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all duration-200"
              >
                <div className="text-gray-500">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};