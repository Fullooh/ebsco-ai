"use client";

import { useState, useEffect } from "react";

export default function ChatControls({ onUserInput }) {
  const [leadsData, setLeadsData] = useState(null); // To store leads data
  const [messageCounter, setMessageCounter] = useState(0); // To track message count

  // Fetch leads data on component mount
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await fetch("/data");
        const data = await response.json();
        setLeadsData(data);
        console.log("Leads data loaded:", data); // Debug log
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };
    fetchLeadsData();
  }, []);

  // Display a message on the frontend
  function appendMessage(sender, message) {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");

    const senderElement = document.createElement("div");
    senderElement.textContent = sender;
    senderElement.classList.add("font-bold");

    const contentElement = document.createElement("div");

    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);
    messagesDiv.appendChild(messageElement);

    setMessageCounter((prevCounter) => {
      const currentCounter = prevCounter;

      contentElement.innerHTML = `<div id="message${currentCounter}"></div>`;
      const currentMessage = document.getElementById(
        `message${currentCounter}`,
      );
      currentMessage.innerHTML = message;

      return currentCounter + 1;
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Fetch a response from the ChatGPT API
  async function fetchChatGPTResponse(userInput) {
    if (!leadsData) {
      appendMessage("Error", "Leads data is not loaded.");
      return;
    }

    const prompt = `
      You are an AI Lead Management Specialist. Analyze the following leads data and categorize each lead into one of three groups:
      - Not Interested in New Tools/Providers
      - Evaluating Multiple Vendors
      - Ready for Future Consideration

      Rules:
      - Each lead belongs to one category only.
      - Provide reasons, examples, suggested next steps, and email templates for each lead.
      - If no category fits, state: "No relevant category found."

      Leads Data: ${JSON.stringify(leadsData)}

      User Input: ${userInput}
    `;

    try {
      console.log("Sending prompt:", prompt); // Debug log
      const response = await fetch(`/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const botMessage = await response.json();
      console.log("API Response:", botMessage); // Debug log

      if (botMessage.error) {
        appendMessage("Error", botMessage.error);
      } else {
        appendMessage("Assistant", botMessage.text);
      }
    } catch (error) {
      appendMessage("Error", "Failed to fetch response from the API.");
    }
  }

  // Send a message to the ChatGPT API
  async function sendMessage() {
    const inputField = document.getElementById("input");
    const userInput = inputField.value.trim();

    if (!userInput) return;

    appendMessage("You", userInput);
    inputField.value = ""; // Clear the input field

    const submitButton = document.getElementById("submit");
    submitButton.disabled = true;

    await fetchChatGPTResponse(userInput);

    submitButton.disabled = false;
  }

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <button
        id="submit"
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
        onClick={sendMessage}
      >
        Submit
      </button>
      <div id="messages" className="mt-4"></div>
    </div>
  );
}
