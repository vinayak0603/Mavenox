import React from "react";
import { useSensors } from "../context/SensorContext";
import SensorsGraph from "../components/SensorsGraph";
import StructuralHealthChart from "../components/AnalyticsPanelCompos/StructuralHealthChart";

const AnalyticsPanel = () => {
  const { sensors } = useSensors();

  return (
    <div className="bg-gray-900 text-green-400 font-mono p-4 mt-10 border-1 border-green-500 rounded-xl">
        {/* Header */}
        <h1
          className="w-full sm:w-auto text-2xl sm:text-3xl font-extrabold 
          bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text uppercase text-center mb-5"
        >
          ANALYTICS PANEL
        </h1>
        <div className="w-full mx-auto border-t border-green-500 mb-5" />

        {/* Structural Health Section */}
        <div className="text-green-400 text-sm mb-1">load_analytics --type=structural_health</div>
        <p className="text-gray-400 text-xs mb-4">Analyzing structural integrity data...</p>
        <StructuralHealthChart />

        {/* Sensor Graphs Section */}
        <div className="mt-8 text-green-400 text-sm mb-1">load_analytics --type=sensor_readings</div>
        <p className="text-gray-400 text-xs mb-4">Analyzing sensor values...</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor) => (
            <SensorsGraph key={sensor.id} sensorId={sensor.id} />
          ))}
        </div>
      </div>
  );
};

export default AnalyticsPanel;
