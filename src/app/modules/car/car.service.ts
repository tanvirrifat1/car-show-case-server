import { Car, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { IGenericResponse } from '../../interface/common';
import { paginationHelpers } from '../../interface/paginationHelpers';
import { ICarFilterRequest } from './car.interface';
import { IPaginationOptions } from '../../interface/pagination';

const insertIntoDb = async (data: Car): Promise<Car> => {
  const result = await prisma.car.create({ data });
  return result;
};

const GetAllData = async (
  filters: ICarFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Car[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'price', 'details', 'category'].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.CarWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.car.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: [options.sortOrder],
          }
        : {
            createdAt: 'asc',
          },
  });

  const total = await prisma.car.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleData = async (id: string) => {
  const result = await prisma.car.findUnique({
    where: { id },
  });
  return result;
};

const updateData = async (id: string, payload: Partial<Car>) => {
  const result = await prisma.car.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const CarService = {
  insertIntoDb,
  getSingleData,
  GetAllData,
  updateData,
};
