import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Bell, AlertOctagon } from "lucide-react";

const AlertItem = ({ level, message, timestamp, status, icon, borderColor, textColor, index }) => (
  <motion.div
    variants={slideIn(0.2 + index * 0.2)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`flex items-start gap-3 border-l-4 pl-4 py-3 px-2 sm:px-4 rounded hover:bg-[#1a2332] transition-all duration-200 ${borderColor}`}
  >
    <div className="pt-1 shrink-0">{icon}</div>
    <div className="w-full">
      <p className={`font-semibold text-sm sm:text-base ${textColor}`}>
        [{level}] <span className="text-white font-normal">{message}</span>
      </p>
      <p className="text-xs text-gray-400 mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-6">
        <span>Timestamp: {timestamp}</span>
        <span className={`mt-1 sm:mt-0 ${textColor}`}>Status: {status}</span>
      </p>
    </div>
  </motion.div>
);

// Animation function (slower, subtle slide from left)
const slideIn = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

const AlertItemList = () => {
  const alerts = [
    {
      id: 1,
      level: "CRITICAL",
      message: "Critical vibration levels detected on Sensor-003",
      timestamp: "2 minutes ago",
      status: "ACTIVE",
      icon: <AlertOctagon className="text-red-400" size={18} />,
      borderColor: "border-red-500",
      textColor: "text-red-400",
    },
    {
      id: 2,
      level: "WARNING",
      message: "Pressure readings above threshold on Sensor-002",
      timestamp: "15 minutes ago",
      status: "ACTIVE",
      icon: <AlertTriangle className="text-yellow-400" size={18} />,
      borderColor: "border-yellow-500",
      textColor: "text-yellow-400",
    },
    {
      id: 3,
      level: "NOTICE",
      message: "Temperature sensor calibration required",
      timestamp: "1 hour ago",
      status: "PENDING",
      icon: <Bell className="text-cyan-400" size={18} />,
      borderColor: "border-cyan-500",
      textColor: "text-cyan-400",
    },
  ];

  const lastUpdated = new Date().toLocaleString();

  return (
    <motion.div
      className="bg-gray-900 text-white font-mono border border-green-700 shadow-lg w-full rounded-xl overflow-hidden mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={slideIn(0)}
    >
      {/* Header */}
      <motion.div
        variants={slideIn(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 py-6 sm:py-8 border-b border-green-500 bg-gray-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left"
      >
        <h1 className="w-full sm:w-auto text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text uppercase text-center">
          Active Alerts
        </h1>
        <div className="text-sm px-4 py-1 rounded-full border border-red-500 text-red-400 font-semibold bg-red-900/20 w-fit mx-auto sm:mx-0">
          {alerts.filter((a) => a.status === "ACTIVE").length} ACTIVE_THREATS
        </div>
      </motion.div>

      {/* Alert List */}
      <div className="space-y-4 px-4 py-5 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {alerts.map((alert, index) => (
          <AlertItem key={alert.id} {...alert} index={index} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        variants={slideIn(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="px-4 py-3 border-t border-green-500 text-xs text-gray-400 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-900"
      >
        <p>Last updated: {lastUpdated}</p>
        <p className="text-green-400 mt-1 sm:mt-0">Alert system status: ACTIVE</p>
      </motion.div>
    </motion.div>
  );
};

export default AlertItemList;
