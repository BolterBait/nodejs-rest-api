require('dotenv').config();
const sendGrid = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

async function main() {
  sendGrid.setApiKey(SENDGRID_API_KEY);
  try {
    const email = {
      from: 'alex4@ua.fm',
      to: 'alex4@ua.fm',
      subject: 'Test',
      http: '<h1>Hello world!</h1>',
      text: 'Hello world!',
    };

    const response = await sendGrid.send(email);
    console.log(response);
  } catch (error) {
    console.error('App error:', error);
  }
}
main();
