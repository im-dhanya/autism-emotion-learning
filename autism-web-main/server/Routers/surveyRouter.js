const express = require("express");
const { SurveyModel } = require("../Controllers/surveyController");
const router = express.Router();

router.route("/autism/survey").post(SurveyModel);

module.exports = router;