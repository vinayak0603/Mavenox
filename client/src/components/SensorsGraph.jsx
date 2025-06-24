import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSensors } from "../context/SensorContext";
import GraphPopup from "./GraphPopup";
import { Maximize2 } from "lucide-react";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const getStatusColor = (value, type) => {
  if (type === "TEMPERATURE") {
    if (value > 30) return "#FF0000";
    if (value > 25) return "#FFA500";
    return "#00FF00";
  }
  return "#00FF00";
};

const SensorsGraph = ({ sensorId }) => {
  const { sensors } = useSensors();
  const sensor = sensors.find((s) => s.id === sensorId);
  const STORAGE_KEY = `sensor_history_${sensorId}`;
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, [sensorId]);

  useEffect(() => {
    if (!sensor) return;

    const timestamp = new Date(sensor.lastUpdated).toLocaleTimeString();
    const newEntry = {
      timestamp,
      value: sensor.currentValue,
      type: sensor.type,
    };

    setHistory((prev) => {
      const isDuplicate = prev.length > 0 && prev[prev.length - 1].timestamp === timestamp;
      if (isDuplicate) return prev;

      const updated = [...prev.slice(-9), newEntry];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [sensor?.lastUpdated]);

  if (!sensor) return null;

  const pointColors = history.map((entry) => getStatusColor(entry.value, sensor.type));

  const chartData = {
    labels: history.map((d) => d.timestamp),
    datasets: [
      {
        label: `${sensor.id} (${sensor.type})`,
        data: history.map((d) => d.value),
        borderColor: "#00FFFF",
        backgroundColor: "rgba(0,255,255,0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: pointColors,
        pointHoverRadius: 6,
        pointHoverBorderColor: "white",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: "nearest", axis: "x", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        borderColor: "#00FFFF",
        borderWidth: 1,
        titleColor: "#00FFFF",
        bodyColor: "#00FFFF",
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => `value : ${item.raw}`,
        },
        displayColors: false,
        padding: 12,
        titleFont: { weight: "normal", size: 14 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#00FFFF", maxRotation: 0, minRotation: 0 },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#00FFFF" },
        min: 0,
        max: sensor.type === "TEMPERATURE" ? 40 : undefined,
        grid: { display: false },
      },
    },
  };

  return (
    <>
      <div className="bg-[#0f172a] p-4 rounded-lg shadow-inner border border-cyan-500 w-full min-w-[300px] relative">
        {/* Expand Button */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 text-cyan-400 hover:text-white"
        >
          <Maximize2 size={16} />
        </button>

        {/* Title */}
        <h2 className="text-center text-cyan-400 text-md mb-2">
          [{sensor.id.toUpperCase()}_{sensor.type}_DATA]
        </h2>

        {/* Chart */}
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Modal Popup */}
      <GraphPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        sensor={sensor}
        history={history}
      />
    </>
  );
};

export default SensorsGraph;
