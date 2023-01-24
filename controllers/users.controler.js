const { Contact } = require('../models');
const { User } = require('../models/user');

async function createContact(req, res, next) {
    const {_id} = req.user;
    const {name, email, phone, favorite } =req.body;
    const newContact = await Contact.create({
        name, email, phone, favorite, owner: _id,
    });
    return res.status(201).json(newContact);
}

async function getContacts(req, res, next) {
    const
        { _id } = req.user;
    const userWithContacts = await User.findById({owner:_id})

    return res.status(200).json({ data: { contacts: userWithContacts.contacts }, })
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