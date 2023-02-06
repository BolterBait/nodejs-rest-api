require('dotenv').config();
// const sendGrid = require('@sendgrid/mail');
const mongoose = require('mongoose');
const { app } = require('./app');
// const dotenv = require('dotenv');

// dotenv.config();
mongoose.set('strictQuery', false);

const { HOST_URI } = process.env;
// const { SENDGRID_API_KEY } = process.env;

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

// async function main() {
//   sendGrid.setApiKey(SENDGRID_API_KEY);
//   try {
//     const email = {
//       from: 'alex4@ua.fm',
//       to: 'osvyatobog@gmail.com',
//       subject: 'Test',
//       html: '<h1>Hello world!</h1>',
//       text: 'Hello world!',
//     };

//     const response = await sendGrid.send(email);
//     console.log(response);
//   } catch (error) {
//     console.error('App error:', error);
//   }
// }
// main();
