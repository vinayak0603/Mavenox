// pages/SensorPanel.jsx
import React from "react";
import { useSensors } from "../context/SensorContext";
import SensorList from "../components/SensorList";

const SensorPanel = () => {
  const {
    sensors,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    totalSensors,
  } = useSensors();

  return (
    <div className="bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl mb-4">SENSOR_DATABASE</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="SEARCH_SENSORS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#1e293b] text-green-400 px-4 py-2 rounded w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1e293b] text-green-400 px-4 py-2 rounded w-full sm:w-1/2"
        >
          <option value="ALL">ALL_STATUS</option>
          <option value="GOOD">GOOD</option>
          <option value="WARNING">WARNING</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      {/* Sensor List */}
      <SensorList sensors={sensors} />

      <p className="mt-4 text-xs text-gray-500">
        Total sensors: {totalSensors}
      </p>
    </div>
  );
};

export default SensorPanel;
