require('dotenv').config();
const mongoose = require('mongoose');
const { app } = require('./app');

mongoose.set('strictQuery', false);

const { HOST_URI } = process.env;

(async function () {
  try {
    await mongoose.connect(HOST_URI);

    console.log('Database connection successful');
    app.listen(3001, () => {
      console.log('Server running. Use our API on port: 3001');
    });
  } catch (error) {
    console.error('Main failed', error.message);
    process.exit(1);
  }
})();
