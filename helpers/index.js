const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
  }
}

async function sendMail({ to, subject, html }) {
  const email = {
    from: 'osvyatobog@gmail.com',
    to,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const response = await transport.sendMail(email);
  console.log(response);
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  sendMail,
};
