import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../model/prismaClient';

// Service to handle user signup
export const registerUser = async (username: string, email: string, password: string) => {
  const userExists = await prisma.user.findUnique({
    where: { username },
  });

  if (userExists) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

// Service to handle user login
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid credentials.');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return { token, user };
};
