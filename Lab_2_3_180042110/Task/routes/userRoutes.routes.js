const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const {getRegister,postRegister,getLogin,getDashboard,postLogin} = require("./../controllers/userController.controller");
const isLoggedIn = require("./../middlewares/auth.middlewares");
const registrationValidation = require("./../middlewares/registration.middleware");

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get("/login",getLogin);

router.get("/register",getRegister);

router.post("/register",registrationValidation,postRegister);

router.post("/login",postLogin);

router.get("/dashboard",isLoggedIn,getDashboard);

module.exports = router;