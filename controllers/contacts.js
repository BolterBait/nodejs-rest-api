const { validateBody } = require('../middlewares/validator');
const { Contact } = require('../models/index');
const { nanoid } = require('nanoid');

async function getContacts(req, res, next) {
    const { limit = 100, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({}).skip(skip).limit(limit).populate("owner");
    res.json({ contacts })
}

async function getContactById(req, res, next) {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).json({ message: 'Not found' });
    }
    return res.json({ contact });
};

async function createContact(req, res, next) {

    const validatedData = validateBody(req.body);
    if (validatedData.error) {
        return res.status(400).json({ status: validatedData.error })
    }
    const id = nanoid();
    const { name, email, phone, favorite } = req.body;
    const newContact = await Contact.create({ id, name, email, phone, favorite });
    return res.status(201).json(newContact);
};

async function deleteContact(req, res, next) {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).json({ message: 'Not found' });
    }
    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ "message": "contact deleted" });
};

async function updateContact(req, res, next) {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, { favorite: favorite }, { new: true });

    return res.status(200).json(result);
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
};
