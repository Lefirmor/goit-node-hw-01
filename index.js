const contacts = require("./contacts");
const argv = require("yargs").argv;

contacts.getContactById(3);
console.log(contacts.contactsPath);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById = id;
      break;

    case "add":
      // ... name email phone
      break;

    case "remove":
      contacts.removeContact = id;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
