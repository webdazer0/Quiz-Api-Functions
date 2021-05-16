const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
  databaseURL: "https://quiz-restful.firebaseio.com",
});
const db = admin.firestore();

// --------------------------------------------
// Get All Questions & Create a single Question
// --------------------------------------------
router
  .route("/")
  .get(async (req, res) => {
    const query = db.collection("questions");

    try {
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        _id: doc.id,
        question: doc.data().question,
        answers: doc.data().answers,
        correct_answer: doc.data().correct_answer,
      }));

      return res.status(200).json(response);
    } catch (error) {
      // console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  })
  .post(async (req, res) => {
    try {
      const payload = {
        question: req.body.question,
        answers: req.body.answers,
        correct_answer: req.body.correct_answer,
      };

      await db.collection("questions").doc().create(payload);

      return res
        .status(200)
        .json({ message: "Question Successfully Saved! =)" });
    } catch (error) {
      // console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  });

// ---------------------
// Get a single Question
// ---------------------
router.route("/:id").get(async (req, res) => {
  try {
    const query = db.collection("questions");
    const doc = query.doc(req.params.id);
    const item = await doc.get();
    // const response = item.data();
    const response = {
      _id: item.id,
      ...item.data(),
    };

    return res.status(200).json(response);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
