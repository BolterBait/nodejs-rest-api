const { validateBody } = require('../middlewares/validator');
const { Contact } = require('../models/index');
const fs = require('fs/promises');
const path = require('path');

async function getContacts(req, res, next) {
  const { limit = 100, page = 1, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const favoriteContacts = await Contact.find({ favorite: true });
    return res.status(200).json(favoriteContacts);
  }
  const contacts = await Contact.find({}).skip(skip).limit(limit);
  return res.status(200).json({ contacts });
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.json({ contact });
}
async function createContact(req, res, next) {
  const { _id } = req.params;
  const { name, email, phone, favorite } = req.body;
  const validatedData = validateBody(req.body);
  if (validatedData.error) {
    return res.status(400).json({ status: validatedData.error });
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: 'contact deleted' });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite: favorite },
    { new: true }
  );

  return res.status(200).json(result);
}

async function uploadImage(req, res, next) {
  console.log('file', req.file);
  const { filename } = req.file;

  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const newPath = path.resolve(__dirname, '../public/avatars', filename);

  try {
    await fs.rename(tmpPath, newPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const contactId = req.params.id;

  const contact = await Contact.findById(contactId);
  contact.avatarURL = `/public/avatars/${filename}`;
  await contact.save();

  return res.json({
    data: { image: contact.avatarURL },
  });
}

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  uploadImage,
};
