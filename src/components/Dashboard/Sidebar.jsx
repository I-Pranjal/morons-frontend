import React from "react";
import { FaChartBar, FaBolt, FaBrain, FaClipboardList, FaUser, FaFileAlt, FaFlag, FaCog, FaSignOutAlt } from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaChartBar />, active: true },
  { label: "Roadmap", icon: <FaClipboardList /> },
  { label: "Resume", icon: <FaFileAlt /> },
  { label: "Practice", icon: <FaBolt /> },
  { label: "Portfolio", icon: <FaUser /> },
  { label: "Ambition", icon: <FaFlag /> },
  { label: "Reports", icon: <FaChartBar /> },
  { label: "Activity", icon: <FaBolt /> },
  { label: "Intelligence", icon: <FaBrain /> },
  { label: "Subscription", icon: <FaClipboardList /> },
  { label: "Library", icon: <FaClipboardList /> },
  { label: "Milestones", icon: <FaFlag /> },
  { label: "Agent Settings", icon: <FaCog /> },
  { label: "Settings", icon: <FaCog /> }
];

export const Sidebar = () => {
  return (
    <aside className=" md:w-64 bg-white border-r min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">GeniOS</h2>
        <nav className="space-y-2">
          {menu.map((item, index) => (
            <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${item.active ? "bg-red-700 text-white" : "text-gray-700"}`}>
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      <button className="flex items-center gap-2 text-sm mt-8 text-gray-700 hover:text-red-700">
        <FaSignOutAlt /> Sign Out
      </button>
    </aside>
  );
};