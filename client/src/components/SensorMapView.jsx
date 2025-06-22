import React, { useRef, useState } from "react";
import { useSensors } from "../context/SensorContext";

// Status color mapping
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

// Tooltip at center
const SensorTooltip = ({ sensor }) => {
  if (!sensor) return null;

  return (
    <div
      className="absolute z-50 font-mono text-xs bg-[#0f172a] border border-cyan-500 text-white p-4 rounded shadow-lg w-[300px]"
      style={{
        top: "250px",
        left: "512px",
        transform: "translate(-50%, -100%)",
      }}
    >
      <p className="text-cyan-400">ID: {sensor.id}</p>
      <p>TYPE: {sensor.type}</p>
      <p>VALUE: {sensor.currentValue}</p>
      <p>BATTERY: 32%</p>
      <p className={`mt-2 px-2 py-1 rounded ${getStatusColor(sensor.status)}`}>
        STATUS: {sensor.status}
      </p>
    </div>
  );
};

export default function SensorMapView() {
  const { sensors } = useSensors();
  const [tooltip, setTooltip] = useState({ visible: false, sensor: null, dotPos: null });
  const mapRef = useRef(null);

  const onHover = (e, sensor) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTooltip({
      visible: true,
      sensor,
      dotPos: { x, y },
    });
  };

  const onLeave = () => {
    setTooltip({ visible: false, sensor: null, dotPos: null });
  };

  const sensorPositions = [
    { top: "38.5%", left: "15.1%" },
    { top: "60.9%", left: "9.4%" },
    { top: "60.9%", left: "23.6%" },
    { top: "60.9%", left: "38.6%" },
    { top: "21.3%", left: "28.1%" },
    { top: "60.9%", left: "58.2%" },
    { top: "60.9%", left: "67.2%" },
    { top: "38.5%", left: "81%" },
    { top: "21.3%", left: "66.9%" },
    { top: "60.9%", left: "74.7%" },
    { top: "77%", left: "81%" },
    { top: "62.2%", left: "87.2%" },
    { top: "76.1%", left: "15%" },
  ];

  const containerWidth = 1024;
  const containerHeight = 500;

  return (
    <>
     <div className="flex justify-center items-center min-h-screen bg-black">
      <div
        ref={mapRef}
        className="relative border-4 border-cyan-500 rounded-lg overflow-hidden"
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          backgroundImage: `url("https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750612664/image11_aysyxp.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      >
        {/* Sensor Dots */}
        {sensorPositions.map((pos, index) => {
          const sensor = sensors[index];
          return (
            <div
              key={sensor?.id || index}
              className={`absolute w-6 h-6 rounded-full ${getStatusColor(sensor?.status)} shadow-md transition-transform hover:scale-110 cursor-pointer`}
              style={{ top: pos.top, left: pos.left }}
              onMouseEnter={(e) => onHover(e, sensor)}
              onMouseLeave={onLeave}
            />
          );
        })}

        {/* SVG Line */}
        {tooltip.visible && tooltip.dotPos && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            width={containerWidth}
            height={containerHeight}
          >
            <line
              x1={tooltip.dotPos.x}
              y1={tooltip.dotPos.y}
              x2={512}
              y2={250}
              stroke="#22d3ee"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </svg>
        )}

        {/* Tooltip */}
        {tooltip.visible && <SensorTooltip sensor={tooltip.sensor} />}
      </div>
    </div>

    </>

  );
}
