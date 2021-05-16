const { Router } = require("express");
const router = Router();

const questionCtrl = require("../controllers/questionCtrl");

router.get("/", questionCtrl.getAll);
router.post("/", questionCtrl.create);

router
  .route("/:id")
  .get(questionCtrl.getById)
  .delete(questionCtrl.deleteById)
  .put(questionCtrl.updateById);

module.exports = router;
