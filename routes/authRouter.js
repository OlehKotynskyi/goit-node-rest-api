// routes/auth.js
import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  createUser,
  getCurrent,
  loginUser,
  logout,
  resendVerifayEmail,
  updateAvatar,
  updateSubscription,
  verifyEmail,
} from '../controllers/authControllers.js';
import {
  emailSchema,
  updateSubscriptionSchema,
  userloginSchema,
  userRegisterSchema,
} from '../schemas/usersSchemas.js';

import authenticate from '../helpers/authenticate.js';
import { upload } from '../helpers/upload.js';

const usersRouter = express.Router();

usersRouter.get('/current', authenticate, getCurrent);

usersRouter.post('/register', validateBody(userRegisterSchema), createUser);

usersRouter.get('/verify/:verificationToken', verifyEmail);

usersRouter.post('/verify', validateBody(emailSchema), resendVerifayEmail);

usersRouter.post('/login', validateBody(userloginSchema), loginUser);

usersRouter.post('/logout', authenticate, logout);

usersRouter.patch(
  '/subscription',
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

usersRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

export default usersRouter;
