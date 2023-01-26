const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const filesRouter = express.Router();
const {uploadControler} = require('../../controllers/files.controler');
const multer = require('multer');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "/tmp"));
      console.log(path.resolve(__dirname, "/tmp"));
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

filesRouter.post("/", upload.single('image'), tryCatchWrapper(uploadControler));

module.exports = { filesRouter, };