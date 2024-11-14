"use client";

import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`File uploaded successfully: ${result.file.filename}`);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow ring-1 ring-gray-300">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Data File
      </h2>

      {/* File Upload Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          required
          className="mb-4"
        />
        <button
          type="submit"
          className="rounded-full border border-solid border-transparent transition-colors items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 inline"
        >
          Upload
        </button>
      </form>

      {/* Display Message */}
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}
