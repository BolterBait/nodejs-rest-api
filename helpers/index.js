const sendGrid = require('@sendgrid/mail');

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

async function sendMail() {
  const email = {
    from: 'alex4@ua.fm',
    to: 'osvyatobog@gmail.com',
    subject: 'Test',
    html: '<h1>Hello world!</h1>',
    text: 'Hello world!',
  };

  const response = await sendGrid.sendMail(email);
}

module.exports = {
  tryCatchWrapper,
  HttpError,
};
