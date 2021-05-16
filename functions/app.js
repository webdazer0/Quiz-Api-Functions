const express = require("express");

// Initialize app
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/welcome", (req, res) => res.json({ message: "Ciao Miguel" }));

app.use("/api/questions", require("./routes/questions.routes"));

module.exports = app;
