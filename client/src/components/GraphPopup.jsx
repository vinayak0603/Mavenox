// components/GraphPopup.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const getStatus = (value, type) => {
  if (type === "TEMPERATURE") {
    if (value > 30) return "CRITICAL";
    if (value > 25) return "WARNING";
    return "GOOD";
  }
  return "GOOD";
};

const groupEvents = (entries, targetStatus) => {
  const groups = [];
  let currentGroup = null;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const status = getStatus(entry.value, entry.type);

    if (status === targetStatus) {
      if (!currentGroup) {
        currentGroup = { start: entry.timestamp, end: entry.timestamp };
      } else {
        currentGroup.end = entry.timestamp;
      }
    } else {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
    }
  }

  if (currentGroup) groups.push(currentGroup);
  return groups;
};

const getHourlyData = (history) => {
  const now = new Date();
  const points = [];

  for (let i = 0; i < 24; i++) {
    const target = new Date(now);
    target.setHours(target.getHours() - i);
    target.setSeconds(0);
    target.setMilliseconds(0);

    const match = history.find((entry) => {
      const ts = new Date(entry.timestamp);
      return ts.getHours() === target.getHours() &&
             ts.getDate() === target.getDate() &&
             ts.getMinutes() === target.getMinutes();
    });

    if (match) {
      points.unshift(match);
    } else if (i === 0) {
      points.unshift(history[history.length - 1]);
    }
  }

  return points;
};

const GraphPopup = ({ isOpen, onClose, sensor, history }) => {
  const [view, setView] = useState("LIVE");
  const displayData = view === "LIVE" ? history.slice(-10) : getHourlyData(history);
  const criticalEvents = groupEvents(displayData, "CRITICAL");
  const warningEvents = groupEvents(displayData, "WARNING");

  const chartData = {
    labels: displayData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: `${sensor.id} (${sensor.type})`,
        data: displayData.map((d) => d.value),
        borderColor: "#FF5555",
        backgroundColor: "rgba(255,85,85,0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return !isOpen ? null : (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-4 sm:p-6 rounded-lg shadow-lg w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-cyan-400 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-cyan-300 text-lg sm:text-xl mb-4 text-center">
          Detailed Graph: {sensor.id} ({sensor.type})
        </h2>

        <div className="flex gap-4 justify-center mb-4">
          {["LIVE", "1D"].map((label) => (
            <button
              key={label}
              onClick={() => setView(label)}
              className={`px-4 py-2 rounded-full border ${
                view === label ? "bg-cyan-400 text-black" : "text-cyan-300 border-cyan-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="h-[250px] sm:h-[300px] mb-6">
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-red-400 mb-2 font-bold">CRITICAL EVENTS</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              {criticalEvents.length === 0 && <li>No critical events.</li>}
              {criticalEvents.map((e, i) => (
                <li key={i}>{e.start} → {e.end}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 mb-2 font-bold">WARNING EVENTS</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              {warningEvents.length === 0 && <li>No warning events.</li>}
              {warningEvents.map((e, i) => (
                <li key={i}>{e.start} → {e.end}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPopup;
