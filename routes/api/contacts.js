const express = require('express');
const router = express.Router();
const { tryCatchWrapper } = require('../../helpers/index');
const {
  getContactById,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  uploadImage,
} = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares/validator');
const { addContactSchema, setContactFavorite } = require('../../schemas');
const { upload } = require('../../middlewares/validator');

router.get('/', tryCatchWrapper(getContacts));
router.get('/:contactId', tryCatchWrapper(getContactById));
router.post(
  '/',
  tryCatchWrapper(createContact),
  validateBody(addContactSchema)
);
router.delete('/:contactId', tryCatchWrapper(deleteContact));
router.patch(
  '/:contactId/favorite',
  validateBody(setContactFavorite),
  tryCatchWrapper(updateContact)
);
router.patch(
  '/:id/image',
  upload.single('image'),
  tryCatchWrapper(uploadImage)
);

module.exports = router;
