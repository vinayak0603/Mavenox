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
    <div className="bg-[#0f172a] min-h-screen pb-10 w-full overflow-x-hidden">
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 py-6">
        <ActiveSensors />
        <CriticalAlerts />
        <TemperatureMonitor />
        <BatteryHealth />
      </div>

      {/* Alerts Section */}
      <div className="px-4 mt-6">
        <AlertItemList />
      </div>

      {/* Analytics Section */}
      <div className="px-4 mt-10">
        <AnalyticsPanel />
      </div>

      {/* Environmental Data Section */}
      <div className="px-4 mt-10">
        <EnvDataPanel />
      </div>

      {/* Sensor Table/Panel */}
      <div className="px-4 mt-10">
        <SensorPanel />
      </div>

      {/* Dual Charts Section */}
      <div className="px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TemperatureTrend />
        <BatteryLevelsChart />
      </div>

      {/* Maintenance Section */}
      <div className="px-4 mt-10">
        <MaintenancePanel />
      </div>
    </div>
  );
}
