const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { User } = require('../models/user');
const { Conflict, Unauthorized, HttpError } = require('http-errors');
const { sendMail } = require('../helpers/index');
const { v4 } = require('uuid');

async function register(req, res, next) {
  const { email, password } = req.body;
  const url = gravatar.url(email);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const verificationToken = v4();
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: url,
      verificationToken,
    });

    await sendMail({
      to: email,
      subject: 'Please confirm your email',
      html: `<a href="localhost:3001/api/users/verify/${verificationToken}">Confirm your email. If you didn't promt to our service, please ignore it.</a>`,
    });

    res.status(201).json({ data: { user: { email, id: savedUser._id } } });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      throw Conflict('User whith this email already exists!!!');
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw Unauthorized('Email or password is wrong');
  }
  if (!storedUser.verify) {
    throw new HttpError(
      401,
      'email is not verified! Please check your mail box'
    );
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized('Email or password is wrong');
  }
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  await User.findByIdAndUpdate(storedUser._id, { token });
  const subscription = await storedUser.subscription;
  return res.status(200).json({
    data: {
      token,
      user: { email, subscription },
    },
  });
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    const storedUser = await User.findByIdAndUpdate(
      _id,
      { token: null },
      { expiresIn: '1' }
    );

    if (!storedUser) {
      throw Unauthorized('Not authorized');
    }
    console.log(storedUser.token);
    return res.status(204).json({ message: 'See you soon' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  logout,
};
