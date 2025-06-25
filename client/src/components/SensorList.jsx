import React from "react";
import { motion } from "framer-motion";

const statusColor = {
  GOOD: "text-green-400",
  WARNING: "text-yellow-400",
  CRITICAL: "text-red-500",
};

// Slide animation for table container
const tableSlideIn = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Fade animation per row
const rowFadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.4, ease: "easeOut" },
  },
});

const SensorList = ({ sensors }) => {
  return (
    <motion.div
      className="w-full overflow-x-auto max-w-full"
      style={{
        scrollbarWidth: "thin", // Firefox
        overflowY: "hidden",
      }}
      variants={tableSlideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="min-w-full inline-block align-middle">
        <table className="table-fixed border border-gray-700 border-collapse w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 px-4 py-2 text-left w-[20%]">SENSOR_ID</th>
              <th className="border border-gray-700 px-4 py-2 text-left w-[20%]">TYPE</th>
              <th className="border border-gray-700 px-4 py-2 text-right w-[20%]">CURRENT_VALUE</th>
              <th className="border border-gray-700 px-4 py-2 text-left w-[20%]">STATUS</th>
              <th className="border border-gray-700 px-4 py-2 text-left w-[20%]">LAST_UPDATED</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <motion.tr
                key={sensor.id}
                variants={rowFadeIn(index * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-900 text-white"
              >
                <td className="border border-gray-700 px-4 py-2 text-left">{sensor.id}</td>
                <td className="border border-gray-700 px-4 py-2 text-left text-purple-400">{sensor.type}</td>
                <td className="border border-gray-700 px-4 py-2 text-right">{sensor.currentValue}</td>
                <td className={`border border-gray-700 px-4 py-2 ${statusColor[sensor.status]}`}>
                  {sensor.status}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-left text-gray-400">
                  {new Date(sensor.lastUpdated).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SensorList;
