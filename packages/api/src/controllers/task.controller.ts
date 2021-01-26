import { Handler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks: Handler = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      authorId: req.user.id
    }
  });

  res.json({ tasks });
};

export const createTask: Handler = async (req, res) => {
  const { content } = req.body;

  const task = await prisma.task.create({
    data: {
      content,
      author: {
        connect: {
          id: req.user.id
        }
      }
    }
  });

  res.json({ task });
};

export const completeTask: Handler = async (req, res) => {
  const { id } = req.params;

  const task = await prisma.task.update({
    where: {
      id
    },
    data: {
      completed: true
    }
  });

  res.json({ task });
};
