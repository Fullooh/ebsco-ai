// src/components/Sidebar.js

import Link from "next/link";
import ChatControls from "./ChatControls";

const Sidebar = () => {
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
        {/* Add more links similarly */}
      </nav>

      {/* Chat Assistant Section */}
      {/* Chat Assistant Section */}
      <div className="mt-auto p-4 bg-gray-50 rounded-lg shadow-inner ml-1 mr-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Chat Assistant
        </h2>
        <div className="flex flex-col gap-4 items-center sm:items-start">
          {/* Messages Container with Scroll */}
          <div
            id="messages"
            className="mb-4 text-sm text-gray-700 max-h-40 w-full overflow-y-auto p-2 bg-white rounded shadow-inner"
          >
            <p>Enter a message below.</p>
            <br></br>
            {/* Dynamic messages will go here */}
          </div>

          <textarea
            id="input"
            placeholder="Start typing..."
            className="w-[95%] h-20 p-2 border rounded resize-none text-white-800 -ml-2 -mt-2"
          ></textarea>
          <ChatControls />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
