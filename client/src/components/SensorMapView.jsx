import React, { useState } from "react";
import { useSensors } from "../context/SensorContext";

const getStatusColor = (status) => {
  switch (status) {
    case "GOOD":
      return "bg-green-400 shadow-green-500";
    case "WARNING":
      return "bg-yellow-400 shadow-yellow-500";
    case "CRITICAL":
      return "bg-red-500 shadow-red-600";
    default:
      return "bg-gray-400";
  }
};

const SensorTooltip = ({ sensor, x, y }) => {
  if (!sensor) return null;

  return (
    <div
      className="absolute z-50 text-sm text-white bg-[#1e293b] p-4 rounded-md border border-cyan-500 font-mono transition-all"
      style={{ top: y, left: x }}
    >
      <p className="text-green-300">[{sensor.id}]</p>
      <p>TYPE: {sensor.type}</p>
      <p>VALUE: {sensor.currentValue}</p>
      <p>BATTERY: 32%</p>
      <p className={`mt-1 text-sm ${getStatusColor(sensor.status)}`}>
        STATUS: {sensor.status}
      </p>
    </div>
  );
};

const SensorMapView = () => {
  const { sensors } = useSensors();
  const [tooltip, setTooltip] = useState({
    visible: false,
    sensor: null,
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (e, sensor) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      sensor,
      x: rect.left + rect.width / 2,
      y: rect.top - 100,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, sensor: null, x: 0, y: 0 });
  };

  return (
    <div className="relative bg-[#1a202c] p-6 rounded-lg border border-cyan-500 w-full h-[400px] overflow-hidden">
      <h2 className="text-white font-mono text-lg mb-4">BRIDGE_MONITORING_SYSTEM</h2>
      <div className="absolute top-4 right-6 text-green-400 text-sm font-mono">
        STATUS: ONLINE ●
      </div>

      {/* SVG for Bridge Structure */}
      <svg viewBox="0 0 1000 300" className="w-full h-full absolute top-0 left-0 z-0">
        <path d="M50,200 Q500,50 950,200" stroke="#2dd4bf" strokeWidth="4" fill="none" />
        <line x1="50" y1="200" x2="950" y2="200" stroke="#10b981" strokeWidth="4" />
        {[0, 200, 400, 600, 800].map((num, index) => (
          <g key={index} className="pointer-events-none">
            <line x1={num + 50} y1="200" x2={num + 50} y2="210" stroke="#10b981" strokeDasharray="5,5" />
            <text x={num + 50} y="230" fill="white" className="text-xs" textAnchor="middle">{`${num} m`}</text>
          </g>
        ))}
      </svg>

      {/* Sensor Dots */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-between items-end p-8">
        {sensors.slice(0, 10).map((sensor, i) => (
          <div
            key={sensor.id}
            className={`w-6 h-6 rounded-full ${getStatusColor(sensor.status)} shadow-md cursor-pointer transition-transform transform hover:scale-110`}
            onMouseEnter={(e) => handleMouseEnter(e, sensor)}
            onMouseLeave={handleMouseLeave}
            style={{
              marginBottom: `${Math.sin((i / 9) * Math.PI) * 80 + 50}px`, // arc effect
            }}
          ></div>
        ))}
      </div>

      {tooltip.visible && (
        <SensorTooltip sensor={tooltip.sensor} x={tooltip.x} y={tooltip.y} />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 text-xs flex gap-4 font-mono text-white">
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 rounded-full"></div> OPERATIONAL</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> WARNING</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> CRITICAL</div>
      </div>
    </div>
  );
};

export default SensorMapView;
