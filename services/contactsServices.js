// servises/contactsServises.js
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, 'contacts.json');

export const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  const dataContacts = await fs.readFile(contactsPath);
  return JSON.parse(dataContacts);
};

export const getContactById = async contactId => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const updateContact = async (id, data) => {
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
};

export const removeContact = async contactId => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(item => item.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
