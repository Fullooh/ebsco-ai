const express = require("express");
const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(express.json());

// Example Route
app.get("/", (req, res) => {
  res.send("Lead Scoring Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
