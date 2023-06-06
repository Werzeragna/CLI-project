const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.filter((contact) => contact.id === contactId);
    console.table(contact);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    console.table(updatedContacts);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, "\t"), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone,
    };
    contacts.push(contact);
    console.table(contacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };