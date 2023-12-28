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

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath, "asd");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    console.log("Data from file:", data); // Отладочный вывод
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error reading or parsing contacts:", error);
    throw error;
  }
}

// const listContactsData = listContacts();
// В contacts.js
let listContactsData;

async function getContactById(contactId) {
  try {
    listContactsData = await listContacts();

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

removeContact = (contactId) => {
  const indexToRemove = listContactsData.findIndex(
    (contact) => contact.id === contactId
  );

  if (indexToRemove !== -1) {
    const removedContact = listContactsData.splice(indexToRemove, 1)[0];
    console.log("Contact removed", removedContact);
    return removedContact;
  }
  console.log("No contacts found with the specified id");
  return null;
};

addContact = (name, email, phone) => {
  const newContact = fs.writeFile(contactsPath, [name, email, phone], () => {
    if (error) {
      console.log("Ошибка при записи файла", error);
    }
  });
  return newContact;
};

module.exports = {
  contactsPath,
  rl,
  listContacts,
  listContactsData,
  getContactById,
  removeContact,
  addContact,
};
