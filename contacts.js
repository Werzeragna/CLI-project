const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id === contactId))
    .then((contact) => console.table(contact))
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
    .then((contact) => {
      console.table(contact);
      return contact;
    })
    .then((contact) => {
      fs.writeFile(contactsPath, JSON.stringify(contact, null, "\t"), "utf-8");
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = {
        id: (contacts.length + 1).toString(),
        name,
        email,
        phone,
      };
      contacts.push(contact);
      return contacts;
    })
    .then((addContact) => {
      console.table(addContact);
      return addContact;
    })
    .then((contacts) => {
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), "utf-8");
    })
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
