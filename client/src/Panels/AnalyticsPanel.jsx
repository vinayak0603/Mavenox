import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSensors } from "../context/SensorContext";
import SensorsGraph from "../components/SensorsGraph";
import StructuralHealthChart from "../components/AnalyticsPanelCompos/StructuralHealthChart";

// Faster slide-in from left
const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.3, ease: "easeOut" },
  },
});

const AnalyticsPanel = () => {
  const { sensors } = useSensors();
  const [showAll, setShowAll] = useState(false);

  const visibleSensors = sensors.slice(0, 6);
  const hiddenSensors = sensors.slice(6);

  return (
    <motion.div
      className="bg-gray-900 text-green-400 font-mono p-4 mt-10 border-1 border-green-700 rounded-xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideIn(0)}
    >
      {/* Header */}
      <motion.h1
        variants={slideIn(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full sm:w-auto text-2xl sm:text-3xl font-extrabold 
        bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text uppercase text-center mb-5"
      >
        ANALYTICS PANEL
      </motion.h1>

      <motion.div
        variants={slideIn(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full mx-auto border-t border-green-500 mb-5"
      />

      {/* Structural Health Section */}
      <motion.div
        variants={slideIn(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-4"
      >
        <div className="text-green-400 text-sm mb-1">load_analytics --type=structural_health</div>
        <p className="text-gray-400 text-xs mb-4">Analyzing structural integrity data...</p>
        <StructuralHealthChart />
      </motion.div>

      {/* Sensor Graphs Section */}
      <motion.div
        variants={slideIn(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8"
      >
        <div className="text-green-400 text-sm mb-1">load_analytics --type=sensor_readings</div>
        <p className="text-gray-400 text-xs mb-4">Analyzing sensor values...</p>
      </motion.div>

      {/* First 6 Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleSensors.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            variants={slideIn(0.4 + index * 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SensorsGraph sensorId={sensor.id} />
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {!showAll && sensors.length > 6 && (
        <motion.div
          className="mt-6"
          variants={slideIn(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-3 px-4 text-center border border-green-700 text-white rounded-lg backdrop-blur-md bg-transparent hover:bg-green-800/10 transition-all duration-300"
          >
            View All
          </button>
        </motion.div>
      )}

      {/* Remaining Graphs */}
      {showAll && hiddenSensors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {hiddenSensors.map((sensor, index) => (
            <motion.div
              key={sensor.id}
              initial="hidden"
              animate="visible"
              variants={slideIn(0.05 + index * 0.05)}
            >
              <SensorsGraph sensorId={sensor.id} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AnalyticsPanel;
