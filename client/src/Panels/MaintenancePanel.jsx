// Panels/MaintenancePanel.jsx
import React from "react";
import AIMaintenancePredictions from "../components/MaintenancePanelCompos/AIMaintenancePredictions";
import PerformanceMetrics from "../components/MaintenancePanelCompos/PerformanceMetrics";
import PriorityDistribution from "../components/MaintenancePanelCompos/PriorityDistribution";
import UpcomingMaintenance from "../components/MaintenancePanelCompos/UpcomingMaintenance";

const MaintenancePanel = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-[#0f172a] text-white border-1 border-green-700 mt-5 rounded-xl">
     
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text items-center justify-center gap-2 mb-5 text-center">
          Maintenance
      </h2>
      <div className="w-full mx-auto border-t border-green-500 mb-5" />

        <AIMaintenancePredictions />
      </div>
      <PerformanceMetrics />
      <PriorityDistribution />
      <div className="md:col-span-2">
        <UpcomingMaintenance />
      </div>
    </div>
  );
};

export default MaintenancePanel;