// components/SystemSettings.jsx
import React from "react";
import { Moon } from "lucide-react";

// SystemSettings.jsx (only if needed)
export default function SystemSettings() {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-6 space-y-7 border border-green-900">
      {/* Header */}
      <div className="text-3xl font-bold text-center bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text flex items-center justify-center gap-2 mb-5">
         SYSTEM SETTINGS
        </div>

      <div className="border border-green-900 rounded-xl p-4 flex items-center justify-between">
        <div className="text-green-400 font-mono text-sm">DISPLAY_MODE</div>
        <button className="p-2 rounded-md bg-gray-700 hover:bg-gray-600">
          🌙 {/* Or the moon icon */}
        </button>
      </div>

      <div className="border border-green-900 rounded-xl p-4 space-y-1 font-mono text-sm">
        <div className="text-cyan-400">SYSTEM_VERSION: 3.5.2_kali</div>
        <div className="text-blue-400">UPTIME: 0d 0h 16m</div>
        <div className="text-green-400">STATUS: OPERATIONAL</div>
      </div>
    </div>
  );
}

