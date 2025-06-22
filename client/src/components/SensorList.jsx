// components/SensorList.jsx
import React from "react";

const statusColor = {
  GOOD: "text-green-400",
  WARNING: "text-yellow-400",
  CRITICAL: "text-red-500",
};

const SensorList = ({ sensors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="text-left px-4 py-2">SENSOR_ID</th>
            <th className="text-left px-4 py-2">TYPE</th>
            <th className="text-right px-4 py-2">CURRENT_VALUE</th>
            <th className="text-left px-4 py-2">STATUS</th>
            <th className="text-left px-4 py-2">LAST_UPDATED</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id} className="bg-gray-800 border-b border-gray-700">
              <td className="text-left px-4 py-2">{sensor.id}</td>
              <td className="text-left px-4 py-2 text-purple-400">{sensor.type}</td>
              <td className="text-right px-4 py-2">{sensor.currentValue}</td>
              <td className={`px-4 py-2 ${statusColor[sensor.status]}`}>{sensor.status}</td>
              <td className="text-left px-4 py-2 text-gray-500">
                {new Date(sensor.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorList;
