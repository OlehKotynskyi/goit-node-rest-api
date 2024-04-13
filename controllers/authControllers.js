// controllers/authControllers.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { catchAsync } from '../helpers/catchAsync.js';
import HttpError from '../helpers/HttpError.js';
import { User } from '../models/userModel.js';

dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, 'Email already in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, secret_key, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    email: user.email,
    subscription: user.subscription,
  });
});

export const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
});

export const updateSubscription = catchAsync(async (req, res) => {
  const { subscription } = req.body;
  const { _id: userId } = req.user;
  const validSubscriptions = ['starter', 'pro', 'business'];
  if (!validSubscriptions.includes(subscription)) {
    throw HttpError(400, 'Invalid subscription type');
  }
  const updatedUser = await User.findByIdAndUpdate(userId, { subscription }, { new: true });
  if (!updatedUser) {
    throw HttpError(404, 'User not found');
  }
  res.status(200).json(updatedUser);
});
