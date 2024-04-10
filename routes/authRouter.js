// routes/auth.js
import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  createUser,
  getCurrent,
  loginUser,
  logout,
  updateSubscription,
} from '../controllers/authControllers.js';
import {
  updateSubscriptionSchema,
  userloginSchema,
  userRegisterSchema,
} from '../schemas/usersSchemas.js';

import authenticate from '../helpers/authenticate.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(userRegisterSchema), createUser);

usersRouter.post('/login', validateBody(userloginSchema), loginUser);

usersRouter.get('/current', authenticate, getCurrent);

usersRouter.post('/logout', authenticate, logout);

usersRouter.patch(
  '/users',
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

export default usersRouter;
