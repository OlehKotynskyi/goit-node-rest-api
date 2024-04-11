// controllers/contactsControllers.js
import { catchAsync } from '../helpers/catchAsync.js';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact as updateContactService,
  updateStatusContact,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await listContacts(req);
  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  if (contact.owner.toString() !== req.user._id.toString()) {
    throw HttpError(403, 'Access forbidden');
  }
  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  if (contact.owner.toString() !== req.user._id.toString()) {
    throw HttpError(403, 'Access forbidden');
  }
  const result = await removeContact(id);
  res.status(200).json(result);
});

export const createContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await addContact({ ...req.body, owner });
  if (!newContact) throw HttpError(500, 'Failed to create contact');
  res.status(201).json(newContact);
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await updateContactService(id, req.body);
  if (!contact) throw HttpError(404, 'Not found');
  if (contact.owner.toString() !== req.user._id.toString()) {
    throw HttpError(403, 'Access forbidden');
  }
  const { favorite } = req.body;
  const updatedContact = await updateStatusContact(id, { favorite });
  res.json(updatedContact);
});

export const updateStatus = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await updateStatusContact(contactId, { favorite });
  if (!updatedContact) throw HttpError(404, 'Not found');
  res.status(200).json(updatedContact);
});
