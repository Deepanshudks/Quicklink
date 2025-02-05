import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Register a new user
export const signup = async (req: Request, res: Response) => {
  const {username, email, password } = req.body;
  if(!username && !email && !password){
     return res.status(204).json({
        message : "Not found required data"
      })
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '2h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User registration failed.' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '2h',
    });
    console.log(token)

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed.' });
  }
};
