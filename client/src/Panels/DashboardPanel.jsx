// File: pages/DashboardPanel.jsx
import AlertItemList from '../components/AlertPanelCompos/AlertItemList';
import ActiveSensors from '../components/DashboardPanelCompos/ActiveSensors';
import BatteryHealth from '../components/DashboardPanelCompos/BatteryHealth';
import CriticalAlerts from '../components/DashboardPanelCompos/CriticalAlerts';
import TemperatureMonitor from '../components/DashboardPanelCompos/TemperatureMonitor';
import BatteryLevelsChart from '../components/DashboardPanelCompos/BatteryLevelsChart';
import TemperatureTrend from '../components/DashboardPanelCompos/TemperatureTrend';
import { useSensors } from "../context/SensorContext";
import SensorPanel from './SensorPanel';
import AnalyticsPanel from './AnalyticsPanel';
import EnvDataPanel from './EnvDataPanel';
import MaintenancePanel from './MaintenancePanel';

export default function DashboardPanel() {
  return (
    <div className="bg-[#0f172a] min-h-screen pb-10 w-full">
      {/* Top Grid: Sensor Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4 w-full">
        <ActiveSensors />
        <CriticalAlerts />
        <TemperatureMonitor />
        <BatteryHealth />
      </div>

      {/* Alerts Section */}
      <div className="px-4 mt-6 mb-10 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <AlertItemList />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <AnalyticsPanel />
        </div>
      </div>

      {/* Environmental Data */}
      <div className="w-full px-4 mt-10">
        <div className="max-w-7xl mx-auto">
          <EnvDataPanel />
        </div>
      </div>

      {/* Sensor Table */}
      <div className="w-full px-4 mt-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <SensorPanel />
        </div>
      </div>

      {/* Dual Chart Section (Temperature + Battery) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 px-4 w-full max-w-7xl mx-auto">
        <div className="w-full sm:w-1/2 min-w-0 overflow-auto">
          <TemperatureTrend />
        </div>
        <div className="w-full sm:w-1/2 min-w-0 overflow-auto">
          <BatteryLevelsChart />
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="w-full px-4 mt-10">
        <div className="max-w-7xl mx-auto">
          <MaintenancePanel />
        </div>
      </div>
    </div>
  );
}
