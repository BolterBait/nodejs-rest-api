const express = require('express')
const logger = require('morgan')
// const morgan = require('morgan');
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts');
const { authRouter } = require('./routes/api/auth');

const app = express()
// app.use(morgan("dev")); // morgan only logs requests
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((error, req, res, next) => {
  console.error("Handling errors:", error.message, error.name);
  if (error.name === "HttpError") {
    return res.status(400).json({ message: error.message })
  }
  if (error.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({ message: "id is invalid" })
  }
  if (error.status) {
    return res.status(error.status || 500).json({ message: error.message || "Internal server error" })
  }
  console.log("Error log:", error.message, error.name)
  return res.status(400).json({ message: error.message })
});

module.exports = { app, };
