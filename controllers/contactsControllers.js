// controllers/contactsControllers.js
import { catchAsync } from '../helpers/catchAsync.js';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact as updateContactService,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) throw HttpError(404, 'Not found');
  res.status(200).json(result);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) throw HttpError(404, 'Not found');
  res.status(200).json(result);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await addContact(req.body);
  if (!newContact) throw HttpError(500, 'Failed to create contact');
  res.status(201).json(newContact);
});

export const updateContact = catchAsync(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(404, 'Body must have at least one field');
  }
  const { id } = req.params;
  const result = await updateContactService(id, req.body);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
});
