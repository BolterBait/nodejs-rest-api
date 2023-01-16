const express = require('express');
const router = express.Router()
const { getContactById, getContacts, createContact, deleteContact, updateContact } = require('../../controllers/contacts');

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', createContact);
router.delete('/:contactId', deleteContact);
router.patch('/:contactId/favorite', updateContact);

module.exports = router;
