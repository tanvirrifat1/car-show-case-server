import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';

const insertIntoDb = async (data: User): Promise<User> => {
  const hasPass = await bcrypt.hash(data?.password as string, 12);
  data.password = hasPass;
  const result = await prisma.user.create({ data });
  return result;
};

export const AuthService = {
  insertIntoDb,
};
