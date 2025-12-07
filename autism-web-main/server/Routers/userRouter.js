const express = require("express");
const { RegisterChildern, LoginChildern, RegisterParent, LoginParent } = require("../Controllers/userController");
const router = express.Router();


router.route("/children/register").post(RegisterChildern);
router.route("/children/login").post(LoginChildern);
router.route("/parent/register").post(RegisterParent);
router.route("/parent/login").post(LoginParent);


module.exports = router;