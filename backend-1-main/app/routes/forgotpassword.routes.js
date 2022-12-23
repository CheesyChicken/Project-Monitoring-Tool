const controller = require("../controllers/forgotpassword.controller");
var express = require("express");
var router = express();

router.post("/forgotpassword", controller.forgotPassword);
router.post("/resetpassword", controller.resetPassword);

module.exports = router;
