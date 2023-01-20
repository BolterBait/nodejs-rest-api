const { User } = require('../models/user');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function createContact(req, res, next) {
    return res.status(200).json({ ok: true })
}

async function getContacts(req, res, next) {
    return res.status(200).json({ ok: true })
}
async function me(req, res, next) {
    return res.status(200).json({ ok: true })
}

module.exports = {
    createContact,
    getContacts,
    me,
};