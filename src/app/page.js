// src/app/page.js
"use client";

import { useEffect } from "react";
import DashboardWidgets from "./components/DashboardWidgets";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import Recommendations from "./components/Recommendations";
import DataVisualizations from "./components/DataVisualizations";

export default function Home() {
  return (
    <div className="lg:flex sm:flex-wrap min-h-screen dotted-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 p-8">
        {/* File Upload */}
        <FileUpload />
        {/* Dashboard Widgets */}
        <DashboardWidgets />
        { /* Data Visualizations */ }
        <DataVisualizations />
        <Recommendations />
      </div>
    </div>
  );
}
