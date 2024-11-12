// src/app/page.js
"use client";

import DashboardWidgets from "./components/DashboardWidgets";
import ChatControls from "./components/ChatControls";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <div className="flex min-h-screen dotted-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 p-8">
        {/* File Upload */ }
        <FileUpload />
        {/* Dashboard Widgets */}
        <DashboardWidgets />
      </div>
    </div>
  );
}
