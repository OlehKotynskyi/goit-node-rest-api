// helpers/isValidId.js
import { isValidObjectId } from 'mongoose';
import HttpError from './HttpError.js';

const isValidId = paramsId => (req, res, next) => {
  const id = req.params[paramsId];
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
