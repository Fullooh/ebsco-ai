"use client";
import { useState } from "react";

export default function ChatControls() {
    const [messageCounter, setMessageCounter] = useState(0);

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
            const currentMessage = document.getElementById(`message${currentCounter}`);
            currentMessage.innerHTML = message;
            const lineBreak = document.createElement("br");
            contentElement.appendChild(lineBreak);
            
            return currentCounter + 1;
        });
    
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

     // Fetch a response from the ChatGPT API
     async function fetchChatGPTResponse(userInput) {
        
        const response = await fetch(`/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
        });
    
        const botMessage = await response.json();
        if (botMessage.error) {
        appendMessage("Error", botMessage.error);
        } else {
        appendMessage("Assistant", botMessage.text);
        }
    }

     // Send a message to the ChatGPT API
     async function sendMessage() {
        const userInput = document.getElementById("input").value;
        if(userInput.trim() === "") return;

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
            className="submit rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={sendMessage}>
            Submit
          </button>
          <button
            id="misc"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            More info
          </button>
        </div>
    );
}