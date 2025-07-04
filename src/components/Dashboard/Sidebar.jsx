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
} from "lucide-react";

export const Sidebar = () => {
  const navigation = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
    { label: "Roadmap", icon: <Target size={18} /> },
    { label: "Resume", icon: <FileText size={18} /> },
    { label: "Practice", icon: <Code size={18} /> },
    { label: "Portfolio", icon: <User size={18} /> },
    { label: "Ambition", icon: <Flag size={18} /> },
  ];

  const system = [
    { label: "Reports", icon: <BarChart3 size={18} /> },
    { label: "Activity", icon: <Zap size={18} /> },
    { label: "Intelligence", icon: <Brain size={18} /> },
    { label: "Subscription", icon: <CreditCard size={18} /> },
    { label: "Library", icon: <BookOpen size={18} /> },
    { label: "Milestones", icon: <Flag size={18} /> },
    { label: "Agent Settings", icon: <Settings size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-full md:w-64 min-h-screen border-r bg-white px-4 py-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-red-700 text-white font-semibold w-10 h-10 rounded-full flex items-center justify-center text-lg">
          G
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">GeniOS</p>
          <p className="text-xs text-gray-500">Welcome, Pranjal</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">NAVIGATION</p>
          <nav className="flex flex-col gap-1">
            {navigation.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                  item.active
                    ? "bg-red-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">SYSTEM</p>
          <nav className="flex flex-col gap-1">
            {system.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
