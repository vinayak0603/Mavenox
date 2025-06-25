// src/Panels/EnvDataPanel.jsx
import React from "react";
import { motion } from "framer-motion";
import WindSpeedMonitor from "../components/EnvDataPanelCompos/WindSpeedMonitor";
import LightIntensity from "../components/EnvDataPanelCompos/LightIntensity";
import WaterLevelAnalysis from "../components/EnvDataPanelCompos/WaterLevelAnalysis";
import AcousticEmission from "../components/EnvDataPanelCompos/AcousticEmission";
import ParticleMatter from "../components/EnvDataPanelCompos/ParticleMatter";
import VocLevels from "../components/EnvDataPanelCompos/VocLevels";
import VibrationalAnalysis from "../components/EnvDataPanelCompos/VibrationalAnalysis";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const EnvDataPanel = () => {
  return (
    <motion.div
      className="flex flex-col gap-6 p-6 border-1 border-green-700 rounded-xl mt-5"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Header */}
      <motion.div custom={0} variants={fadeIn} className="bg-[#0f172a] rounded-lg p-4 font-mono text-white text-sm shadow-md w-full">
        <div className="text-3xl font-bold text-center bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text flex items-center justify-center gap-2 mb-5">
          <span>&gt;_</span> ADVANCED_TUNNEL_SENSOR_DASHBOARD
        </div>
        <div className="w-full mx-auto border-t border-green-500 mb-5" />
        <p className="text-[13px]">
          <span className="text-white">./tunnel_monitor <span className="text-green-400">--advanced</span></span>
        </p>
        <p className="text-gray-400 text-[13px]">Initializing advanced sensor monitoring...</p>
      </motion.div>

      {/* Sensor Cards */}
      <motion.div custom={1} variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WindSpeedMonitor />
        <LightIntensity />
        <WaterLevelAnalysis />
        <AcousticEmission />
        <ParticleMatter />
        <VocLevels />
        <VibrationalAnalysis />
      </motion.div>

      {/* Metrics */}
      <motion.div custom={2} variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-white">
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">SENSOR_UPTIME</p>
          <p className="text-green-400 text-lg">99.99%</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">DATA_THROUGHPUT</p>
          <p className="text-cyan-400 text-lg">1.2 GB/s</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">ACTIVE_SENSORS</p>
          <p className="text-purple-400 text-lg">24/24</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">SYSTEM_LOAD</p>
          <p className="text-yellow-400 text-lg">42%</p>
        </div>
      </motion.div>

      {/* Logs */}
      <motion.div custom={3} variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono text-white">
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">System Information:</p>
          <p>Kernel: TUNNEL_MONITOR v3.5.2</p>
          <p>Uptime: 145 days, 23:12:45</p>
          <p>Last Maintenance: 2024-01-15</p>
        </div>
        <div className="bg-[#0f172a] border border-green-800 p-4 rounded">
          <p className="text-gray-400">Status Log:</p>
          <p className="text-green-400">[OK] All systems operational</p>
          <p className="text-yellow-400">[NOTICE] Scheduled maintenance in 5 days</p>
          <p className="text-cyan-400">[INFO] Last update: 2025-06-22T05:04:52.604Z</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnvDataPanel;
