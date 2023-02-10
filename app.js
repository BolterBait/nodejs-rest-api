const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const { authRouter } = require('./routes/api/auth');
const { usersRouter } = require('./routes/api/users');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/public', express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
  if (error.message.includes('Cast to ObjectId failed for value')) {
    console.error(error);
    return res.status(400).json({ message: 'id is invalid' });
  }
  return res.status(400).json({ message: error });
});

module.exports = { app };
