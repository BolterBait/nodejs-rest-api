const { Contact } = require('../models');
const { validateBody } = require('../middlewares/validator');
const fs = require('fs/promises');
const path = require('path');
const { User } = require('../models/user');
const Jimp = require('jimp');

async function createContact(req, res, next) {
  const { _id } = req.user;
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

async function getContacts(req, res, next) {
  const { _id } = req.user;
  const { user } = req;
  const { email } = user;
  const userWithContacts = await Contact.find({ owner: _id });
  return res
    .status(200)
    .json({ data: { user: { email }, usersContacts: userWithContacts } });
}
async function current(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;
  return res.status(200).json({ data: { user: { email, subscription } } });
}

async function uploadAvatar(req, res, next) {
  const { _id } = req.user;
  const { user } = req;
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

  await User.findByIdAndUpdate(_id);
  user.avatarURL = `/public/avatars/${filename}`;
  await user.save();

  return res.json({
    ok: true,
  });
}

module.exports = {
  createContact,
  getContacts,
  current,
  uploadAvatar,
};
