// helpers/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const send_api_key = process.env.META_API_KEY;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'olehkotynskyi@meta.ua',
    pass: send_api_key,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendEmail = async data => {
  const email = { ...data, from: 'olehkotynskyi@meta.ua' };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
