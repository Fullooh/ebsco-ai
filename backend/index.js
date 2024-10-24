require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(express.json());

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load the API key from environment variables
});

// Example Route
app.get("/", (req, res) => {
  res.send("Lead Scoring Backend is running!");
});

// Simple OpenAI Route
app.post("/generate-response", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Make a request to OpenAI's API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Specify the appropriate model, "gpt-3.5-turbo" for chat-based models
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
