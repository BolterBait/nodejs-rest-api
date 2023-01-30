const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength: [6, 'password should be at least 6 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Email is not valid',
      ],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
  },
  { versionKey: false }
);

const User = mongoose.model('user', schema);

module.exports = {
  User,
};
