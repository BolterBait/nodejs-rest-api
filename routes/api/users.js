const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { auth } = require('../../middlewares/validator');
const { createContact, getContacts, current } = require('../../controllers/users.controler');

const usersRouter = express.Router();

usersRouter.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(createContact));
usersRouter.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
usersRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

module.exports = { usersRouter, };

