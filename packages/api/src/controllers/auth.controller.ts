import { Handler } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { SECRET_TOKEN } from '../config';

const prisma = new PrismaClient();

export const login: Handler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      password: true
    }
  });

  if (!user || !(await argon2.verify(user.password, password)))
    return res.status(404).json({ message: 'user not found' });

  const token = jwt.sign({ id: user.id }, SECRET_TOKEN);

  const expires = new Date();
  expires.setHours(expires.getHours() + 1);

  res.cookie('token', token, {
    httpOnly: true,
    expires,
    secure: process.env.NODE_ENV === 'production'
  });

  res.json({
    token
  });
};

export const register: Handler = async (req, res) => {
  const { email, name } = req.body;
  let { password } = req.body;

  password = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password
    },
    select: {
      id: true
    }
  });

  const token = jwt.sign({ id: user.id }, SECRET_TOKEN);

  const expires = new Date();
  expires.setHours(expires.getHours() + 1);

  res.cookie('token', token, {
    httpOnly: true,
    expires,
    secure: process.env.NODE_ENV === 'production'
  });

  res.json({
    token
  });
};

export const logout: Handler = (_, res) => {
  res.clearCookie('token');

  res.json({ message: 'logout succesful' });
};
