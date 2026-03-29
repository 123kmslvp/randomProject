const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend! This is Project Random Project" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000 on http://localhost:3000/api");
});