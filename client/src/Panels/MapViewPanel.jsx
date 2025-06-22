import React from "react";
import SensorMapView from "../components/SensorMapView";

const MapViewPanel = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      {/* Optional: Add min-h-screen if used as a full page */}
      <SensorMapView />
    </div>
  );
};

export default MapViewPanel;
