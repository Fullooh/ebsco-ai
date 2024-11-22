// src/app/page.js
"use client";

import DashboardWidgets from "./components/DashboardWidgets";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import MobileTitleCard from "./components/MobileTitleCard";
import FileUpload from "./components/FileUpload";
import Recommendations from "./components/Recommendations";
import DataVisualizations from "./components/DataVisualizations";

export default function Home() {
  return (
    <div className="flex lg:flex md:flex xl:flex sm:flex-wrap min-h-screen dotted-background">
      {/* Sidebar */}
      <div className="hidden lg:block md:block xl:block 2xl:block sm:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 p-8">
        <div className="block lg:hidden md:hidden xl:hidden 2xl:hidden sm:block">
          <MobileTitleCard />
        </div>

        <div className="block lg:hidden md:hidden xl:hidden 2xl:hidden sm:block">
          <MobileSidebar />
        </div>

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
