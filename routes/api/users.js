const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { auth, upload, validateBody } = require('../../middlewares/validator');
const {
  createContact,
  getContacts,
  current,
  uploadAvatar,
} = require('../../controllers/users.controler');
const { addContactSchema } = require('../../schemas');
const usersRouter = express.Router();

usersRouter.post(
  '/contacts',
  tryCatchWrapper(auth),
  validateBody(addContactSchema),
  tryCatchWrapper(createContact)
);
usersRouter.get(
  '/contacts',
  tryCatchWrapper(auth),
  tryCatchWrapper(getContacts)
);
usersRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(current));
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  tryCatchWrapper(auth),
  tryCatchWrapper(uploadAvatar)
);
module.exports = { usersRouter };
