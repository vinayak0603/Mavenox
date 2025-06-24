// File: pages/DashboardPanel.jsx
import AlertItemList from '../components/AlertPanelCompos/AlertItemList';
import StructuralHealthChart from '../components/AnalyticsPanelCompos/StructuralHealthChart';
import ActiveSensors from '../components/DashboardPanelCompos/ActiveSensors';
import BatteryHealth from '../components/DashboardPanelCompos/BatteryHealth';
import CriticalAlerts from '../components/DashboardPanelCompos/CriticalAlerts';
import TemperatureMonitor from '../components/DashboardPanelCompos/TemperatureMonitor';
import AcousticEmission from '../components/EnvDataPanelCompos/AcousticEmission';
import LightIntensity from '../components/EnvDataPanelCompos/LightIntensity';
import ParticleMatter from '../components/EnvDataPanelCompos/ParticleMatter';
import VibrationalAnalysis from '../components/EnvDataPanelCompos/VibrationalAnalysis';
import VocLevels from '../components/EnvDataPanelCompos/VocLevels';
import WaterLevelAnalysis from '../components/EnvDataPanelCompos/WaterLevelAnalysis';
import WindSpeedMonitor from '../components/EnvDataPanelCompos/WindSpeedMonitor';
import SensorList from '../components/SensorList';
import SensorsGraph from '../components/SensorsGraph';
import BatteryLevelsChart from '../components/DashboardPanelCompos/BatteryLevelsChart';
import TemperatureTrend from '../components/DashboardPanelCompos/TemperatureTrend';

import { useSensors } from "../context/SensorContext";
import AIMaintenancePredictions from '../components/MaintenancePanelCompos/AIMaintenancePredictions';
import PerformanceMetrics from '../components/MaintenancePanelCompos/PerformanceMetrics';
import PriorityDistribution from '../components/MaintenancePanelCompos/PriorityDistribution';
import UpcomingMaintenance from '../components/MaintenancePanelCompos/UpcomingMaintenance';
import SensorPanel from './SensorPanel';
import AnalyticsPanel from './AnalyticsPanel';

export default function DashboardPanel() {
   
  const {
      sensors,
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter,
      totalSensors,
    } = useSensors();


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

              <div className="flex flex-col gap-6 p-6">
      {/* Terminal Style Header */}
{/* Terminal Style Header (Responsive) */}
<div className="bg-[#0f172a] rounded-lg p-4 font-mono text-white text-sm leading-relaxed shadow-md w-full break-words">
  <p className="text-[13px]">
<span className="text-green-400">--advanced</span>
  </p>
  <p className="text-gray-400 text-[13px]">Initializing advanced sensor monitoring...</p>
  <p className="mt-3 text-xl sm:text-2xl md:text-3xl text-white tracking-wider font-bold break-words">
    <span className="text-cyan-400">&gt;_</span> ADVANCED_TUNNEL_SENSOR_DASHBOARD
  </p>
</div>

      {/* Grid of sensor cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WindSpeedMonitor/>
        <LightIntensity/>
        <WaterLevelAnalysis/>
        <AcousticEmission/>
        <ParticleMatter/>
        <VocLevels/>
        <VibrationalAnalysis/>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-white">
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">SENSOR_UPTIME</p>
          <p className="text-green-400 text-lg">99.99%</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">DATA_THROUGHPUT</p>
          <p className="text-cyan-400 text-lg">1.2 GB/s</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">ACTIVE_SENSORS</p>
          <p className="text-purple-400 text-lg">24/24</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">SYSTEM_LOAD</p>
          <p className="text-yellow-400 text-lg">42%</p>
        </div>
      </div>

      {/* System Info and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono text-white">
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">System Information:</p>
          <p>Kernel: TUNNEL_MONITOR v3.5.2</p>
          <p>Uptime: 145 days, 23:12:45</p>
          <p>Last Maintenance: 2024-01-15</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">Status Log:</p>
          <p className="text-green-400">[OK] All systems operational</p>
          <p className="text-yellow-400">[NOTICE] Scheduled maintenance in 5 days</p>
          <p className="text-cyan-400">[INFO] Last update: 2025-06-22T05:04:52.604Z</p>
        </div>
      </div>
    </div>


  <SensorPanel/>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
    <div className="w-full sm:w-1/2">
      <TemperatureTrend />
    </div>
    <div className="w-full sm:w-1/2">
      <BatteryLevelsChart />
    </div>
  </div>


      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-[#0f172a] text-white">
        <div className="md:col-span-2">
          <AIMaintenancePredictions/>
        </div>
        <PerformanceMetrics/>
        <PriorityDistribution />
        <div className="md:col-span-2">
          <UpcomingMaintenance />
        </div>
      </div>
    </div>    
    </>

  );
}
