// pages/AnalyticsPanel.jsx
import React from "react";
import { useSensors } from "../context/SensorContext";
import SensorsGraph from "../components/SensorsGraph";
import StructuralHealthChart from "../components/AnalyticsPanelCompos/StructuralHealthChart";

const AnalyticsPanel = () => {
  const { sensors } = useSensors();

  return (
    <div className="bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl mb-6 font-bold">ANALYTICS_PANEL</h1>

      {/* Structural Health Chart */}
      <StructuralHealthChart />

      {/* Sensor Graphs */}
       <div className="text-green-400 font-mono text-sm mb-1">
        load_analytics --type=sensor_readings
      </div>
      <p className="text-gray-400 text-xs mb-4 font-mono">Analyzing structural integrity data...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <SensorsGraph key={sensor.id} sensorId={sensor.id} />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
