const express = require('express');
const router = express.Router()
const { tryCatchWrapper } = require('../../helpers/index');
const { getContactById, getContacts, createContact, deleteContact, updateContact } = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares/validator');
const { addContactSchema, setContactFavorite } = require('../../schemas');

router.get('/', tryCatchWrapper(getContacts));
router.get('/:contactId', tryCatchWrapper(getContactById));
router.post('/', tryCatchWrapper(createContact), validateBody(addContactSchema));
router.delete('/:contactId', tryCatchWrapper(deleteContact));
router.patch('/:contactId/favorite', validateBody(setContactFavorite), tryCatchWrapper(updateContact));

module.exports = router;
