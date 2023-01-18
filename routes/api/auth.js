const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register } = require("../../controllers/auth.controler");
const { validateBody } = require('../../middlewares/validator');
const { addUser } = require('../../schemas');
const authRouter = express.Router();

authRouter.post("/register", validateBody(addUser), tryCatchWrapper(register));

module.exports = { authRouter, };