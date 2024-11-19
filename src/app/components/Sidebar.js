"use client";

import { useState } from "react";
import Link from "next/link";
import ChatControls from "./ChatControls";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState(""); // State to track the user's query

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleUserInput = (prompt) => {
    console.log("User prompt received in Sidebar:", prompt); // Debug log
    setUserPrompt(prompt);

    // Simulate AI Assistant response
    const messagesDiv = document.getElementById("messages");
    const response = document.createElement("div");
    response.classList.add("text-gray-700", "mt-2");
    response.textContent = `AI Response: Processing prompt...`; // Placeholder
    messagesDiv.appendChild(response);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-5rem)] w-full max-w-[20rem] rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          CRM
        </h5>
      </div>

      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <Link href="/">
          <div
            role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 cursor-pointer"
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </div>
            Dashboard
          </div>
        </Link>
      </nav>

      {/* Toggle Chat Button */}
      <button
        onClick={toggleChat}
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
      >
        {isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
      </button>

      {/* Chat Assistant Popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                AI Assistant
              </h2>
              <div
                id="messages"
                className="mb-4 text-sm text-gray-700 w-full overflow-y-auto p-2 bg-white rounded shadow-inner"
                style={{ height: "300px" }}
              >
                <p>Chat with our Lead AI Specialist</p>
              </div>
              <textarea
                id="input"
                placeholder="Start typing..."
                className="w-full h-20 p-2 border rounded resize-none text-gray-800 -ml-2"
              ></textarea>
              <ChatControls onUserInput={handleUserInput} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
