import React from "react";
import { AlertTriangle, Bell, AlertOctagon } from "lucide-react";

const alerts = [
  {
    id: 1,
    level: "CRITICAL",
    message: "Critical vibration levels detected on Sensor-003",
    timestamp: "2 minutes ago",
    status: "ACTIVE",
    icon: <AlertOctagon className="text-red-400" size={16} />,
    borderColor: "border-red-500",
    textColor: "text-red-400",
  },
  {
    id: 2,
    level: "WARNING",
    message: "Pressure readings above threshold on Sensor-002",
    timestamp: "15 minutes ago",
    status: "ACTIVE",
    icon: <AlertTriangle className="text-yellow-400" size={16} />,
    borderColor: "border-yellow-500",
    textColor: "text-yellow-400",
  },
  {
    id: 3,
    level: "NOTICE",
    message: "Temperature sensor calibration required",
    timestamp: "1 hour ago",
    status: "PENDING",
    icon: <Bell className="text-cyan-400" size={16} />,
    borderColor: "border-cyan-500",
    textColor: "text-cyan-400",
  },
];

const AlertsPanel = () => {
  return (
    <div className="bg-[#0f172a] text-white font-mono rounded-lg overflow-hidden border border-[#1e293b] w-full h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]">
        <p className="text-green-400 text-sm break-all">
          root@coreva:~# <span className="text-white">cat /var/log/alerts.log</span>
        </p>
        <p className="text-gray-400 text-xs">Monitoring system alerts...</p>

        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="text-green-400 text-xl font-bold">ACTIVE_ALERTS</h2>
          <div className="text-red-400 border border-red-500 px-3 py-1 rounded text-sm w-fit">
            2 ACTIVE_THREATS
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4 p-4 pt-6 overflow-y-auto max-h-[60vh]">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 border-l-4 pl-4 py-2 bg-[#0f172a] ${alert.borderColor}`}
          >
            <div className="pt-1">{alert.icon}</div>
            <div className="w-full">
              <p className={`${alert.textColor} font-semibold text-sm`}>
                [{alert.level}]{" "}
                <span className="text-white">{alert.message}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Timestamp: {alert.timestamp}
                <span className={`ml-4 ${alert.textColor}`}>Status: {alert.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
