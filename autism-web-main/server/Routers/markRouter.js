const express = require("express");
const { StudentMarks, getMarks } = require("../Controllers/markController");
const router = express.Router();

router.route("/quiz/score").post(StudentMarks);
router.route("/:name").get(getMarks);

module.exports = router;