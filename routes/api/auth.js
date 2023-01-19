const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register, login } = require("../../controllers/auth.controler");
const { validateBody } = require('../../middlewares/validator');
const { addUser } = require('../../schemas');
const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register), validateBody(addUser));
authRouter.post("/login", tryCatchWrapper(login));

module.exports = { authRouter, };

