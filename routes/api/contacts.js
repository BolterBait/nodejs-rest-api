const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const { nanoid } = require('nanoid');
const { HttpError } = require('../../helpers');
const router = express.Router()
const Joi = require('joi');

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
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })


  const validatedData = schema.validate(req.body);
  if (validatedData.error) {
    return res.status(400).json({ status: validatedData.error })
  }
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
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })
  const validatedData = schema.validate(req.body);
  if (validatedData.error) {
    return res.status(400).json({ status: validatedData.error })
  }
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = await updateContact(contactId, { name, email, phone });
  console.log((result));
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.status(200).json("contact updated");
})

module.exports = router
