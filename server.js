const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = "timeData.json";

app.use(cors());
app.use(express.json());

// Load stored time data or initialize it
let timeData = {
  livedTime: 0,
  realStartTime: new Date().getTime(),
  isRunning: false,
};

// Read saved data on startup
if (fs.existsSync(DATA_FILE)) {
  const rawData = fs.readFileSync(DATA_FILE);
  timeData = JSON.parse(rawData);
}

// Endpoint to get current timer state
app.get("/get-time", (req, res) => {
  res.json(timeData);
});

// Endpoint to update timer state
app.post("/update-time", (req, res) => {
  const { livedTime, realStartTime, isRunning } = req.body;
  
  timeData = { livedTime, realStartTime, isRunning };
  
  // Save data to a file
  fs.writeFileSync(DATA_FILE, JSON.stringify(timeData, null, 2));
  
  res.json({ success: true, message: "Time updated" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
