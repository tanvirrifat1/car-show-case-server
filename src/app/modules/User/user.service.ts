import { User } from '@prisma/client';
import prisma from '../../utils/prisma';

const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const GetAllData = async () => {
  const result = await prisma.user.findMany();

  const total = await prisma.user.count();
  console.log(total);
  return { result, total };
};

export const UserService = {
  insertIntoDb,
  GetAllData,
};
