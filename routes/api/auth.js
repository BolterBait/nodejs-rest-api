const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register } = require("../../controllers/auth.controler");
const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register));

module.exports = { authRouter, };