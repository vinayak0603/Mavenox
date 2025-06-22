import React from "react";
import { useSensors } from "../context/SensorContext";
import SensorsGraph from "../components/SensorsGraph";

const AnalyticsPanel = () => {
  const { sensors } = useSensors();

  return (
    <div className="bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl mb-6">ANALYTICS_PANEL</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <SensorsGraph key={sensor.id} sensorId={sensor.id} />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
