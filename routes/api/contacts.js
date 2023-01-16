const express = require('express');
const router = express.Router()
const { tryCatchWrapper } = require('../../helpers/index');
const { getContactById, getContacts, createContact, deleteContact, updateContact } = require('../../controllers/contacts');

router.get('/', tryCatchWrapper(getContacts));
router.get('/:contactId', tryCatchWrapper(getContactById));
router.post('/', tryCatchWrapper(createContact));
router.delete('/:contactId', tryCatchWrapper(deleteContact));
router.patch('/:contactId/favorite', tryCatchWrapper(updateContact));

module.exports = router;
