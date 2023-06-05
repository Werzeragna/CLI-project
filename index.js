const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({action, id, name, email, phone}) {
    switch(action) {
        case "list":
            console.log('Contact List')
            contacts.listContacts();
        break;
        case "get":
            console.log(`Contact ID:${id}`)
            contacts.getContactById(id);
        break;
        case "add":
            console.log(`Add contact : ${name}`)
            contacts.addContact(name, email, phone);
        break;
        case "remove":
            console.log(`Remove contact with ID: ${id}`)
            contacts.removeContact(id);
        break;
        default:
            console.warn("Unknown action!")

    }
}

invokeAction(argv)