import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../Panels/SettingsPanel";
import AlertsPanel from "../Panels/AlertsPanel";
import SensorPanel from "../Panels/SensorPanel";
import AnalyticsPanel from "../Panels/AnalyticsPanel";
import MapViewPanel from "../Panels/MapViewPanel";
import MaintenancePanel from "../Panels/MaintenancePanel";
import EnvDataPanel from "../Panels/EnvDataPanel";
import DashboardPanel from "../Panels/DashboardPanel";
import { Moon, Activity } from "lucide-react";

const IndexPage = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main content container */}
      <div className="flex-1 flex flex-col bg-[#0f172a] text-white overflow-y-auto">

        {/* Top Bar */}
<div className="relative flex items-center justify-center sm:justify-between px-6 py-4 border-b border-green-800 bg-[#0f172a] gap-2">
  {/* Logo (centered absolutely on mobile) */}
  <div className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0">
    <img
      src="https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750591433/Geolook-Logo_wyuybf.png"
      alt="Logo"
      className="h-5 w-auto"
    />
  </div>

  {/* Desktop system status + Logout (hidden on mobile) */}
  <div className="hidden sm:flex items-center gap-3 ml-auto">
    <div className="flex items-center gap-2">
      <p className="text-xs text-gray-400">System Status</p>
      <Activity className="text-green-400" size={16} />
      <p className="text-green-400 text-sm">OPERATIONAL</p>
      <button className="ml-2 p-1 rounded bg-[#1e293b]">
        <Moon size={16} className="text-blue-400" />
      </button>
    </div>
    <button
      onClick={() => {
        if (window.confirm("Are you sure you want to log out?")) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }}
      className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded"
    >
      Logout
    </button>
  </div>

  {/* Logout for mobile only */}
  <div className="block sm:hidden ml-auto">
    <button
      onClick={() => {
        if (window.confirm("Are you sure you want to log out?")) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }}
      className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded"
    >
      Logout
    </button>
  </div>
</div>



        {/* Scrollable Content (Dynamic Panels) */}
        <div className="flex-1 px-6 py-6">
          {currentTab === "Settings" ? (
            <SettingsPanel />
          ) : currentTab === "Alerts" ? (
            <AlertsPanel />
          ) : currentTab === "Sensors" ? (
            <SensorPanel />
          ) : currentTab === "Analytics" ? (
            <AnalyticsPanel />
          ) : currentTab === "Map_View" ? (
            <MapViewPanel />
          ) : currentTab === "Maintenance" ? (
            <MaintenancePanel />
          ) : currentTab === "Env_Data" ? (
            <EnvDataPanel />
          ) : currentTab === "Dashboard" ? (
            <DashboardPanel />
          ) : (
            <div className="text-xl text-center py-10">{currentTab} is open</div>
          )}
        </div>

        {/* Bottom Bar (not sticky) */}
        <div className="px-6 py-2 border-t border-[#1e293b] text-xs font-mono text-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p>Last update: 2025-06-20T08:27:23.629Z</p>
            <p className="text-green-400">Active sensors: 13/13</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
