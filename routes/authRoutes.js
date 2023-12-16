const express = require("express");
const {login}=require("../services/authService");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const router = express.Router();


router.route("/login").post(login);
module.exports = router;