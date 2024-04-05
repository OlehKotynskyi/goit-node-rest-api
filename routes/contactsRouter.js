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

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId('id'), getOneContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', isValidId('id'), validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId('contactId'),
  validateBody(updateFavoriteSchema),
  updateStatus
);

contactsRouter.delete('/:id', isValidId('id'), deleteContact);

export default contactsRouter;
