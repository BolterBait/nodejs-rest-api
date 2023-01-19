const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register, login } = require("../../controllers/auth.controler");
const { validateBody } = require('../../middlewares/validator');
const { addUser } = require('../../schemas');
const authRouter = express.Router();

authRouter.post("/register", validateBody(addUser), tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));

module.exports = { authRouter, };

