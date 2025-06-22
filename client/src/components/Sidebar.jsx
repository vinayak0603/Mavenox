import React, { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Database,
  Map,
  Calendar,ChevronLeft,
  ThermometerSun,
  Settings,
  Moon,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "Dashboard", label: "DASHBOARD", icon: <LayoutDashboard size={18} /> },
    { id: "Analytics", label: "ANALYTICS", icon: <Activity size={18} /> },
    { id: "Alerts", label: "ALERTS", icon: <AlertTriangle size={18} /> },
    { id: "Sensors", label: "SENSORS", icon: <Database size={18} /> },
    { id: "Map_View", label: "MAP VIEW", icon: <Map size={18} /> },
    { id: "Maintenance", label: "MAINTENANCE", icon: <Calendar size={18} /> },
    { id: "Env_Data", label: "ENV DATA", icon: <ThermometerSun size={18} /> },
    { id: "Settings", label: "SETTINGS", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50 border-1 border-green-800">
        <button onClick={() => setIsOpen(true)} className="text-green-800 bg-gray-800 p-1 rounded">
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div className={`hidden lg:flex flex-col h-screen bg-[#0f172a] text-white transition-all duration-300 border-r border-[#1e293b] ${isOpen ? "w-56" : "w-16"}`}>
        {/* Header */}
        <div
          className="flex items-center justify-between px-2 py-1 bg-green-400 cursor-pointer h-16"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-40" />
          <div className="flex text-black">
            {isOpen ? (
              <>
                <ChevronLeft size={20} />
                <ChevronLeft size={20} className="-ml-1" />
              </>
            ) : (
              <>
                <ChevronLeft size={20} className="rotate-180" />
                <ChevronLeft size={20} className="rotate-180 -ml-1" />
              </>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col gap-2 mt-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center px-4 py-2 text-sm font-mono transition-colors duration-150 
                ${currentTab === item.id ? "bg-[#1e293b] text-green-400" : "hover:bg-[#1e293b] text-gray-300"}`}
            >
              {item.icon}
              {isOpen && <span className="ml-2">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto px-4 py-2 border-t border-[#1e293b] text-xs text-green-400 font-mono">
          <p>SYSTEM STATUS:</p>
          <p className="text-green-300 text-xs">Operational</p>
        </div>
        <div className="px-4 py-3 border-t border-[#1e293b] flex items-center gap-2">
          <Moon size={16} />
          {isOpen && <span className="text-green-400 text-sm">$ DARK MODE</span>}
        </div>
      </div>

      {/* Sidebar for Mobile (Drawer Style) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex lg:hidden">
          <div className="w-64 bg-[#0f172a] h-full p-4 flex flex-col text-white">
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-2 py-2 text-sm font-mono transition-colors duration-150 
                  ${currentTab === item.id ? "bg-[#1e293b] text-green-400" : "hover:bg-[#1e293b] text-gray-300"}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-[#1e293b] text-xs font-mono">
              <p className="text-green-400">SYSTEM STATUS:</p>
              <p className="text-green-300">Operational</p>
              <div className="flex items-center mt-2 gap-2">
                <Moon size={16} />
                <span className="text-green-400 text-sm">$ DARK MODE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
