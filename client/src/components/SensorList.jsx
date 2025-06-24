import React from "react";

const statusColor = {
  GOOD: "text-green-400",
  WARNING: "text-yellow-400",
  CRITICAL: "text-red-500",
};

const SensorList = ({ sensors }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-700 px-4 py-2 text-left">SENSOR_ID</th>
            <th className="border border-gray-700 px-4 py-2 text-left">TYPE</th>
            <th className="border border-gray-700 px-4 py-2 text-right">CURRENT_VALUE</th>
            <th className="border border-gray-700 px-4 py-2 text-left">STATUS</th>
            <th className="border border-gray-700 px-4 py-2 text-left">LAST_UPDATED</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id} className="bg-gray-900 text-white">
              <td className="border border-gray-700 px-4 py-2 text-left">{sensor.id}</td>
              <td className="border border-gray-700 px-4 py-2 text-left text-purple-400">{sensor.type}</td>
              <td className="border border-gray-700 px-4 py-2 text-right">{sensor.currentValue}</td>
              <td className={`border border-gray-700 px-4 py-2 ${statusColor[sensor.status]}`}>
                {sensor.status}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-left text-gray-400">
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
