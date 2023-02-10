const { BadRequest } = require('http-errors');
const { Contact } = require('../models');
const { validateBody } = require('../middlewares/validator');
const fs = require('fs/promises');
const path = require('path');
const { User } = require('../models/user');
const { sendMail } = require('../helpers/index');

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

  return res.status(200).json({
    data: {
      avatarURL: user.avatarURL,
    },
  });
}

async function verifyEmail(req, res, next) {
  const { token } = req.params;
  const user = await User.findOne({
    verificationToken: token,
  });

  if (!user) {
    throw BadRequest('Verify token is not valid!');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json({
    message: 'Success',
  });
}

async function resendVerificationEmail(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: 'missing required field email' });
  }

  const verified = user.verify;
  console.log(verified);
  if (!verified) {
    const verificationToken = user.verificationToken;
    await sendMail({
      to: email,
      subject: 'Please confirm your email',
      html: `<a href = "localhost:3001/api/users/verify/${verificationToken}">Confirm your email. If you didn't promt to our service, please ignore it.</a>`,
    });

    return res.json({
      message: 'Success',
    });
  }
  res.status(400).json({ message: 'Verification has already been passed' });
}

module.exports = {
  createContact,
  getContacts,
  current,
  uploadAvatar,
  verifyEmail,
  resendVerificationEmail,
};
