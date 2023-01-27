const mongoose = require('mongoose');
const SchemaTypes = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'users',
  },
  image: {
    type: String,
    default: '',
  },
});

const Contact = mongoose.model('contact', schema);

module.exports = {
  Contact,
};
