const fs = require('fs/promises');
// const { writeFile } = require('fs');

const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function addContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await addContacts(updatedContacts);

}

const addContact = async (body) => {
  const contacts = await readContacts();
  contacts.push(body);
  await addContacts(contacts);
  return (contacts);
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  contacts.forEach(body => {
    if (body.id === contactId)
      body.name = name;
  }

  // const { name, email, phone } = body;
  console.log(body.name);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
