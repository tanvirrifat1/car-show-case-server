import { Car } from '@prisma/client';
import prisma from '../../utils/prisma';

const insertIntoDb = async (data: Car): Promise<Car> => {
  const result = await prisma.car.create({ data });
  return result;
};

export const CarService = { insertIntoDb };
