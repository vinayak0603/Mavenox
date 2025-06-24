import React from "react";
import AlertItemList from "../components/AlertPanelCompos/AlertItemList";

export default function AlertsPanel() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-start pt-6 px-4">
      <AlertItemList />
    </div>
  );
}
