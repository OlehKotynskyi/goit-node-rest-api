// servises/contactsServises.js
import { Contact } from '../models/contactModel.js';

export const listContacts = async () => {
  // ...твій код. Повертає масив контактів.
  const dataContacts = await Contact.find();
  return dataContacts;
};

export const getContactById = async contactId => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await Contact.findById(contactId);
  return contact || null;
};

export const addContact = async (...args) => {
  const newContact = new Contact(...args);
  await newContact.save();
  return newContact;
};

export const updateContact = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
  return updatedContact;
};

export const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  return updatedContact;
};

export const removeContact = async contactId => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};
