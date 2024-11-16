// src/app/leads/page.js
"use client";

import { useEffect } from "react";
import axios from "axios";
import MarkdownRenderer from "./MarkdownRenderer";
import { createRoot } from "react-dom/client";

export default function Recommendations() {
  const instructions =
    "Based on the data provided, I would like you to categorize leads that have not converted (i.e. Purchased = FALSE) into categories based on the sentiment analysis of their messages. For each lead in the category, please detail why they are grouped into that category with specific examples/proof from their messages that dictate their categorization. Additionally, please provide suggested next steps for each lead and a sample email template if it is recommended to follow up with an email.";

  // Display a message on the frontend
  function appendMessage(message) {
    const messagesDiv = document.getElementById("recommendationsField");

    const contentElement = document.createElement("div");
    messagesDiv.appendChild(contentElement);

    contentElement.innerHTML = `<div id="recommendations"></div>`;
    const currentMessage = document.getElementById("recommendations");

    const root = createRoot(currentMessage);
    root.render(<MarkdownRenderer content={message} />);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Fetch a response from the ChatGPT API
  async function fetchChatGPTResponse(data) {
    const response = await fetch(`/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: data + "\n" + instructions }),
    });

    const botMessage = await response.json();
    if (botMessage.error) {
      appendMessage(botMessage.error);
    } else {
      appendMessage(botMessage.text);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data"); // Update the path as needed
        const leads = response.data;

        // Convert the JSON object to a string
        const jsonString = JSON.stringify(leads);
        // alert(jsonString);

        await fetchChatGPTResponse(jsonString);
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow ring-1 ring-gray-300">
      <div id="recommendationsField">{/* Recommendations go here */}</div>
    </div>
  );
}
