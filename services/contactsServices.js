const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
   // ...твій код. Повертає масив контактів.
   const dataContacts = await fs.readFile(contactsPath);
   return JSON.parse(dataContacts);
}

async function getContactById(contactId) {
   // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
   const contacts = await listContacts();
   const result = contacts.find(item => item.id === contactId);
   return result || null;
}

async function addContact(name, email, phone) {
   // ...твій код. Повертає об'єкт доданого контакту (з id).
   const contacts = await listContacts();
   const newContact = { id: nanoid(), name, email, phone };
   contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return newContact;
}

async function updateContact(id, data) {
   const contacts = await listContacts();
   const index = contacts.findIndex(item => item.id === id);
   if (index === -1) {
      return null;
   }
   if (data.name) {
      contacts[index].name = data.name;
   }
   if (data.email) {
      contacts[index].email = data.email;
   }
   if (data.phone) {
      contacts[index].phone = data.phone;
   }

   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return contacts[index];
}

async function removeContact(contactId) {
   // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
   const contacts = await listContacts();
   const contactIdx = contacts.findIndex(item => item.id === contactId);
   if (contactIdx === -1) {
      return null;
   }
   const [result] = contacts.splice(contactIdx, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return result;
}

module.exports = {
   listContacts,
   getContactById,
   addContact,
   updateContact,
   removeContact,
};
