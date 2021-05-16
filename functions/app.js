const express = require("express");

// Initialize app
const app = express();

// routes
app.get("/welcome", (req, res) => res.json({ message: "Ciao Miguel" }));

app.use("/api/questions", require("./routes/questions.routes"));

module.exports = app;
