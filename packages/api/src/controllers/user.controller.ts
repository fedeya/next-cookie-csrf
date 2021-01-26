import { Handler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const me: Handler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) return res.status(404).json({ message: 'error' });

  res.json({ user });
};
