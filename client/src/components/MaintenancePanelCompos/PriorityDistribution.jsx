import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PriorityDistribution() {
  const data = {
    labels: ["High", "Medium"],
    datasets: [
      {
        label: "Priority",
        data: [50, 50],
        backgroundColor: ["#ef4444", "#facc15"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[#0f172a] p-4 rounded-lg text-white h-80 bg-gray-800">
      <h2 className="text-xl font-mono mb-2">📊 Priority Distribution</h2>
      <div className="h-[70%]"><Pie data={data} options={options} /></div>
    </div>
  );
}