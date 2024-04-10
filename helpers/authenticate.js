import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from './HttpError.js';
import { User } from '../models/userModel.js';

dotenv.config();

const secret_key = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, secret_key);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
export default authenticate;
