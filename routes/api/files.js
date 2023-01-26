const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { upload } = require("../../controllers/files.controler");
const filesRouter = express.Router();

filesRouter.post("/", tryCatchWrapper(upload));

module.exports = { filesRouter, };