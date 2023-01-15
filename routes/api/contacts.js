const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router()
const { validateBody } = require('../../middlewares/validator');
const { Contact } = require('../../models/index');

router.get('/', async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({ contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json({ contact });
})

router.post('/', async (req, res, next) => {

  const validatedData = validateBody(req.body);
  if (validatedData.error) {
    return res.status(400).json({ status: validatedData.error })
  }
  const id = nanoid();
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ id, name, email, phone });
  res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ "message": "contact deleted" });
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  // let favorite = contact.favorite;
  const { favorite } = req.body;
  console.log(favorite);
  if (!favorite) {
    return res.status(400).json({ message: "missing field favorite" })
  }
  contact.favorite = favorite;
  await Contact.findByIdAndUpdate(contactId);
})



module.exports = router
