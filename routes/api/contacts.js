const express = require('express');
const app = require('../../app');
const { listContacts, getContactById, addContact } = require('../../models/contacts')
// const { contacts } = require('../../models/contacts');
const router = express.Router()
// const contacts = require('../../models/contacts.json')


router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json();
  }
  return res.json({ contact });
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log('name:', name);
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
