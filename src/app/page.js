// src/app/page.js
"use client";

import DashboardWidgets from "./components/DashboardWidgets";
import ChatControls from "./components/ChatControls";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-8 p-8">
        {/* Dashboard Widgets */}
        <DashboardWidgets />

        {/* Chat Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chat with Assistant
          </h2>
          <main className="flex flex-col gap-4 items-center sm:items-start">
            <ol className="list-inside list-decimal text-sm text-gray-700 text-center sm:text-left font-mono">
              <div id="messages" className="mb-4">
                <p className="text-gray-700">Test the assistant below.</p>
              </div>
              <textarea
                id="input"
                placeholder="Start typing..."
                className="w-full h-20 p-2 border rounded resize-none text-gray-800"
              ></textarea>
            </ol>
            <ChatControls />
          </main>
        </div>
      </div>
    </div>
  );
}
