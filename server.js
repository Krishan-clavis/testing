require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Node.js Application</h1>
    <p>Application is running successfully Ready to Deploy in Production done !</p>
    <p>Port: ${PORT}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
