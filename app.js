// app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import usersRouter from './routes/authRouter.js';
import contactsRouter from './routes/contactsRouter.js';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.BASE_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
