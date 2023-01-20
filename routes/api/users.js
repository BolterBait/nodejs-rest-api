const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { validateBody, auth } = require('../../middlewares/validator');
const { createContact, getContacts, me } = require('../../controllers/users.controler');

const usersRouter = express.Router();

usersRouter.post("/contacts", tryCatchWrapper(auth), tryCatchWrapper(createContact));
usersRouter.get("/contacts", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
usersRouter.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));

module.exports = { usersRouter, };

