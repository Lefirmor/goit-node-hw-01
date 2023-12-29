// const { program } = require("commander");
const { error } = require("console");
const fs = require("fs").promises;
const path = require("node:path");
require("colors");
const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// function fileReader() {
//   fs.readFile(contactsPath, "utf-8");
// }
const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath, "asd");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    // console.log("Data from file:", data); // Отладочный вывод
    const contacts = JSON.parse(data);
    // console.table(contacts)
    return contacts;
  } catch (error) {
    console.error("Error reading or parsing contacts:", error);
    throw error;
  }
}

// const listContactsData = listContacts();
// В contacts.js
// let listContactsData;

async function getContactById(contactId) {
  try {
    const listContactsData = await listContacts();

    const foundContact = listContactsData.find(
      (contact) => contact.id === contactId
    );

    if (foundContact) {
      console.log("Contact found:", foundContact);

      rl.close();
    } else {
      console.log("No contacts found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const indexToRemove = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (indexToRemove !== -1) {
      const removedContact = contacts.splice(indexToRemove, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      console.log("Contact removed", removedContact);
      return removedContact;
    }
    console.log("No contacts found with the specified id");
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    // console.log("File content:", data);
    const contacts = JSON.parse(data);
    const existingContact = contacts.find(
      (contact) =>
        contact.name === name ||
        contact.phone === phone ||
        contact.email === email
    );
    if (existingContact) {
      console.log("this contact is already added");
      return;
    }

    const newContact = {
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    console.log("New contact added\n", newContact);
    return newContact;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  contactsPath,
  rl,
  listContacts,
  // listContactsData,
  getContactById,
  removeContact,
  addContact,
};
