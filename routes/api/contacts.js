const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const { nanoid } = require('nanoid');
// const { HttpError } = require('../../helpers');
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json({ contact });
})

router.post('/', async (req, res, next) => {
  const id = nanoid();
  const { name, email, phone } = req.body;
  const newContact = await addContact({ id, name, email, phone });
  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await removeContact(contactId);
  res.status(200).json({ "message": "contact deleted" });
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  await updateContact(contactId);
  return res.status(200).json("contact updated");
})

module.exports = router
