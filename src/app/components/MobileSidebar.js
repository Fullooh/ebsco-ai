import { useState } from "react";
import ChatControls from "./ChatControls";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const Sidebar = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);

  };

  return (
    <div>
        {/* Toggle Chat Button */}
        <button
            onClick={toggleChat}
            className="mt-auto mb-5 px-4 py-2 bg-blue-500 text-white rounded-lg shadow transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
        >
            {isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
        </button>

        {/* Chat Assistant Popup within Sidebar */}
        <AnimatePresence>
            {isChatOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }} // Initial state
                animate={{ height: "auto", opacity: 1 }} // Open state
                exit={{ height: 0, opacity: 0 }} // Closing state
                transition={{ duration: 0.5, ease: "easeInOut" }} // Transition
                className="shadow-xl shadow-blue-gray-900/5"
            >
                <div className="relative flex-col h-auto w-full max-w-[100rem] rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
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
                    <br />
                    {/* Dynamic messages will go here */}
                </div>
                <textarea
                    id="input"
                    placeholder="Start typing..."
                    className="w-full h-20 p-2 border rounded resize-none text-gray-800 -ml-2"
                    ></textarea>
                <ChatControls />
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default Sidebar;
