import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../Panels/SettingsPanel";
import AlertsPanel from "../Panels/AlertsPanel";
import SensorPanel from "../Panels/SensorPanel";
import AnalyticsPanel from "../Panels/AnalyticsPanel";
import { Moon, Activity } from "lucide-react";
import MapViewPanel from "../Panels/MapViewPanel";
import MaintenancePanel from "../Panels/MaintenancePanel";
import EnvDataPanel from "../Panels/EnvDataPanel";

const IndexPage = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="flex-1 flex flex-col bg-[#0f172a] text-white overflow-auto">
        {/* Top Bar */}
       <div className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b border-green-800 bg-[#0f172a] gap-2 backdrop-blur-md bg-opacity-90">

    
        {/*
         <div className="text-green-400 font-mono text-sm">
            root@coreva:~# pwd
            <p className="text-lg text-green-500">/sys/monitor/{currentTab.toUpperCase()}</p>
          </div>
        */}
          <div className="flex items-center gap-2">
  <img
    src="/public/Geolook-Logo copy.png" // ← Replace with your logo path or URL
    alt="Logo"
    className="h-5 w-auto"
  />
</div>


          <div className="flex items-center gap-3 flex-wrap">
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
        </div>

        {/* Main Content */}
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
) 
: currentTab === "Maintenance" ? (
  <MaintenancePanel />
)
:
 currentTab === "Env_Data" ? (
  <EnvDataPanel />
)
:
(
  <div className="flex items-center justify-center h-full text-2xl font-semibold">
    {currentTab} is open
  </div>
)}


        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-2 border-t border-[#1e293b] text-xs font-mono text-gray-400">
          <p>Last update: 2025-06-20T08:27:23.629Z</p>
          <p className="text-green-400">Active sensors: 13/13</p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
