const functions = require("firebase-functions");
const admin = require("firebase-admin");

const express = require("express");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  databaseURL: "https://quiz-restful.firebaseio.com",
});
const db = admin.firestore();

exports.app = functions.https.onRequest(app);

app.get("/welcome", (req, res) => {
  res.status(200).json({ message: "Ciao Miguel" });
});

app.post("/api/questions", async (req, res) => {
  const payload = {
    question: req.body.question,
    answers: req.body.answers,
    correct_answer: req.body.correct_answer,
  };

  await db.collection("questions").doc().create(payload);

  return res.status(200).json({ message: "Question Successfully Saved! =)" });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
