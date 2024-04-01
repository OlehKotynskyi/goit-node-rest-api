const express = require('express');

const control = require('../controllers/contactsControllers.js');

const { validateBody } = require('../middleware/index.js');

const schemas = require('../schemas/contactsSchemas.js');

const contactsRouter = express.Router();

contactsRouter.get('/', control.getAllContacts);

contactsRouter.get('/:id', control.getOneContact);

contactsRouter.post('/', validateBody(schemas.createContactSchema), control.createContact);

contactsRouter.put('/:id', validateBody(schemas.updateContactSchema), control.updateContact);

contactsRouter.delete('/:id', control.deleteContact);

module.exports = contactsRouter;
