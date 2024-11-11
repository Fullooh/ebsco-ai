// src/app/page.js
"use client";

import DashboardWidgets from "./components/DashboardWidgets";
import ChatControls from "./components/ChatControls";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen dotted-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 p-8">
        {/* Dashboard Widgets */}
        <DashboardWidgets />
      </div>
    </div>
  );
}
