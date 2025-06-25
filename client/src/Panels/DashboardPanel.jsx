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
    <>
    <div className="bg-[#0f172a] min-h-screen pb-10">
      {/* Dashboard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <ActiveSensors />
        <CriticalAlerts />
        <TemperatureMonitor />
        <BatteryHealth />
      </div>

      {/* Alerts section */}
      <div className="px-4 mt-6 mb-10">
        <div className="w-full max-w-6xl mx-auto">
          <AlertItemList />
        </div>
      </div>

      <AnalyticsPanel/>

   <EnvDataPanel/>


  <SensorPanel/>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
    <div className="w-full sm:w-1/2">
      <TemperatureTrend />
    </div>
    <div className="w-full sm:w-1/2">
      <BatteryLevelsChart />
    </div>
  </div>


 <MaintenancePanel/>
    </div>    
    </>

  );
}
