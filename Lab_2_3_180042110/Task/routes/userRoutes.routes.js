const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {getRegister,postRegister,getLogin,getDashboard,postLogin} = require("./../controllers/userController.controller");

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get("/login",getLogin);

router.get("/register",getRegister);

router.post("/register",postRegister);

router.post("/login",postLogin);

router.get("/dashboard",getDashboard);

module.exports = router;