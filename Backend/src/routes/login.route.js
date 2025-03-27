const express = require("express");
const router = express.Router();
const loginRoute = require("../controllers/login.controller");
const docloginRoute = require("../controllers/doclogin.controller");

router.post("/userLogin", loginRoute.userLogin);
router.post("/docLogin", docloginRoute.docLogin);

module.exports = router;
