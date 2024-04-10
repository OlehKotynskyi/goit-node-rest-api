// routes/contactRouter.js
import express from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatus,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import isValidId from '../helpers/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import authenticate from '../helpers/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId('id'), getOneContact);

contactsRouter.post('/', authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId('id'),
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId('contactId'),
  validateBody(updateFavoriteSchema),
  updateStatus
);

contactsRouter.delete('/:id', authenticate, isValidId('id'), deleteContact);

export default contactsRouter;
