// controllers/contactsControllers.js
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact as updateContactService,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  if (!newContact) {
    throw HttpError(500, 'Failed to create contact');
  }
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(404, 'Body must have at least one field');
  }

  const { id } = req.params;
  const result = await updateContactService(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};
