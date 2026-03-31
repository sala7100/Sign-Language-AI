
const express = require("express");
const router = express.Router();
const vaidate = require("../middlewares/vaidate");
const { signupschema ,loginschema} = require("../utilts/validarion/auth");
const {signup , login} = require("../controllers/auth");

router.post("/signup", vaidate(signupschema), signup );
router.post("/login", vaidate(loginschema), login );

module.exports = router;