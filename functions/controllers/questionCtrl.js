const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
  databaseURL: "https://quiz-restful.firebaseio.com",
});

const db = admin.firestore();

// -----------------
// Get All Questions
// -----------------
const getAll = async (req, res) => {
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
};

// ------------------------
// Create a single Question
// ------------------------
const create = async (req, res) => {
  try {
    const payload = {
      question: req.body.question,
      answers: req.body.answers,
      correct_answer: req.body.correct_answer,
    };

    await db.collection("questions").doc().create(payload);

    return res.status(200).json({ message: "Question Successfully Saved! =)" });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ---------------------
// Get a single Question
// ---------------------
const getById = async (req, res) => {
  try {
    const query = db.collection("questions");
    const doc = query.doc(req.params.id);
    const item = await doc.get();

    if (!item.data()) throw new Error("There is no data!");

    const response = {
      _id: item.id,
      ...item.data(),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------------
// Update a single Question
// ------------------------
const updateById = async (req, res) => {
  try {
    const query = db.collection("questions");
    const doc = query.doc(req.params.id);

    const payload = {
      question: req.body.question,
      correct_answer: req.body.correct_answer,
    };

    await doc.update(payload);

    return res
      .status(200)
      .json({ message: "Question Successfully Updated! =)" });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong updating this item" });
  }
};

// ------------------------
// Delete a single Question
// ------------------------
const deleteById = async (req, res) => {
  try {
    const query = db.collection("questions");
    const doc = query.doc(req.params.id);

    await doc.delete();

    return res
      .status(200)
      .json({ message: "Question Successfully Deleted! =)" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong deleting this item" });
  }
};

module.exports = { getAll, create, getById, updateById, deleteById };
