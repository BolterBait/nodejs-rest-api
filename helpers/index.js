const sendGrid = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

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
  sendGrid.setApiKey(SENDGRID_API_KEY);
  const email = {
    from: 'alex4@ua.fm',
    to,
    subject,
    html,
  };

  const response = await sendGrid.sendMail(email);
  console.log(response);
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  sendMail,
};
