// Panels/SettingsPanel.jsx
import React from "react";
import SystemSettings from "../components/SettingPanelCompos/SystemSettings";

export default function SettingsPanel() {
  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 pt-20 pb-10">
      {/* System Settings Block (shifted upward slightly and balanced below) */}
      <div className="w-full max-w-5xl mx-auto">
        <SystemSettings />
      </div>
    </div>
  );
}
