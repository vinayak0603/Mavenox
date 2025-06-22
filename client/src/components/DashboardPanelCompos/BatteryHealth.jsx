// components/BatteryHealth.jsx
import { useEffect, useState } from "react";

export default function BatteryHealth() {
  const [health, setHealth] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHealth = Math.floor(40 + Math.random() * 40); // 40–80%
      setHealth(newHealth);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const percentage = health; // direct percent (0–100)
  const strokeLength = 167.55; // 240° arc path length
  const strokeValue = (percentage / 100) * strokeLength;

  return (
    <div className="bg-gray-800 p-5 rounded-md font-mono w-full h-60 border border-purple-800 text-purple-400">
      {/* Header */}
      <div className="text-white text-lg font-bold mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">%</span> BATTERY_HEALTH
        </div>
        <div className="text-purple-400 text-2xl">🔋</div>
      </div>

      {/* Divider */}
      <div className="border-b border-purple-800 mb-4"></div>

      {/* Arc Gauge */}
      <div className="relative w-full h-32 flex items-center justify-center">
        <svg className="w-36 h-36" viewBox="0 0 120 120">
          {/* Background arc */}
          <path
            d="M30,90 A45,45 0 1,1 90,90"
            fill="none"
            stroke="#e5d7ff" // light background
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Foreground arc */}
          <path
            d="M30,90 A45,45 0 1,1 90,90"
            fill="none"
            stroke="#a855f7"
            strokeWidth="10"
            strokeDasharray={`${strokeValue}, ${strokeLength}`}
            strokeLinecap="round"
          />
        </svg>

        {/* Battery percentage */}
        <div className="absolute text-green-400 text-2xl font-bold">
          {health}%
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm mt-2 text-center text-purple-400">● CHARGING</div>
    </div>
  );
}
