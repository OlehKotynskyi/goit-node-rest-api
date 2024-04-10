// servises/contactsServises.js
import { Contact } from '../models/contactModel.js';

export const listContacts = async req => {
  // Повертає масив контактів.
  const { _id: owner } = req.user;
  const { favorite } = req.query;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === 'true';
  }
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const dataContacts = await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('owner', 'email');
  return dataContacts;
};

export const getContactById = async contactId => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await Contact.findById(contactId);
  return contact || null;
};

export const addContact = async (...args) => {
  // Створює новий контакт.
  const newContact = new Contact(...args);
  await newContact.save();
  return newContact;
};

export const updateContact = async (id, data) => {
  // Оновлює контакт.
  const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
  return updatedContact;
};

export const updateStatusContact = async (contactId, body) => {
  // Оновлює статус контакта.
  const { favorite } = body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  return updatedContact;
};

export const removeContact = async contactId => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
};
