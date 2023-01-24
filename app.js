const express = require('express')
const logger = require('morgan')
const morgan = require('morgan');
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts');
const { authRouter } = require('./routes/api/auth');
const { usersRouter } = require('./routes/api/users');
const {tryCatchWrapper} = require('./helpers/index');

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.get('/api/error', tryCatchWrapper (async (req, res, next) => {
  throw new Error("Something bad happened in async function!")
})
);

app.use((error, req, res, next) => {

  if (error.message.includes("Cast to ObjectId failed for value")) {
    console.error(error)
    return res.status(400).json({ message: "id is invalid" })
  }
  if (error.status) {
    return res.status(error.status || 500).json({ message: error.message || "Internal server error" })
  }
  console.error(error)
  return res.status(400).json("Помилка від Joi або іншої бібліотеки валідації")
});

module.exports = { app, };
