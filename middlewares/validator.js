const { Unauthorized } = require('http-errors');
const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(400, error.message));
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');
  try {
    if (type !== 'Bearer') {
      throw Unauthorized('Not authorized');
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw Unauthorized('Not authorized');
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw Unauthorized('Not authorized. Jwt token is not valid');
    }
    throw error;
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024000,
  },
});

async function resizeAvatar(req, res, next) {
  const { path } = req.file;
  try {
    const avatar = await Jimp.read(path);
    const resizedAvatar = avatar.resize(250, 250);

    await resizedAvatar.writeAsync(path);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

module.exports = {
  validateBody,
  auth,
  upload,
  resizeAvatar,
};
