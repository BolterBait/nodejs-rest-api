const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register, login, logout } = require("../../controllers/auth.controler");
const { validateBody, auth } = require('../../middlewares/validator');
const { addUser } = require('../../schemas');
const authRouter = express.Router();

authRouter.post("/register", validateBody(addUser), tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));
authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = { authRouter, };

