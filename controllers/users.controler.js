const { User } = require('../models/user');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function createContact(req, res, next) {
    return res.status(200).json({ ok: true })
}

async function getContacts(req, res, next) {
    const
        { user } = req;
    const { contacts } = user;
    return res.status(200).json({ data: [contacts], })
}
async function current(req, res, next) {
    const
        { user } = req;
    const { email, subscription } = user;
    return res.status(200).json({ data: { user: { email, subscription } } })
}

module.exports = {
    createContact,
    getContacts,
    current,
};