"use client";
import { useState, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChatControls() {
  const [messageCounter, setMessageCounter] = useState(0);
  const [leadsData, setLeadsData] = useState(null); // To store leads data

  // Fetch leads data
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await fetch("/data"); // Replace with your API endpoint
        const data = await response.json();
        setLeadsData(data);
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
      const lineBreak = document.createElement("br");
      contentElement.appendChild(lineBreak);

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

    // Combine user input with leads data and task-specific instructions
    const instructions = `
            Based on the leads data provided, categorize leads that have not converted (i.e., Purchased = FALSE) into categories based on sentiment analysis of their messages.
            For each category, provide:
            - Reasons for categorization with examples from their messages.
            - Suggested next steps.
            - A sample email template for follow-up if applicable.
        `;
    const prompt = `
            User Input: ${userInput}
            Leads Data: ${JSON.stringify(leadsData)}
            Instructions: ${instructions}
        `;

    try {
      const response = await fetch(`/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const botMessage = await response.json();
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
    const userInput = document.getElementById("input").value;
    if (userInput.trim() === "") return;

    appendMessage("You", userInput);
    document.getElementById("input").value = "";

    const submitButton = document.getElementById("submit");
    const miscButton = document.getElementById("misc");
    miscButton.disabled = true;
    submitButton.disabled = true;

    await fetchChatGPTResponse(userInput);

    submitButton.disabled = false;
    miscButton.disabled = false;
  }

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <button
        id="submit"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={sendMessage}
      >
        Submit
      </button>
      <button
        id="misc"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        More info
      </button>
      <div id="messages" className="mt-4"></div>
    </div>
  );
}
