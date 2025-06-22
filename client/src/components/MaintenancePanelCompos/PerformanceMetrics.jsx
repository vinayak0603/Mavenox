import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function PerformanceMetrics() {
  const data = {
    labels: ["Equipment Reliability", "Maintenance Efficiency", "Predictive Accuracy"],
    datasets: [
      {
        label: "Score",
        data: [92, 85, 78],
        backgroundColor: "#8b5cf6",
        borderRadius: 5
      }
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: { color: "#fff" },
        grid: { color: "#334155" }
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#334155" }
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[#0f172a] p-4 rounded-lg text-white h-64">
      <h2 className="text-xl font-mono mb-2">📊 Performance Metrics</h2>
      <div className="h-full"><Bar data={data} options={options} /></div>
    </div>
  );
}