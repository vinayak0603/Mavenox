// Panels/MaintenancePanel.jsx
import React from "react";
import AIMaintenancePredictions from "../components/MaintenancePanelCompos/AIMaintenancePredictions";
import PerformanceMetrics from "../components/MaintenancePanelCompos/PerformanceMetrics";
import PriorityDistribution from "../components/MaintenancePanelCompos/PriorityDistribution";
import UpcomingMaintenance from "../components/MaintenancePanelCompos/UpcomingMaintenance";

const MaintenancePanel = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-[#0f172a] text-white">
      <div className="md:col-span-2">
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
