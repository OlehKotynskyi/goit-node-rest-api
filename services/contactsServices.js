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

export const getContactById = async (req, contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: contactId, owner });
  return contact || null;
};

export const addContact = async (...args) => {
  // Створює новий контакт.
  const newContact = new Contact(...args);
  await newContact.save();
  return newContact;
};

export const updateContact = async (req, id, data) => {
  // Оновлює контакт.
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate({ _id: id, owner }, data, { new: true });
  return updatedContact;
};

export const updateStatusContact = async (req, contactId, body) => {
  // Оновлює статус контакта.
  const { favorite } = body;
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );
  return updatedContact;
};

export const removeContact = async (req, contactId) => {
  const { _id: owner } = req.user;
  const removedContact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!removedContact) {
    return null;
  }
  return removedContact;
};
